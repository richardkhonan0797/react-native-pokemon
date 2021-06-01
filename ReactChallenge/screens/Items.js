import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, ImageBackground, Animated, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import Name from '../components/name'
import Constants from 'expo-constants'
import nameBox from '../assets/nameBox.png'
import { PanGestureHandler, State, FlatList } from 'react-native-gesture-handler'
import { useSelector, useDispatch } from 'react-redux'
import { fetchItems, fetchNextItems } from '../store/actions/itemActions'

export default function items () {

    const navigation = useNavigation()
    const dispatch = useDispatch()

    const items = useSelector( state => state.items )

    const [search,setSearch] = useState('')
    const [ right ] =  useState( new Animated.Value(0) )

    useEffect( () => {
        dispatch(fetchItems())
    },[])

    const submitSearch = () => {
        navigation.navigate('Detail',{
            url: `https://pokeapi.co/api/v2/item/${search.text.toLowerCase()}/`
        })
        setSearch('')
    }

    const handlePanGesture = (event) => {
        event.nativeEvent.translationX<0
            ? right.setValue(0)
            : right.setValue(-event.nativeEvent.translationX)
    }

    const fetchNext = () => {
        dispatch(fetchNextItems({
            next: items.next
        }))
    }

    if (items.results === null) return (
        <ActivityIndicator size="large" color="#00ff00"/>
    )

    return (
        <>
        <PanGestureHandler 
            onGestureEvent= {handlePanGesture}
            onHandlerStateChange={ ({nativeEvent}) => {
                nativeEvent.state === State.END &&  nativeEvent.translationX > 100
                    ? navigation.navigate('Pokemons')
                    : right.setValue(0)
                right.setValue(0)
            }}
        >
            <Animated.View style={[styles.container,{ right }]}>
                <View style={{flexDirection: 'row'}}>
                    <TextInput
                        style={{height: 40,width: 250,borderWidth: 2,borderColor:'black', opacity:0.8,fontFamily:'pokemon-font',paddingHorizontal: 20,marginRight:10}}
                        placeholder="Search item!"
                        value={search}
                        onChangeText={ (text) => setSearch({text})}
                    />
                    <ImageBackground source={nameBox} style={{width:90,height:35, alignSelf:"center",marginLeft:10}} resizeMode="cover">
                        <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
                            <Text onPress={ () => submitSearch() } style={{fontFamily:'pokemon-font',fontSize:10}}>Submit</Text>
                        </View>
                    </ImageBackground>
                </View>
                <Text style={{fontFamily: 'pokemon-font',fontSize: 24,marginTop:30}}>ITEMS</Text>
                <FlatList
                    onEndReached={() => fetchNext()}
                    onEndReachedThreshold={0.05}
                    contentContainerStyle={{
                        alignItems: "center",
                        justifyContent: 'center',
                    }}
                    numColumns={2}
                    data={items.results}
                    renderItem={({ item }) => (
                        <Name item={{
                            name: item.name,
                            url: item.url,
                            type: 'item'
                        }} />
                    )}
                    keyExtractor={item => item.name}
                />
            </Animated.View>
        </PanGestureHandler>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop:Constants.statusBarHeight,
        alignItems: "center"
    }
})