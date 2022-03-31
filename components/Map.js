import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text } from 'react-native';
import MapView from 'react-native-maps';
import { Marker, Callout } from 'react-native-maps';
import GooglePlacesInput from './GooglePlacesInput';
import FillPercentCircle from './FillPercentCircle';
import Icon from 'react-native-vector-icons/Ionicons';
import MapViewDirections from 'react-native-maps-directions';
import firestore from "@react-native-firebase/firestore";
import RowOfButtons from './RowOfButtons';
import GetLocation from 'react-native-get-location'
import getDistance from 'geolib/es/getDistance'
import ClearBinIcon from './ClearBinIcon';

const Map = () => {
    const mapRef = React.createRef();

    // CHANGE API KEY HERE
    const API_KEY = "AIzaSyD0dx9FLxcrgczky_RYqrH2koYs0Xq_j5E"

    const [userLocation, setUserLocation] = useState(null);

    const [displayChart, setDisplayChart] = useState(false);

    const [fillPercent, setFillPercent] = useState();

    const [farthestWaypoint, setFarthestWaypoint] = useState();

    const [displayPath, setDisplayPath] = useState(false);

    const [buttonPressed, setButtonPressed] = useState(false);

    const onButtonPress = () => {
        setButtonPressed(!buttonPressed);
        updateMap(userLocation?.latitude, userLocation?.longitude);
    }

    const onDisplayPathButtonPress = () => {
        setDisplayPath(!displayPath);
    }

    const setDisplayChartTrue = (fillPercent) => {
        setFillPercent(fillPercent)
        console.log(fillPercent)
        setDisplayChart(true);
    }

    const setDisplayChartFalse = () => {
        setDisplayChart(false);
    }

    const getColor = (fillPercent) => {
        // red
        if (fillPercent >= 75) return '#FF0000'
        // orange
        if (fillPercent >= 50) return '#f39c12'
        // green
        return '#03AC0A'
    }

    useEffect(() => {
        if (!userLocation) return;
        firestore().collection('sensors').onSnapshot(snapshot => {
            // console.log(snapshot.docs.map(doc => ({...doc.data(), pinColor: 'black' } )))
            console.log("Firestore called")
            const result = snapshot.docs.map(doc => doc.data())
            console.log(result)
            const waypointsArray = []
            for (const element of result) {
                element.pinColor = getColor(element.fillPercent)
                if (element.fillPercent >= 50) {
                    waypointsArray.push({ latitude: element.latitude, longitude: element.longitude })
                }
            }
            setMarkers(result)
            setWaypoints(waypointsArray)
            console.log(waypoints)
            changeFarthestPoint(waypointsArray);
        })
    }, [userLocation])

    const changeFarthestPoint = (waypointsArray) => {
        if (!waypointsArray) return;
        if (!userLocation) return;
        var farthest = -1
        var farthestWaypoint = waypointsArray[0]
        for (const waypoint of waypointsArray) {
            console.log(userLocation, waypoint)
            const distanceFromUser = getDistance(userLocation, waypoint)
            if (distanceFromUser > farthest) {
                farthest = distanceFromUser
                farthestWaypoint = waypoint
            }
        }
        console.log("Waypoints array now: ", waypoints)
        console.log("Waypoints array ARRAY now: ", waypointsArray)
        console.log("Farthest waypoint: ", farthestWaypoint)
        setFarthestWaypoint(farthestWaypoint)
    }

    useEffect(() => {
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        })
            .then(location => {
                console.log("Current location:" + location);
                setUserLocation({
                    latitude: location.latitude,
                    longitude: location.longitude,
                })
            })
            .catch(error => {
                console.log("error here 68")
                const { code, message } = error;
                // console.warn(code, message);
            })
    }, [buttonPressed])

    // firestore()
    //     .collection('sensors').doc('sensor1').collection('current').doc('mostUpdated')
    //     .onSnapshot(querySnapshot => {
    //         console.log('Total fill!: ', querySnapshot.data().fillPercent);
    //         unsub();
    //         const fillPercent = querySnapshot.data().fillPercent;
    //         const pinColor = getColor(fillPercent)
    //         setMarkers([{
    //             pinColor: pinColor,
    //             latitude: 1.3542705139127935,
    //             longitude: 103.68681680968172,
    //             fillPercent: fillPercent,
    //         },])
    //     });
    // const observer = firestore().collection('sensors').doc('sensor1').collection('current').where('fillPercent', '>', 0)
    //     .onSnapshot(querySnapshot => {
    //         querySnapshot.docChanges().forEach(change => {
    //             if (change.type === 'modified') {
    //                 const fillPercent = change.doc.data().fillPercent;
    //                 const pinColor = getColor(fillPercent)
    //                 console.log(fillPercent);
    //                 setMarkers([{
    //                     pinColor: pinColor,
    //                     latitude: 1.3542705139127935,
    //                     longitude: 103.68681680968172,
    //                     fillPercent: fillPercent,
    //                 },])
    //             }
    //         });
    //     });

    // !!! want to change this to user current location from GPS
    const [region, setRegion] = useState({
        latitude: 1.3539,
        longitude: 103.6876,
        latitudeDelta: 0.025,
        longitudeDelta: 0,
    })

    const updateMap = (lat, lng) => {
        console.log("hi, here in map js")
        console.log(lat)
        console.log(lng)
        // setRegion(lat, lng, 0.0125, 0)
        mapRef.current.animateToRegion({
            latitude: lat,
            longitude: lng,
            latitudeDelta: 0.025,
            longitudeDelta: 0,
        }, 1000)
    }

    const [waypoints, setWaypoints] = useState()
    // [
    // {
    //     latitude: 1.3542705139127935,
    //     longitude: 103.68681680968172,
    // },
    //     {
    //         latitude: 1.3525529215105152,
    //         longitude: 103.68597186884016,
    //     },
    //     {
    //         latitude: 1.3527679900836764,
    //         longitude: 103.68947455572193,
    //     },
    //     {
    //         latitude: 1.3486837191389083,
    //         longitude: 103.68676775471977,
    //     },
    // ])

    const [markers, setMarkers] = useState()
    // [
    //     {
    //         pinColor: '#FF0000',
    //         latitude: 1.3542705139127935,
    //         longitude: 103.68681680968172,
    //         fillPercent: 95,
    //     },
    //     {
    //         pinColor: '#03AC0A',
    //         latitude: 1.3525529215105152,
    //         longitude: 103.68597186884016,
    //         fillPercent: 40,
    //     },
    //     {
    //         pinColor: '#f39c12',
    //         latitude: 1.3527679900836764,
    //         longitude: 103.68947455572193,
    //         fillPercent: 70,
    //     },
    //     {
    //         pinColor: '#FF0000',
    //         latitude: 1.3486837191389083,
    //         longitude: 103.68676775471977,
    //         fillPercent: 85,
    //     },
    // ])

    return (
        <View style={styles.container}>
            <MapView
                onPress={setDisplayChartFalse}
                style={styles.map}
                initialRegion={region}
                ref={mapRef}
                showsUserLocation={true}
                showsMyLocationButton={false}
            >
                {markers && markers.map((marker, index) => (
                    <Marker
                        onPress={() => setDisplayChartTrue(marker?.fillPercent)}
                        key={index}
                        pinColor={marker?.pinColor}
                        coordinate={{
                            latitude: marker?.latitude,
                            longitude: marker?.longitude
                        }}
                    >
                        <Icon
                            name='ios-trash-sharp'
                            size={40}
                            color={marker?.pinColor}
                        />

                        <Callout tooltip>
                            <View style={styles.bubble}>
                                <Text style={styles.name}>{Math.round(marker?.fillPercent)}% full</Text>

                            </View>
                        </Callout>
                    </Marker>
                ))}
                {waypoints && displayPath && <MapViewDirections
                    //green pointer to red pointer
                    origin={userLocation}
                    destination={farthestWaypoint}
                    waypoints={waypoints}
                    optimizeWaypoints={true}
                    mode={"WALKING"}
                    apikey={API_KEY}
                    strokeWidth={5}
                    strokeColor={'black'}
                    lineDashPattern={[5, 5]}
                />}
            </MapView>
            {waypoints?.length > 0 &&
                <ClearBinIcon waypoints={waypoints} updateMap={updateMap} waypointsLength={waypoints?.length} /> 
            }
            <GooglePlacesInput updateMap={updateMap} API_KEY={API_KEY} />
            <RowOfButtons onDisplayPathButtonPress={onDisplayPathButtonPress} onButtonPress={onButtonPress} />
            {displayChart &&
                <FillPercentCircle fillPercent={fillPercent} />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    circle: {
        alignItems: 'center'
    },

    fillPanelText: {
        margin: 20,
        fontWeight: 'bold',
        fontSize: 16,
        color: '#23484D',
    },

    bottomPanel: {
        width: '100%',
        alignSelf: 'center',
        borderRadius: 20,
        height: '30%',
        backgroundColor: '#fff'
    },

    map: {
        ...StyleSheet.absoluteFillObject,
        height: '100%',
    },

    container: {
        ...StyleSheet.absoluteFillObject,
        height: '100%',
    },

    bubble: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        backgroundColor: '#fff',
        borderRadius: 6,
        borderColor: '#ccc',
        borderWidth: 0.5,
        padding: 15,
        width: 100,
        height: 55,
    },

    arrow: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderTopColor: '#fff',
        borderWidth: 16,
        alignSelf: 'center',
        marginTop: -32,
    },

    arrowBorder: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderTopColor: '#007a87',
        borderWidth: 16,
        alignSelf: 'center',
        marginTop: -0.5,
    },

    name: {
        fontSize: 16,
        marginBottom: 5,
        color: 'black'
    },

    image: {
        width: 120,
        height: 80,
    },
});

export default Map