import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface EnvironmentButtonProps extends RectButtonProps {
  title: string;
  active?: boolean;
}

export function EnvironmentButton({ 
  title, 
  active = false, 
  ...rest 
}: EnvironmentButtonProps) {
  return (
    <RectButton 
      style={[
        styles.container,
        active && styles.containerActive
      ]}
      {...rest}
    >
      <Text 
        style={[
          styles.buttonText,
          active && styles.buttonTextActive
        ]}
      >
        { title }
      </Text>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',

    width: 76,
    height: 40,
    
    marginRight: 4,
    borderRadius: 12,

    backgroundColor: colors.shape,
  },

  containerActive: {
    backgroundColor: colors.green_light,
  },

  buttonText: {
    color: colors.heading,

    fontSize: 13,
    fontFamily: fonts.text,
  },

  buttonTextActive: {
    color: colors.green_dark,
    fontFamily: fonts.heading,
  },
});
