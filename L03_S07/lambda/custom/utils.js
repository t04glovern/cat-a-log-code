//
// Utility functions
//

"use strict";

const config = require("./config");
const AWS = require("aws-sdk");

AWS.config.update({
  region: config.dynamo.region
});
const dynamodb = new AWS.DynamoDB.DocumentClient({
  region: config.dynamo.region
});

module.exports = {
  getAnimalByName: function(name, callback) {
    // Read from Dynamodb
    dynamodb.query(
      {
        TableName: config.dynamo.tableName,
        ExpressionAttributeNames: {
          "#animalName": "animal_name"
        },
        ExpressionAttributeValues: {
          ":name": name
        },
        KeyConditionExpression: "#animalName = :name"
      },
      (err, data) => {
        if (err || data === undefined) {
          console.log("GetItem threw an error:", JSON.stringify(err, null, 2));
          callback(undefined);
        } else {
          console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
          if (data.Count > 0) {
            callback(data.Items[0]);
          } else {
            callback(undefined);
          }
        }
      }
    );
  }
};
