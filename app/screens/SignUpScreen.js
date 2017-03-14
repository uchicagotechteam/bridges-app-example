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

  _createUser() {
      var userData = {
          username: this.state.email,
          first_name: this.state.firstName,
          last_name: this.state.lastName,
          email: this.state.email,
          gender: this.state.gender,
          disabilities: this.state.disability,
          ethnicity: this.state.ethnicity,
          currentEmployer: this.state.currentEmployer,
          dateOfBirth: this.state.dateOfBirth,
          password: this.state.password,
          postition: this.state.currentPosition
      }

      bridges_client.createNewUser(userData, function(response) {
          if (response.ok) {
              _saveCredentials(response);
          } else {
              response.json().then((responseJson) => {
                  var errors = responseJson.errors;
                  var error_msg = '';

                  for (const key of Object.keys(errors)) {
                      error_msg += (key + ' - ' + errors[key] + '\n').replace('username', 'email');
                  }

                  alert(error_msg);
              });
          }
      });
  }

  _navigateToMain() {
    this.props.navigator.push({
      ident: "Main"
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

  render() {
    return (
        <TouchableWithoutFeedback style={styles.container} onPress={ () => { dismissKeyboard() } }>
            <ScrollView>
            <KeyboardAvoidingView behavior="padding" style={styles.wrapper}>
             <Text> Email Address </Text>
             <View style={styles.inputWrap}>
                 <TextInput
                   placeholder="rmillz@bridges.org"
                   placeholderTextColor="#C0C0C0"
                   style={styles.input}
                   onChangeText={(text) => this.setState({email: text})}
                   returnKeyType="next"
                   autoCapitalize="none"
                   autoCorrect={false}
                 />
             </View>

             <Text> Password </Text>
              <View style={styles.inputWrap}>
                  <TextInput
                    style={styles.input}
                    onChangeText={(text) => this.setState({password: text})}
                    returnKeyType="next"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry
                  />
              </View>

             <Text> First Name </Text>
              <View style={styles.inputWrap}>
                  <TextInput
                    placeholder="Rachel"
                    placeholderTextColor="#C0C0C0"
                    style={styles.input}
                    onChangeText={(text) => this.setState({firstName: text})}
                    returnKeyType="next"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
              </View>

              <Text> Last Name </Text>
              <View style={styles.inputWrap}>
                  <TextInput
                    placeholder="Mills"
                    placeholderTextColor="#C0C0C0"
                    style={styles.input}
                    onChangeText={(text) => this.setState({lastName: text})}
                    returnKeyType="next"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
              </View>

            <Text> Date of Birth </Text>
            <View style={styles.inputWrap}>
                <DatePicker
                style={{width: 200}}
                date={this.state.dateOfBirth}
                mode="date"
                placeholder="select date"
                format="YYYY-MM-DD"
                maxDate="2016-01-01"
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
                onDateChange={(date) => {this.setState({dateOfBirth: date})}} />
            </View>
            <Text> Gender </Text>
            <View style={styles.inputWrap}>
            <ModalDropdown
                options={genderOptions}
                onSelect={(idx) => this.setState({'gender': genderOptions[idx]})}
                textStyle={styles.bigSelect}
                />
            </View>

            <Text>Disabilities </Text>
            <View style={[styles.inputWrap, styles.responsiveModal]}>
            <ModalDropdown options={disabilityOptions}
                onSelect={(idx) => this.setState({'disability': disabilityOptions[idx]})}
                textStyle={styles.bigSelect}
                />
            </View>

            <Text> Ethnicity </Text>
            <View style={styles.inputWrap}>
            <ModalDropdown options={ethnicityOptions}
                onSelect={(idx) => this.setState({'ethnicity': ethnicityOptions[idx]})}
                textStyle={styles.bigSelect}
                />
            </View>

            <Text> Current Employer </Text>
            <View style={styles.inputWrap}>
                <TextInput
                  placeholder="Walgreens"
                  placeholderTextColor="#C0C0C0"
                  style={styles.input}
                  onChangeText={(text) => this.setState({currentEmployer: text})}
                  returnKeyType="next"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
            </View>

            <Text> Current position </Text>
            <View style={styles.inputWrap}>
                <TextInput
                  placeholder="Assistant Manager"
                  placeholderTextColor="#C0C0C0"
                  style={styles.input}
                  onChangeText={(text) => this.setState({currentPosition: text})}
                  returnKeyType="next"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
            </View>
            <TouchableOpacity onPress={() => this._createUser()} activeOpacity={.5}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Sign Up</Text>
              </View>
            </TouchableOpacity>
         </KeyboardAvoidingView>
        </ScrollView>
     </TouchableWithoutFeedback>
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
