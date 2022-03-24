import React from 'react'
import ProgressCircle from 'react-native-progress-circle'
import CircularProgress from 'react-native-circular-progress-indicator';
import { StyleSheet, View, Text } from 'react-native';

const FillPercentCircle = ( {fillPercent} ) => {
    const getColour = () => {
        // red
        if (fillPercent >= 75) return '#FF0000'
        // orange
        if (fillPercent >= 50) return '#f39c12'
        // green
        return '#03AC0A'
    }
    return (
        <View style={styles.bottomPanel}>
            <Text style={styles.fillPanelText}>
                Fill Chart
            </Text>
            <View style={styles.circle}>
                {/* <ProgressCircle
                    percent={fillPercent}
                    radius={50}
                    borderWidth={8}
                    color="#3399FF"
                    shadowColor="#999"
                    bgColor="#fff"
                >
                    <Text style={{ fontSize: 18 }}>{fillPercent}%</Text>
                </ProgressCircle> */}
                <CircularProgress 
                value={fillPercent} 
                valueSuffix={'%'} 
                activeStrokeColor={getColour()}
                textColor={getColour()}
                />
            </View>
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
});

export default FillPercentCircle