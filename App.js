import React, { useState, useEffect, useRef } from 'react';
import { TextInput, Button, View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import axios from 'axios';
import ConfettiCannon from 'react-native-confetti-cannon';
import { styles } from "./styles";

const wordList = ['love', 'sun', 'moon', 'tree', 'star', 'sea', 'sky', 'cloud', 'flower', 'rain',
                'wind', 'mountain', 'river', 'ocean', 'breeze', 'snow', 'sand', 'grass', 'bird', 'butterfly',
                'hope', 'peace', 'joy', 'friendship', 'smile', 'laughter', 'happiness', 'dream', 'sunset', 'dawn',
                'color', 'music', 'dance', 'silence', 'serenity', 'reflection', 'adventure', 'journey', 'magic', 'sparkle',
                'whisper', 'echo', 'harmony', 'fragrance', 'wisdom', 'inspiration', 'courage', 'faith', 'kindness',
                'compassion', 'gratitude', 'beauty', 'wonder', 'imagination', 'strength', 'glimmer', 'treasure', 'bliss',
                'tranquility', 'laughter', 'melody', 'joy', 'peace', 'contentment', 'harmony', 'blessing', 'grace',
                'serendipity', 'delight', 'whimsy', 'euphoria', 'wanderlust', 'nectar', 'elixir', 'whisper', 'mystery'];

const RhymeFinder = () => {
  const [word, setWord] = useState('');
  const [rhymes, setRhymes] = useState([]);
  const [wordToCheck, setWordToCheck] = useState('');
  const [foundRhymes, setFoundRhymes] = useState([]);
  const [celebrate, setCelebrate] = useState(false);
  const confettiRef = useRef(null);

  useEffect(() => {
    getRandomWordAndRhymes();
  }, []);

  useEffect(() => {
    if (foundRhymes.length === 20) {
      setCelebrate(true);
    }
  }, [foundRhymes]);

  const getRandomWord = () => {
    return wordList[Math.floor(Math.random() * wordList.length)];
  };

  const getRandomWordAndRhymes = async () => {
    const randomWord = getRandomWord();
    try {
      const response = await axios.get(`https://rhymebrain.com/talk?function=getRhymes&word=${randomWord}`);
      setWord(randomWord);
      setRhymes(response.data);
      setFoundRhymes([]); // Clear found rhymes
    } catch (error) {
      console.error('Error fetching rhymes:', error);
      setWord(''); // Clear word on error
      setRhymes([]); // Clear rhymes on error
      setFoundRhymes([]); // Clear found rhymes on error
    }
  };

  const checkWord = () => {
    const lowercaseWordToCheck = wordToCheck.toLowerCase();
    const foundWord = rhymes.find(rhyme => rhyme.word.toLowerCase() === lowercaseWordToCheck);
    if (foundWord && !foundRhymes.includes(foundWord.word)) {
      console.log(`Found matching rhyme: ${foundWord.word}`);
      setFoundRhymes(prevRhymes => [...prevRhymes, foundWord.word]);
    }
  };

  const refreshRhymes = () => {
    getRandomWordAndRhymes();
    setCelebrate(false); // Reset celebrate state
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerco}>
        <Text style={styles.header}>Word: {word}</Text>
        <TouchableOpacity style={[styles.refresh, { marginTop: 20 }]} onPress={refreshRhymes}>
        <Image style={styles.img} source={require("./assets/refresh.png")}/>
      </TouchableOpacity>
      </View>


      <View style={{ marginTop: 20 }}>
        <TextInput
          placeholder="Enter a word to check"
          value={wordToCheck}
          onChangeText={setWordToCheck}
        />
        <TouchableOpacity style={styles.button} onPress={checkWord}>
          <Text style={styles.buttonText}>Check</Text>
        </TouchableOpacity>
      </View>

      {celebrate && (
        <View style={{ alignItems: 'center', marginBottom: 20 }}>
          <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: 'green', marginBottom: 10 }}>🎉 Celebration Time! 🎉 You have reached the goal of 20 rhyming words!!!!</Text>
          <ConfettiCannon
            count={200}
            origin={{ x: -10, y: 0 }}
            autoStart={true}
            ref={confettiRef}
          />
        </View>
      )}

      {foundRhymes.length > 0 && !celebrate && (
        <View style={{ marginBottom: 20 }}>
          <Text style={styles.title} >Found Rhymes ({foundRhymes.length}):</Text>
          {[...foundRhymes].map((foundRhyme, index) => (
            <Text style={styles.match} key={index}>◦ {foundRhyme}</Text>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

export default RhymeFinder;
