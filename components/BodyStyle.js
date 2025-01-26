import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function BodyStyle(props) {
  return (
      <Text style={{...style.body,...props.style}}>{props.children}</Text>
  )
}

const style = StyleSheet.create({
    body:{
        fontFamily:'open-sans',
        fontSize:14,
    }
})