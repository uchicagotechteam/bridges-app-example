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
  Alert
} from 'react-native';
import ViewContainer from '../components/ViewContainer'
import StatusBarBackground from '../components/StatusBarBackground'

const response = []

var bridges_client = require('../bridges_client');

export default class ProfileScreen extends Component {
/*constructor(props) {
    super(props)
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2})
    this.state = {
      'response': [],
      peopleDataSource: ds.cloneWithRows(response)
    }
  }

  componentDidMount() {
    bridges_client.getQuestions().then(response => {
            this.setState({
                'response': response,
                peopleDataSource: this.state.peopleDataSource.cloneWithRows(response)
            });
        });
    }*/

  render() {
    return (
     <ViewContainer>
        <StatusBarBackground style={{backgroundColor: '#00857c'}}/>
        <View style={{backgroundColor:"white"}}>
          <Text style={{height:40, textAlign: "center", backgroundColor: "#00857c",fontSize: 22, color: "white", fontWeight: "bold"}}>Profile Page</Text>
          <Image source={require('./face.jpg')} style={styles.photo} />
          <Text style={{fontSize: 30, marginTop: 15, textAlign: 'center', fontWeight: 'bold'}}> Rachel Mills </Text>
          <Text style={{fontSize: 20, textAlign: 'center'}}> Chicago, Illinois </Text>
          <View style={{height: 20}}/>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Image source={require('./store.png')} style={styles.icon} />
          <Text style = {styles.info}> Walgreens </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Image source={require('./tie.png')} style={styles.icon} />
          <Text style = {styles.info}> Assistant Manager </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Image source={require('./time.png')} style={styles.icon} />
          <Text style = {styles.info}> 10 months </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Image source={require('./language.png')} style={styles.icon} />
          <Text style = {styles.info}> English, Spanish </Text>
        </View>
      </ViewContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
    height: 180,
    width: 180,
    borderRadius: 90,
    marginTop: 20,
    marginLeft: 95
  },
  icon: {
    height: 30,
    width: 30,
    borderRadius: 15,
    marginTop: 20,
    marginLeft: 30
  },
  info: {
    marginTop: 25,
    marginLeft: 10,
    fontSize: 20
  }

});

module.exports = ProfileScreen
