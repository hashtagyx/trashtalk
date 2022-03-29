import React from 'react'
import { StyleSheet, View, TouchableHighlight } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const RowOfButtons = ( {onDisplayPathButtonPress, onButtonPress} ) => {
    return (
        <View style={styles.rowOfButtons}>
            <TouchableHighlight
                style={styles.button}
                underlayColor='grey'
                onPress={onDisplayPathButtonPress}
            >
                <MaterialIcon name={"directions-walk"} size={30} color="#01a699" />
            </TouchableHighlight>
            <TouchableHighlight
                style={styles.button}
                underlayColor='grey'
                onPress={onButtonPress}
            >
                <MaterialIcon name={"gps-fixed"} size={30} color="#01a699" />
            </TouchableHighlight>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        borderWidth: 1,
        borderColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        width: 70,
        height: 70,
        backgroundColor: '#fff',
        borderRadius: 50,
    },

    rowOfButtons: {
        flexDirection:'row', 
        justifyContent:'space-between', 
        margin:15, 
        marginBottom: 30
    },
})

export default RowOfButtons