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

import TabNavigator from 'react-native-tab-navigator';

import PersonShowScreen from './app/screens/PersonShowScreen'
import PeopleIndexScreen from './app/screens/PeopleIndexScreen'
import ProfileScreen from './app/screens/ProfileScreen'
import LoginScreen from './app/screens/LoginScreen'
import Main from './app/screens/Main'
import SignUpScreen from './app/screens/SignUpScreen'

export default class BridgesAppExample extends Component {
  constructor() {
    super();
  }

  _renderScene(route, navigator) {
    var globalNavigatorProps = { navigator }

    switch(route.ident) {
      case "PeopleIndex":
        return (
          <PeopleIndexScreen
            {...globalNavigatorProps} />
        )

      case "PersonShow":
        return (
        <PersonShowScreen
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
                {...globalNavigatorProps} />
        )
      default:
        return (
        <LoginScreen
          {...globalNavigatorProps} />
        )
    }
  }

  render() {
      return (
        <Navigator
        initialRoute={{ident: "Login"}}
        ref="appNavigator"
        renderScene={this._renderScene} />
      );
    }
  }

AppRegistry.registerComponent('BridgesAppExample', () => BridgesAppExample);
