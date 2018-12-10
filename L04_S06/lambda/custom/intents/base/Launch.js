//
// Handles opening the skill
//

"use strict";

const utils = require("../../utils");

module.exports = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.session.new ||
      handlerInput.requestEnvelope.request.type === "LaunchRequest"
    );
  },
  handle(handlerInput) {
    const event = handlerInput.requestEnvelope;
    const res = require("../../resources")(event.request.locale);
    let response;

    return new Promise((resolve, reject) => {
      utils.getGreeting(handlerInput, greeting => {
        let speech = res.strings.LAUNCH_WELCOME.replace("{0}", greeting);
        const reprompt = res.strings.LAUNCH_REPROMPT;
        speech += reprompt;

        response = handlerInput.responseBuilder
          .speak(speech)
          .reprompt(reprompt)
          .getResponse();
        resolve(response);
      });
    });
  }
};
