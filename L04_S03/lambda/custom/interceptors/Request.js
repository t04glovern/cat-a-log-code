//
// requestInterceptor to initalize the skill attributes
//

"use strict";

module.exports = {
  process(handlerInput) {
    return new Promise((resolve, reject) => {
      const attributesManager = handlerInput.attributesManager;
      const sessionAttributes = attributesManager.getSessionAttributes();
      const event = handlerInput.requestEnvelope;

      if (Object.keys(sessionAttributes).length === 0) {
        sessionAttributes.temp = {};
        sessionAttributes.temp.newSession = true;
        sessionAttributes.sessions = sessionAttributes.sessions + 1 || 1;
        sessionAttributes.userLocale = event.request.locale;

        // Since there were no session attributes
        // set the temp attributes
        attributesManager.setSessionAttributes(sessionAttributes);
        resolve();
      } else {
        resolve();
      }
    });
  }
};
