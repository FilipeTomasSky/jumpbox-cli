class Apps {

    get configured() {

        var apps = [];

        apps.push({
            "name": "vm",
            "jumpboxType": "mysql",
            "properties": [
                {
                    "key": "MYSQL_HOST",
                    "type": "configMap",
                    "configMap": "voucher-manager-service-config",
                    "configMapKey": "VOUCHERS_DB_HOST" 
                },
                {
                    "key": "MYSQL_USERNAME",
                    "type": "configMap",
                    "configMap": "voucher-manager-service-config",
                    "configMapKey": "VOUCHERS_DB_USER" 
                },
                {
                    "key": "MYSQL_DATABASE",
                    "type": "configMap",
                    "configMap": "voucher-manager-service-config",
                    "configMapKey": "VOUCHERS_DB_NAME" 
                },
                {
                    "key": "MYSQL_PASSWORD",
                    "type": "secret",
                    "secret": "vm-secrets",
                    "secretKey": "db" 
                }
            ]
        })

        apps.push({
            "name": "comms",
            "jumpboxType": "cql",
            "properties": [
                {
                    "key": "CASSANDRA_HOSTS",
                    "type": "configMap",
                    "configMap": "communications-composer-service-config",
                    "configMapKey": "CASSANDRA_HOSTS" 
                },
                {
                    "key": "CASSANDRA_USERNAME",
                    "type": "configMap",
                    "configMap": "communications-composer-service-config",
                    "configMapKey": "CASSANDRA_USERNAME" 
                },
                {
                    "key": "CASSANDRA_KEYSPACE",
                    "type": "configMap",
                    "configMap": "communications-composer-service-config",
                    "configMapKey": "CASSANDRA_KEYSPACE" 
                },
                {
                    "key": "CASSANDRA_PASSWORD",
                    "type": "secret",
                    "secret": "cassandra-communications-composer",
                    "secretKey": "password" 
                }
            ]
        })

        apps.push({
            "name": "comms",
            "jumpboxType": "cql",
            "properties": [
                {
                    "key": "CASSANDRA_HOSTS",
                    "type": "configMap",
                    "configMap": "communications-composer-service-config",
                    "configMapKey": "CASSANDRA_HOSTS" 
                },
                {
                    "key": "CASSANDRA_USERNAME",
                    "type": "configMap",
                    "configMap": "communications-composer-service-config",
                    "configMapKey": "CASSANDRA_USERNAME" 
                },
                {
                    "key": "CASSANDRA_KEYSPACE",
                    "type": "configMap",
                    "configMap": "communications-composer-service-config",
                    "configMapKey": "CASSANDRA_KEYSPACE" 
                },
                {
                    "key": "CASSANDRA_PASSWORD",
                    "type": "secret",
                    "secret": "cassandra-communications-composer",
                    "secretKey": "password" 
                }
            ]
        })

        apps.push({
            "name": "eg",
            "jumpboxType": "cql",
            "properties": [
                {
                    "key": "CASSANDRA_HOSTS",
                    "type": "configMap",
                    "configMap": "esp-gateway-service-config",
                    "configMapKey": "CASSANDRA_HOSTS" 
                },
                {
                    "key": "CASSANDRA_USERNAME",
                    "type": "configMap",
                    "configMap": "esp-gateway-service-config",
                    "configMapKey": "CASSANDRA_USERNAME" 
                },
                {
                    "key": "CASSANDRA_KEYSPACE",
                    "type": "configMap",
                    "configMap": "esp-gateway-service-config",
                    "configMapKey": "CASSANDRA_KEYSPACE" 
                },
                {
                    "key": "CASSANDRA_PASSWORD",
                    "type": "secret",
                    "secret": "cassandra-esp-gateway",
                    "secretKey": "password" 
                }
            ]
        })

        apps.push({
            "name": "chm",
            "jumpboxType": "cql",
            "properties": [
                {
                    "key": "CASSANDRA_HOSTS",
                    "type": "configMap",
                    "configMap": "communications-history-manager-service-config",
                    "configMapKey": "CASSANDRA_HOSTS" 
                },
                {
                    "key": "CASSANDRA_USERNAME",
                    "type": "configMap",
                    "configMap": "communications-history-manager-service-config",
                    "configMapKey": "CASSANDRA_USERNAME" 
                },
                {
                    "key": "CASSANDRA_KEYSPACE",
                    "type": "configMap",
                    "configMap": "communications-history-manager-service-config",
                    "configMapKey": "CASSANDRA_KEYSPACE" 
                },
                {
                    "key": "CASSANDRA_PASSWORD",
                    "type": "secret",
                    "secret": "cassandra-communications-composer",
                    "secretKey": "password" 
                }
            ]
        })


        return apps;
    }

}

module.exports = Apps