import React from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { SvgFromUri } from 'react-native-svg';
import { Feather } from '@expo/vector-icons';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface PlantProps extends RectButtonProps {
  data: {
    name: string;
    photo: string;
    hour: string;
  };
  handleRemove: () => void;
}

export function PlantCardSecondary({ data, handleRemove, ...rest }: PlantProps) {
  return (
    <Swipeable
      overshootRight={false}
      renderRightActions={() => (
        <Animated.View>
          <View>
            <RectButton
              style={styles.buttonRemove}
              onPress={handleRemove}
            >
              <Feather name="trash" size={24} color={colors.white} />
            </RectButton>
          </View>
        </Animated.View>
      )}
    >
      <RectButton style={styles.container} {...rest}>
        <SvgFromUri uri={data.photo} width={56} height={56} />

        <Text style={styles.plantName}>{ data.name }</Text>

        <View style={styles.reminderDetails}>
          <Text style={styles.timeLabel}>Regar às</Text>

          <Text style={styles.time}>{ data.hour }</Text>
        </View>
      </RectButton>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    
    height: 80,

    marginBottom: 16,
    marginLeft: 32,
    padding: 16,
    borderRadius: 20,

    backgroundColor: colors.shape,
  },

  plantName: {
    flex: 1,
    marginLeft: 18,

    color: colors.heading,

    fontSize: 17,
    fontFamily: fonts.complement,
    lineHeight: 25,
  },

  reminderDetails: {
    alignItems: 'flex-end',
  },

  timeLabel: {
    color: colors.body_light,

    fontSize: 13,
    fontFamily: fonts.text,
    lineHeight: 20,
  },

  time: {
    color: colors.heading,

    fontSize: 13,
    fontFamily: fonts.complement,
    lineHeight: 20,
  },

  buttonRemove: {
    position: 'relative',
    right: 34,

    alignItems: 'center',
    justifyContent: 'center',

    width: 100,
    height: 80,

    marginBottom: 16,
    paddingLeft: 28,
    borderRadius: 20,

    backgroundColor: colors.red,
  },
});
