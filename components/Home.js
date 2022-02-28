import React from 'react'
import {Text, BackHandler, Alert} from 'react-native'
import { useFocusEffect } from "@react-navigation/native";
import Map from './Map';

const Home = () => {
    useFocusEffect(
        React.useCallback(() => {
          const onBackPress = () => {
            Alert.alert("Hold on!", "Are you sure you want to Exit?", [
              {
                text: "Cancel",
                onPress: () => null,
                style: "cancel"
              },
              { text: "YES", onPress: () => BackHandler.exitApp() }
            ]);
            return true;
          };
        
          BackHandler.addEventListener("hardwareBackPress", onBackPress);
        
          return () =>
            BackHandler.removeEventListener("hardwareBackPress", onBackPress);
        
        }, []));

  return (
    <Map />
  )
}

export default Home