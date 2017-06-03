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

      this.state = {
          userData: props.signUpInfo,
          pageInputs: props.pageLayout[props.currentPage],
          inputs: null,
      };

      this.state.inputs = {
          'firstName': {
              inputType: 'text',
              placeholder: 'Barry',
              longName: 'First Name'
          },
          'lastName': {
              inputType: 'text',
              placeholder: 'Allen',
              longName: 'Last Name'
          },
          'email': {
              inputType: 'text',
              placeholder: 'example@bridges.org',
              longName: 'Email',
          },
          'gender': {
              inputType: 'text',
              placeholder: 'Female',
              longName: 'Gender'
          },
          'disability': {
              inputType: 'text',
              placeholder: 'Deaf/Hard of Hearing',
              longName: 'Disability'
          },
          'ethnicity': {
              inputType: 'text',
              placeholder: 'Asian American/Pacific Islander',
              longName: 'Ethnicity'
          },
          'currentEmployer': {
              inputType: 'text',
              placeholder: 'Bridges from School to Work',
              longName: 'Current Employer'
          },
          'dateOfBirth': {
              inputType: 'date',
              longName: 'Birthday'
          },
          'password': {
              inputType: 'text',
              hideInput: true,
              longName: 'Password'
          },
          'currentPosition': {
              inputType: 'text',
              longName: 'Current Position'
          },
          'profilePicture': {
              inputType: 'image',
              longName: 'Profile Picture'
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
          var userDataToSave = this.state.userData;
          return function(text) {
              userDataToSave[name] = text;
              this.setState({'userData': userDataToSave});
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

  _navigateToSignUp(pageIndex) {
      this.props.navigator.push({
          ident: "SignUp",
          currentPage: pageIndex,
          signUpInfo: this.state.userData
      });
  }

  _navigateToLogin() {
      this.props.navigator.push({
         ident: "Login"
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
      var signUpTextFields = currentPageInputs.map(function(inputFieldName, i) {
          var inputFieldData = this.state.inputs[inputFieldName];
          var j = i.toString();

          var field;

          if (inputFieldData.inputType === 'date') {
              field = (
                  <View style={styles.inputItem} key={'master_view_' + j}>
                      <Text style={styles.inputLabel} key={'text_' + j}>{inputFieldData.longName}</Text>
                      <View style={styles.dateWrapper} key={'view_' + j}>
                          <DatePicker
                           style={{width: 200}}
                           date={this.state.userData.dateOfBirth}
                           mode="date"
                           placeholder="select date"
                           format="MM-DD-YYYY"
                           confirmBtnText="Confirm"
                           cancelBtnText="Cancel"
                           customStyles={{
                             dateIcon: {
                               position: 'absolute',
                               left: 0,
                               top: 4,
                               marginLeft: 0
                             },
                             dateInput: {
                               marginLeft: 36
                             }
                           }}
                           onDateChange={this._updateField('dateOfBirth')}
                         />
                      </View>
                  </View>
              );
          } else if (inputFieldData.inputType === 'image') {
              field = (
                  <View style={styles.inputItem} key={'master_view_' + j}>
                      <Text style={styles.inputLabel} key={'text_' + j}>{inputFieldData.longName}</Text>
                       <Image source={require('./images/profile_placeholder.png')} style={styles.photo} />
                  </View>
              );
          } else {
              field = (
                  <View style={styles.inputItem} key={'master_view_' + j}>
                      <Text style={styles.inputLabel} key={'text_' + j}>{inputFieldData.longName}</Text>
                      <View key={'view_' + j} style={styles.inputWrap}>
                          <TextInput
                              key={'input_' + j}
                              value={this.state.userData[inputFieldName]}
                              style={styles.input}
                              onChangeText={this._updateField(inputFieldName)}
                              returnKeyType="next"
                              autoCapitalize="none"
                              autoCorrect={false}
                              secureTextEntry={!!inputFieldData.hideInput}
                              />
                      </View>
                  </View>
              );
          }

          return field;
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
            <TouchableOpacity
                onPress={() => this._navigateToSignUp(this.props.currentPage + 1, this.props.pageLayout)}
                activeOpacity={.5}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Next</Text>
                </View>
            </TouchableOpacity>
        );
    };

    if (this.props.currentPage != 0) {
        prevButton = (
            <TouchableOpacity
                onPress={() => this._navigateToSignUp(this.props.currentPage - 1, this.props.pageLayout)}
                activeOpacity={.5}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Previous</Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <ViewContainer>
            <StatusBarBackground style={{backgroundColor: '#00857c'}}/>
            <View style={{flexDirection: 'row', backgroundColor: "#00857c",
                height: 40, padding: 0, justifyContent: 'space-around'}}>
                <TouchableOpacity style={{flexDirection: 'row', marginLeft: 0, marginTop: 2, marginRight: 10}}onPress={this._navigateToLogin.bind(this)}>
                    <Image source={require('./images/back_button.png')} style={styles.backButton}/>
                    <Text style={{fontSize: 20, color: "white", textAlign: "center",
                        fontWeight: "bold", marginLeft: 3, marginTop: 2}}>login</Text>
                    <View style={{marginRight: 10}}></View>
                </TouchableOpacity>
                <Text style={{fontSize: 22, color: "white", textAlign: "center",
                    fontWeight: "bold", marginTop: 2}}> SignUp </Text>
                <View style={{width: 90}}></View>
            </View>
            <TouchableWithoutFeedback style={styles.container} onPress={ () => { dismissKeyboard() } }>
                <ScrollView>
                    <KeyboardAvoidingView behavior="padding" style={styles.wrapper}>
                        {textInputs}
                    </KeyboardAvoidingView>
                </ScrollView>
            </TouchableWithoutFeedback>
            <View style={styles.buttonZone}>
                {prevButton}
                {nextButton}
                {signUpButton}
            </View>
        </ViewContainer>
    );
  }
}

const colors = {
    placeholderTextColor: '#d3d3d3'
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
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

    buttonZone: {
        marginTop: 0,
        paddingTop: 0,
    },

    signUpNavButton: {
        bottom: 0
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
        height: 45,
        backgroundColor: 'rgba(0,0,0,0.7)',
    },

    inputLabel: {
        fontSize: 20,
    },

    inputItem: {
        paddingVertical: 10
    },

    bigSelect: {
        fontSize: 17,
        color: "#C0C0C0"
    },

    dateWrapper: {
        paddingVertical: 10
    },

    photo: {
        height: 180,
        width: 180,
        borderRadius: 90,
        marginTop: 20
    },

    backButton: {
        height: 20,
        width: 20,
        marginTop: 5,
        marginLeft: 5,
    },
});

module.exports = SignUpScreen
