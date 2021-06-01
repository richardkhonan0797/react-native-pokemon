import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Items from './ItemStackNavigation'
import PokemonStack from './PokemonStackNavigation'
import { Image } from 'react-native'
import Pikachu from '../assets/pikachuSprite.png'
import Pokeball from '../assets/Pokeball.png'

export default function navigation () {

    const Tab = createBottomTabNavigator()

    return (
        <Tab.Navigator tabBarOptions={{
          labelStyle: {
            fontFamily: 'pokemon-font'
          }
        }}>
          <Tab.Screen options={{
            tabBarIcon: ({focused}) => focused 
            ? <Image source={Pikachu} style={{width:30,height:30}} />
            : <Image source={Pikachu} style={{width:30,height:30}} />,
          }} name="Pokemons" component={PokemonStack} />
          <Tab.Screen options={{
            tabBarIcon: ({focused}) => focused 
            ? <Image source={Pokeball} style={{width:30,height:30}} />
            : <Image source={Pokeball} style={{width:30,height:30}} />,
          }} name="Items" component={Items} />
        </Tab.Navigator>
    )
}