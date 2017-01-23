function getQuestions() {
    return fetch('https://www.google.com/')
      .then((response) => response._bodyText)
      .then((responseText) => {
        console.log(responseText);
        return responseText;
      })
      .catch((error) => {
        console.error(error);
      });
}

module.exports = {
    getQuestions: getQuestions
};
