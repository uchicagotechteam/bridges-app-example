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
            callback(null);
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
        alert(error);
    });
}

function createNewUser(userData, callback) {
    return fetch(settings.API_ROOT + 'users/', {
        'method': 'POST',
        'headers': {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        'body': JSON.stringify(userData)
    })
    .then((response) => {
        callback(response);
    })
    .catch((error) => {
        alert(error);
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
            callback(responseJson);
        })
        .catch((error) => {
            alert(error);
        });
    });
}

function getQuestions(callback) {
    // Returns a list of questions
    _getData('questions/', callback);
}

function search(searchTerm, callback) {
    // Returns a list of questions matching the query
    _getData('questions/?search=' + searchTerm, callback);
}

function getUserInfo(callback) {
    _getData('user-info/', callback);
}

module.exports = {
    login: login,
    getQuestions: getQuestions,
    getUserInfo: getUserInfo,
    createNewUser: createNewUser,
    search: search
};
