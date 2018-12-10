/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require("ask-sdk-core");
const config = require("./config");

// Interceptors
const requestInterceptor = require("./interceptors/Request");
const saveResponseInterceptor = require("./interceptors/Response");

// Base Intent Handlers
const Launch = require("./intents/base/Launch");
const Help = require("./intents/base/Help");
const Stop = require("./intents/base/Stop");
const SessionEnd = require("./intents/base/SessionEnd");

// Custom Intents
const AnimalDetails = require("./intents/AnimalDetails");
const ChangeName = require("./intents/ChangeName");

// DynamoDB Persistence
const {
  DynamoDbPersistenceAdapter
} = require("ask-sdk-dynamodb-persistence-adapter");
const dbAdapter = new DynamoDbPersistenceAdapter({
  tableName: config.dbAdapter.tableName,
  partitionKeyName: config.dbAdapter.partitionKeyName,
  attributesName: config.dbAdapter.attributesName,
  createTable: true
});

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak("Sorry, I can't understand the command. Please say again.")
      .reprompt("Sorry, I can't understand the command. Please say again.")
      .getResponse();
  }
};

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(AnimalDetails, ChangeName, Launch, Help, Stop, SessionEnd)
  .addErrorHandlers(ErrorHandler)
  .addRequestInterceptors(requestInterceptor)
  .addResponseInterceptors(saveResponseInterceptor)
  .withPersistenceAdapter(dbAdapter)
  .lambda();
