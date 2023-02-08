JUMPBOX-CLI - Simple cli to generate or deploy jumpbox to k8s
=============================================================

Installation
------------

Clone the repo to your machine

```
cd jumpbox-cli
npm install
npm install -g .
```

Usage
-----

Currently it only generates the yml with the correct variables

```
jumpbox-cli --context=<context> --namespace=<namespace> generate > new_jumpbox.yml
kubectl apply -f ./new_jumpbox.yml
```


Configuration
-------------
To support more components alter the apps.js file and add more apps
```
        {
            "name": "<service-short-name>",
            "jumpboxType": "cql",
            "properties": [
                {
                    "key": "CASSANDRA_HOSTS",
                    "type": "configMap",
                    "configMap": "...",
                    "configMapKey": "..." 
                },
                {
                    "key": "CASSANDRA_PASSWORD",
                    "type": "secret",
                    "secret": "...",
                    "secretKey": "..." 
                }
            ]
        }
```

