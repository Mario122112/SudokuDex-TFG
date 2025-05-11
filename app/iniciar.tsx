import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import { Colors } from '@/themes/Colors';
import { useRouter } from 'expo-router';


const LoginScreen = () => {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const router = useRouter();


  const handleLogin = () => {
    console.log(`Usuario: ${usuario}, Contraseña: ${contrasena}`);
  };

  const handleRegistro = () => {
    router.push('/registro');
  };  

  return (

    <View style={styles.container}>
      <Text style={styles.titulo}>Iniciar Sesión</Text>

      <TextInput
        style={[styles.input,{marginTop:20}]}
        placeholder="Nombre Usuario"
        placeholderTextColor= {Colors.blanco}
        onChangeText={setUsuario}
        value={usuario}
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor={Colors.blanco}
        secureTextEntry
        onChangeText={setContrasena}
        value={contrasena}
      />

      <TouchableOpacity style={[styles.botonPrincipal,{marginBottom:55}]} onPress={handleLogin}>
        <Text style={styles.textoBoton}>Confirmar</Text>
      </TouchableOpacity>


      <Text style={[styles.textoSecundario,{marginBottom:20,textAlign:'center'}]}>¿Aun no tienes cuenta?{'\n'}{'\n'} ¡Registrate ahora para guardar tu progeso!</Text>
      <TouchableOpacity style={[styles.botonSecundario]} onPress={handleRegistro}>
        <Text style={styles.textoSecundario}>Registrarse</Text>
      </TouchableOpacity>

      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: '100%',
    height:'100%',
    alignItems: 'center',
    backgroundColor: Colors.Fondo
  },
  titulo: {
    marginTop:50,
    fontSize: 30,
    color: Colors.blanco,
    marginBottom: 80,
    fontFamily:'Pixel'
  },
  input: {
    backgroundColor: Colors.Botones_menu,
    width: '85%',
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginBottom: 55,
    color: Colors.blanco,
    textAlign: 'left',
    fontSize: 24,
    fontFamily:'Pixel'
  },
  botonSecundario: {
    marginBottom: 35,
    backgroundColor: Colors.Botones_menu,
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 20,
    alignItems:'center'
  },
  textoSecundario: {
    color: Colors.blanco,
    fontSize: 20,
    fontFamily:'Pixel'
  },
  botonPrincipal: {
    backgroundColor: Colors.Botones_menu,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  textoBoton: {
    color: Colors.blanco,
    fontSize: 20,
    fontFamily:'Pixel'
  },
});

export default LoginScreen;
