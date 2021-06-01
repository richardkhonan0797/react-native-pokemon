import React, { useEffect,useState } from 'react'
import { Text,View,StyleSheet,ActivityIndicator, Image } from 'react-native'
import {ScrollView} from 'react-native-gesture-handler'
import { fetchItemDetail } from '../store/actions/itemActions'
import { useSelector, useDispatch } from 'react-redux'

export default function detailItem (props) {

    const dispatch = useDispatch()

    const data = useSelector( state => state.items.detail)

    useEffect( () => {
        dispatch(fetchItemDetail({
            url: props.route.params.url
        }))
    },[])

    if(!data) {
        return <ActivityIndicator size="large" color="#00ff00"/>
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
                            source={{ uri: data.sprites.default }} 
                            style={{width:300,height:250,backgroundColor:'white'}}
                        />
                    </View>
                </View>
            </View>
            <Text style={{fontFamily: 'pokemon-font',textTransform: "uppercase",marginTop:20, fontSize:20}}>
                {data.name}
            </Text>
            <View style={{flex:1,marginBottom:30,marginTop:20}}>
                <Text style={{fontFamily: 'pokemon-font',alignSelf:"center",paddingVertical:20, borderTopColor:'black',borderTopWidth:4,width:200,textAlign:"center"}}>Effect</Text>
                {
                    data.effect_entries.map( item => {
                        return (
                            <View style={styles.outer}>
                                <View style={styles.middle}>
                                    <View style={styles.inner}>
                                        <Text style={{fontFamily: 'pokemon-font', textAlign:"center", fontSize:10, width: 300, padding:20}}>{item.effect}</Text>
                                    </View>
                                </View>
                            </View>
                        )
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