import React, { useState } from 'react'
import { View, Text } from 'react-native';
import IconBadge from 'react-native-icon-badge';
import Octicon from 'react-native-vector-icons/Octicons'

const ClearBinIcon = ( {waypoints, updateMap, waypointsLength} ) => {

    const [number, setNumber] = useState(0)

    const iconBadgeTapped = () => {
        console.log('TAPPED')
        
        setNumber((number + 1) % waypointsLength)
        updateMap(waypoints[number].latitude, waypoints[number].longitude)
    }

    return (
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignSelf: 'flex-end', flex: 1, position: 'absolute', right: '4%', top: '15%' }}>
            <IconBadge
                MainElement={
                    <Octicon
                        name='alert'
                        size={65}
                        color='black'
                        onPress={iconBadgeTapped}
                    />
                }
                BadgeElement={
                    <Text style={{ color: '#FFFFFF' }}>{waypointsLength}</Text>
                }
                IconBadgeStyle={
                    {
                        width: 20,
                        height: 20,
                        backgroundColor: 'red'
                    }
                }
                Hidden={waypointsLength == 0}
            />
        </View>
    )
}

ClearBinIcon.defaultProps = {
    waypoints: []
}

export default ClearBinIcon