const config = {};

config.dynamo = {};
config.dynamo.tableName = 'cat-a-log-db';
config.dynamo.region = 'us-east-1';
config.dynamo.apiVersion = '2012-08-10';

config.dbAdapter = {};
config.dbAdapter.tableName = 'cat-a-log-skill';
config.dbAdapter.partitionKeyName = 'userId';
config.dbAdapter.attributesName = 'mapAttr';

module.exports = config;
