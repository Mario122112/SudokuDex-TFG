import { View, Text, Image, StyleSheet,TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '@/themes/Colors';
import { GlobalStyles } from '@/themes/GlobalStyles';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from './navigation';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';


const buttons = [
    { label: 'Puzzle diario ', icon: require('../assets/images/tfg/pokeball.png'), screen:'diario' },
    { label: 'Carrusel ', icon: require('../assets/images/tfg/superball.png'),screen:'carrusel' },
    { label: 'Puzzle Libre', icon: require('../assets/images/tfg/masterball.png'), screen:'libre' },
    { label: 'Pokédex ', icon: require('../assets/images/tfg/pokedex.gif'),screen:'pokedex' },
    { label: 'Iniciar Sesión ', icon: require('../assets/images/tfg/porygon.png'),screen:'iniciar' },
  ];
  
  export default function HomeScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>SUDOKUDEX</Text>
        <View>
          {buttons.map((btn, index) => {
            const isLast = index === buttons.length - 1;
  
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  if (btn.screen) {
                    navigation.navigate(btn.screen as keyof RootStackParamList);
                  }
                }}
                style={[styles.button, isLast && { marginTop: 50 }]}
              >
                <Text style={styles.buttonText}>{btn.label}</Text>
                <Image source={btn.icon} style={styles.icon} />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.Fondo,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 30,
    },
    title: {
      fontSize: 37,
      color: Colors.blanco,
      marginBottom: 90,
      fontFamily: "Pixel", 
      textAlign: 'center',
    },
    button: {
      backgroundColor: Colors.Botones_menu,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding:1,
      borderRadius: 15,
      marginBottom: 27,
    },
    buttonText: {
      color: Colors.blanco,
      fontFamily: "Pixel",
      fontSize: 27,
      margin:10
    },
    icon: {
      width: 55,
      height: 60,
      marginLeft: 10,
      resizeMode: 'contain',
      opacity:0.6
      
    },
  });
  