var settings = require('./settings.js');

function getQuestions() {
    // Returns a list of ten questions (eventually based on user profile)
    return fetch(settings.API_ROOT + 'questions/')
      .then((response) => response.json())
      .then((responseJson) => {
        return responseJson.results;
      })
      .catch((error) => {
          console.error(error);
      });
}

module.exports = {
    getQuestions: getQuestions
};
