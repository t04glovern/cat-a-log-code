//
// Localized resources
//

const resources = {
  "en-US": {
    translation: {
      // Stop.js
      'EXIT_SKILL': 'Goodbye!',
    }
  },

  "en-AU": {
    translation: {
      // Stop.js
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
