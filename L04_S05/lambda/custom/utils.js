//
// Utility functions
//

"use strict";

const config = require("./config");
const AWS = require("aws-sdk");
const https = require("https");
const moment = require("moment-timezone");

AWS.config.update({
  region: config.dynamo.region
});
const dynamodb = new AWS.DynamoDB.DocumentClient({
  region: config.dynamo.region
});

module.exports = {
  getGreeting: function(handlerInput, callback) {
    const event = handlerInput.requestEnvelope;
    const res = require("./resources")(event.request.locale);

    getUserTimezone(event, timezone => {
      if (timezone) {
        const hour = moment.tz(Date.now(), timezone).format("H");
        let greeting;
        if (hour > 5 && hour < 12) {
          greeting = res.strings.GOOD_MORNING;
        } else if (hour >= 12 && hour < 18) {
          greeting = res.strings.GOOD_AFTERNOON;
        } else {
          greeting = res.strings.GOOD_EVENING;
        }
        callback(greeting);
      } else {
        callback("");
      }
    });
  },

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

function getUserTimezone(event, callback) {
  if (event.context.System.apiAccessToken) {
    // Invoke the entitlement API to load timezone
    const options = {
      host: "api.amazonalexa.com",
      path:
        "/v2/devices/" +
        event.context.System.device.deviceId +
        "/settings/System.timeZone",
      method: "GET",
      timeout: 1000,
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": event.request.locale,
        Authorization: "bearer " + event.context.System.apiAccessToken
      }
    };

    const req = https.get(options, res => {
      let returnData = "";
      res.setEncoding("utf8");
      if (res.statusCode != 200) {
        console.log("deviceTimezone returned status code " + res.statusCode);
        callback();
      } else {
        res.on("data", chunk => {
          returnData += chunk;
        });

        res.on("end", () => {
          // Strip quotes
          const timezone = returnData.replace(/['"]+/g, "");
          callback(moment.tz.zone(timezone) ? timezone : undefined);
        });
      }
    });

    req.on("error", err => {
      console.log("Error calling user settings API: " + err.message);
      callback();
    });
  } else {
    // No API token - no user timezone
    callback();
  }
}
