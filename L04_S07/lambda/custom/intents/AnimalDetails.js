//
// Handles getting details on a particular animal from the database
//

"use strict";

const utils = require("../utils");

module.exports = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      handlerInput.requestEnvelope.request.intent.name === "AnimalDetailsIntent"
    );
  },
  handle(handlerInput) {
    return new Promise((resolve, reject) => {
      const event = handlerInput.requestEnvelope;
      const res = require("../resources")(event.request.locale);
      const attributes = handlerInput.attributesManager.getSessionAttributes();
      const name = getAnimalName(event);

      let speechText;
      let reprompt;

      utils.getAnimalByName(name, animal => {
        if (animal) {
          speechText = animal.description;
          // Save a copy of the last search name
          attributes.latestSearch = name;
        } else {
          speechText = res.strings.ANIMAL_NOT_FOUND.replace("{0}", name);
        }

        reprompt = res.strings.ANIMAL_MORE_INFO.replace("{0}", name);

        const response = handlerInput.responseBuilder
          .speak(speechText)
          .reprompt(reprompt)
          .withSimpleCard(name, speechText)
          .getResponse();
        resolve(response);
        return;
      });
    });
  }
};

function getAnimalName(event) {
  let animalName;
  const animalNameSlot =
    event.request.intent &&
    event.request.intent.slots &&
    event.request.intent.slots.AnimalName;

  if (animalNameSlot && animalNameSlot.value) {
    animalName = animalNameSlot.value;
  }
  return animalName;
}
