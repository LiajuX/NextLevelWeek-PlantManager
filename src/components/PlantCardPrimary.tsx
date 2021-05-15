import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { SvgFromUri } from 'react-native-svg';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface PlantProps extends RectButtonProps {
  data: {
    name: string;
    photo: string;
  }
}

export function PlantCardPrimary({ data, ...rest }: PlantProps) {
  return (
    <RectButton style={styles.container} {...rest}>
      <SvgFromUri uri={data.photo} width={74} height={90} />

      <Text style={styles.plantName}>{ data.name }</Text>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',

    maxWidth: '45.5%',

    margin: 8,
    paddingVertical: 24,
    borderRadius: 20,

    backgroundColor: colors.shape,
  },

  plantName: {
    marginTop: 10,

    color: colors.green_dark,

    fontSize: 13,
    fontFamily: fonts.heading,
    lineHeight: 23,
  },
});
