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

import BookmarksScreen from './BookmarksScreen';
import PersonShowScreen from './PersonShowScreen';
import PeopleIndexScreen from './PeopleIndexScreen';
import ProfileScreen from './ProfileScreen';
import SignUpScreen from './SignUpScreen';
import LoginScreen from './LoginScreen';

export default class Main extends Component {
  constructor() {
    super();
    this.state = {
        selectedTab: 'tabOne',
        currentScreen: 'login'
    };
  }

  setTab(tabId) {
    this.setState({selectedTab: tabId})
  }

  _renderScene(route, navigator) {
    var globalNavigatorProps = { navigator }

    switch(route.ident) {
      case "Bookmarks":
        return (
            <BookmarksScreen
                {...globalNavigatorProps} />
        )

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
        <TabBarIOS>
           <TabBarIOS.Item
                systemIcon="search"
                selected={this.state.selectedTab == 'tabOne'}
                onPress={() => this.setTab('tabOne')}>
                <Navigator
                    initialRoute={{ident: "PeopleIndex"}}
                    ref="appNavigator"
                    renderScene={this._renderScene} />
            </TabBarIOS.Item>

          <TabBarIOS.Item
                systemIcon="contacts"
                selected={this.state.selectedTab == 'tabTwo'}
                onPress={() => this.setTab('tabTwo')}>
                <Navigator
                    initialRoute={{ident: "Profile"}}
                    ref="appNavigator"
                    renderScene={this._renderScene} />
            </TabBarIOS.Item>

            <TabBarIOS.Item
                  systemIcon="bookmarks"
                  selected={this.state.selectedTab == 'tabThree'}
                  onPress={() => this.setTab('tabThree')}>
                  <Navigator
                      initialRoute={{ident: "Bookmarks"}}
                      ref="appNavigator"
                      renderScene={this._renderScene} />
              </TabBarIOS.Item>
          </TabBarIOS>
          );
      }
  }

module.exports = Main
