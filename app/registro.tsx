import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '@/themes/Colors';
import { useRouter } from 'expo-router';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/FireBaseconfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const RegistroScreen = () => {
  const [usuario, setUsuario] = useState('');
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const router = useRouter();

  const handleRegister = async () => {
    if (!email || !contrasena || !confirmar || contrasena !== confirmar) {
      alert("Por favor, completa todos los campos correctamente.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, contrasena);
      const user = userCredential.user;

      await setDoc(doc(db, "Usuarios", user.uid), {
        email: user.email,
        nombre: nombre,
        rachaDiaria: 0,
        rachaCarrusel: 0,
        puntuacionMax: 0,
        puntuacionMaxDiario: 0,
        puntuacionMaxCarrusel: 0,
        puntuacionMaxLibre:0,
        tablerosJugados: 0,
        pokemonDesbloqueados: [],
      });

      router.replace('/');
    } catch (error) {
      console.error("Error registrando:", error);
      alert("Hubo un problema al registrar el usuario.");
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Registro</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre de usuario"
        placeholderTextColor={Colors.blanco}
        onChangeText={setNombre}
        value={nombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        placeholderTextColor={Colors.blanco}
        onChangeText={setEmail}
        value={email}
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

      <TouchableOpacity style={styles.botonPrincipal} onPress={handleRegister}>
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
