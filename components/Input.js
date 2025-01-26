import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'

export default function Input(props) {
  return (
    <TextInput {...props} style={{...style.input,...props.style}}></TextInput>
  )
}

const style = StyleSheet.create({
    input:{
        height:40,
        borderBottomColor:'grey',
        borderBottomWidth:1,
        marginVertical:10,
    }
})

