import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Linking } from 'react-native';
import QRCode from 'react-native-qrcode-svg'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useEffect } from 'react';

export default function Perfil({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
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

  return (
    <ScrollView style={styles.container}>
      {/* Botón Atrás y Configuración */}
      <View style={styles.header}>
        <Ionicons name="arrow-back-outline" size={24} color="#000" onPress={() => navigation.goBack()} />
        <Ionicons name="settings-outline" size={24} color="#000" />
      </View>

      {/* Mensaje superior */}
      <View style={styles.speechBubble}>
        <Text style={styles.speechText}>¡Un león disciplinado nunca se detiene!</Text>
      </View>

      {/* Avatar León */}
      <Image source={require('../../assets/Leon.png')} style={styles.avatar} />

      {/* Nombre y Datos */}
      <Text style={styles.name}>{userData.nombre} {userData.app}</Text>
      <Text style={styles.school}>Academia Nacional de Bomberos G17</Text>
      <Text style={styles.code}>{userData.matricula}</Text>

      {/* Estadísticas */}
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Sede</Text>
          <Text style={styles.statValue}>Guadalajara</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Siguiendo</Text>
          <Text style={styles.statValue}>0</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Seguidores</Text>
          <Text style={styles.statValue}>0</Text>
        </View>
      </View>

      {/* Racha */}
      <Text style={styles.streakText}>¡No pierdas la racha, rugidor!</Text>
      <Text style={styles.streakSubtext}>¡Junta 10 y reclama un taller totalmente gratis!</Text>

      {/* Íconos de racha */}
      <View style={styles.streakIcons}>
        {[...Array(5)].map((_, index) => (
          <Ionicons key={index} name="flame-outline" size={24} color="#ff6600" />
        ))}
      </View>

      {/* Botón compartir */}
      <TouchableOpacity style={styles.shareButton} onPress={() => setModalVisible(true)}>
        <Ionicons name="share-social-outline" size={20} color="#fff" />
        <Text style={styles.shareText}>COMPARTIR PERFIL</Text>
      </TouchableOpacity>

      {/* Modal */}
     <Modal
  visible={modalVisible}
  animationType="fade"
  transparent={false}
  onRequestClose={() => setModalVisible(false)}
>
  <View style={customModal.container}>
    {/* Botón regresar (flecha) */}
    <TouchableOpacity style={customModal.backButton} onPress={() => setModalVisible(false)}>
      <Ionicons name="arrow-back-outline" size={28} color="#000" />
    </TouchableOpacity>

    {/* Tarjeta de León */}
    <View style={customModal.card}>
      <Image source={require('../../assets/Leon.png')} style={customModal.cardImage} />
      <View style={customModal.cardInfo}>
        <Text style={customModal.name}>{userData.nombre} {userData.app}</Text>
        <Text style={customModal.center}>Centro Universitario DIPA</Text>
        <Text style={customModal.username}>Maxnic</Text>
      </View>
      {/* Simulación de código QR */}
      <Image
        source={require('../../assets/qr.png')} // Reemplaza por tu imagen real
        style={customModal.qr}
      />
    </View>

    {/* Texto redes sociales */}
    <Text style={customModal.shareText}>¡SÍGUENOS EN REDES SOCIALES!</Text>

    {/* Íconos de redes */}
    <View style={customModal.socialIcons}>
      <View style={customModal.iconColumn}>
        <TouchableOpacity onPress={() => Linking.openURL('https://api.whatsapp.com/send?phone=3315857228')}>
        <FontAwesome name="whatsapp" size={30} color="#25D366" />
        </TouchableOpacity>
        <Text style={customModal.iconLabel}>WhatsApp</Text>
      </View>
      <View style={customModal.iconColumn}>
        <FontAwesome name="comment" size={30} color="#007AFF" />
        <Text style={customModal.iconLabel}>Mensajes</Text>
      </View>
      <View style={customModal.iconColumn}>
        <TouchableOpacity onPress={() => Linking.openURL('https://www.instagram.com/dipa_oficial?igsh=MXI4Y3M2eXVudnVhcw%3D%3D')}>
        <FontAwesome name="instagram" size={30} color="#C13584" />
        <Text style={customModal.iconLabel}>Instagram</Text>
        </TouchableOpacity>
      </View>
      <View style={customModal.iconColumn}>
        <TouchableOpacity onPress={() => Linking.openURL('https://www.facebook.com/CUDipa')}>
        <FontAwesome name="facebook" size={30} color="#1877F2" />
        <Text style={customModal.iconLabel}>Facebook</Text>
        </TouchableOpacity>
      </View>
    </View>

    {/* Opción Guardar y Más */}
    <View style={customModal.bottomOptions}>
      <View style={customModal.option}>
        <Ionicons name="download-outline" size={24} color="#000" />
        <Text style={customModal.optionText}>Guardar imagen</Text>
      </View>
      <View style={customModal.option}>
        <Ionicons name="ellipsis-horizontal" size={24} color="#000" />
        <Text style={customModal.optionText}>Más</Text>
      </View>
    </View>
  </View>
</Modal>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  speechBubble: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    alignSelf: 'center',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  speechText: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  avatar: {
    width: 130,
    height: 130,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginVertical: 10,
  },
  name: { textAlign: 'center', fontWeight: 'bold', fontSize: 22, marginTop: 8 },
  school: { textAlign: 'center', fontSize: 14, color: '#555' },
  code: { textAlign: 'center', fontSize: 13, letterSpacing: 2, color: '#000', marginBottom: 16 },

  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  statBox: { flex: 1, alignItems: 'center' },
  statLabel: { fontSize: 12, color: '#777' },
  statValue: { fontSize: 14, fontWeight: 'bold' },

  streakText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15,
    marginTop: 10,
    color: '#001F54',
  },
  streakSubtext: {
    textAlign: 'center',
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  streakIcons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 10,
  },
  shareButton: {
    flexDirection: 'row',
    backgroundColor: '#001F54',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    marginTop: 10,
  },
  shareText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

const customModal = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
  },
  card: {
    backgroundColor: '#fff',
    width: '90%',
    borderRadius: 20,
    padding: 20,
    marginTop: 80,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 5,
  },
  cardImage: {
    width: 120,
    height: 140,
    resizeMode: 'contain',
  },
  cardInfo: {
    alignItems: 'center',
    marginTop: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  center: {
    fontSize: 14,
    color: '#888',
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#008CFF',
  },
  qr: {
    width: 60,
    height: 60,
    marginTop: 10,
  },
  shareText: {
    marginTop: 30,
    fontWeight: 'bold',
    color: '#999',
    fontSize: 13,
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    width: '100%',
    paddingHorizontal: 20,
  },
  iconColumn: {
    alignItems: 'center',
  },
  iconLabel: {
    fontSize: 12,
    color: '#555',
    marginTop: 4,
  },
  bottomOptions: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 40,
  },
  option: {
    alignItems: 'center',
  },
  optionText: {
    fontSize: 12,
    marginTop: 4,
    color: '#333',
  },
});
