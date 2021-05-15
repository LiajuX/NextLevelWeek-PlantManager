import React from 'react';
import { 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  TouchableOpacityProps 
} from 'react-native';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  disabled: boolean;
}

export function Button({ title, disabled, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity 
      style={[
        styles.container,
        disabled && { backgroundColor: 'rgba(50, 183, 104, 0.5)' }
      ]} 
      activeOpacity={0.7}
      disabled={disabled}
      {...rest}
    >
      <Text style={styles.buttonText}>{ title }</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    
    height: 56,

    borderRadius: 16,

    backgroundColor: colors.green,
  },

  buttonText: {
    color: colors.white,

    fontSize: 16,
    fontFamily: fonts.complement,
  },
});
