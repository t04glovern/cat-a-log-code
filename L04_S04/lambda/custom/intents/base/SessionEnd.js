//
// Saves attributes at the end of the session
//

"use strict";

module.exports = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === "SessionEndedRequest";
  },
  handle(handlerInput) {
    console.log(
      `Session ended with reason: ${
        handlerInput.requestEnvelope.request.reason
      }. saving attributes`
    );

    const attributes = handlerInput.attributesManager.getSessionAttributes();

    // Clear and persist attributes
    attributes.temp = undefined;
    handlerInput.attributesManager.setPersistentAttributes(attributes);
    handlerInput.attributesManager.savePersistentAttributes();

    return handlerInput.responseBuilder.getResponse();
  }
};
