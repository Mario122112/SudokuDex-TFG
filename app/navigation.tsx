import React from 'react';
import { createNavigationContainerRef, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './index';
import Diario from './diario';
import Libre from './libre';
import Carrusel from './carrusel';
import Pokedex from './pokedex';
import Iniciar from './iniciar';
import Registro from './registro';

export type RootStackParamList = {
  Menu: undefined;
  PuzzleDiario: undefined;
  PuzzleLibre: undefined;
  Carrusel:undefined;
  Pokedex: undefined;
  IniciarSesion:undefined;
  Registrarse:undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export function navigate(name: keyof RootStackParamList, params?: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Menu" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Menu" component={Home} />
        <Stack.Screen name="PuzzleDiario" component={Diario} />
        <Stack.Screen name="PuzzleLibre" component={Libre} />
        <Stack.Screen name="Carrusel" component={Carrusel} />
        <Stack.Screen name="Pokedex" component={Pokedex}/>
        <Stack.Screen name="IniciarSesion" component={Iniciar}/>
        <Stack.Screen name="Registrarse" component={Registro}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
