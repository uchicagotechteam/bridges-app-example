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

  _returnToPreviousPage(question) {
      this.props.navigator.pop();
  }

  render() {
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
        <Text style={{marginTop: 20, marginLeft: 15, fontSize: 35, fontWeight: 'bold'}}>{this.props.question.title}</Text>
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
  }
});

module.exports = PersonShowScreen
