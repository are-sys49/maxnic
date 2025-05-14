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

        const response = await axios.get(`http://192.168.100.35:3000/Datos/${matriculaGuardada}`);
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
        <Text style={styles.dialogText}>¡Bienvenido a tu manada, {nombreCompleto}!</Text>
      </View>

      {/* Imagen del león */}
      <Image
        source={require('../../assets/leon.gif')} 
        style={styles.image}
      />

      {/* Información del usuario */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>{nombreCompleto}</Text>
        <Text style={styles.infoText}>Academia: {academia}</Text>
        <Text style={styles.infoText}>Generación: {gen}</Text>
        <Text style={styles.infoText}>Matrícula: {matricula}</Text>
        <Text style={styles.infoText}>Sede: {sede}</Text>
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
    height: 30,
    backgroundColor: '#e0e0e0',
    borderRadius: 70,
    marginTop: 75,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#0056b3',
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
    color: '#0056b3',
    textAlign: 'center',
  },
  image: {
    width: 120,
    height: 120,
    marginVertical: 20,
  },
  infoContainer: {
    width: '90%',
    backgroundColor: '#f5f5f5',
    padding: 20,
    borderRadius: 10,
    marginVertical: 15,
    alignItems: 'flex-start',
  },
  infoText: {
    fontSize: 16,
    color: '#333',
    marginVertical: 5,
  },
  continueButton: {
    width: '80%',
    height: 50,
    backgroundColor: '#0056b3',
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
