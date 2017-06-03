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
import Icon from 'react-native-vector-icons/FontAwesome';

var bookmark_manager = require('../bookmark_manager');

export default class QuestionDetailScreen extends Component {
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
      this.props.navigator.jumpBack();
  }

  render() {
    var bookmarkIcon = this.state.bookmarked
    ? (<Icon style={styles.bookmarkIcon} name="bookmark" size={45} color="#4286f4" />)
    : (<Icon style={styles.bookmarkIcon} name="bookmark-o" size={45} color="#00857C" />);

    var profilePicture;
    if (this.props.question.owner.profile_picture) {
        profilePicture = (
            <Image source={{uri: this.props.question.owner.profile_picture}} style={styles.photo} />
        );
    } else {
        profilePicture = (
            <Image source={require('./images/profile_placeholder.png')} style={styles.photo} />
        );
    }

    return (
     <View>
        <StatusBarBackground style={{backgroundColor: '#00857c'}}/>
            <View style={{flexDirection: 'row', backgroundColor: "#00857c",
                height: 40, padding: 0, justifyContent: 'space-around'}}>
                <TouchableOpacity style={{flexDirection: 'row', marginLeft: 0, marginTop: 2, marginRight: 10}}
                    onPress={this._returnToPreviousPage.bind(this)}>
                    <Image source={require('./images/back_button.png')} style={styles.backButton}/>
                    <Text style={{fontSize: 20, color: "white", textAlign: "center",
                        fontWeight: "bold", marginLeft: 3, marginTop: 2}}>back</Text>
                    <View style={{marginRight: 10}}></View>
                </TouchableOpacity>
                <Text style={{fontSize: 22, color: "white", textAlign: "center",
                    fontWeight: "bold", marginTop: 2}}> Answer </Text>
                <View style={{width: 90}}></View>
            </View>
        <Text style={{marginTop: 20, marginLeft: 15, fontSize: 35, fontWeight: 'bold'}}>
            {this.props.question.title}
        </Text>
        <Text style={styles.description}>
            {this.props.question.description}
        </Text>
        <View style={{flexDirection:"row", marginTop: 5, marginBottom: 5,
            justifyContent: "space-between"}}>
            <View style={{flexDirection:"row"}}>
                {profilePicture}
                <Text style={{fontSize:15, marginTop: 30}}>
                    {this.props.question.owner.first_name} {this.props.question.owner.last_name}
                </Text>
            </View>
          <TouchableOpacity style={{marginTop: 5, marginBottom: 5}} onPress={this.toggleBookmark.bind(this)}>
              {bookmarkIcon}
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

  description: {
      margin: 10
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

module.exports = QuestionDetailScreen
