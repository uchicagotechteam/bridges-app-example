function getQuestions() {
    return fetch('http://10.150.39.215:8000/questions/')
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
