import { View, Text, StyleSheet, Button, Image, Dimensions } from 'react-native';
import React from 'react';

import TitleText from '../components/TitleText';
import BodyStyle from '../components/BodyStyle';
import Colors from '../Constants/Colors';
import MainButton from '../components/MainButton';
import { ScrollView } from 'react-native';

export default function GameOverScreen(props) {
    return (
        <ScrollView>
            <View style={style.screen}>
                <TitleText>The Game Is Over!</TitleText>
                <View style={style.imageContainer}>
                    <Image
                        fadeDuration={1000}
                        // source={require('../assets/sucess.jpg')} 
                        source={{ uri: 'https://hips.hearstapps.com/digitalspyuk.cdnds.net/13/51/justin-bieber-hands.jpg' }}
                        style={style.image}
                        resizeMode='contain'
                    />
                </View>
                <View style={style.bodyContainer}>
                    <BodyStyle style={style.resultBody}>Your phone need <Text style={style.highlight}>{props.rounds}</Text> rounds to guess the number <Text style={style.highlight}>{props.number}</Text></BodyStyle>
                </View>

                <MainButton onPress={props.restartGame} >START NEW GAME</MainButton>
            </View>
        </ScrollView>
    );
}

const style = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    imageContainer: {
        width: Dimensions.get('window').width * .7,
        height: Dimensions.get('window').width * .7,
        borderRadius: 150,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: 20,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    highlight: {
        fontFamily: 'open-sans-bold',
        color: Colors.primary,
    },
    resultBody: {
        fontSize: 20,
        textAlign: 'center',
    },
    bodyContainer: {
        margin: 10,
    }
});
