import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Image } from "expo-image";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function Datos({ navigation }) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const matriculaGuardada = await AsyncStorage.getItem('matricula');
        if (!matriculaGuardada) {
          alert('No se encontró la matrícula almacenada');
          return;
        }

<<<<<<< Updated upstream
        const response = await axios.get(`http://192.168.100.35:3000/Datos/${matriculaGuardada}`);
=======
        const response = await axios.get(`http://192.168.100.68:3000/Datos/${matriculaGuardada}`);
>>>>>>> Stashed changes
        setUserData(response.data.user);
      } catch (error) {
        console.error('Error al obtener datos del usuario:', error);
        alert('Error al obtener datos del usuario');
      }
    };

    obtenerDatos();
  }, []);

  if (!userData) {
    return (
      <View style={styles.container}>
        <Text style={styles.dialogText}>Cargando datos...</Text>
      </View>
    );
  }

  const { nombre = '', app = '', apm = '', matricula = '', gen = '', academia = '', sede = '' } = userData;
  const nombreCompleto = `${nombre} ${app} ${apm}`.trim();

  return (
    <View style={styles.container}>
      {/* Barra de progreso */}
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: '60%' }]} />
      </View>

      {/* Bienvenida */}
      <View style={styles.dialogContainer}>
        <Text style={styles.dialogText}>¡Bienvenido a tu manada, {nombre} {app}!</Text>
      </View>

      {/* Imagen del león */}
      <Image
<<<<<<< Updated upstream
        source={require('../../assets/leon.gif')} 
=======
        source={require('../../assets/animacionInicio.gif')} 
>>>>>>> Stashed changes
        style={styles.image}
      />

      {/* Recuadros de datos */}
      <View style={styles.card}>
       <Text style={styles.cardText}>{nombreCompleto}</Text>
      </View>
   
      <View style={styles.row}>
        <View style={styles.cardHalf}>
          <Text style={styles.cardText}>{academia}</Text>
        </View>
        <View style={styles.cardHalf}>
          <Text style={styles.cardText}>{gen}</Text>
        </View>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardText}>{matricula}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardText}>{sede}</Text>
      </View>
     


      {/* Botón CONTINUAR */}
      <TouchableOpacity
        style={styles.continueButton}
        onPress={() => navigation.navigate('Avatar')}
      >
        <Text style={styles.continueButtonText}>CONTINUAR</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  progressBarContainer: {
    width: '100%',
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 70,
    marginTop: 75,
    marginBottom: 20,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#274BAB',
  },
  dialogContainer: {
    marginVertical: 20,
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '90%',
  },
  dialogText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#274BAB',
    textAlign: 'center',
  },
  image: {
    width: 120,
    height: 120,
    marginVertical: 20,
  },
  card: {
    backgroundColor: '#f3f3f3',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginVertical: 10,
    width: '90%',
    alignItems: 'center',
  },
  cardHalf: {
    backgroundColor: '#f3f3f3',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 12,
    marginVertical: 10,
    width: '47%',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
  },
  cardText: {
     fontSize: 16,
    fontWeight: '600',
    color: '#274BAB',
    textAlign: 'center',
  },
  continueButton: {
    width: '80%',
    marginTop: 30,
    height: 50,
    backgroundColor: '#274BAB',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});
