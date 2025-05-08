import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './index';
import Diario from './diario';
import Libre from './libre';
import Carrusel from './carrusel';
import Pokedex from './pokedex';

export type RootStackParamList = {
  Menu: undefined;
  PuzzleDiario: undefined;
  PuzzleLibre: undefined;
  Carrusel:undefined;
  Pokedex: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Menu" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Menu" component={HomeScreen} />
        <Stack.Screen name="PuzzleDiario" component={Diario} />
        <Stack.Screen name="PuzzleLibre" component={Libre} />
        <Stack.Screen name="Carrusel" component={Carrusel} />
        <Stack.Screen name="Pokedex" component={Pokedex}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
