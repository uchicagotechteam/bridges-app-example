function getQuestions() {
    return fetch('http://localhost:8000/questions/')
      .then((response) => response.json())
      .then((responseJson) => {
    //    console.log(responseJson.results[0]);
        return responseJson.results;
      })
      .catch((error) => {
        console.error(error);
      });
}

module.exports = {
    getQuestions: getQuestions
};
