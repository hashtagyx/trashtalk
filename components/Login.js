import { NavigationContainer } from "@react-navigation/native";
import React, { useState } from "react";
import LoginScreen from "react-native-login-screen";
 
const Login = ( {navigation} ) => {
 
  return (
    <LoginScreen logoImageSource={require("../assets/logo.jpg")}
      onLoginPress={() => {navigation.navigate('Home')}}
      onHaveAccountPress={() => {}}
      onEmailChange={(email) => {}}
      onPasswordChange={(password) => {}}
      disableSocialButtons={true} 
      haveAccountText={''}
      logoImageStyle={{width: 150, height: 150, margin: 75}}
    />
  );
}

export default Login;