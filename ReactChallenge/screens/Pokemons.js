import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, ImageBackground, Animated, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import Name from '../components/name'
import Constants from 'expo-constants'
import nameBox from '../assets/nameBox.png'
import { PanGestureHandler, State, FlatList } from 'react-native-gesture-handler'
import { walkthroughable, copilot, CopilotStep } from 'react-native-copilot'
import { fetchPokemons, fetchNextPokemons } from '../store/actions/pokemonActions'
import { useSelector, useDispatch } from 'react-redux'

const WalkthroughableText = walkthroughable(Text); 
const WalkthroughableTextInput = walkthroughable(TextInput);
const WalkthroughableView = walkthroughable(View)

function pokemons (props) {

    const navigation = useNavigation()
    const dispatch = useDispatch()

    const pokemons = useSelector(state => state.pokemons)

    const [ next, setNext ] = useState(null)
    const [ search, setSearch ] = useState('')
    const [ left ] = useState( new Animated.Value(0) )

    useEffect( () => {
        dispatch(fetchPokemons())
        props.start()
    },[])

    useEffect( () => {
        setNext(pokemons.next)
    },[pokemons])

    const fetchNext = () => {
        dispatch(fetchNextPokemons({
            next: next
        }))
    }

    const submitSearch = () => {
        navigation.navigate('Detail',{
            url: `https://pokeapi.co/api/v2/pokemon/${search.text.toLowerCase()}/`
        })
        setSearch('')
    }

    const handlePanGesture = (event) => {
        event.nativeEvent.translationX>0
            ? left.setValue(0)
            : left.setValue(event.nativeEvent.translationX)
    }

    if(!pokemons) return null

    return (
        <PanGestureHandler 
            onGestureEvent= {handlePanGesture}
            onHandlerStateChange={ ({nativeEvent}) => {
                nativeEvent.state === State.END &&  nativeEvent.translationX <-100
                    ? navigation.navigate('Items')
                    : left.setValue(0)
                left.setValue(0)
            }}
        >
            <Animated.View style={[styles.container,{ left }]}>
                <View style={{flexDirection: 'row'}}>
                    <CopilotStep
                        text="You can access pokemon detail here"
                        order={2}
                        name="secondUniqueKey"
                    >
                    <WalkthroughableTextInput
                        style={{height: 40,width: 250,borderWidth: 2,borderColor:'black', opacity:0.8,fontFamily:'pokemon-font',paddingHorizontal: 20,marginRight:10}}
                        placeholder="Search pokemon!"
                        value={search}
                        onChangeText={ (text) => setSearch({text})}
                    />
                    </CopilotStep>
                    <ImageBackground source={nameBox} style={{width:90,height:35, alignSelf:"center",marginLeft:10}} resizeMode="cover">
                        <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
                        <CopilotStep
                            text="Press this button to submit search"
                            order={3}
                            name="thirdUniqueKey"
                        >
                            <WalkthroughableText onPress={ () => submitSearch() } style={{fontFamily:'pokemon-font',fontSize:10}}>Submit</WalkthroughableText>
                        </CopilotStep>
                        </View>
                    </ImageBackground>
                </View>
                <CopilotStep
                    text="This is the title of the page you are on."
                    order={1}
                    name="firstUniqueKey"
                >
                    <WalkthroughableText style={styles.title}>
                        {/* <Text style={{fontFamily: 'pokemon-font',fontSize: 24,marginTop:30}}>POKEMONS</Text> */}
                        POKEMONS
                    </WalkthroughableText>
                </CopilotStep>
                <CopilotStep
                    text="This is the list of pokemons, you can scroll to the bottom to load more, swipe left to go to Items Page"
                    order={4}
                    name="fourthUniqueKey"
                >
                    <WalkthroughableView style={{width:500}}>
                        <FlatList
                            onEndReached={ () => fetchNext()}
                            onEndReachedThreshold={0.05}
                            contentContainerStyle={{
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                            numColumns={2}
                            data={pokemons.results}
                            renderItem={({ item }) => (
                                <Name pokemon={{
                                    name: item.name,
                                    url: item.url,
                                    type: 'pokemon'
                                }} />
                            )}
                            keyExtractor={item => item.name}
                        />
                    </WalkthroughableView>
                </CopilotStep>
            </Animated.View>
        </PanGestureHandler>
    )

}

export default copilot()(pokemons)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop:Constants.statusBarHeight,
        alignItems: "center"
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        margin: 20,
        fontFamily:'pokemon-font'
    },
})