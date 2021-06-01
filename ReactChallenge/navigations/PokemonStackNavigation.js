import React, { useState } from 'react'
import {Text} from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import PokemonDetail from '../screens/PokemonDetail'
import Pokemons from '../screens/Pokemons'

const Stack = createStackNavigator()

export default function pokemonNavigation () {


    return (
        <>
            <Stack.Navigator>
                <Stack.Screen
                    name="Pokemons"
                    component={Pokemons}
                    options={{
                        headerTitle: (
                            <Text style={{fontFamily: 'pokemon-font'}}>POKèMON</Text>
                        ),
                        headerTitleAlign: "center",
                    }}
                />
                <Stack.Screen
                    name="Detail" 
                    component={PokemonDetail}
                    options={{
                        headerTitle: (
                            <Text style={{fontFamily: 'pokemon-font'}}>Detail</Text>
                        )
                    }}
                />
            </Stack.Navigator>
        </>
    )
}

pokemonNavigation.navigationOptions = {
    
}