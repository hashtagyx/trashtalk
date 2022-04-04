import React from 'react'
import CircularProgress from 'react-native-circular-progress-indicator';
import { StyleSheet, View, Text, Dimensions, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import { BarChart } from 'react-native-chart-kit'

const FillPercentCircle = ({ fillPercent }) => {
    const getColour = () => {
        // red
        if (fillPercent >= 75) return '#FF0000'
        // orange
        if (fillPercent >= 50) return '#f39c12'
        // green
        return '#03AC0A'
    }

    // const data = {
    //     labels: ["5am", "6am", "7am", "8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm",],
    //     datasets: [
    //         {
    //             data: [70, 100, 20, 45, 28, 80, 99, 43, 30, 95, 85,]
    //         },
    //     ]
    // };

    return (
        <View style={styles.bottomPanel}>
            <Swiper>
                <View>
                    <Text style={styles.fillPanelText}>
                        Fill Chart
                    </Text>
                    <View style={styles.circle}>
                        <CircularProgress
                            value={fillPercent}
                            valueSuffix={'%'}
                            activeStrokeColor={getColour()}
                            textColor={getColour()}
                        />
                    </View>
                </View>
                <Image source={require("../assets/barchart.jpg")} style={{height: '80%', width: '100%', marginTop: 10}}/>
                {/* <BarChart
                    style={{
                        marginTop:20,
                        marginBottom:20,
                        borderRadius: 0,
                        // alignSelf: 'center',
                    }}
                    data={data}
                    fromZero={true}
                    width={Dimensions.get("window").width * 0.95}
                    height={Dimensions.get("window").height * 0.25}
                    yAxisSuffix="%"
                    yAxisInterval={25}
                    chartConfig={{
                        barPercentage: 0.35,
                        backgroundColor: "white",
                        backgroundGradientFrom: "white",
                        backgroundGradientTo: "white",
                        fillShadowGradient: 'black',
                        fillShadowGradientOpacity: 1,
                        decimalPlaces: 0, // optional, defaults to 2dp
                        labelColor: () => 'black',
                        color: () => 'transparent',
                        style: {
                            borderRadius: 16,
                            marginVertical:8,
                            padding:5,
                            paddingRight:0,
                        },
                    }}
                    verticalLabelRotation={315}
                /> */}
            </Swiper>
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
        height: '35%',
        backgroundColor: '#fff'
    },
});

export default FillPercentCircle