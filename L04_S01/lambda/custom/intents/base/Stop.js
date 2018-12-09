//
// Handles stop, which will exit the skill
//

"use strict";

module.exports = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      (handlerInput.requestEnvelope.request.intent.name ===
        "AMAZON.CancelIntent" ||
        handlerInput.requestEnvelope.request.intent.name ===
          "AMAZON.StopIntent")
    );
  },
  handle(handlerInput) {
    // Get a reference to the request event
    const event = handlerInput.requestEnvelope;
    // Load an instance of resources based on our locale
    const res = require("../../resources")(event.request.locale);
    // Load in our response based on our locale
    const speechText = res.strings.EXIT_SKILL;

    return handlerInput.responseBuilder
      .speak(speechText)
      .withShouldEndSession(true)
      .getResponse();
  }
};
