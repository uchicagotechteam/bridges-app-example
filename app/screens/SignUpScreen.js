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
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Image,
  TextInput
} from 'react-native';
import ViewContainer from '../components/ViewContainer';
import StatusBarBackground from '../components/StatusBarBackground';
import ModalDropdown from 'react-native-modal-dropdown';
import DatePicker from 'react-native-datepicker';

import SInfo from 'react-native-sensitive-info';

var dismissKeyboard = require('react-native-dismiss-keyboard');
var settings = require('../../settings');
var bridges_client = require('../bridges_client');

const genderOptions = ['male', 'female', 'other']

const disabilityOptions = ['Learning Disability', 'Blind',
    'Deaf/Hard of Hearing', 'Emotional/Behavioral Disorder',
    'Intellectual Disability', 'Chronic Health Impairment',
    'Autism Spectrum Disorder', 'Speech/Language Impairment',
    'Other Health Impairment', 'ADD/ADHD', 'Orthopedic Impairment']

const ethnicityOptions = ['American Indian or Alaska Native', 'Asian',
 'Black or African American',
 'Native Hawaiian or Pacific Islander', 'White']

export default class SignUpScreen extends Component {
  constructor(props) {
      super(props)

      console.log(props.pageLayout);
      console.log(props.currentPage);

      this.state = {
          userData: props.signUpInfo,
          pageInputs: props.pageLayout[props.currentPage],
          inputs: null,
      };

      this.state.inputs = {
          'firstName': {
              inputType: 'text',
              placeholder: 'Barry'
          },
          'lastName': {
              inputType: 'text',
              placeholder: 'Allen'
          },
          'email': {
              inputType: 'text',
              placeholder: 'example@bridges.org'
          },
          'gender': {
              inputType: 'text',
              placeholder: 'Female'
          },
          'disability': {
              inputType: 'text',
              placeholder: 'Deaf/Hard of Hearing'
          },
          'ethnicity': {
              inputType: 'text',
              placeholder: 'Asian American/Pacific Islander'
          },
          'currentEmployer': {
              inputType: 'text',
              placeholder: 'Bridges from School to Work'
          },
          'dateOfBirth': {
              inputType: 'date'
          },
          'password': {
              inputType: 'text',
              hideInput: true
          },
          'currentPosition': {
              inputType: 'text'
          },
          'profilePicture': {
              inputType: 'image'
          }
      };

      if (!this.props.signUpInfo) {
          this.state.userData = {
              firstName: '',
              lastName: '',
              email: '',
              gender: '',
              disability: '',
              ethnicity: '',
              currentEmployer: '',
              dateOfBirth: '',
              password: '',
              currentPosition: '',
              isError: false
          };
      }
  }

  _updateField(name) {
      var updateGivenField = function(name) {
          var toUpdate = {};
          return function(text) {
              toUpdate[name] = text;
              this.setState(toUpdate);
          }.bind(this);
      }.bind(this);
      return updateGivenField(name);
  }

  _createUser() {
      var userData = {
          username: this.state.userData.email,
          first_name: this.state.userData.firstName,
          last_name: this.state.userData.lastName,
          email: this.state.userData.email,
          gender: this.state.userData.gender,
          disabilities: this.state.userData.disability,
          ethnicity: this.state.userData.ethnicity,
          current_employer: this.state.userData.currentEmployer,
          date_of_birth: this.state.userData.dateOfBirth,
          password: this.state.userData.password,
          position: this.state.userData.currentPosition
      };

      bridges_client.createNewUser(userData, function(response) {
          if (response.ok) {
              this._saveCredentials(response);
          } else {
              response.json().then((responseJson) => {
                  var errors = responseJson.errors;
                  var error_msg = '';

                  for (const key of Object.keys(errors)) {
                      error_msg += key + ' - ' + errors[key] + '\n';
                  }

                  alert(error_msg.replace(new RegExp('username', 'g'), 'email'));
              });
          }
      }.bind(this));
  }

  _navigateToMain() {
    this.props.navigator.push({
      ident: "Main"
    });
  }

  _navigateToSignUp(pageIndex, pageLayout) {
      this.props.navigator.push({
          ident: "SignUp",
          currentPage: pageIndex
      });
  }

  _saveCredentials(response) {
      response.json().then((responseJson) => {
          SInfo.setItem('token', responseJson.token.trim(), {
              sharedPreferencesName: 'shared_preferences'
          });

          this.setState({
              'isError': false
          });

          this._navigateToMain();
      });
  }

  generateInputFields(currentPageInputs) {
      var signUpTextFields = currentPageInputs.map(function(inputFieldName) {
          var inputFieldData = this.state.inputs[inputFieldName];
          return (
              <View style={styles.inputWrap}>
                  <Text>{inputFieldName}</Text>
                  <TextInput
                      placeholder={inputFieldData.placeholder}
                      placeholderTextColor={inputFieldData.placeholderTextColor}
                      style={styles.input}
                      onChangeText={this._updateField(inputFieldName)}
                      returnKeyType="next"
                      autoCapitalize="none"
                      autoCorrect={false}
                      secureTextEntry={!!inputFieldData.hideInput}
                      />
              </View>
          );
      }.bind(this));

      return signUpTextFields;
  }

  render() {
    const textInputs = this.generateInputFields(this.state.pageInputs);
    var signUpButton = (<View></View>);
    var nextButton = (<View></View>);
    var prevButton = (<View></View>);

    if (this.props.pageLayout.length - 1 === this.props.currentPage) {
        signUpButton = (
            <TouchableOpacity onPress={() => this._createUser()} activeOpacity={.5}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </View>
            </TouchableOpacity>
        );
    } else {
        nextButton = (
            <TouchableOpacity onPress={() => this._navigateToSignUp(this.props.currentPage + 1, this.props.pageLayout)} activeOpacity={.5}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Next</Text>
                </View>
            </TouchableOpacity>
        );
    };

    if (this.props.currentPage != 0) {
        prevButton = (
            <TouchableOpacity onPress={() => this._navigateToSignUp(this.props.currentPage - 1, this.props.pageLayout)} activeOpacity={.5}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Previous</Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <ViewContainer>
            <StatusBarBackground style={{backgroundColor: '#00857c'}}/>
            <Text style={{height:40, textAlign: "center", backgroundColor: "#00857c",
                fontSize: 22, color: "white", fontWeight: "bold"}}> Sign Up </Text>
            <TouchableWithoutFeedback style={styles.container} onPress={ () => { dismissKeyboard() } }>
                <ScrollView>
                    <KeyboardAvoidingView behavior="padding" style={styles.wrapper}>
                        {textInputs}
                        {nextButton}
                        {prevButton}
                        {signUpButton}
                    </KeyboardAvoidingView>
                </ScrollView>
            </TouchableWithoutFeedback>
        </ViewContainer>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    wrapper: {
      paddingVertical: 30,
    },

    personName: {
        fontWeight: "bold"
    },

    photo: {
        height: 50,
        width: 50,
        marginTop: 15,
        marginLeft: 15,
        borderRadius: 25,
    },

    button: {
      backgroundColor: settings.bridges_light_teal,
      paddingVertical: 20,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 30,
    },

    buttonText: {
      color: "#FFF",
      fontSize: 18,
    },

    input: {
        flex: 1,
        paddingHorizontal: 10,
        color: "white"
    },

    inputWrap: {
        flexDirection: "row",
        marginVertical: 10,
        height: 40,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },

    bigSelect: {
        fontSize: 17,
        color: "#C0C0C0"
    },
});

module.exports = SignUpScreen
