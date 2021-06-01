import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

export default function tag (props) {
    return (
        <View style={[styles.outer,{margin:10,backgroundColor:'white'}]}>
            <View style={styles.middle}>
                <View style={styles.inner}>
                    <Text style={{
                        padding: 10,
                        fontFamily: 'pokemon-font',
                        fontSize: 10
                    }}>{props.data.name}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    inner: {
        borderWidth: 2,
        borderColor: 'black'
    },
    middle: {
        borderWidth: 1,
        borderColor: 'white'
    },
    outer: {
        borderWidth: 1,
        borderColor: 'black'
    }
})