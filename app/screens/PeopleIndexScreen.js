/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  Image,
  TouchableOpacity,
  Button,
  Alert,
  SegmentedControlIOS
} from 'react-native';
import ViewContainer from '../components/ViewContainer'
import StatusBarBackground from '../components/StatusBarBackground'

var bridges_client = require('../bridges_client');
var SearchBar = require('react-native-search-bar');

const response = []

export default class PeopleIndexScreen extends Component {
constructor(props) {
    super(props)
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2})
    this.state = {
      'response': [],
      peopleDataSource: ds.cloneWithRows(response),
      'searchTerm': null
    }
  }

  componentDidMount() {
        bridges_client.getQuestions(function(response) {
          this.setState({
                'response': response,
                peopleDataSource: this.state.peopleDataSource.cloneWithRows(response)
            });
        }.bind(this));
    }

    _searchQuestions() {
        bridges_client.search(this.state.searchTerm, function(searchResults) {
            this.setState({
                'response': searchResults,
                peopleDataSource: this.state.peopleDataSource.cloneWithRows(searchResults)
            });
        }.bind(this));
    }

  render() {
    return (
     <ViewContainer>
        <StatusBarBackground style={{backgroundColor: '#00857c'}}/>
        <Text style={{height:40, textAlign: "center", backgroundColor: "#00857c",fontSize: 22, color: "white", fontWeight: "bold"}}>Question Feed</Text>
        <SearchBar
          placeholder='Search'
        />
        <ListView
          dataSource = {this.state.peopleDataSource}
          renderRow={(question) => {return this._renderPersonRow(question)}} 
          automaticallyAdjustContentInsets={false}
          style = {{marginBottom: 50}}
          renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}/>
      </ViewContainer>
    );
  }

  _renderPersonRow(question) {
    return (
      <TouchableOpacity style={styles.personRow} onPress={(event) => this._navigateToPersonShow(question) }>
        <Text style={styles.questionTags}> Tags: {question.tags.attribute}</Text>
        <Text style={styles.questionTitle}> {question.title}</Text>
        <View style={{flexDirection:"row", marginTop:5, marginBottom:5}}>
          <Image source={require('./face.jpg')} style={styles.photo} />
          <Text style={{fontSize:12, marginTop: 10}}> Rachel Mills </Text>
        </View>
      </TouchableOpacity>
    )
  }

  _navigateToPersonShow(question) {
    this.props.navigator.push({
      ident: "PersonShow",
      question: question 
    })
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
  personRow: {
    flexDirection: "column",
    alignSelf: 'stretch',
    marginLeft: 7,
    marginRight: 7
  },
  personName: {
    marginTop: 15,
    marginLeft: 10,
    fontSize: 20,
    fontWeight: "bold"
  },
  photo: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  separator: {
    flex: 1,
    height: 4,
    backgroundColor: 'lightgray',
  },
  questionTitle: {
    fontSize: 20,
    fontWeight: "bold"
  },
   questionDesc: {
    fontSize: 15
  },
  questionTags: {
    marginTop: 2,
    marginBottom: 2,
    fontSize: 12,
    color: "grey"
  }
});

module.exports = PeopleIndexScreen
