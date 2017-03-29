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

export default class PersonShowScreen extends Component {
  constructor(props) {
      super(props)
  }

  render() {
    return (
     <View>
        <StatusBarBackground style={{backgroundColor: '#00857c'}}/>
        <Text style={{height:40, textAlign: "center", backgroundColor: "#00857c",fontSize: 22, color: "white", fontWeight: "bold"}}>Answer</Text>
        <Text style={{marginTop: 20, marginLeft: 15, fontSize: 35, fontWeight: 'bold'}}>{this.props.question.title}</Text>
        <Text style={styles.description}>{this.props.question.description}</Text>
        <View style={{flexDirection:"row", marginTop:5, marginBottom:5}}>
          <Image source={require('./face.jpg')} style={styles.photo} />
          <Text style={{fontSize:15, marginTop: 30}}> Rachel Mills </Text>
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

  description: {
      marginTop: 20,
      marginLeft: 15
  },

  photo: {
    height: 50,
    width: 50,
    marginTop: 15,
    marginLeft: 15,
    borderRadius: 25,
  }
});

module.exports = PersonShowScreen
