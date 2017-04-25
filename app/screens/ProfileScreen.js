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
  ScrollView,
  Image,
  TouchableOpacity,
  Button,
  Alert
} from 'react-native';
import ViewContainer from '../components/ViewContainer'
import StatusBarBackground from '../components/StatusBarBackground'

import SInfo from 'react-native-sensitive-info';

const response = []

var bridges_client = require('../bridges_client');
var settings = require('../../settings');
var bookmark_manager = require('../bookmark_manager');

export default class ProfileScreen extends Component {

constructor(props) {
    super(props)
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2})
    this.state = {
      'profile': {},
    }
  }

  _logout() {
      // First we send our local data to the server (just bookmarks for now)
      bookmark_manager.retrieveLocalBookmarks(function(bookmarks) {
          var bookmarkIds = bookmarks.map(function(question){
              return question.id;
          });

          bridges_client.setRemoteBookmarks(bookmarkIds, function(response) {
              if (response.ok) {
                  bookmark_manager.clearLocalBoomarks();

                  // Then we clear the token
                  SInfo.deleteItem('token', {
                      sharedPreferencesName: 'shared_preferences'
                  });

                  // Should then navigate to login screen
                 this._resetAndNavigateToLogin();
              }
          }.bind(this));
      }.bind(this));
  }

  _resetAndNavigateToLogin() {
      this.props.globalNavigator.resetTo({
        ident: "Login"
      });
  }

  componentDidMount() {
      bridges_client.getUserInfo(function(response) {
          this.setState({
              profile: response
          });
      }.bind(this));
  }

  render() {
      var profilePicture;
      if (this.state.profile.profile_picture) {
          profilePicture = (
              <Image source={{
                      uri: settings.API_ROOT + this.state.profile.profile_picture
                  }}
                  style={styles.photo} />
          );
      } else {
          profilePicture = (
              <Image source={require('./profile_placeholder.png')} style={styles.photo} />
          );
      }


    return (
    <ViewContainer>
    <StatusBarBackground style={{backgroundColor: '#00857c'}}/>
    <Text style={{height:40, textAlign: "center",
        backgroundColor: "#00857c",fontSize: 22, color: "white", fontWeight: "bold"}}>
        Profile </Text>
     <ScrollView>
        <View style={{backgroundColor:"white"}}>
          {profilePicture}
          <Text style={{fontSize: 30, marginTop: 15, textAlign: 'center', fontWeight: 'bold'}}>
              {this.state.profile.first_name} {this.state.profile.last_name} </Text>
          <Text style={{fontSize: 20, textAlign: 'center'}}> {this.state.profile.email} </Text>
          <View style={{height: 20}}/>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Image source={require('./store.png')} style={styles.icon} />
          <Text style = {styles.info}> {this.state.profile.current_employer} </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Image source={require('./tie.png')} style={styles.icon} />
          <Text style = {styles.info}> {this.state.profile.position} </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Image source={require('./time.png')} style={styles.icon} />
          <Text style = {styles.info}> 10 months </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Image source={require('./language.png')} style={styles.icon} />
          <Text style = {styles.info}> English, Spanish </Text>
        </View>
        <TouchableOpacity style={styles.bottomArea} onPress={this._logout.bind(this)} activeOpacity={.5}>
            <View style={styles.bottomButton}>
              <Text style={styles.buttonText}>Logout</Text>
            </View>
        </TouchableOpacity>
    </ScrollView>
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
  },
  bottomButton: {
      backgroundColor: settings.bridges_teal,
      paddingVertical: 20,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 9,
  },
  bottomArea: {
      paddingVertical: 0,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
  }
});

module.exports = ProfileScreen
