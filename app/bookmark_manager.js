import SInfo from 'react-native-sensitive-info';

function containsQuestion(question_id, bookmarks) {
    for (var i = 0; i < bookmarks.length; i++) {
        if (question_id == bookmarks[i].id) {
            return true;
        }
    }
    return false;
}

function retrieveBookmarks(callback) {
    return SInfo.getItem('bookmarks', {
        sharedPreferencesName: 'shared_preferences'
    }).then((bookmarks) => {
        if (bookmarks) {
            callback(JSON.parse(bookmarks));
            return;
        }
        callback([]);
    });
}

function addBookmark(question) {
    retrieveBookmarks(function(bookmarks) {
         if (bookmarks) {
             if (!containsQuestion(question.id, bookmarks)) {
                 // Adds a question to the front of the bookmarks list
                 bookmarks.unshift(question)
                 SInfo.setItem('bookmarks', JSON.stringify(bookmarks), {
                     sharedPreferencesName: 'shared_preferences'
                 });
             }
         } else {
             // Create a bookmarks list with a single question
             SInfo.setItem('bookmarks', JSON.stringify([question]), {
                  sharedPreferencesName: 'shared_preferences'
             });
         }
     });
}

function writeSetOfBookmarks(bookmarks, callback) {
    SInfo.setItem('bookmarks', JSON.stringify(bookmarks), {
        sharedPreferencesName: 'shared_preferences'
    });
    if (callback) {
        callback();
    }
}

function removeBookmark(question_id) {
    retrieveBookmarks(function(bookmarks) {
        if (bookmarks) {
            var filteredBookmarks = bookmarks.filter(function(bookmark){
                return bookmark.id != question_id;
            });

            SInfo.setItem('bookmarks', JSON.stringify(filteredBookmarks), {
                 sharedPreferencesName: 'shared_preferences'
            });
        }
    });
}

function isBookmarked(questionId, callback) {
    retrieveBookmarks(function(bookmarks) {
        callback(containsQuestion(questionId, bookmarks));
    });
}

function clearBoomarks() {
    SInfo.deleteItem('bookmarks', {
        sharedPreferencesName: 'shared_preferences'
    });
}

module.exports = {
    retrieveLocalBookmarks: retrieveBookmarks,
    addLocalBookmark: addBookmark,
    removeLocalBookmark: removeBookmark,
    clearLocalBoomarks: clearBoomarks,
    isBookmarked: isBookmarked,
    writeSetOfBookmarks: writeSetOfBookmarks,
}
