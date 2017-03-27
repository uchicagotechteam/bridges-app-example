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
  TouchableOpacity,
  Button,
  Alert,
  SegmentedControlIOS
} from 'react-native';
import ViewContainer from '../components/ViewContainer'
import StatusBarBackground from '../components/StatusBarBackground'

var bridges_client = require('../bridges_client');
var bookmark_manager = require('../bookmark_manager');

const response = []

export default class BookmarkScreen extends Component {
constructor(props) {
    super(props)
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2})
    this.state = {
      response: [],
      peopleDataSource: ds.cloneWithRows(response),
    }
  }

  _getQuestions() {
      bookmark_manager.retrieveLocalBookmarks(function(bookmarks) {
          this.setState({
              'response': bookmarks,
              peopleDataSource: this.state.peopleDataSource.cloneWithRows(bookmarks),
              refreshing: false,
          });
      }.bind(this));
  }

  _showTags(tags) {
      return tags.map(function(tag) {
          return tag.value
      }).join(", ")
  }

  componentDidMount() {
      this._interval = setInterval(() => {
          this._getQuestions();
      }, 200);
  }

  componentWillUnmount() {
      clearInterval(this._interval);
  }

  render() {
    var noBookmarksMsg;
    if (!this.state.response || !this.state.response.length) {
        noBookmarksMsg = (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 15, fontWeight: "bold"}}>
                    It seems like you have no bookmarks!
                </Text>
                <Text style={{fontSize: 15, fontWeight: "bold"}}>
                    You can bookmark questions by clicking on the bookmark icon
                    in the upper right hand corner of the question screen
                    (where you see the answers).
                </Text>
                <Text style={{fontSize: 15, fontWeight: "bold"}}>
                    Swipe down on this screen at any time
                    to refresh your bookmarks!
                </Text>
            </View>
        );
    } else {
        noBookmarksMsg = (<View></View>);
    }

    return (
     <ViewContainer>
        <StatusBarBackground style={{backgroundColor: '#00857c'}}/>
        <Text style={{height:40, textAlign: "center", backgroundColor: "#00857c",
            fontSize: 22, color: "white", fontWeight: "bold"}}> Bookmarks </Text>
        <ListView
          dataSource = {this.state.peopleDataSource}
          renderRow={(question) => {return this._renderPersonRow(question)}}
          automaticallyAdjustContentInsets={false}
          renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator}/>}
          enableEmptySections={true}
          />
        {noBookmarksMsg}
      </ViewContainer>
    );
  }

  _renderPersonRow(question) {
    return (
      <TouchableOpacity style={styles.personRow} onPress={(event) => this._navigateToPersonShow(question) }>
        <Text style={styles.questionTags}> Tags: {this._showTags(question.tags)}</Text>
        <Text style={styles.questionTitle}> {question.title}</Text>
        <View style={{flexDirection:"row", marginTop:5, marginBottom:5}}>
          <Image source={require('./face.jpg')} style={styles.photo} />
          <Text style={{fontSize:12, marginTop: 10}}> Rachel Mills </Text>
        </View>
      </TouchableOpacity>
    )
  }

  _navigateToPersonShow(question) {
    this.props.navigator.push({
      ident: "PersonShow",
      question: question,
  })
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
  }
});

module.exports = BookmarkScreen
