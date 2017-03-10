var settings = require('../settings.js');

import SInfo from 'react-native-sensitive-info';

function generateHeaders(callback) {
    return SInfo.getItem('token', {
        sharedPreferencesName: 'shared_preferences'
    }).then((token) => {
        if (token) {
            var headers = new Headers();
            headers.append('Authorization', 'Token ' + token);
            callback(headers);
        } else {
            return null;
        }
    });
}

function login(username, password) {
    var credentials = {
        'username': username,
        'password': password
    };

    // Try to log in with the current credentials
    return fetch(settings.API_ROOT + 'api-token-auth/', {
        'method': 'POST',
        'headers': {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        'body': JSON.stringify(credentials)
    })
    .then((response) => {
        return response;
    })
    .catch((error) => {
        console.error(error);
    });
}

function _getData(endpoint, callback, method) {
    // calling getData without a method, defaults to get
    generateHeaders((headers) => {
        fetch(settings.API_ROOT + endpoint, {
            'headers': headers
        })
        .then((response) => {
            return response.json();
        })
        .then((responseJson) => {
            callback(responseJson.results);
        })
        .catch((error) => {
            console.error(error);
        });
    });
}

function getQuestions(callback) {
    // Returns a list of questions
    _getData('questions/', callback);
}

function search(searchTerm, callback) {
    // Returns a list of questions matching the query
    _getData('questions/?search=' + searchTerm, callback)
}

module.exports = {
    login: login,
    getQuestions: getQuestions
};
