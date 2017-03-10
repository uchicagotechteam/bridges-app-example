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
  TouchableOpacity,
  Image
} from 'react-native';
import ViewContainer from '../components/ViewContainer'
import StatusBarBackground from '../components/StatusBarBackground'
import ModalDropdown from 'react-native-modal-dropdown';

export default class SignUpScreen extends Component {
  constructor(props) {
      super(props)
  }

  render() {
    return (
     <View>
        <Text> First Name </Text>  
        <Text> Last Name </Text>  
        <Text> Email </Text>  
        <Text> Date of Birth </Text>  
        <Text> Gender </Text>  
        <ModalDropdown options={['Male', 'Female', 'Other']}/>
        <Text> Disabilities </Text> 
        <ModalDropdown options={['Learning Disability', 'Blind', 'Deaf/Hard of Hearing', 'Emotional/Behavioral Disorder', 'Intellectual Disability', 'Chronic Health Impairment', 'Autism Spectrum Disorder', 'Speech/Language Impairment', 'Other Health Impairment', 'ADD/ADHD', 'Orthopedic Impairment']}/> 
        <Text> Race </Text> 
        <ModalDropdown options={['American Indian or Alaska Native', 'Asian', 'Black or African American', 'Native Hawaiian or Pacific Islander', 'White']}/>
        <Text> Current Employer </Text>   
     </View>
    );
  }
}

const styles = StyleSheet.create({
  personName: {
    fontWeight: "bold"
  },
  photo: {
    height: 50,
    width: 50,
    marginTop: 15,
    marginLeft: 15,
    borderRadius: 25,
  }
});

module.exports = SignUpScreen
