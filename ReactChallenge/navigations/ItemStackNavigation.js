import React from 'react'
import { Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import Items from '../screens/Items'
import Detail from '../screens/ItemDetail'

const Stack = createStackNavigator()

export default function itemStack () {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                options={{
                    headerTitle: <Text style={{fontFamily: 'pokemon-font'}}>POKèMON</Text>,
                    headerTitleAlign: 'center'
                }} 
                component={Items}
                name="Items" />
            <Stack.Screen 
                options={{
                    headerTitle: <Text style={{fontFamily: 'pokemon-font'}}>Detail</Text>,
                    headerTitleAlign: 'center'
                }}
                name="Detail"
                component={Detail}
            />
        </Stack.Navigator>
    )
}