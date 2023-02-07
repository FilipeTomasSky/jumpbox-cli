#!/usr/bin/env node
const config = require('config');
const execSync = require("child_process").execSync;

require('yargs')
  .scriptName("jumpbox-cli")
  .usage('$0 --context=[context] --namespace=[namespace] <cmd>')
  .command('generate', 'generates jumpbox yaml', (yargs) => {
    yargs.positional('-context', {
      type: 'string',
      describe: 'k8s context'
    }),
    yargs.positional('-namespace', {
      type: 'string',
      describe: 'k8s namespace'
    })
  }, function (argv) {
    console.log(generateYaml(argv.context, argv.namespace));
  })
  .help()
  .argv


function getApp(namespace){
  var apps = config.get('apps');

  for(var i in apps) {
    if(namespace.startsWith(apps[i].name + "-")){
      return apps[i];
    }
  }
}

function getConfigMapValue(context, namespace, configmap, key){
  return execSync("kubectl --context=" + context + " --namespace=" + namespace + " get cm " + configmap + " -o=go-template='{{index .data \"" + key + "\"}}'").toString();
}

function getSecretValue(context, namespace, secret, key){
  return execSync("kubectl --context=" + context + " --namespace=" + namespace + " get secret " + secret + " -o=go-template='{{index .data \"" + key + "\"}}' | base64 -d").toString();
}

function generateYaml(context, namespace){

  var app = getApp(namespace);

  var template = "apiVersion: batch/v1\n";
  template += "kind: Job\n";
  template += "metadata:\n";
  template += "  name: " + app.jumpboxType + "-jumpbox\n";
  template += "spec:\n";
  template += "  template:\n";
  template += "    spec:\n";
  template += "      containers:\n";
  template += "      - name: " + app.jumpboxType + "-jumpbox\n";
  template += "        image: mirror.registry:5000/bragi/test/sas-jumpbox:vtest\n";
  template += "        env:\n";

  for(var i in app.properties) {
    template += "        - name: " + app.properties[i].key + "\n";
    if(app.properties[i].type == "configMap") {
      template += "          value: " + getConfigMapValue(context, namespace, app.properties[i].configMap, app.properties[i].configMapKey) + "\n";
    }
    if(app.properties[i].type == "secret") {
      template += "          value: " + getSecretValue(context, namespace, app.properties[i].secret, app.properties[i].secretKey) + "\n";
    }
  }

  template += "        resources:\n";
  template += "          limits:\n";
  template += "            memory: \"0\"\n";
  template += "            cpu: \"0\"\n";
  template += "      restartPolicy: Never\n";
  template += "  backoffLimit: 4\n";
  template += "  activeDeadlineSeconds: 7200\n";

  return template;
}