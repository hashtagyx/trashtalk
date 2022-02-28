import { NavigationContainer } from "@react-navigation/native";
import React, { useState } from "react";
import LoginScreen from "react-native-login-screen";
 
const Login = ( {navigation} ) => {
 
  return (
    <LoginScreen logoImageSource={require("../assets/log2.jpg")}
      onLoginPress={() => {navigation.navigate('Home')}}
      onHaveAccountPress={() => {}}
      onEmailChange={(email) => {}}
      onPasswordChange={(password) => {}}
      disableSocialButtons={true} 
      haveAccountText={''}
    />
  );
}

export default Login;