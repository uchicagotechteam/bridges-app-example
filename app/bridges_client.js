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

function login(username, password, callback) {
    var credentials = {
        'username': username,
        'password': password
    };

    // Try to log in with the current credentials
    fetch(settings.API_ROOT + 'api-token-auth/', {
        'method': 'POST',
        'headers': {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        'body': JSON.stringify(credentials)
    })
    .then((response) => {
        callback(response);
    })
    .catch((error) => {
        console.error(error);
    });
}

function _setData(endpoint, data, callback, method) {
    // calling _setData without a method, defaults to POST
    fetch(settings.API_ROOT + 'users/', {
        'method': 'POST',
        'headers': {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        'body': JSON.stringify(data)
    })
    .then((response) => {
        callback(response);
    })
    .catch((error) => {
        console.error(error);
    });
}

function createNewUser(userData, callback) {
    _setData('users/', userData, callback);
}

function setRemoteBookmarks(bookmarkIds) {
    return _setData('bookmarks/', bookmarkIds, callback);
}

function _getData(endpoint, callback, method) {
    // calling _getData without a method, defaults to GET
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
    _getData('questions/?search=' + searchTerm, callback);
}

function getUserInfo(callback) {
    // Get the information for a single user
    _getData('user-info/', callback);
}

function getRemoteBookmarks(callback) {
    _getData('bookmarks/'. callback);
}


module.exports = {
    login: login,
    getQuestions: getQuestions,
    getUserInfo: getUserInfo,
    createNewUser: createNewUser,
    search: search
};
