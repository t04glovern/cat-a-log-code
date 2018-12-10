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
        // No session attributes, lets get the persistent ones
        attributesManager
          .getPersistentAttributes()
          .then(attributes => {
            // If no persistent attributes therefore it's a new user
            attributes.temp = {};
            attributes.temp.newSession = true;
            attributes.sessions = attributes.sessions + 1 || 1;
            attributes.userLocale = event.request.locale;

            // Since there were no session attributes
            // set the temp attributes
            attributesManager.setSessionAttributes(attributes);
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      } else {
        resolve();
      }
    });
  }
};
