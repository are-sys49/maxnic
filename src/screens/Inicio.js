import React from 'react';
<<<<<<< Updated upstream
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Image } from "expo-image";

export default function Inicio({ navigation }) { // <-- recibir la prop navigation
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/leon.gif')} style={styles.image} />
      <Text style={styles.title}>Maxnic</Text>
      <Text style={styles.slogan}>Ruge con poder, estés donde estés.</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Empecemos')} // <-- navegar a Empecemos
        >
          <Text style={styles.buttonText}>EMPECEMOS</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>YA TENGO UNA CUENTA</Text>
        </TouchableOpacity>

=======
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Platform } from 'react-native';
import { Image } from 'expo-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Funciones para hacer el diseño responsivo
const wp = (percentage) => {
  return (percentage * screenWidth) / 100;
};

const hp = (percentage) => {
  return (percentage * screenHeight) / 100;
};

// Función para obtener tamaño de fuente responsivo
const getFontSize = (size) => {
  const scale = screenWidth / 375; // 375 es el ancho base (iPhone X)
  const newSize = size * scale;
  return Math.max(12, Math.min(newSize, 24)); // Mínimo 12, máximo 24
};

export default function Inicio({ navigation }) {
  const insets = useSafeAreaInsets();
  
  return (
    <View style={styles.container}>
      {/* Contenedor del GIF de fondo con márgenes laterales */}
      <View style={[styles.backgroundContainer, { top: insets.top }]}>
        <Image 
          source={require('../../assets/inicio.gif')}
          style={styles.backgroundImage}
          contentFit="cover"
        />
      </View>
             
      {/* Capa semitransparente con los mismos márgenes */}
      <View style={[styles.overlay, { top: insets.top }]} />
             
      {/* Contenido principal */}
      <View style={[styles.content, { paddingBottom: Math.max(insets.bottom, hp(3)) }]}>
        <View style={styles.spacer} />
                 
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Empecemos')}
          >
            <Text style={styles.buttonText}>EMPECEMOS</Text>
          </TouchableOpacity>
           
          <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.buttonText}>YA TENGO UNA CUENTA</Text>
          </TouchableOpacity>
        </View>
>>>>>>> Stashed changes
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
<<<<<<< Updated upstream
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 70,
    fontWeight: 'bold',
    color: '#000000',
  },
  slogan: {
    fontSize: 16,
    color: '#000080',
    marginBottom: 40,
  },
  buttonContainer: {
    width: '80%',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 15,
  },
  button: {
    width: 200,
    height: 50,
    backgroundColor: '#0056b3',
    borderRadius: 25, // redonde los botones 
    justifyContent: 'center',
    alignItems: 'center',
=======
    position: 'relative',
    backgroundColor: '#fff',
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
  },
  backgroundImage: {
    width: '100%',
    height: hp(85), // 85% de la altura de la pantalla
    minHeight: 400, // Altura mínima para pantallas muy pequeñas
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: wp(10), // 10% del ancho de pantalla como margen izquierdo
    right: wp(10), // 10% del ancho de pantalla como margen derecho
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0)',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: wp(10), // 10% del ancho como padding horizontal
    paddingBottom: hp(3), // 3% de la altura como padding inferior
  },
  spacer: {
    flex: 1,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 10,
    alignItems: 'center',
    gap: hp(2), // Espacio responsivo entre botones
    marginBottom: hp(15), // Margen inferior responsivo
    paddingHorizontal: wp(5), // Padding adicional para pantallas muy pequeñas
  },
  button: {
    width: '100%',
    maxWidth: Math.min(wp(80), 350), // Máximo 80% del ancho o 350px
    minWidth: 250, // Ancho mínimo para pantallas pequeñas
    height: Math.max(hp(6), 45), // Altura responsiva con mínimo de 45px
    backgroundColor: '#274BAB',
    borderRadius: Math.max(hp(3), 25), // Radio de borde responsivo
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { 
      width: 0, 
      height: Platform.OS === 'ios' ? hp(0.3) : hp(0.5) 
    },
    shadowOpacity: Platform.OS === 'ios' ? 0.3 : 0.4,
    shadowRadius: Platform.OS === 'ios' ? 3 : 4,
    elevation: Platform.OS === 'android' ? 5 : 0,
>>>>>>> Stashed changes
  },
  buttonText: {
    fontSize: getFontSize(16),
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
});
