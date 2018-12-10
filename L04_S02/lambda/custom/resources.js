//
// Localized resources
//

const resources = {
  "en-US": {
    translation: {
      // ChangeName.js
      'CHANGE_CONFIRM': 'Welcome {0}. ',
      'CHANGE_PROMPT_CHANGE': 'You can change your name at any time by saying change name. <break time=\"200ms\"/> ',
      'CHANGE_REPROMPT': 'To begin, say Describe Felix',
      // base/Stop.js
      'EXIT_SKILL': 'Goodbye!',
    }
  },

  "en-AU": {
    translation: {
      // ChangeName.js
      'CHANGE_CONFIRM': 'Welcome {0}. ',
      'CHANGE_PROMPT_CHANGE': 'You can change your name at any time by saying change name. <break time=\"200ms\"/> ',
      'CHANGE_REPROMPT': 'To begin, say Describe Felix',
      // base/Stop.js
      'EXIT_SKILL': 'Cya!',
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
