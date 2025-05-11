import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '@/themes/Colors';
import { useRouter } from 'expo-router';

const RegistroScreen = () => {
  const [usuario, setUsuario] = useState('');
  const [nombre, setNombre] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const router = useRouter();

  const handleRegistro = () => {
    if (contrasena !== confirmar) {
      alert('Las contraseñas no coinciden');
      return;
    }
    console.log(`Registrado: ${usuario}, ${nombre}`);
    
  };

   const handleVolverAlMenu = () => {
    router.push('/');  // Redirige al Menú, que está en la ruta raíz '/'
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Registro</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre de usuario"
        placeholderTextColor={Colors.blanco}
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
      <TextInput
        style={styles.input}
        placeholder="Confirmar contraseña"
        placeholderTextColor={Colors.blanco}
        secureTextEntry
        onChangeText={setConfirmar}
        value={confirmar}
      />

      <TouchableOpacity style={styles.botonPrincipal} onPress={handleVolverAlMenu}>
        <Text style={styles.textoBoton}>Registrarse</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    backgroundColor: Colors.Fondo
  },
  titulo: {
    marginTop: 50,
    fontSize: 30,
    color: Colors.blanco,
    marginBottom: 50,
    fontFamily: 'Pixel'
  },
  input: {
    backgroundColor: Colors.Botones_menu,
    width: '85%',
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginBottom: 50,
    color: Colors.blanco,
    fontSize: 20,
    fontFamily: 'Pixel'
  },
  botonPrincipal: {
    backgroundColor: Colors.Botones_menu,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  textoBoton: {
    color: Colors.blanco,
    fontSize: 20,
    fontFamily: 'Pixel'
  },
});

export default RegistroScreen;
