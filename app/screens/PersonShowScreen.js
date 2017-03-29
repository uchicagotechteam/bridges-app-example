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
  TouchableOpacity,
  Image
} from 'react-native';
import ViewContainer from '../components/ViewContainer'
import StatusBarBackground from '../components/StatusBarBackground'
var bookmark_manager = require('../bookmark_manager');

export default class PersonShowScreen extends Component {
  constructor(props) {
      super(props)
      this.state = {
          bookmarked: this.props.bookmarked,
      }
  }

  toggleBookmark() {
      bookmark_manager.isBookmarked(this.props.question.id, function(bookmarked) {
          if (bookmarked) {
              bookmark_manager.removeLocalBookmark(this.props.question.id);
          } else {
              bookmark_manager.addLocalBookmark(this.props.question);
          }
      }.bind(this));
  }

  componentDidMount() {
      this._interval = setInterval(() => {
          bookmark_manager.isBookmarked(this.props.question.id, function(bookmarked) {
             this.setState({
                bookmarked: bookmarked
             });
         }.bind(this));
      }, 200);
  }

  componentWillUnmount() {
      clearInterval(this._interval);
  }

  _returnToPreviousPage(question) {
      this.props.navigator.pop();
  }

  render() {
    var bookmarkImage = this.state.bookmarked
    ? require('./images/bookmark_active.jpg')
    : require('./images/bookmark_inactive.jpg');

    return (
     <View>
        <StatusBarBackground style={{backgroundColor: '#00857c'}}/>
        <View style={{flexDirection: 'row', backgroundColor: "#00857c",
            height: 40, justifyContent: 'center'}}>
            <TouchableOpacity onPress={this._returnToPreviousPage.bind(this)}>
                <Image source={require('./images/back_button.png')} style={styles.backButton}/>
            </TouchableOpacity>
            <Text style={{fontSize: 22, color: "white", textAlign: "center",
                fontWeight: "bold"}}> Answer </Text>
        </View>
        <Text style={{marginTop: 20, marginLeft: 15, fontSize: 35, fontWeight: 'bold'}}>
            {this.props.question.title}
        </Text>
        <View style={{flexDirection:"row", marginTop: 5, marginBottom: 5,
            justifyContent: "space-between"}}>
            <View style={{flexDirection:"row"}}>
                <Image source={require('./face.jpg')} style={styles.photo} />
                <Text style={{fontSize:15, marginTop: 30}}> Rachel Mills </Text>
            </View>
          <TouchableOpacity style={{marginTop: 5, marginBottom: 5}} onPress={this.toggleBookmark.bind(this)}>
              <Image source={bookmarkImage} style={styles.bookmarkIcon} />
          </TouchableOpacity>
        </View>
        <Text style={{marginTop: 20, marginLeft: 15, fontSize: 20}}>
            {this.props.question.answer}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  personName: {
    fontWeight: "bold"
  },
  backButton: {
      height: 20,
      width: 20,
      marginTop: 5,
      marginLeft: 5,
  },
  photo: {
    height: 50,
    width: 50,
    marginTop: 15,
    marginLeft: 15,
    borderRadius: 25,
  },
  bookmarkIcon: {
      height: 50,
      width: 50,
      marginTop: 10,
      marginRight: 20,
  }
});

module.exports = PersonShowScreen
