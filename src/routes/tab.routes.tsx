import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator }  from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';

import { PlantSelection } from '../pages/PlantSelection';
import { MyPlants } from '../pages/MyPlants';

import colors from '../styles/colors';

const appTab = createBottomTabNavigator();

const AuthRoutes = () => {
  return (
    <appTab.Navigator
      tabBarOptions={{
        activeTintColor: colors.green,
        inactiveTintColor: colors.heading,
        labelPosition: 'beside-icon',
        style: {
          height: 88,
          paddingVertical: Platform.OS === 'ios' ? 20 : 0,
        }
      }}
    >
      <appTab.Screen
        name="Nova Planta"
        component={PlantSelection}
        options={{
          tabBarIcon: (({ size, color }) => (
            <MaterialIcons 
              name="add-circle-outline"
              size={size}
              color={color}
            />
          ))
        }}
      />

      <appTab.Screen
        name="Minhas Plantinhas"
        component={MyPlants}
        options={{
          tabBarIcon: (({ size, color }) => (
            <MaterialIcons 
              name="format-list-bulleted"
              size={size}
              color={color}
            />
          ))
        }}
      />
    </appTab.Navigator>
  );
}

export default AuthRoutes;
