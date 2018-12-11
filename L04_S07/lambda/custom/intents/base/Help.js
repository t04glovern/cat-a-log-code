//
// Handles help menu of the skill
//

"use strict";

module.exports = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return (
      request.type === "IntentRequest" &&
      (request.intent.name === "AMAZON.HelpIntent" ||
        request.intent.name === "AMAZON.FallbackIntent")
    );
  },
  handle(handlerInput) {
    const event = handlerInput.requestEnvelope;
    const speech = "";

    // If this was fallback intent, we didn't understand
    if (event.request.intent.name === "AMAZON.FallbackIntent") {
      speech += res.getString("HELP_FALLBACK");
    }

    const reprompt = res.getString("HELP_REPROMPT");
    speech += reprompt;
    return handlerInput.responseBuilder
      .speak(speech)
      .reprompt(reprompt)
      .getResponse();
  }
};
