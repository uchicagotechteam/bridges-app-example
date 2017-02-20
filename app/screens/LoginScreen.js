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
  Image
} from 'react-native';
import ViewContainer from '../components/ViewContainer';
import StatusBarBackground from '../components/StatusBarBackground';

import SInfo from 'react-native-sensitive-info';

var bridges_client = require('../bridges_client');
var settings = require('../../settings');

var bridges_teal = settings.bridges_teal;

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

  _navigateToPersonIndex() {
    this.props.navigator.push({
      ident: "PeopleIndex"
    });
  }

  _submitCredentials() {
      var email = this.state.inputEmail.trim().toLowerCase();
      var password = this.state.inputPassword;

      bridges_client.login(email, password)
      .then(response => {
          if (response.status === 200) {
              // Server sends 200 if user is properly logged in
              SInfo.setItem('email', email, {});
              SInfo.setItem('password', password, {});

              this.setState({
                  'isError': false
              });

              this._navigateToPersonIndex();

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
          styles.infoWrap = {marginBottom: 100, backgroundColor: "rgba(0, 0, 0, 0.5)"}
      } else {
          styles.infoWrap = {marginBottom: 100, backgroundColor: "transparent"}
      }

      return (
       <View style={styles.container}>
         <Image source={backgroundImage} style={styles.background} resizeMode="cover">
           <View style={styles.markWrap}>
             <Image source={checkmark} style={styles.checkmark} resizeMode="contain" />
           </View>
           <View style={styles.infoWrap}>
             <Text style={styles.infoText}>{errorMsg}</Text>
           </View>
           <View style={styles.wrapper}>
             <View style={styles.inputWrap}>
               <View style={styles.iconWrap}>
                 <Image source={personIcon} style={styles.icon} resizeMode="contain" />
               </View>
               <TextInput
                 placeholder="Email"
                 placeholderTextColor="#FFF"
                 style={styles.input}
                 onChangeText={(text) => this.setState({inputEmail: text, isError: false})}
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
                 onChangeText={(text) => this.setState({inputPassword: text, isError: false})}
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
           </View>
           <View style={styles.container}>
             <View style={styles.signupWrap}>
               <Text style={styles.accountText}>Don't have an account?</Text>
               <TouchableOpacity activeOpacity={.5}>
                 <View>
                   <Text style={styles.signupLinkText}>Sign Up</Text>
                 </View>
               </TouchableOpacity>
             </View>
           </View>
         </Image>
       </View>
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
    borderBottomWidth: 1,
    borderBottomColor: "#CCC"
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
    backgroundColor: bridges_teal,
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
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
