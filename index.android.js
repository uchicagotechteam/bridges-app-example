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
  Text,
  View
} from 'react-native';

var bridges_api_client = require('./bridges_client');
var questionFeedStyles = require('./styles/question_feed').questionFeed;


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
            <ScrollView>
                <Text style={questionFeedStyles.header}>
                    Questions
                </Text>

                <View style={questionFeedStyles.container}>
                    {this.state.response.map(function(question) {
                        return (
                            <View style={questionFeedStyles.questionRow}>
                                <Text style={questionFeedStyles.title}>
                                    {question.title}
                                </Text>
                                <Text style={questionFeedStyles.description}>
                                    {question.description}
                                </Text>
                            </View>
                        );
                    })}
                </View>
            </ScrollView>
        );
    }
}

AppRegistry.registerComponent('BridgesAppExample', () => BridgesAppExample);
