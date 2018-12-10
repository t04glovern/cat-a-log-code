let config = require("./config");
let AWS = require('aws-sdk');

AWS.config.update({
    region: config.dynamo.region
});

var dynamodb = new AWS.DynamoDB();

var params = {
    TableName: config.dynamo.tableName,
    KeySchema: [{
            AttributeName: config.dynamo.partitionKey,
            KeyType: 'HASH'
        },
        {
            AttributeName: config.dynamo.sortKey,
            KeyType: 'RANGE'
        }
    ],
    AttributeDefinitions: [{
            AttributeName: config.dynamo.partitionKey,
            AttributeType: 'S'
        },
        {
            AttributeName: config.dynamo.sortKey,
            AttributeType: 'S'
        }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
    }
};

dynamodb.createTable(params, function (err, data) {
    if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});
