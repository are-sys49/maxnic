import React from 'react';
import { View, Text, Image, TouchableWithoutFeedback, StyleSheet, ScrollView } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import Cursos from './Cursos';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({ navigation }) {
  const [userData, setUserData] = useState({
    nombre: '',
    app: '',
    matricula: '',


  });

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const nombre = await AsyncStorage.getItem('nombre');
        const app = await AsyncStorage.getItem('app');
        const matricula = await AsyncStorage.getItem('matricula');
        if (nombre && app && matricula) {
          setUserData({ nombre, app, matricula });
        } 
      } catch (error) {
        console.log('Error loading user data:', error);
      }
};
    loadUserData();
  }, []);

  const [menuVisible, setMenuVisible] = useState(false);
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };
  const handlePerfil = () => {
    setMenuVisible(false);
    navigation.navigate('Perfil');
  }
  const handleLogout = () => {
    setMenuVisible(false);
    navigation.navigate('Login');
  }
  
  return (
    <ScrollView style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="chatbubbles-outline" size={24} color="#00bfff" />
        <View style={styles.points}>
          <Ionicons name="person" size={20} color="#00bfff" />
          <Text style={styles.pointText}>0</Text>
          <Ionicons name="flame-outline" size={20} color="#ff6600" />
          <Text style={styles.pointText}>1</Text>
          <MaterialCommunityIcons name="paw" size={20} color="#132257" />
          <Text style={styles.pointText}>5</Text>
        </View>
        <TouchableWithoutFeedback onPress={toggleMenu}>
        <Ionicons name="settings-outline" size={24} color="#999" />
        </TouchableWithoutFeedback>
      </View>
      {menuVisible && (
        <View style={styles.dropdownMenu}>
    <TouchableWithoutFeedback onPress={handlePerfil}>
      <Text style={styles.menuItem}>Perfil</Text>
    </TouchableWithoutFeedback>
    <TouchableWithoutFeedback onPress={handleLogout}>
      <Text style={styles.menuItem}>Cerrar sesión</Text>
    </TouchableWithoutFeedback>
  </View>
      )}

      {/* Profile */}
      <View style={styles.profile}>
        <Image source={require('../../assets/Leon.png')} style={styles.avatar} />
        <View style={styles.info}>
          <Text style={styles.name}>{userData.nombre} {userData.app}</Text>
          <Text style={styles.school}>Centro Universitario DIPA</Text>
        </View>
      </View>

      {/* DIPA Estudio */}
      <TouchableWithoutFeedback>
        <View style={styles.dipaButton}>
          <Text style={styles.dipaText}>DIPA ESTUDIO</Text>
          <Text style={styles.verCap}>🎬 Ver cap.</Text>
        </View>
      </TouchableWithoutFeedback>

      {/* Cursos y Talleres Button */}
      <TouchableWithoutFeedback onPress={() => navigation.navigate('Cursos')}>
        <View style={styles.flipContainer}>
          <View style={styles.courseBox}>
            <Text style={styles.courseText}>Cursos y Talleres</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>

      {/* Logros */}
      <Text style={styles.sectionTitle}>Logros</Text>
      <View style={styles.achievements}>
        <View style={styles.achievementCard}>
          <Text style={styles.newBadge}>NUEVO</Text>
          <Text style={styles.achievementText}>DIPA💙LOVER</Text>
        </View>
        <View style={styles.achievementCard}><Text style={styles.newBadge}>NUEVO</Text></View>
        <View style={styles.achievementCard}><Text style={styles.newBadge}>NUEVO</Text></View>
      </View>
      <Text style={styles.subText}>
        Navega conmigo, cumple los retos que te dejo y gana logros exclusivos.
      </Text>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 40,
    
  },
  dropdownMenu: {
  position: 'absolute',
  top: 60,
  right: 16,
  backgroundColor: '#fff',
  borderRadius: 8,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 4,
  elevation: 5,
  padding: 8,
  zIndex: 10,
},
menuItem: {
  paddingVertical: 8,
  paddingHorizontal: 16,
  fontSize: 14,
  color: '#333',
},
  points: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  pointText: { marginHorizontal: 2, fontWeight: 'bold' },
  profile: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  avatar: { width: 60, height: 100, resizeMode: 'contain' },
  name: { fontWeight: 'bold', fontSize: 16 },
  school: { color: '#888', fontSize: 13 },
  dipaButton: {
    backgroundColor: '#00ff00',
    borderRadius: 4,
    padding: 6,
    alignSelf: 'flex-start',
    marginVertical: 10,
  },
  dipaText: { fontWeight: 'bold', color: '#000' },
  verCap: { fontSize: 10, color: '#000' },
  flipContainer: {
    width: '100%',
    height: 120,
    alignSelf: 'center',
    marginVertical: 16,
  },
  courseBox: {
    backgroundColor: '#132257',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
    height: 120,
  },
  courseText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  sectionTitle: { fontWeight: 'bold', fontSize: 16, marginBottom: 8 },
  achievements: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  achievementCard: {
    width: '30%',
    height: 70,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  newBadge: {
    backgroundColor: 'red',
    color: '#fff',
    paddingHorizontal: 4,
    borderRadius: 4,
    fontSize: 10,
    marginBottom: 4,
  },
  achievementText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#132257',
  },
  subText: {
    fontSize: 12,
    color: '#777',
    textAlign: 'center',
    marginVertical: 10,
  },
  footerImage: {
    width: '100%',
    height: 70,
    resizeMode: 'contain',
    marginTop: 10,
  },
});