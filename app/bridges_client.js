var settings = require('../settings.js');
const base64 = require('base-64');

import SInfo from 'react-native-sensitive-info';

function generateHeaders(callback) {
    return SInfo.getItem('email', {}).then((email) => {
        SInfo.getItem('password', {}).then((password) => {
            if (email && password) {
                var headers = new Headers();
                headers.append('Authorization', 'Basic ' + base64.encode(email + ':' + password));
                callback(headers);
            } else {
                return null;
            }
        });
    });
}

function login(username, password) {
    var headers = new Headers();
    headers.append('Authorization', 'Basic ' + base64.encode(username + ':' + password));

    // Try to log in with the current credentials
    return fetch(settings.API_ROOT + 'questions/', {
        method: 'get',
        headers: headers
    })
    .then((response) => {
        return response;
    })
    .catch((error) => {
        console.error(error);
    });
}

function getQuestions(callback) {
    // Returns a list of ten questions
    generateHeaders((headers) => {
        fetch(settings.API_ROOT + 'questions/', {
            'headers': headers
        })
        .then((response) => response.json())
        .then((responseJson) => {
            callback(responseJson.results);
        })
        .catch((error) => {
            console.error(error);
        });
    });
}

module.exports = {
    login: login,
    getQuestions: getQuestions
};
