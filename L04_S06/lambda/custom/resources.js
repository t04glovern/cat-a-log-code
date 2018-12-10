//
// Localized resources
//

const resources = {
  "en-US": {
    translation: {
      // intents/ChangeName.js
      'CHANGE_CONFIRM': 'Welcome {0}. ',
      'CHANGE_PROMPT_CHANGE': 'You can change your name at any time by saying change name. <break time=\"200ms\"/> ',
      'CHANGE_REPROMPT': 'To begin, say Describe Felix',
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
      // intents/ChangeName.js
      'CHANGE_CONFIRM': 'Welcome {0}. ',
      'CHANGE_PROMPT_CHANGE': 'You can change your name at any time by saying change name. <break time=\"200ms\"/> ',
      'CHANGE_REPROMPT': 'To begin, say Describe Felix',
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
