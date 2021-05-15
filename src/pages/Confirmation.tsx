import React from 'react';
import { 
  Image,
  SafeAreaView, 
  StyleSheet,
  Text,
  View
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/core';

import { Button } from '../components/Button';

import colors from '../styles/colors'; 
import fonts from '../styles/fonts';

import SmillingFaceImg from '../assets/emojis/smilling-face-2.png'; 
import HuggingFaceImg from '../assets/emojis/hugging-face.png'; 

interface Params {
  title: string;
  subtitle: string;
  buttonTitle: string;
  icon: 'smile' | 'hug';
  nextScreen: string;
}

const emojis = {
  smile: SmillingFaceImg,
  hug: HuggingFaceImg,
}

export function Confirmation() {
  const navigation = useNavigation();

  const routes = useRoute();

  const {
    title,
    subtitle,
    buttonTitle,
    icon,
    nextScreen,
  } = routes.params as Params;

  function handleMoveOn() {
    navigation.navigate(nextScreen);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image source={emojis[icon]} resizeMode="contain" />
      
        <Text style={styles.title}>{ title }</Text>

        <Text style={styles.subtitle}>{ subtitle }</Text>

        <View style={styles.footer}>
          <Button 
            title={buttonTitle} 
            disabled={false} 
            onPress={handleMoveOn}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

    width: '100%',
  },

  title: {
    marginTop: 64,

    color: colors.heading,
    
    fontSize: 24,
    fontFamily: fonts.heading,    
    textAlign: 'center',
    lineHeight: 30,
  },

  subtitle: {
    width: 340,

    marginTop: 16,

    color: colors.heading,

    fontSize: 17,
    fontFamily: fonts.text,
    textAlign: 'center',
    lineHeight: 25,
  },

  footer: {
    width: '65%',
    marginTop: 40,
  },
});
