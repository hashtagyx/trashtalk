import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
// import axios from 'axios';

const GooglePlacesInput = ({ updateMap }) => {

  // const locationQuery = async (details) => {
  //   console.log(details['place_id'])
  //   const place_id = details['place_id']
  //   const coordinates = await getCoordinates(place_id)
  //   // 200 lat and lng are invalid results, suggests something wrong with API query
  //   if (coordinates[0] === 200 && coordinates[1] === 200) {
  //     return;
  //   }
  //   const lat = coordinates.latitude
  //   const lng = coordinates.longitude
  //   console.log(coordinates.latitude)
  //   console.log("hi")
  //   updateMap(lat, lng)
  // }
  // locationQuery().catch(e => {
  //   console.log('Error with fetch')
  // })

  const getCoordinates = (details) => {
    const place_id = details['place_id']
    var axios = require('axios');

    var config = {
      method: 'get',
      // API KEY HERE
      url: 'https://maps.googleapis.com/maps/api/place/details/json?place_id=' + place_id + '&fields=geometry&key=API_KEY_HERE',
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

  return (
    <GooglePlacesAutocomplete
      placeholder='Search'
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data, details);
      }}
      query={{
        key: 'AIzaSyDXcERXgqD3QmQDIkz-KD17KLu0zRhtajw',
        language: 'en',
        components: 'country:sg'
      }}
      enablePoweredByContainer={false}
      onPress={getCoordinates}
      styles={{
        textInputContainer: {
          margin: 10
        },
        textInput: {
          borderRadius: 50,
        }
      }}
    />
  );
};


export default GooglePlacesInput;