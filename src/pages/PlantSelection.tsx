import React, { useEffect, useState } from 'react';
import { 
  FlatList, 
  StyleSheet, 
  Text, 
  View, 
  ActivityIndicator 
} from 'react-native';
import { useNavigation } from '@react-navigation/core';

import { Load } from '../components/Load';
import { Header } from '../components/Header';
import { EnvironmentButton } from '../components/EnvironmentButton';
import { PlantCardPrimary } from '../components/PlantCardPrimary';

import { PlantProps } from '../libs/storage';

import api from '../services/api';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

import AsyncStorage from '@react-native-async-storage/async-storage';

interface EnvironmentProps {
  key: string;
  title: string;
}

export function PlantSelection() {
  const navigation = useNavigation();

  const [environments, setEnvironments] = useState<EnvironmentProps[]>([]);
  const [plants, setPlants] = useState<PlantProps[]>([]);
  const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([]);
  const [selectedEnvironment, setSelectedEnvironment] = useState('all');
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  const [userName, setUserName] = useState('');

  useEffect(() => {
    async function loadUserNameFromStorage() {
      const user = await AsyncStorage.getItem('@plantmanager:user');

      setUserName(user || '');
    } 

    loadUserNameFromStorage();
  }, []);

  useEffect(() => {
    async function fetchEnvironment() {
      const { data } = await api
      .get('plants_environments?_sort=title&_order=asc');

      setEnvironments([
        {
          key: 'all',
          title: 'Todos',
        },
        ...data
      ]);
    }

    fetchEnvironment();
  }, []);

  useEffect(() => {
    fetchPlants();
  }, []);

  async function fetchPlants() {
    const { data } = await api
    .get(`plants?_sort=name&_order=asc&_page=${page}&_limit=8`);

    if (!data) {
      return setLoading(true);
    }

    if (page > 1) {
      setPlants(oldValue => [...oldValue, ...data]);
      setFilteredPlants(oldValue => [...oldValue, ...data]);
    } else {
      setPlants(data);
      setFilteredPlants(data);
    }

    setLoading(false);
    setLoadingMore(false);
  }

  function handleSelectedEnvironment(environment: string) {
    setSelectedEnvironment(environment);

    if (environment === 'all') {
      return setFilteredPlants(plants);
    }  

    const filtered = plants.filter(plant =>
      plant.environments.includes(environment)
    );

    setFilteredPlants(filtered);
  }

  //Load more plants by the end of the flatlist that is limited to 8
  function handleFetchMore(distance: number) {
    if (distance < 1) {
      return;
    }

    setLoadingMore(true);
    setPage(oldValue => oldValue + 1);
    fetchPlants();
  }

  function handlePlantSelect(plant: PlantProps) {
    navigation.navigate('PlantSave', { plant });
  }

  if (loading) {
    return <Load />
  }

  return (
    <View style={styles.container}>
      <Header title="Olá," subtitle={userName} />

      <View style={styles.wrapper}>
        <Text style={styles.title}>Em qual ambiente</Text>
        <Text style={styles.subtitle}>você quer colocar sua planta?</Text>
      </View>

      <View>
        <FlatList 
          data={environments}
          keyExtractor={(item) => String(item.key)}
          renderItem={({ item }) => (
            <EnvironmentButton 
              title={item.title} 
              active={item.key === selectedEnvironment}
              onPress={() => handleSelectedEnvironment(item.key)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.environmentList}
        />
      </View>

      <View style={styles.plants}>
        <FlatList 
          data={filteredPlants}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <PlantCardPrimary 
              data={item} 
              onPress={() => handlePlantSelect(item)} 
            />
          )}
          showsVerticalScrollIndicator={false}
          numColumns={2}   
          contentContainerStyle={styles.plantsList}
          onEndReachedThreshold={0.1}
          onEndReached={({ distanceFromEnd }) => 
            handleFetchMore(distanceFromEnd)
          }
          ListFooterComponent={
            loadingMore 
            ? <ActivityIndicator color={colors.green} />
            : <></>
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  wrapper: {
    marginTop: 10,
    marginBottom: 24,
    paddingHorizontal: 32,
  },

  title: {
    color: colors.heading,

    fontSize: 17,
    fontFamily: fonts.complement,
    lineHeight: 23,
  },

  subtitle: {
    color: colors.heading,

    fontSize: 17,
    fontFamily: fonts.text,
    lineHeight: 23,
  },

  environmentList: {
    paddingLeft: 32,
    marginBottom: 32,
  },

  plants: {
    flex: 1,
    justifyContent: 'center',

    paddingHorizontal: 24,
  },

  plantsList: {
    paddingBottom: 34,
  },
});