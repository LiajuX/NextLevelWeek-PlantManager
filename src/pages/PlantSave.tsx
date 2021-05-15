import React, { useState } from 'react';
import { 
  Alert,
  Image, 
  Platform, 
  ScrollView, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View
} from 'react-native';
import { SvgFromUri } from 'react-native-svg';
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper';
import { useNavigation, useRoute } from '@react-navigation/core';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import { format, isBefore } from 'date-fns';

import { PlantProps, savePlant } from '../libs/storage';

import { Button } from '../components/Button';

import waterdropImg from '../assets/waterdrop.png';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface Params {
  plant: PlantProps;
}

export function PlantSave() {
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(Platform.OS === 'ios'); 

  const navigation = useNavigation();

  const route = useRoute();

  const { plant } = route.params as Params;

  function handleTimeChange(event: Event, dateTime: Date | undefined) {
    if (Platform.OS === 'android') {
      setShowDatePicker(oldState => !oldState);
    }

    if (dateTime && isBefore(dateTime, new Date())) {
      setSelectedDateTime(new Date());

      return Alert.alert('Escolha uma hora no futuro! ⏰');
    }

    if (dateTime) {
      setSelectedDateTime(dateTime);    
    }
  }

  function handleOpenDateTimePickerOnAndroid() {
    setShowDatePicker(oldState => !oldState);
  }
  
  async function handleSave() {
    try {
      await savePlant({
        ...plant,
        dateTimeNotification: selectedDateTime,
      });

      navigation.navigate('Confirmation', {
        title: 'Tudo certo',
        subtitle: 'Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha com bastante amor.',
        buttonTitle: 'Muito obrigado :D',
        icon: 'hug',
        nextScreen: 'MyPlants',
      });

    } catch {
      Alert.alert('Não foi possível cadastrar a planta. 😥')
    }
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <View style={styles.container}>
        <View style={styles.plantInfo}>
          <SvgFromUri uri={plant.photo} width={166} height={186} />

          <Text style={styles.plantName}>{ plant.name }</Text>
          
          <Text style={styles.plantAbout}>{ plant.about }</Text>
        </View>

        <View style={styles.controllers}>
          <View style={styles.tipContainer}>
            <Image 
              source={waterdropImg}
              style={styles.tipImage}
              resizeMode="contain"
              />

            <Text style={styles.tipText}>
              { plant.water_tips } 
            </Text>
          </View>

          <Text style={styles.alertLabel}>
            Escolha o melhor horário para ser lembrado:
          </Text>

          {showDatePicker && (
            <DateTimePicker
            value={selectedDateTime}
            mode="time"
            display="default"
            onChange={handleTimeChange} 
            />
            )}

          {Platform.OS === 'android' && (
            <TouchableOpacity 
            onPress={handleOpenDateTimePickerOnAndroid}
            activeOpacity={0.7}
            >
              <Text style={styles.dateTimePickerText}>
                {`${format(selectedDateTime, 'H')} horas  ${format(selectedDateTime, 'mm')} min`}
              </Text>
            </TouchableOpacity>
          )}

          <Button 
            title="Cadastrar planta" 
            disabled={false} 
            onPress={handleSave}
            />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  
  plantInfo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    
    marginTop: getStatusBarHeight(),
    paddingHorizontal: 32,
    
    backgroundColor: colors.shape,
  },
  
  plantName: {
    marginTop: 32,
    marginBottom: 16,
    
    color: colors.heading,
    
    fontSize: 24,
    fontFamily: fonts.heading,
    lineHeight: 32,
  },
  
  plantAbout: {
    marginBottom: 76,

    color: colors.heading,
    
    fontSize: 17,
    fontFamily: fonts.text,
    lineHeight: 25,
    textAlign: 'center',
  },

  controllers: {
    paddingHorizontal: 32,
    paddingBottom: getBottomSpace() || 32,
  },

  tipContainer: {
    position: 'relative',
    bottom: 54,

    flexDirection: 'row',
    alignItems: 'center',

    padding: 16,
    borderRadius: 20,

    backgroundColor: colors.blue_light,
  },

  tipImage: {
    width: 56,
    height: 56,

    marginRight: 24,
  },

  tipText: {
    width: 204,

    color: colors.blue,

    fontSize: 15,
    fontFamily: fonts.text,
    lineHeight: 23,
  },

  alertLabel: {
    paddingBottom: 16,

    color: colors.heading,

    fontSize: 13,
    fontFamily: fonts.text,
    lineHeight: 23,
    textAlign: 'center',
  },

  dateTimePickerText: {
    alignSelf: 'center',

    width: '80%',

    marginBottom: 32,
    paddingVertical: 5,
    borderRadius: 10,

    backgroundColor: colors.shape,
    color: colors.heading,

    fontSize: 17,
    fontFamily: fonts.complement,
    lineHeight: 25,
    textAlign: 'center',
  },
});
