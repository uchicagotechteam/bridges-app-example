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
  Text,
  View
} from 'react-native';

import TabNavigator from 'react-native-tab-navigator';
import Icon from 'react-native-vector-icons/FontAwesome';

import BookmarksScreen from './BookmarksScreen';
import PersonShowScreen from './PersonShowScreen';
import PeopleIndexScreen from './PeopleIndexScreen';
import ProfileScreen from './ProfileScreen';
import SignUpScreen from './SignUpScreen';
import LoginScreen from './LoginScreen';

const profileHeadSelected = (<Icon name="user" size={28} color="#000" />);
const profileHeadUnselected = (<Icon name="user-o" size={28} color="#00857C" />);

const searchSelected = (<Icon name="search" size={26} color="#000" />);
const searchUnselected = (<Icon name="search" size={26} color="#00857C" />);

const bookmarkSelected = (<Icon name="bookmark" size={28} color="#000" />);
const bookmarkUnselected = (<Icon name="bookmark-o" size={28} color="#00857C" />);

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
        selectedTab: 'tabOne',
        currentScreen: 'login'
    };
  }

  setTab(tabId) {
    this.setState({selectedTab: tabId})
  }

  _returnToLogin() {
      this.props.navigator.push({
          ident: 'Login',
      });
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
            globalNavigator={route.globalNavigator}
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
        <TabNavigator>
           <TabNavigator.Item
               title="Questions"
               renderIcon={() => searchUnselected}
               renderSelectedIcon={() => searchSelected}
               selected={this.state.selectedTab == 'tabOne'}
               onPress={() => this.setTab('tabOne')}>
               <Navigator
                   initialRoute={{ident: "PeopleIndex"}}
                   ref="appNavigator"
                   renderScene={this._renderScene} />
           </TabNavigator.Item>

           <TabNavigator.Item
               title="Profile"
               renderIcon={() => profileHeadUnselected}
               renderSelectedIcon={() => profileHeadSelected}
               selected={this.state.selectedTab == 'tabTwo'}
               onPress={() => this.setTab('tabTwo')}>
               <Navigator
                   initialRoute={{
                       ident: "Profile",
                       globalNavigator: this.props.navigator,
                   }}
                   ref="appNavigator"
                   renderScene={this._renderScene} />
            </TabNavigator.Item>

            <TabNavigator.Item
                title="Bookmarks"
                renderIcon={() => bookmarkUnselected}
                renderSelectedIcon={() => bookmarkSelected}
                selected={this.state.selectedTab == 'tabThree'}
                onPress={() => this.setTab('tabThree')}>
                <Navigator
                    initialRoute={{ident: "Bookmarks"}}
                    ref="appNavigator"
                    renderScene={this._renderScene} />
            </TabNavigator.Item>
        </TabNavigator>
    );
}
}

module.exports = Main
