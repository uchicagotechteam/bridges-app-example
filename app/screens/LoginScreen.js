import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Button,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback
} from 'react-native';
import ViewContainer from '../components/ViewContainer';
import StatusBarBackground from '../components/StatusBarBackground';
import Main from './Main'

import SInfo from 'react-native-sensitive-info';

var bridges_client = require('../bridges_client');
var settings = require('../../settings');

var dismissKeyboard = require('react-native-dismiss-keyboard');

// Assets and images
const { width, height } = Dimensions.get("window");
const checkmark = require("./images/bridges_logo.png");
const lockIcon = require("./images/input_lock.png");
const personIcon = require("./images/input_person.png");

var bridges_student = require("./images/login_backgrounds/bridges_student.jpg");
var bridges_wheelchair = require("./images/login_backgrounds/bridges_wheelchair.jpg");


var candidateImages = [bridges_student, bridges_wheelchair];

const backgroundImage = candidateImages[Math.floor(Math.random() * candidateImages.length)];


export default class LoginScreen extends Component {
  constructor(props) {
      super(props);
      this.state = {
          inputPassword: '',
          inputEmail: '',
          isError: false
      };
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

  _submitCredentials() {
      var email = this.state.inputEmail.trim().toLowerCase();
      var password = this.state.inputPassword;

      bridges_client.login(email, password)
      .then(response => {
          if (response.ok) {
              // Server sends 200 if user is properly logged in
              this._saveCredentials(response);
          } else {
              this.setState({
                 'isError': true
              });
          }
      });
  }

  render() {
      var errorMsg = '';

      if (this.state.isError) {
          errorMsg = 'Username and/or password is incorrect';
          styles.infoWrap = {marginBottom: 100, backgroundColor: "rgba(0, 0, 0, 0.7)"}
      } else {
          styles.infoWrap = {marginBottom: 100, backgroundColor: "transparent"}
      }

      return (
       <TouchableWithoutFeedback style={styles.container} onPress={ () => { dismissKeyboard() } }>
         <Image source={backgroundImage} style={styles.background} resizeMode="cover">
           <View style={styles.markWrap}>
             <Image source={checkmark} style={styles.checkmark} resizeMode="contain" />
           </View>
           <View style={styles.infoWrap}>
             <Text style={styles.infoText}>{errorMsg}</Text>
           </View>
           <KeyboardAvoidingView behavior="padding" style={styles.wrapper}>
             <View style={styles.inputWrap}>
               <View style={styles.iconWrap}>
                 <Image source={personIcon} style={styles.icon} resizeMode="contain" />
               </View>
               <TextInput
                 placeholder="Email"
                 placeholderTextColor="#FFF"
                 style={styles.input}
                 onChangeText={(text) => this.setState({inputEmail: text, isError: false})}
                 keyboardType="email-address"
                 returnKeyType="next"
                 autoCapitalize="none"
                 autoCorrect={false}
                 onSubmitEditing={() => this.inputPassword.focus()}
               />
             </View>
             <View style={styles.inputWrap}>
                 <View style={styles.iconWrap}>
                     <Image source={lockIcon} style={styles.icon} resizeMode="contain" />
                 </View>
               <TextInput
                 placeholderTextColor="#FFF"
                 placeholder="Password"
                 style={styles.input}
                 ref={(input) => this.inputPassword=input}
                 onChangeText={(text) => this.setState({inputPassword: text, isError: false})}
                 autoCapitalize="none"
                 returnKeyType="go"
                 secureTextEntry
               />
             </View>
             <TouchableOpacity activeOpacity={.5}>
               <View>
                 <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
               </View>
             </TouchableOpacity>
             <TouchableOpacity onPress={this._submitCredentials.bind(this)} activeOpacity={.5}>
               <View style={styles.button}>
                 <Text style={styles.buttonText}>Sign In</Text>
               </View>
             </TouchableOpacity>
             <TouchableOpacity style={styles.bottomArea} onPress={this._submitCredentials.bind(this)} activeOpacity={.5}>
                 <View style={styles.bottomButton}>
                   <Text style={styles.buttonText}>Sign Up</Text>
                 </View>
             </TouchableOpacity>
           </KeyboardAvoidingView>
         </Image>
       </TouchableWithoutFeedback>
     );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  infoWrap: {
    flex: 1,
    marginBottom: 100,
    backgroundColor: "transparent"
  },
  infoText: {
      textAlign: "center",
      fontSize: 25,
      fontWeight: "bold",
      color: "red",
      opacity: 1.0
  },
  markWrap: {
    flex: 1,
    paddingTop: 30,
    paddingBottom: 50
  },
  checkmark: {
    width: null,
    height: null,
    opacity: 0.7,
    flex: 1
  },
  background: {
    width: width,
    height: height,
    opacity: 0.92
  },
  wrapper: {
    paddingVertical: 30,
  },
  inputWrap: {
    flexDirection: "row",
    marginVertical: 10,
    height: 40,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  iconWrap: {
    paddingHorizontal: 7,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    height: 20,
    width: 20,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    color: "white"
  },
  button: {
    backgroundColor: settings.bridges_light_teal,
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  bottomButton: {
      backgroundColor: settings.bridges_teal,
      paddingVertical: 20,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 9,
      marginBottom: 20,
  },
  bottomArea: {
      paddingVertical: 0,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
  },
  forgotPasswordText: {
    color: "#D8D8D8",
    backgroundColor: "transparent",
    textAlign: "right",
    paddingRight: 15,
  },
  signupWrap: {
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  accountText: {
    color: "#D8D8D8"
  },
  signupLinkText: {
    color: "#FFF",
    marginLeft: 5,
  }
});

module.exports = LoginScreen
