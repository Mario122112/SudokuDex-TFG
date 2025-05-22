import React, { useState } from 'react';
import {View, Text, TextInput, TouchableOpacity,StyleSheet, Image, Modal} from 'react-native';
import { Colors } from '@/themes/Colors';
import { useRouter } from 'expo-router';
import { auth, db } from '@/FireBaseconfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const LoginScreen = () => {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const router = useRouter();
  const [mostrarError, setMostrarError] = useState(false);
  const [mensajeError, setMensajeError] = useState('');

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, usuario, contrasena);
      const user = userCredential.user;

      const docRef = doc(db, "Usuarios", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const datosUsuario = docSnap.data();
        console.log("Datos del usuario:", datosUsuario);
        router.push('/');
      } else {
        console.log("No se encontró el documento del usuario");
      }
    } catch (error: any) {
    
      let mensaje = "Error desconocido. Inténtalo de nuevo.";
      switch (error.code) {
        case 'auth/invalid-email':
          mensaje = "El correo electrónico no es válido.";
          break;
        case 'auth/user-not-found':
          mensaje = "No existe una cuenta con ese correo.";
          break;
        case 'auth/wrong-password':
          mensaje = "La contraseña es incorrecta.";
          break;
        case 'auth/missing-password':
          mensaje = "Por favor, introduce una contraseña.";
          break;
        case 'auth/invalid-credential':
          mensaje = "Corre electronico o contraseña erroneos.";
          break;
      }

      setMensajeError(mensaje);
      setMostrarError(true);
    }
  };

  const handleRegistro = () => {
    router.push('/registro');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Iniciar Sesión</Text>

      <TextInput
        style={[styles.input, { marginTop: 20 }]}
        placeholder="Correo electrónico"
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

      <TouchableOpacity style={[styles.botonPrincipal, { marginBottom: 55 }]} onPress={handleLogin}>
        <Text style={styles.textoBoton}>Confirmar</Text>
      </TouchableOpacity>

      <Text style={[styles.textoSecundario, { marginBottom: 20, textAlign: 'center' }]}>
        ¿Aun no tienes cuenta?{'\n\n'} ¡Registrate ahora para guardar tu progeso!
      </Text>

      <TouchableOpacity style={styles.botonSecundario} onPress={handleRegistro}>
        <Text style={styles.textoSecundario}>Registrarse</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/')} style={{ position: 'absolute', top: 20, left: 20 }}>
        <Image source={require('../assets/images/tfg/back.png')} style={{ width: 34, height: 34 }} />
      </TouchableOpacity>

      {/* Modal de error */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={mostrarError}
        onRequestClose={() => setMostrarError(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>{mensajeError}</Text>
            <TouchableOpacity onPress={() => setMostrarError(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    marginBottom: 80,
    fontFamily: 'Pixel'
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
    fontFamily: 'Pixel'
  },
  botonSecundario: {
    marginBottom: 35,
    backgroundColor: Colors.Botones_menu,
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 20,
    alignItems: 'center'
  },
  textoSecundario: {
    color: Colors.blanco,
    fontSize: 20,
    fontFamily: 'Pixel'
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
    fontFamily: 'Pixel'
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContainer: {
    backgroundColor: Colors.Fondo,
    padding: 24,
    borderRadius: 20,
    borderColor: Colors.Tablero,
    borderWidth: 2,
    maxWidth: '80%'
  },
  modalText: {
    fontFamily: 'Pixel',
    fontSize: 16,
    color: Colors.blanco,
    textAlign: 'center',
    marginBottom: 16
  },
  closeButton: {
    backgroundColor: Colors.Botones_menu,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignSelf: 'center'
  },
  closeButtonText: {
    fontFamily: 'Pixel',
    fontSize: 14,
    color: Colors.blanco,
    textAlign: 'center'
  }
});

export default LoginScreen;
