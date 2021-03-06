/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  ScrollView,
  Navigator,
  TabBarIOS,
  Text,
  View
} from 'react-native';

import QuestionDetailScreen from './app/screens/QuestionDetailScreen'
import QuestionListScreen from './app/screens/QuestionListScreen'
import ProfileScreen from './app/screens/ProfileScreen'
import LoginScreen from './app/screens/LoginScreen'
import Main from './app/screens/Main'
import SignUpScreen from './app/screens/SignUpScreen'

var bridges_client = require('./app/bridges_client');
var settings = require('./settings');

export default class Employable extends Component {
  constructor() {
    super();
    this.state = {
        initialIdent: "Login",
        loading: true
    };
  }

  _renderScene(route, navigator) {
    var globalNavigatorProps = { navigator }

    switch(route.ident) {
      case "QuestionList":
        return (
          <QuestionListScreen
            {...globalNavigatorProps} />
        )

      case "QuestionDetail":
        return (
        <QuestionDetailScreen
            {...globalNavigatorProps}
            question = {route.question} />
        )

      case "Profile":
        return (
        <ProfileScreen
            {...globalNavigatorProps} />
        )

      case "Login":
        return (
            <LoginScreen
                {...globalNavigatorProps} />
        )
      case "Main":
        return (
            <Main
                {...globalNavigatorProps} />
        )
      case "SignUp":
        return (
            <SignUpScreen
                {...globalNavigatorProps}
                pageLayout={settings.signUpLayout}
                currentPage={route.currentPage}
                signUpInfo={route.signUpInfo}
             />
        )
      default:
        return (
        <LoginScreen
          {...globalNavigatorProps} />
        )
    }
  }

  componentWillMount() {
      bridges_client.getUserInfo(function(response) {
         if (response.email) {
             this.setState({initialIdent: "Main"});
         }
         this.setState({loading: false});
      }.bind(this));


  }


  render() {
      // If we have the proper token saved, lets just login
      if (!this.state.loading) {
          return (
            <Navigator
            initialRoute={{ident: this.state.initialIdent}}
            ref="appNavigator"
            renderScene={this._renderScene} />
          );
      } else {
          return (
           <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
               <Text> Connecting to server... </Text>
           </View>
        );
      }
    }
  }

AppRegistry.registerComponent('Employable', () => Employable);
