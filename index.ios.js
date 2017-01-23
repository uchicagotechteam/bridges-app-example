/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

function getMovies() {
    return fetch('https://www.google.com/')
      .then((response) => response._bodyText)
      .then((responseText) => {
        console.log(responseText);
        return responseText;
      })
      .catch((error) => {
        console.error(error);
      });
}


export default class BridgesAppExample extends Component {
    constructor(props) {
        super(props)
        this.state = {
            coolText: "no cool text to display yet!"
        }
    }

    componentDidMount() {
        getMovies().then(response => {
            this.setState({coolText: response})
        });
    }

    render() {
        var coolText = getMovies();

        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Welcome to React Native!
                </Text>
                <Text style={styles.instructions}>
                    To get started, edit index.ios.js
                </Text>
                <Text style={styles.instructions}>
                    Press Cmd+R to reload,{'\n'}
                    Cmd+D or shake for dev menu
                </Text>
                <Text>
                    {this.state.coolText}
                </Text>
            </View>
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
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('BridgesAppExample', () => BridgesAppExample);
