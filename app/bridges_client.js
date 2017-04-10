var settings = require('../settings.js');

import SInfo from 'react-native-sensitive-info';

function generateHeaders(callback, contentType) {
    return SInfo.getItem('token', {
        sharedPreferencesName: 'shared_preferences'
    }).then((token) => {
        if (token) {
            var headers = new Headers();
            headers.append('Authorization', 'Token ' + token);
            if (contentType) {
                headers.append('Accept', contentType);
                headers.append('Content-Type', contentType);
            }
            callback(headers);
        } else {
            callback(null);
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

function _sendData(endpoint, data, callback) {
    // posting data that doesn't need to be authenticated
    // calling _setData without a method, defaults to POST
    fetch(settings.API_ROOT + endpoint, {
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

function _setData(endpoint, data, callback, method) {
    generateHeaders((headers) => {
        fetch(settings.API_ROOT + endpoint, {
            'method': 'POST',
            'headers': headers,
            'body': JSON.stringify(data)
        })
        .then((response) => {
            callback(response);
        })
        .catch((error) => {
            console.error(error);
        });
    }, 'application/json');
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

function createNewUser(userData, callback) {
    // Creates a new user with the given data (as JSON)
    _sendData('users/', userData, callback);
}

function getBookmarks(callback) {
    // Gets bookmarks from the server for the current user
    _getData('bookmarks/', callback);
}

function setBookmarks(bookmarkIds, callback) {
    // Sets bookmarks on the server for the user
    console.log({bookmarks: bookmarkIds});
    return _setData('bookmarks/', {bookmarks: bookmarkIds}, callback);
}


module.exports = {
    login: login,
    search: search,
    getQuestions: getQuestions,
    getUserInfo: getUserInfo,
    createNewUser: createNewUser,
    getRemoteBookmarks: getBookmarks,
    setRemoteBookmarks: setBookmarks
};
