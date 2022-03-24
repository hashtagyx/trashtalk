import React, { useRef, useState, useEffect } from 'react';
import { View, BackHandler } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFocusEffect } from "@react-navigation/native";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
// import axios from 'axios';

const GooglePlacesInput = ({ updateMap }) => {
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        ref.current?.blur();
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);

    }, []));

  const ref = useRef();

  const getCoordinates = (details) => {
    const place_id = details['place_id']
    var axios = require('axios');

    var config = {
      method: 'get',
      // API KEY HERE
      url: 'https://maps.googleapis.com/maps/api/place/details/json?place_id=' + place_id + '&fields=geometry&key=AIzaSyAAY0qESJL82dO6sbRn8unySszXcrYe1CI',
      headers: {}
    };

    axios(config)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
        const lat = response.data["result"]["geometry"]["location"]["lat"]
        const lng = response.data["result"]["geometry"]["location"]["lng"]
        updateMap(lat, lng);
      })
      .catch(function (error) {
        console.log("Error with API")
      });
  }

  const clearTextField = () => {
    ref.current?.setAddressText("");
    ref.current?.focus();
    ref.current?.blur();
  }

  const clearTextButton = () => {
    if (ref.current?.getAddressText().length !== 0) {
      console.log("length")
      console.log(ref.current?.getAddressText().length)
      return (
        <View style={{
          margin: 10,
          marginRight: 0,
        }}>
          <Icon
            name="times-circle"
            backgroundColor="transparent"
            color="grey"
            size={20}
            onPress={clearTextField}
          />
        </View>
      )
    }
  }

  return (
    <GooglePlacesAutocomplete
      ref={ref}
      placeholder='Search'
      // onPress={(data, details = null) => {
      //   // 'details' is provided when fetchDetails = true
      //   console.log(data, details);
      // }}
      query={{
        key: 'AIzaSyAAY0qESJL82dO6sbRn8unySszXcrYe1CI',
        language: 'en',
        components: 'country:sg'
      }}
      enablePoweredByContainer={false}
      renderRightButton={clearTextButton}
      onPress={getCoordinates}
      keepResultsAfterBlur={false}
      keyboardShouldPersistTaps={'handled'}
      styles={{
        textInputContainer: {
          margin: 10,
        },
        textInput: {
          borderRadius: 50,
        }
      }}
    />
  );
};


export default GooglePlacesInput;