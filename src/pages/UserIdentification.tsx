import React, { useState } from 'react';
import { 
  SafeAreaView, 
  StyleSheet, 
  Image, 
  TextInput, 
  View, 
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Button } from '../components/Button';

import GrinningFaceImg from '../assets/emojis/grinning-face.png'; 
import SmillingFaceImg from '../assets/emojis/smilling-face.png'; 

import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function UserIdentification() {
  const navigation = useNavigation();

  async function handleSubmit() {
    try {
      await AsyncStorage.setItem('@plantmanager:user', name);
  
      navigation.navigate('Confirmation', {
        title: 'Prontinho',
        subtitle: 'Agora vamos começar a cuidar das suas plantinhas com muito cuidado.',
        buttonTitle: 'Começar',
        icon: 'smile',
        nextScreen: 'PlantSelection',
      });
      
    } catch {
      Alert.alert('Não foi possível salvar seu nome. 😥')
    }
  }

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [name, setName] = useState('');

  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!name);
  }

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputChange(value: string) {
    setIsFilled(!!value);
    setName(value);
  } 

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            <View style={styles.form}>
              <View style={styles.header}>
                <Image 
                  source={isFilled ? SmillingFaceImg : GrinningFaceImg} 
                  resizeMode="contain" 
                />

                <Text style={styles.inputLabel}>Como podemos chamar você?</Text>

                <TextInput 
                  style={[
                    styles.input,
                    (isFocused || isFilled) && { borderColor: colors.green }
                  ]}
                  placeholder="Digite um nome" 
                  placeholderTextColor={colors.gray} 
                  onBlur={handleInputBlur}
                  onFocus={handleInputFocus}
                  onChangeText={handleInputChange}
                />
              </View>

              <View style={styles.footer}>
                <Button 
                  title="Confirmar" 
                  disabled={isFilled ? false : true} 
                  onPress={handleSubmit}
                />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',

    width: '100%',
  },

  content: {
    flex: 1,
    width: '100%',
  },

  form: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

    paddingHorizontal: 54,
  },

  header: {
    alignItems: 'center',
    width: '100%',
  },

  inputLabel: {
    width: 190,

    marginTop: 24,

    color: colors.heading,

    fontSize: 24,
    fontFamily: fonts.heading,
    textAlign: 'center', 
    lineHeight: 32,
  },

  input: {
    width: '100%',
    
    marginVertical: 40,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: colors.gray,

    color: colors.heading,

    fontSize: 18,
    textAlign: 'center',
  },

  footer: {
    width: '85%',
  },
});
