const config = require("./config");
const AWS = require("aws-sdk");

const docClient = new AWS.DynamoDB.DocumentClient({
    region: config.dynamo.region
});

let params = {
    TableName: config.dynamo.tableName,
    KeyConditionExpression: "#animalName = :name and #animalType = :type",
    ExpressionAttributeNames:{
        "#animalName": "animal_name",
        "#animalType": "type"
    },
    ExpressionAttributeValues: {
        ":name": "Frankie",
        ":type": "dog"
    }
};

docClient.query(params, function(err, data) {
    if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
        console.log("Query succeeded.");
        data.Items.forEach(function(item) {
            console.log(item);
        });
    }
});
