import { View, Text, Image, StyleSheet,TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '@/themes/Colors';
import { GlobalStyles } from '@/themes/GlobalStyles';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from './navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { getAuth,signOut } from "firebase/auth";
import { getFirestore, doc, getDoc } from 'firebase/firestore';



const buttons = [
    { label: 'Puzzle diario ', icon: require('../assets/images/tfg/pokeball.png'), screen:'diario' },
    { label: 'Carrusel ', icon: require('../assets/images/tfg/superball.png'),screen:'carrusel' },
    { label: 'Puzzle Libre', icon: require('../assets/images/tfg/masterball.png'), screen:'libre' },
    { label: 'Pokédex ', icon: require('../assets/images/tfg/pokedex.gif'),screen:'pokedex' },
    { label: 'Iniciar Sesión ', icon: require('../assets/images/tfg/porygon.png'),screen:'iniciar'},
  ];
  
  export default function HomeScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const auth = getAuth();
    const user = auth.currentUser;
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [menuVisible, setMenuVisible] = useState(false);

    useEffect(() => {
      const fetchNombreUsuario = async () => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
          const db = getFirestore();
          const userRef = doc(db, 'Usuarios', user.uid); // o la colección donde guardas los usuarios
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            const data = userSnap.data();
            setNombreUsuario(data.nombre); // asumimos que guardaste el nombre así
          }
        }
      };

      fetchNombreUsuario();
    }, []);

    const handleLogout = async () => {
      try {
        const auth = getAuth();
        await signOut(auth);
        setNombreUsuario(''); // <- Esto es clave
        setMenuVisible(false); // opcional: cerrar el menú
        // También puedes mostrar un mensaje temporal o redirigir si lo prefieres
      } catch (error) {
        console.error("Error al cerrar sesión:", error);
      }
    };


  
    return (
      <View style={styles.container}>
        <View style={styles.userContainer}>
          {nombreUsuario !== '' ? (
            <>
              <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)}>
                <Text style={styles.userText}>👤 {nombreUsuario}</Text>
              </TouchableOpacity>

              {menuVisible && (
                <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                  <Text style={styles.logoutText}>Cerrar sesión</Text>
                </TouchableOpacity>
              )}
            </>
          ) : (
            <Text style={styles.userText}>No hay usuario</Text>
          )}
        </View>
        <Text style={styles.title}>SUDOKUDEX</Text>
        <View>
          {buttons.map((btn, index) => {
            const isLast = index === buttons.length - 1;
            const isLoginButton = btn.screen === 'iniciar';
            const isDisabled = !user && !isLoginButton; // deshabilita si no hay usuario y no es botón login

            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  if (!isDisabled && btn.screen) {
                    navigation.navigate(btn.screen as keyof RootStackParamList);
                  }
                }}
                style={[
                  styles.button,
                  isLast && { marginTop: 50 },
                  isDisabled && { opacity: 0.4 }, // atenuado si está deshabilitado
                ]}
                disabled={isDisabled}
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
      padding: 32,
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
    userContainer: {
      position: 'absolute',
      top: 40,
      right: 20,
      zIndex: 100,
      alignItems: 'flex-end',
    },

    userText: {
      color: Colors.blanco,
      fontFamily: 'Pixel',
      fontSize: 14,
      backgroundColor: Colors.Botones_menu,
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 10,
    },

    logoutButton: {
      marginTop: 5,
      backgroundColor: 'red',
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 10,
    },

    logoutText: {
      color: 'white',
      fontFamily: 'Pixel',
      fontSize: 13,
    },

  });
  