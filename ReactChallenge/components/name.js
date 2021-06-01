import React, { useState } from 'react'
import { Text, TouchableOpacity, View, StyleSheet, ImageBackground } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import nameBox from '../assets/nameBox.png'
import * as Font from 'expo-font'
import { AppLoading } from 'expo'

export default function name (props) {

    const navigation = useNavigation()

    const [ fontLoaded, setFontLoaded ] =useState(false)

    const handlePress = () => {
        if(props.pokemon) 
        navigation.navigate('Detail',{
            url: props.pokemon.url
        })
        else 
        navigation.navigate('Detail',{
            url: props.item.url
        })
    }

    const fetchFont = () => {
        return Font.loadAsync({
            'pokemon-font': require('../assets/font/Press_Start_2P/PressStart2P-Regular.ttf')
        })
    }

    if(!fontLoaded) {
        return (
            <AppLoading
                startAsync={fetchFont}
                onFinish={() => setFontLoaded(true)}
            />
        )
    }

    return (
        <TouchableOpacity onPress={handlePress}>
            <ImageBackground source={nameBox} style={styles.container}>
                <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
                {
                    props.pokemon
                        ? <Text onPress={() => handlePress()} style={{fontFamily:'pokemon-font',textTransform:'uppercase'}}>{props.pokemon.name}</Text>
                        : <Text style={{fontFamily:'pokemon-font',textTransform:'uppercase'}}>{props.item.name}</Text>
                }
                </View>
            </ImageBackground>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: 'center',
        marginHorizontal: 10,
        marginVertical: 20,
        resizeMode: 'stretch', // or 'stretch'
        textAlign: "center",
        width: 180,
        height: 70
    },
})