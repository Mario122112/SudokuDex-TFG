import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,Image } from 'react-native';
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
  const [errorMensaje, setErrorMensaje] = useState('');

  const handleRegister = async () => {
    setErrorMensaje(''); // Limpia errores anteriores

    if (!nombre || !email || !contrasena || !confirmar) {
      setErrorMensaje("Por favor, completa todos los campos.");
      return;
    }

    if (nombre.length > 10) {
      setErrorMensaje("El nombre de usuario no puede tener más de 10 caracteres.");
      return;
    }

    if (contrasena !== confirmar) {
      setErrorMensaje("Las contraseñas no coinciden.");
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
        puntuacionMaxLibre: 0,
        tablerosJugados: 0,
      });

      router.replace('/');
    } catch (error: any) {
      

      let mensaje = "Error desconocido. Inténtalo de nuevo.";
      switch (error.code) {
        case 'auth/email-already-in-use':
          mensaje = "Este correo ya está en uso.";
          break;
        case 'auth/invalid-email':
          mensaje = "El correo electrónico no es válido.";
          break;
        case 'auth/weak-password':
          mensaje = "La contraseña es demasiado débil. Usa al menos 6 caracteres.";
          break;
        case 'auth/missing-password':
          mensaje = "Por favor, introduce una contraseña.";
          break;
        default:
          mensaje = "Ocurrió un error al registrar. Intenta de nuevo.";
          break;
      }

      setErrorMensaje(mensaje);
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

      {errorMensaje !== '' && (<Text style={styles.errorTexto}>{errorMensaje}</Text>)}

      <TouchableOpacity style={styles.botonPrincipal} onPress={handleRegister}>
        <Text style={styles.textoBoton}>Registrarse</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/')} style={{ position: 'absolute', top: 20, left: 20, }}>
        <Image
          source={require('../assets/images/tfg/back.png')}
          style={{ width: 34, height: 34 }}
        />
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
  errorTexto: {
    fontSize:20,
  color: 'red',
  marginBottom: 20,
  fontFamily: 'Pixel',
  textAlign: 'center',
}

});

export default RegistroScreen;
