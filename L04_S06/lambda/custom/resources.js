//
// Localized resources
//

const resources = {
  "en-US": {
    translation: {
      // intents/AnimalDetails.js
      'ANIMAL_NOT_FOUND': 'No Animal was found under the name {0}.',
      'ANIMAL_MORE_INFO': 'Want to check an animals status? Say: Whats the backstory of {0}',
      // intents/ChangeName.js
      'CHANGE_CONFIRM': 'Welcome {0}. ',
      'CHANGE_PROMPT_CHANGE': 'You can change your name at any time by saying change name. <break time=\"200ms\"/> ',
      'CHANGE_REPROMPT': 'To begin, say Describe Felix',
      // intents/base/Help.js
      'HELP_FALLBACK': 'I wasn\'t able to understand your previous command.',
      'HELP_REPROMPT': 'Want information about an animal? say Describe Felix',
      // intents/base/Launch.js
      'LAUNCH_WELCOME': '{0} Welcome to the Catalog database. ',
      'LAUNCH_REPROMPT': 'Please say your name to get started',
      // intents/base/Stop.js
      'EXIT_SKILL': 'Goodbye!',
      // utils.js
      'GOOD_MORNING': 'Good morning <break time=\"200ms\"/> ',
      'GOOD_AFTERNOON': 'Good afternoon <break time=\"200ms\"/> ',
      'GOOD_EVENING': 'Good evening <break time=\"200ms\"/> ',
    }
  },

  "en-AU": {
    translation: {
      // intents/AnimalDetails.js
      'ANIMAL_NOT_FOUND': 'No Animal was found under the name {0}.',
      'ANIMAL_MORE_INFO': 'Want to check an animals status? Say: Whats the backstory of {0}',
      // intents/ChangeName.js
      'CHANGE_CONFIRM': 'Welcome {0}. ',
      'CHANGE_PROMPT_CHANGE': 'You can change your name at any time by saying change name. <break time=\"200ms\"/> ',
      'CHANGE_REPROMPT': 'To begin, say Describe Felix',
      // intents/base/Help.js
      'HELP_FALLBACK': 'I wasn\'t able to understand your previous command.',
      'HELP_REPROMPT': 'Want information about an animal? say Describe Felix',
      // intents/base/Launch.js
      'LAUNCH_WELCOME': '{0} Welcome to the Catalog database. ',
      'LAUNCH_REPROMPT': 'Please say your name to get started',
      // intents/base/Stop.js
      'EXIT_SKILL': 'Cya!',
      // utils.js
      'GOOD_MORNING': 'Good morning <break time=\"200ms\"/> ',
      'GOOD_AFTERNOON': 'Good afternoon <break time=\"200ms\"/> ',
      'GOOD_EVENING': 'Good evening <break time=\"200ms\"/> ',
    }
  }
};

const utils = locale => {
  let translation;
  if (resources[locale]) {
    translation = resources[locale].translation;
  } else {
    // Default to en-US
    translation = resources["en-US"].translation;
  }

  return {
    strings: translation
  };
};

module.exports = utils;
