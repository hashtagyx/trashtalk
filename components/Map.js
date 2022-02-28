import React, { useState } from 'react'
import { StyleSheet, View, Text } from 'react-native';
import MapView from 'react-native-maps';
import { Marker, Callout } from 'react-native-maps';
import GooglePlacesInput from './GooglePlacesInput';
import ProgressCircle from 'react-native-progress-circle'

const Map = () => {
    const mapRef = React.createRef();

    const [displayChart, setDisplayChart] = useState(false);

    const [fillPercent, setFillPercent] = useState();

    const setDisplayChartTrue = (fillPercent) => {
        setFillPercent(fillPercent)
        console.log(fillPercent)
        setDisplayChart(true);
    }

    const setDisplayChartFalse = () => {
        setDisplayChart(false);
    }

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

    const [markers, setMarkers] = useState([
        {
            pinColor: 'blue',
            latitude: 1.3533,
            longitude: 103.6876,
            fillPercent: 95,
        },
        {
            pinColor: 'green',
            latitude: 1.3573,
            longitude: 103.6876,
            fillPercent: 85,
        },
        {
            pinColor: 'yellow',
            latitude: 1.3543,
            longitude: 103.6876,
            fillPercent: 75,
        },
        {
            pinColor: 'red',
            latitude: 1.3533,
            longitude: 103.6896,
            fillPercent: 65,
        },
    ])

    return (
        <View style={styles.container}>
            <MapView
                onPress={setDisplayChartFalse}
                style={styles.map}
                initialRegion={region}
                ref={mapRef}
                showsMyLocationButton={true}
                showsUserLocation={true}
            >
                {markers.map((marker, index) => (
                    <Marker
                        onPress={() => setDisplayChartTrue(marker.fillPercent)}
                        key={index}
                        pinColor={marker.pinColor}
                        coordinate={{
                            latitude: marker.latitude,
                            longitude: marker.longitude
                        }}
                    >
                        <Callout tooltip>
                            {/* <View> */}
                            <View style={styles.bubble}>
                                <Text style={styles.name}>{marker.fillPercent}% full</Text>
                            </View>
                            {/* </View> */}
                        </Callout>
                    </Marker>
                ))}
            </MapView>
            <GooglePlacesInput updateMap={updateMap} />
            {displayChart &&
                <View style={styles.bottomPanel}>
                    <Text style={styles.fillPanelText}>
                        Fill Chart
                    </Text>
                    <View style={styles.circle}>
                        <ProgressCircle
                            percent={fillPercent}
                            radius={50}
                            borderWidth={8}
                            color="#3399FF"
                            shadowColor="#999"
                            bgColor="#fff"
                        >
                            <Text style={{ fontSize: 18 }}>{fillPercent}%</Text>
                        </ProgressCircle>
                    </View>
                </View>}
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