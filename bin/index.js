#!/usr/bin/env node
const config = require('config');
const execSync = require("child_process").execSync;
const yaml = require('js-yaml');
const fs   = require('fs');
const path = require('path');

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

    var app = getApp(argv.namespace);

    var properties = [];

    for(var i in app.properties) {
      if(app.properties[i].type == "configMap") {
        properties.push({
          name : app.properties[i].key,
          value : getConfigMapValue(argv.context, argv.namespace, app.properties[i].configMap, app.properties[i].configMapKey)
        });
      }

      if(app.properties[i].type == "secret") {
        properties.push({
          name : app.properties[i].key,
          value : getSecretValue(argv.context, argv.namespace, app.properties[i].secret, app.properties[i].secretKey)
        });
      }
    }

    console.log(generateYaml(app.jumpboxType, properties));
  })
  .help()
  .argv

function getApp(namespace){
  var apps = config.get('apps');

  for(var i in apps) {
    if(namespace.startsWith(apps[i].shortName + "-")){
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

function generateYaml(type, parameters){
  var doc = yaml.load(fs.readFileSync(path.join(__dirname, '../resources/jumpbox.yaml'), 'utf8'));
  doc.metadata.name = type + "-jumpbox";
  doc.spec.template.spec.containers[0].name = type + "-jumpbox";
  doc.spec.template.spec.containers[0].env = parameters;

  return yaml.dump(doc);
}