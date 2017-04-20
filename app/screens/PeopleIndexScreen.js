/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  Image,
  TextInput,
  TouchableOpacity,
  RefreshControl,
  Button,
  Alert,
  Platform,
} from 'react-native';
import ViewContainer from '../components/ViewContainer'
import StatusBarBackground from '../components/StatusBarBackground'

var bridges_client = require('../bridges_client');
var bookmark_manager = require('../bookmark_manager');
var SearchBar = require('react-native-search-bar');

const response = [];

export default class PeopleIndexScreen extends Component {
constructor(props) {
    super(props)
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2})
    this.state = {
      response: [],
      peopleDataSource: ds.cloneWithRows(response),
      searchTerm: null,
      refreshing: false,
      onIOS: Platform.OS === 'ios',
  };
 }

  componentDidMount() {
      this._getQuestions();
      this._syncBookmarksWithServer();
  }

  _syncBookmarksWithServer() {
      bridges_client.getRemoteBookmarks(function(response) {
          var bookmarkedQuestions = JSON.parse(response.bookmarks);
          bookmark_manager.writeSetOfBookmarks(bookmarkedQuestions);
      }.bind(this));
  }

  _onRefresh() {
      this.setState({refreshing: true});
      this._getQuestions();
  }

  _getQuestions() {
      bridges_client.getQuestions(function(response) {
          this.setState({
              'response': response.results,
              peopleDataSource: this.state.peopleDataSource.cloneWithRows(response.results),
              refreshing: false,
          });
      }.bind(this));
  }

  _searchQuestions() {
      bridges_client.search(this.state.searchTerm, function(searchResults) {
          this.setState({
              'response': searchResults.results,
              peopleDataSource: this.state.peopleDataSource.cloneWithRows(searchResults.results)
          });
      }.bind(this));
  }

  _showTags(tags) {
      return tags.map(function(tag) {
          return tag.value
      }).join(", ")
  }

  render() {
    var question_display;
    var searchInput;

    // Get the native iOS search bar on iOS and the android version on android
    if (!this.state.onIOS) {
        searchInput = (
            <TextInput
              placeholder='Search'
              onChangeText={(text) => {
                  this.setState({searchTerm: text});
                  if (text.length > 0) {
                      this._searchQuestions();
                  } else {
                      this._getQuestions();
                  }
              }}
            />
        );
    } else {
        searchInput = (
            <SearchBar
              placeholder='Search'
              onChangeText={(text) => {
                  this.setState({searchTerm: text});
                  if (text.length > 2) {
                      this._searchQuestions();
                  } else {
                      this._getQuestions();
                  }
              }}
            />
        );
    }

    if (this.state.searchTerm && this.state.response.length === 0) {
        questionDisplay = (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 15, fontWeight: "bold"}}>
                    There are no results matching "{this.state.searchTerm}"
                </Text>
            </View>
        );
    } else {
        questionDisplay = (
          <ListView
          dataSource = {this.state.peopleDataSource}
          renderRow={(question) => {return this._renderPersonRow(question)}}
          automaticallyAdjustContentInsets={false}
          refreshControl={
              <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this._onRefresh.bind(this)} />
          }
          renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator}/>}
          enableEmptySections={true}
          />
        );
    }

    return (
     <ViewContainer>
        <StatusBarBackground style={{backgroundColor: '#00857c'}}/>
        <Text style={{height:40, textAlign: "center", backgroundColor: "#00857c",
            fontSize: 22, color: "white", fontWeight: "bold"}}> Question Feed </Text>
        {searchInput}
        {questionDisplay}
      </ViewContainer>
    );
  }

  _renderPersonRow(question) {
      var profilePicture;
      if (question.owner.profile_picture) {
          profilePicture = (
              <Image source={{uri: question.owner.profile_picture}} style={styles.photo} />
          );
      } else {
          profilePicture = (
              <Image source={require('./face.jpg')} style={styles.photo} />
          );
      }


    return (
      <TouchableOpacity style={styles.personRow} onPress={(event) => this._navigateToPersonShow(question) }>
        <Text style={styles.questionTags}> Tags: {this._showTags(question.tags)}</Text>
        <Text style={styles.questionTitle}> {question.title}</Text>
        <View style={{flexDirection:"row", marginTop:5, marginBottom:5}}>
         {profilePicture}
          <Text style={{fontSize:12, marginTop: 10}}>
              {question.owner.first_name} {question.owner.last_name}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }

  _navigateToPersonShow(question) {
      bookmark_manager.isBookmarked(question.id, function(bookmarkedStatus) {
          this.props.navigator.push({
              ident: "PersonShow",
              question: question,
              bookmarked: bookmarkedStatus,
          });
      }.bind(this));
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  personRow: {
    flexDirection: "column",
    alignSelf: 'stretch',
    marginLeft: 7,
    marginRight: 7
  },
  personName: {
    marginTop: 15,
    marginLeft: 10,
    fontSize: 20,
    fontWeight: "bold"
  },
  photo: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  separator: {
    flex: 1,
    height: 4,
    backgroundColor: 'lightgray',
  },
  questionTitle: {
    fontSize: 20,
    fontWeight: "bold"
  },
   questionDesc: {
    fontSize: 15
  },
  questionTags: {
    marginTop: 2,
    marginBottom: 2,
    fontSize: 12,
    color: "grey"
  },
  input: {
      padding: 0,
      height: 40,
  }
});

module.exports = PeopleIndexScreen
