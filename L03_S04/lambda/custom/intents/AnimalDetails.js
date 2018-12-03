//
// Handles getting details on a particular animal from the database
//

"use strict";

module.exports = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      handlerInput.requestEnvelope.request.intent.name === "AnimalDetailsIntent"
    );
  },
  handle(handlerInput) {
    const speechText = "Animal Details!";

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard("Animal Details", speechText)
      .getResponse();
  }
};
