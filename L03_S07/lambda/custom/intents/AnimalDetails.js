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
    // Event houses our slot values
    const event = handlerInput.requestEnvelope;

    // Resolve the animal name
    const name = getAnimalName(event);

    const speechText = "Animal Details for " + name;

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(name, speechText)
      .getResponse();
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
