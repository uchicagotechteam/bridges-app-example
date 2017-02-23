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

export default class BridgesAppExample extends Component {
  constructor() {
    super();
    this.state = {selectedTab: 'tabOne'}
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
      let hiddenTabBarHeight = 0;
      let hideTabBar = null;
      let hideTabBarSceneStyle = null;

      if (this.state.selectedTab === 'tabOne') {
          hideTabBar = { height: hiddenTabBarHeight, overflow: 'hidden' };
          hideTabBarSceneStyle = { paddingBottom: hiddenTabBarHeight };
      }

      return (
          <TabBarIOS>
              <TabBarIOS.Item
                  systemIcon="contacts"
                  selected={this.state.selectedTab == 'tabOne'}
                  onPress={() => this.setTab('tabOne')}>
                  <Navigator
                      initialRoute={{ident: "Login"}}
                      ref="appNavigator"
                      renderScene={this._renderScene} />
              </TabBarIOS.Item>

             <TabBarIOS.Item
                  systemIcon="search"
                  selected={this.state.selectedTab == 'tabTwo'}
                  onPress={() => this.setTab('tabTwo')}>
                  <Navigator
                      initialRoute={{ident: "PeopleIndex"}}
                      ref="appNavigator"
                      renderScene={this._renderScene} />
              </TabBarIOS.Item>

            <TabBarIOS.Item
                  systemIcon="contacts"
                  selected={this.state.selectedTab == 'tabThree'}
                  onPress={() => this.setTab('tabThree')}
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

AppRegistry.registerComponent('BridgesAppExample', () => BridgesAppExample);
