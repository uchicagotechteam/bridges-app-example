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
var styles = require('./styles/question_feed').questionFeed;


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

AppRegistry.registerComponent('BridgesAppExample', () => BridgesAppExample);
