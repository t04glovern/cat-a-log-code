//
// Records the name of the user
//

"use strict";

module.exports = {
  canHandle: function(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return (
      request.type === "IntentRequest" &&
      request.intent.name === "ChangeNameIntent"
    );
  },
  handle: function(handlerInput) {
    const event = handlerInput.requestEnvelope;
    // Grab a reference to the session attributes
    const attributes = handlerInput.attributesManager.getSessionAttributes();
    const res = require("../resources")(event.request.locale);
    let speech;

    if (
      !event.request.intent ||
      !event.request.intent.slots ||
      !event.request.intent.slots.Name ||
      !event.request.intent.slots.Name.value
    ) {
      // Delegate this
      return handlerInput
        .addDelegateDirective(event.request.intent)
        .getResponse();
    }

    // Repeat name, and alert they can change it
    attributes.name = event.request.intent.slots.Name.value;
    speech = res.strings.CHANGE_CONFIRM.replace("{0}", attributes.name);
    if (!attributes.temp.namePrompt) {
      speech += res.strings.CHANGE_PROMPT_CHANGE;
      attributes.temp.namePrompt = true;
    }

    const reprompt = res.strings.CHANGE_REPROMPT;
    speech += reprompt;

    return handlerInput.responseBuilder
      .speak(speech)
      .reprompt(reprompt)
      .getResponse();
  }
};
