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
        console.log('bookmarks', bookmarks);
        if (bookmarks) {
            callback(JSON.parse(bookmarks));
            return;
        }
        callback([]);
    });
}

function addBookmark(question) {
    console.log("This shit?");
    retrieveBookmarks(function(bookmarks) {
         if (bookmarks) {
             if (!containsQuestion(question.id, bookmarks)) {
                 SInfo.setItem('bookmarks', JSON.stringify(bookmarks.concat(question)), {
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

function isBookmarked(question_id, callback) {
    retrieveBookmarks(function(bookmarks) {
        callback(!containsQuestion(question_id, bookmarks));
    });
}

function clearBoomarks() {
    SInfo.deleteItem('bookmarks', {
        sharedPreferencesName: 'shared_preferences'
    });
    console.log('cleared bookmarks');
}

module.exports = {
    retrieveLocalBookmarks: retrieveBookmarks,
    addLocalBookmark: addBookmark,
    removeLocalBookmark: removeBookmark,
    clearLocalBoomarks: clearBoomarks,
    isBookmarked: isBookmarked,
}
