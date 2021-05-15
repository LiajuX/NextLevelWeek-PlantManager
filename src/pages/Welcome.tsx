import React from 'react';
import { 
  SafeAreaView, 
  Text, 
  Image, 
  TouchableOpacity, 
  StyleSheet, 
  Dimensions,
  View
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { Feather } from '@expo/vector-icons';

import wateringImg from '../assets/watering.png';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function Welcome() {
  const navigation = useNavigation();

  function handleNavigateToUserIdentification() {
    navigation.navigate('UserIdentification');
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>
          Gerencie {'\n'} suas plantas de forma fácil.
        </Text>

        <Image 
          source={wateringImg} 
          resizeMode="contain" 
          style={styles.image} 
        />

        <Text style={styles.subtitle}>
          Não esqueça mais de regar suas plantas. 
          Nós cuidamos de lembrar você sempre que precisar.
        </Text>

        <TouchableOpacity 
          activeOpacity={0.7} 
          style={styles.button}
          onPress={handleNavigateToUserIdentification}
        >
          <Feather name="chevron-right" style={styles.buttonIcon} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  
    paddingHorizontal: 20,
  },

  title: {
    width: 255,
    marginTop: 58,

    color: colors.heading,
    
    fontSize: 32,
    fontFamily: fonts.heading,    
    textAlign: 'center',
    lineHeight: 38,
  },

  image: {
    height: Dimensions.get('window').width * 0.7,
  },

  subtitle: {
    width: 380,

    paddingHorizontal: 20,

    color: colors.heading,

    fontSize: 17,
    fontFamily: fonts.text,
    textAlign: 'center',
    lineHeight: 25,
  },

  button: {
    alignItems: 'center',
    justifyContent: 'center', 

    width: 56,
    height: 56,

    marginBottom: 10,
    borderRadius: 16,

    backgroundColor: colors.green,
  },

  buttonIcon: {
    color: colors.white,
    fontSize: 22,
  }
});
