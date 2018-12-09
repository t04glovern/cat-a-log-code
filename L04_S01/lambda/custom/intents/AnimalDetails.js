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
      // Event houses our slot values
      const event = handlerInput.requestEnvelope;

      // Resolve the animal name
      const name = getAnimalName(event);

      let speechText;
      let reprompt;

      utils.getAnimalByName(name, animal => {
        if (animal) {
          speechText = animal.description;
        } else {
          speechText = "No Animal was found under the name " + name;
        }

        reprompt =
          "Want to check an animals status? Say: Whats the backstory of " +
          name;

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
