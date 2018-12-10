//
// saveResponseInterceptor handles saving interesting
// attributes once the request has been fulfilled
//

"use strict";

const SessionEnd = require('../intents/base/SessionEnd');

module.exports = {
  process(handlerInput) {
    return new Promise((resolve, reject) => {
      const response = handlerInput.responseBuilder.getResponse();
      const attributes = handlerInput.attributesManager.getSessionAttributes();

      if (response) {
        if (attributes.temp && attributes.temp.newSession) {
          attributes.temp.newSession = undefined;
        }
        if (response.shouldEndSession) {
          // We are meant to end the session
          SessionEnd.handle(handlerInput);
        } else if (attributes.temp) {
          // Save the response and reprompt
          if (response.outputSpeech && response.outputSpeech.ssml) {
            attributes.temp.lastResponse = response.outputSpeech.ssml;
          }
          if (
            response.reprompt &&
            response.reprompt.outputSpeech &&
            response.reprompt.outputSpeech.ssml
          ) {
            attributes.temp.lastReprompt = response.reprompt.outputSpeech.ssml;
          }
        }
      }
      resolve();
    });
  }
};
