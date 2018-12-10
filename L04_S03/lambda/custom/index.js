/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require("ask-sdk-core");

// Base Intent Handlers
const Launch = require("./intents/base/Launch");
const Help = require("./intents/base/Help");
const Stop = require("./intents/base/Stop");
const SessionEnd = require("./intents/base/SessionEnd");

// Custom Intents
const AnimalDetails = require('./intents/AnimalDetails');
const ChangeName = require('./intents/ChangeName');

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
  .addRequestHandlers(
    AnimalDetails,
    ChangeName,
    Launch,
    Help,
    Stop,
    SessionEnd
    )
  .addErrorHandlers(ErrorHandler)
  .lambda();
