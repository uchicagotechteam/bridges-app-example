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

var bridges_api_client = require('./bridges_client');


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
            /* <ListView
                dataSource={this.state.response}
                renderRow={(rowData) =><Text>{rowData}</Text>}/> */

            <View style={styles.container}>
                {this.state.response.map(function(question) {
                    return (
                        <View style={{textAlign: 'left', paddingBottom: 20}}>
                            <Text style={styles.title}>
                                {question.title}
                            </Text>
                            <Text style={styles.description}>
                                {question.description}
                            </Text>
                        </View>
                    );
                })}
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

    title: {
        textAlign: 'left',
        fontWeight: 'bold'
    },

    description: {
        textAlign: 'left',

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
