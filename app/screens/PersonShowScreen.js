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
  }

  addQuestionToBookmarks() {
      bookmark_manager.addLocalBookmark(this.props.question);
  }

  render() {
    return (
     <View>
        <StatusBarBackground style={{backgroundColor: '#00857c'}}/>
        <Text style={{height:40, textAlign: "center", backgroundColor: "#00857c",fontSize: 22, color: "white", fontWeight: "bold"}}>Answer</Text>
        <Text style={{marginTop: 20, marginLeft: 15, fontSize: 35, fontWeight: 'bold'}}>{this.props.question.title}</Text>
        <View style={{flexDirection:"row", marginTop:5, marginBottom:5}}>
          <Image source={require('./face.jpg')} style={styles.photo} />
          <Text style={{fontSize:15, marginTop: 30}}> Rachel Mills </Text>
          <TouchableOpacity onPress={() => this.addQuestionToBookmarks()}>
              <Image source={require('./face.jpg')} style={styles.rightPhoto} />
          </TouchableOpacity>
        </View>
        <Text style={{marginTop: 20, marginLeft: 15, fontSize: 20}}>{this.props.question.answer}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  personName: {
    fontWeight: "bold"
  },
  photo: {
    height: 50,
    width: 50,
    marginTop: 15,
    marginLeft: 15,
    borderRadius: 25,
  },
  rightPhoto: {
      height: 50,
      width: 50,
      marginRight: 30,
  }
});

module.exports = PersonShowScreen
