import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import 'react-native-reanimated';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Slot } from "expo-router";
export default function RootLayout() {

  const [loaded] = useFonts({
    Pixel: require('../assets/fonts/PixelifySans-VariableFont_wght.ttf')
  })
  return (
    <GestureHandlerRootView>
      <Slot />
    </GestureHandlerRootView>
  );
}