import React, { useEffect,useState } from 'react'
import { Text,View,StyleSheet,ActivityIndicator, Image } from 'react-native'
import Tag from '../components/tag'
import {FlatList, ScrollView} from 'react-native-gesture-handler'
import { useSelector, useDispatch } from 'react-redux'
import { fetchPokemonDetail } from '../store/actions/pokemonActions'

export default function detail (props) {

    const dispatch = useDispatch()

    const pokemon = useSelector(state => state.pokemons.detail)

    useEffect( () => {
        dispatch(fetchPokemonDetail({
            url: props.route.params.url
        }))
    },[])
    
    if(!pokemon) {
        return (
            <ActivityIndicator size="large" color="#00ff00"/>
        )
    }
    return (
        <ScrollView contentContainerStyle={{
            alignItems:"center",
            marginTop: 20,
        }}>
            <View style={styles.outer}>
                <View style={styles.middle}>
                    <View style={styles.inner}>
                        <Image 
                            source={{ uri: pokemon.sprites.front_default }} 
                            style={{width:300,height:250,backgroundColor:'white'}}
                        />
                    </View>
                </View>
            </View>
            <Text style={{fontFamily: 'pokemon-font',textTransform: "uppercase",marginTop:20, fontSize:20}}>
                {pokemon.name}
            </Text>
            <View style={{flexDirection: 'column',marginTop:10}}>
                <Text style={{fontFamily: 'pokemon-font',alignSelf:"center"}}>Abilities</Text>
                <View style={{flexDirection: 'row'}}>
                    {
                        pokemon.abilities.map( pokemon => {
                            return <Tag data={{
                                name: pokemon.ability.name
                            }} />
                        })
                    }
                </View>
            </View>
            <View style={{flexDirection: 'column',marginTop:10, flex: 1}}>
                <Text style={{fontFamily: 'pokemon-font',alignSelf:"center"}}>Moves</Text>
                <View style={{ height: 240, padding: 10}}>
                    <FlatList
                        data={pokemon.moves}
                        numColumns={2}
                        columnWrapperStyle={{
                            alignSelf:'center'
                        }}
                        renderItem={ ({item}) => <Tag data={{name:item.move.name}} />}
                        keyExtractor={item => item.move.name}
                    />
                </View>
            </View>
            <View style={{flex:1,marginBottom:30,marginTop:20}}>
                <Text style={{fontFamily: 'pokemon-font',alignSelf:"center"}}>Stats</Text>
                {
                    pokemon.stats.map( pokemon => {
                        return <Text key={pokemon.name} style={{fontFamily: 'pokemon-font', fontSize:10}}>{pokemon.stat.name}: {pokemon.base_stat}</Text>
                    })
                }
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    inner: {
        borderWidth: 5,
        borderColor: 'black'
    },
    middle: {
        borderWidth: 3,
        borderColor: 'white'
    },
    outer: {
        borderWidth: 3,
        borderColor: 'black'
    }
})