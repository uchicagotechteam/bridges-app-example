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
  ScrollView,
  Text,
  View
} from 'react-native';

import TabNavigator from 'react-native-tab-navigator';

import PersonShowScreen from './app/screens/PersonShowScreen'
import PeopleIndexScreen from './app/screens/PeopleIndexScreen'
import ProfileScreen from './app/screens/ProfileScreen'

export default class BridgesAppExample extends Component {
    constructor(props) {
        super(props)
        this.state = {
            'response': []
        }
    }

    componentDidMount() {
        bridges_api_client.getQuestions().then(response => {
            this.setState({
                'response': response
            });
            console.log(this.state);
        });
    }

    render() {
        return (
        <PersonShowScreen
            {...globalNavigatorProps}
            question = {route.question}/>
        )
      case "Profile":
        return (
        <ProfileScreen
            {...globalNavigatorProps} />
        )
      default:
        return (
        <PeopleIndexScreen
          {...globalNavigatorProps} />
        )
    }
  }

  render() {
    return (
      <TabNavigator>
        <TabNavigator.Item
        systemIcon="search"
        selected={this.state.selectedTab == 'tabOne'}
        onPress={() => this.setTab('tabOne')}>
          <Navigator
          initialRoute={{ident: "PeopleIndex"}}
          ref="appNavigator"
          renderScene={this._renderScene} />
        </TabNavigator.Item>
        <TabNavigator.Item
        systemIcon="contacts"
        selected={this.state.selectedTab == 'tabTwo'}
        onPress={() => this.setTab('tabTwo')}>
          <Navigator
          initialRoute={{ident: "Profile"}}
          ref="appNavigator"
          renderScene={this._renderScene} />
          </TabNavigator.Item>
      </TabNavigator>
    )
  }
}

AppRegistry.registerComponent('BridgesAppExample', () => BridgesAppExample);
