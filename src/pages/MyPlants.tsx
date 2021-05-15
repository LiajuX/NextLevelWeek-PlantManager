import React, { useEffect, useState } from 'react';
import { 
  Alert,
  FlatList,
  Image, 
  StyleSheet, 
  Text, 
  View 
} from 'react-native';
import { formatDistance } from 'date-fns';
import { pt } from 'date-fns/locale';

import { loadPlant, PlantProps, removePlant } from '../libs/storage';

import { Load } from '../components/Load';
import { Header } from '../components/Header';
import { PlantCardSecondary } from '../components/PlantCardSecondary';

import waterdropImg from '../assets/waterdrop.png';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function MyPlants() {
  const [myPlants, setMyPlants] = useState<PlantProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextWatered, setNextWatered] = useState<string>();

  useEffect(() => {
    async function loadStorageData() {
      const plantsStorage = await loadPlant();
      
      const nextTime = formatDistance(
        new Date(plantsStorage[0].dateTimeNotification).getTime(),
        new Date().getTime(),
        { locale: pt }
      );

      setNextWatered(
        `Não esqueça de regar sua ${plantsStorage[0].name} daqui ${nextTime}.`
      );

      setMyPlants(plantsStorage);
      setLoading(false);
    }

    loadStorageData();
  }, []);

  function handleRemove(plant: PlantProps) {
    Alert.alert('Remover', `Deseja remover a ${plant.name}?`, [
      {
        text: 'Não',
        style: 'cancel',
      },
      {
        text: 'Sim',
        onPress: async () => {
          try {
            await removePlant(plant.id);

            setMyPlants((oldData) =>
              oldData.filter((item) => item.id !== plant.id)
            );

          } catch (error) {
            Alert.alert('Não foi possível remover esta planta.');
          }
        }
      }
    ]);
  }
  
  if (loading) {
    return <Load />
  }

  return (
    <View style={styles.container}>
      <Header title="Minhas" subtitle="Plantinhas" />

      <View style={styles.wrapper}>
        <View style={styles.spotlight}>
            <Image
              source={waterdropImg}
              style={styles.spotlightImage}
              resizeMode="contain"
            />

            <Text style={styles.spotlightText}>{ nextWatered }</Text>
          </View>

          <View style={styles.plantsContainer}>
            <Text style={styles.plantsContainerTitle}>Próximas regadas</Text>

            <FlatList
              data={myPlants}
              keyExtractor={(item) => String(item.id)}
              renderItem={({ item }) => (
                <PlantCardSecondary 
                  data={item} 
                  handleRemove={() => {handleRemove(item)}} 
                />
              )}
              showsVerticalScrollIndicator={false}
            />
          </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.background,
  },

  wrapper: {
    flex: 1,
    width: '100%',
  },

  spotlight: {
    flexDirection: 'row',
    alignItems: 'center',

    marginHorizontal: 32,
    padding: 16,
    borderRadius: 20,

    backgroundColor: colors.blue_light,
  },

  spotlightImage: {
    width: 56,
    height: 56,

    marginRight: 24,
  },

  spotlightText: {
    width: 204,

    color: colors.blue,

    fontSize: 15,
    fontFamily: fonts.text,
    lineHeight: 23,
  },

  plantsContainer: {
    flex: 1,
    marginRight: 32,
  }, 

  plantsContainerTitle: {
    marginTop: 40,
    marginBottom: 16,
    marginLeft: 32,

    color: colors.heading,
    
    fontSize: 24,
    fontFamily: fonts.heading,    
    lineHeight: 32,
  },
});
