import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Alert,
  FlatList,
  Dimensions,
} from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';

import NumberContainer from '../components/NumberContainer'; 
import Card from '../components/Card';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';
import BodyStyle from '../components/BodyStyle';

function generateRandomBetween(min, max, exclude) {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

const renderListItems = (listLength, itemData) => (
  <View style={styles.listItem}>
    <BodyStyle>#{listLength - itemData.index}</BodyStyle>
    <BodyStyle>{itemData.item}</BodyStyle>
  </View>
);

export default function GameScreen(props) {
  const initialGuess = generateRandomBetween(1, 100, props.userChoice);

  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
  const [availableDeciceWidth, setAvailableDeciceWidth] = useState(
    Dimensions.get('window').width
  )

  const [availableDeciceHeight, setAvailableDeciceHeight] = useState(
    Dimensions.get('window').height
  )

  useEffect(() => {
    const updateLayout = () => {
      setAvailableDeciceHeight(Dimensions.get('window').height);
      setAvailableDeciceWidth(Dimensions.get('window').width);
    }

    const dimAdd = Dimensions.addEventListener('change', updateLayout);
    return () => {
      dimAdd.remove();
    }
  })

  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const { userChoice, onGameOver } = props;

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const nextGuessHandler = (direction) => {
    if (
      (direction === 'lower' && currentGuess < userChoice) ||
      (direction === 'higher' && currentGuess > userChoice)
    ) {
      Alert.alert("Don't lie!", 'You know this is wrong...', [
        { text: 'Sorry!', style: 'cancel' },
      ]);
      return;
    }

    if (direction === 'lower') {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }
    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);
    setPastGuesses((curPastGuesses) => [
      nextNumber.toString(),
      ...curPastGuesses,
    ]);
  };

  let listContainerStyle = styles.listContainer;
  if (setAvailableDeciceWidth > 350) {
    listContainerStyle = styles.listContainerBig;
  }

  if (availableDeciceHeight < 600) {
    return (
      <View style={styles.screen}>
        <TitleText>Computer's Guess</TitleText>
        <View style={styles.control}>
          <MainButton onPress={() => nextGuessHandler('lower')}>
            <Ionicons name="remove-outline" size={24} color="white" />
          </MainButton>
          <NumberContainer>{currentGuess}</NumberContainer>
          <MainButton onPress={() => nextGuessHandler('higher')}>
            <FontAwesome6 name="add" size={24} color="white" />
          </MainButton>
        </View>
        <View style={listContainerStyle}>
          <FlatList
            keyExtractor={(item) => item}
            data={pastGuesses}
            renderItem={renderListItems.bind(this, pastGuesses.length)}
            contentContainerStyle={styles.list}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <TitleText>Computer's Guess</TitleText>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton onPress={() => nextGuessHandler('lower')}>
          <Ionicons name="remove-outline" size={24} color="white" />
        </MainButton>
        <MainButton onPress={() => nextGuessHandler('higher')}>
          <FontAwesome6 name="add" size={24} color="white" />
        </MainButton>
      </Card>
      <View style={listContainerStyle}>
        <FlatList
          keyExtractor={(item) => item}
          data={pastGuesses}
          renderItem={renderListItems.bind(this, pastGuesses.length)}
          contentContainerStyle={styles.list}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
    width: 300,
    maxWidth: '90%',
  },
  list: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  listItem: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
  listContainer: {
    flex: 1,
    width: '60%',
  },
  listContainerBig: {
    flex: 1,
    width: '80%',
  },
  control: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '80%',
  }
});
