import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import 'react-native-reanimated';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Slot } from "expo-router";
import { Text } from 'react-native'; // O cualquier vista temporal

export default function RootLayout() {
  const [loaded] = useFonts({
    Pixel: require('../assets/fonts/PixelifySans-VariableFont_wght.ttf')
  });

  if (!loaded) {
    return <Text>Cargando fuente...</Text>;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Slot />
    </GestureHandlerRootView>
  );
}