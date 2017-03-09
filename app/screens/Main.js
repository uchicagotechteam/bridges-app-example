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

import PersonShowScreen from './PersonShowScreen'
import PeopleIndexScreen from './PeopleIndexScreen'
import ProfileScreen from './ProfileScreen'

export default class Main extends Component {
  constructor() {
    super();
    this.state = {selectedTab: 'tabOne', currentScreen: 'login'}
  }

  setTab(tabId) {
    this.setState({selectedTab: tabId})
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
                onPress={() => this.setTab('tabTwo')}
                apiClient = {this.APIClient}>
                <Navigator
                    initialRoute={{ident: "Profile"}}
                    ref="appNavigator"
                    renderScene={this._renderScene} />
            </TabBarIOS.Item>
          </TabBarIOS>
          );
      }
  }

module.exports = Main
