let config = {}

config.dynamo = {}
config.dynamo.tableName = "cat-a-log-db"
config.dynamo.region = "us-east-1"
config.dynamo.partitionKey = "animal_name"
config.dynamo.sortKey = "type"

module.exports = config
