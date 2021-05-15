import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import userImg from '../assets/profile.png';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface HeaderProps {
  title: string;
  subtitle: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{ title }</Text>
        <Text style={styles.subtitle}>{ subtitle }</Text>
      </View>
    
      <Image source={userImg} style={styles.avatar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    width: '100%',

    marginTop: getStatusBarHeight() + 10,
    padding: 32,
  },

  title: {
    color: colors.heading,

    fontSize: 32,
    fontFamily: fonts.thin,
    lineHeight: 36,
  },
  
  subtitle: {
    color: colors.heading,
    
    fontSize: 32,
    fontFamily: fonts.complement,
    lineHeight: 36,
  },

  avatar: {
    width: 72,
    height: 72,

    borderRadius: 36,
  },
});
