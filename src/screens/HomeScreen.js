import React from 'react';
<<<<<<< Updated upstream
import { View, Text, Image, TouchableWithoutFeedback, StyleSheet, ScrollView } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
=======
import { View, Text, Image, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, ScrollView, Dimensions, Alert, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
>>>>>>> Stashed changes
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import Cursos from './Cursos';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

<<<<<<< Updated upstream
=======
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
  return Math.max(10, Math.min(newSize, 28)); // Mínimo 10, máximo 28
};

// Función para obtener tamaños de iconos responsivos
const getIconSize = (size) => {
  const scale = screenWidth / 375;
  const newSize = size * scale;
  return Math.max(12, Math.min(newSize, 32));
};

>>>>>>> Stashed changes
export default function HomeScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  
  const [userData, setUserData] = useState({
    nombre: '',
    app: '',
    matricula: '',

<<<<<<< Updated upstream

  });

=======
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
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
=======
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header con menú */}
        <View style={[styles.headerContainer, { paddingTop: Math.max(insets.top * 0.5, hp(1)) }]}>
          <View style={styles.iconGroup}>
            <Animatable.View animation="bounceIn" delay={200} style={styles.headerStatItem}>
              <View style={[styles.headerStatIcon, { backgroundColor: '#6ab04c' }]}>
                <Ionicons name="mic" size={getIconSize(14)} color="white" />
              </View>
              <Text style={styles.headerStatValue}>1</Text>
            </Animatable.View>

            <Animatable.View animation="bounceIn" delay={400} style={styles.headerStatItem}>
              <View style={[styles.headerStatIcon, { backgroundColor: '#3498db' }]}>
                <Ionicons name="person-outline" size={getIconSize(14)} color="white" />
              </View>
              <Text style={styles.headerStatValue}>0</Text>
            </Animatable.View>

            <Animatable.View animation="bounceIn" delay={600} style={styles.headerStatItem}>
              <View style={[styles.headerStatIcon, { backgroundColor: '#e17055' }]}>
                <Ionicons name="flame" size={getIconSize(14)} color="white" />
              </View>
              <Text style={styles.headerStatValue}>1</Text>
            </Animatable.View>

            <Animatable.View animation="bounceIn" delay={800} style={styles.headerStatItem}>
              <View style={[styles.headerStatIcon, { backgroundColor: '#6c5ce7' }]}>
                <Icon name="paw" size={getIconSize(14)} color="white" />
              </View>
              <Text style={styles.headerStatValue}>5</Text>
            </Animatable.View>
          </View>
          
          <TouchableWithoutFeedback onPress={toggleMenu}>
            <Ionicons name="settings-outline" size={getIconSize(24)} color="#999" />
          </TouchableWithoutFeedback>
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
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
=======
        {/* Menú desplegable */}
        {menuVisible && (
          <View style={[styles.dropdownMenu, { top: hp(7) }]}>
            <TouchableWithoutFeedback onPress={handlePerfil}>
              <Text style={styles.menuItem}>Perfil</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={handleLogout}>
              <Text style={styles.menuItem}>Cerrar sesión</Text>
            </TouchableWithoutFeedback>
          </View>
        )}

        {/* Perfil */}
        <View style={styles.profileSection}>
          <Image
            source={require('../../assets/inicio/a179.png')}
            style={styles.avatar}
            resizeMode="cover"
          />
          <View style={styles.profileInfo}>
            <Text style={styles.name}>
              {userData.nombre ? `${userData.nombre} ${userData.app}` : 'Álvaro Díaz'}
            </Text>
            <Text style={styles.university}>Centro Universitario DIPA</Text>
          </View>
        </View>
        
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeGreen}>DIPA ESTUDIO</Text>
          <View style={styles.badgeBlackContainer}>
            <Icon name="podcast" size={getIconSize(12)} color="white" style={styles.podcastIcon} />
            <Text style={styles.badgeBlack}>Ver cap.</Text>
>>>>>>> Stashed changes
          </View>
        </View>
      </TouchableWithoutFeedback>

<<<<<<< Updated upstream
      {/* Logros */}
      <Text style={styles.sectionTitle}>Logros</Text>
      <View style={styles.achievements}>
        <View style={styles.achievementCard}>
          <Text style={styles.newBadge}>NUEVO</Text>
          <Text style={styles.achievementText}>DIPA💙LOVER</Text>
=======
        {/* Cursos y Talleres */}
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Cursos')}>
          <Text style={styles.cardTitle}>Cursos y Talleres</Text>
        </TouchableOpacity>

        {/* Logros */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Logros</Text>
          <View style={styles.achievements}>
            <View style={styles.achievementCard}>
              <Text style={styles.nuevoLabel}>NUEVO</Text>
              <Icon name="paw" size={getIconSize(30)} color="#8A2BE2" />
              <Text style={styles.achievementText}>DIPA LOVER</Text>
            </View>
            <View style={styles.achievementCardEmpty} />
            <View style={styles.achievementCardEmpty} />
          </View>
>>>>>>> Stashed changes
        </View>
        <View style={styles.achievementCard}><Text style={styles.newBadge}>NUEVO</Text></View>
        <View style={styles.achievementCard}><Text style={styles.newBadge}>NUEVO</Text></View>
      </View>
      <Text style={styles.subText}>
        Navega conmigo, cumple los retos que te dejo y gana logros exclusivos.
      </Text>

<<<<<<< Updated upstream
    </ScrollView>
=======
    
      </ScrollView>
    </SafeAreaView>
>>>>>>> Stashed changes
  );
}

const styles = StyleSheet.create({
<<<<<<< Updated upstream
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 20,
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
=======
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingBottom: hp(3),
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(5),
    paddingTop: hp(1),
    paddingBottom: hp(1),
    position: 'relative',
  },
  iconGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-evenly',
    marginHorizontal: wp(5),
>>>>>>> Stashed changes
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
    gap: wp(1),
  },
<<<<<<< Updated upstream
  pointText: { marginHorizontal: 2, fontWeight: 'bold', fontSize: 14 },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginVertical: 10,
  },
  avatar: {
    width: 80,
    height: 100,
    resizeMode: 'contain',
  },
  info: {
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#132257',
  },
  school: {
    color: '#666',
    fontSize: 13,
    marginTop: 2,
  },
  dipaButton: {
    backgroundColor: '#00cc00',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    flexDirection: 'row',
=======
  headerStatIcon: {
    width: wp(7),
    height: wp(7),
    borderRadius: wp(3.5),
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 26,
    minHeight: 26,
  },
  headerStatValue: {
    fontSize: getFontSize(16),
    fontWeight: 'bold',
    color: '#333',
  },
  dropdownMenu: {
    position: 'absolute',
    right: wp(5),
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    paddingVertical: hp(1),
    minWidth: wp(30),
    zIndex: 1000,
  },
  menuItem: {
    paddingVertical: hp(1.2),
    paddingHorizontal: wp(4),
    fontSize: getFontSize(14),
    color: '#333',
  },
  profileSection: {
    flexDirection: 'row',
    padding: wp(5),
    alignItems: 'center',
    gap: wp(4),
    marginBottom: hp(-11),
  },
  avatar: {
    width: wp(30),
    height: hp(25),
    borderRadius: 10,
    backgroundColor: '#fff',
    minWidth: 115,
    minHeight: 180,
  },
  profileInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: getFontSize(18),
    fontWeight: 'bold',
    marginBottom: hp(0.5),
  },
  university: {
    fontSize: getFontSize(14),
    color: '#666',
  },
  badgeContainer: {
    flexDirection: 'column',
    gap: hp(0.2),
    marginTop: hp(1),
    alignItems: 'flex-end',
    marginRight: wp(8),
    marginBottom: hp(5),
  },
  badgeGreen: {
    backgroundColor: '#2ecc71',
    color: 'white',
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.5),
    borderRadius: 4,
    fontWeight: 'bold',
    fontSize: getFontSize(20),
    textAlign: 'center',
  },
  badgeBlackContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.5),
    borderRadius: 4,
  },
  podcastIcon: {
    marginRight: wp(1),
  },
  badgeBlack: {
    color: 'white',
    fontSize: getFontSize(15),
    fontWeight: 'bold',
  },
  card: {
    marginHorizontal: wp(5),
    backgroundColor: '#2E3870',
    borderRadius: 12,
    paddingVertical: hp(2),
    marginBottom: hp(2),
>>>>>>> Stashed changes
    alignItems: 'center',
    marginBottom: 8,
  },
  dipaText: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 14,
    marginRight: 6,
  },
  verCap: {
    fontSize: 11,
    color: '#000',
  },
  flipContainer: {
    width: '100%',
    height: 120,
    alignSelf: 'center',
    marginVertical: 16,
  },
  courseBox: {
    backgroundColor: '#132257',
    borderRadius: 20,
    paddingVertical: 30,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  courseText: {
    color: '#fff',
    fontWeight: 'bold',
<<<<<<< Updated upstream
    fontSize: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
    marginTop: 8,
    color: '#132257',
=======
    fontSize: getFontSize(16),
  },
  section: {
    paddingHorizontal: wp(5),
    marginTop: hp(1),
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: getFontSize(16),
    marginBottom: hp(1),
>>>>>>> Stashed changes
  },
  achievements: {
    flexDirection: 'row',
    justifyContent: 'space-between',
<<<<<<< Updated upstream
    marginBottom: 10,
  },
  achievementCard: {
    width: '30%',
    height: 70,
    borderRadius: 10,
=======
    gap: wp(2),
  },
  achievementCard: {
    width: (screenWidth - wp(20)) / 3,
    height: hp(12),
>>>>>>> Stashed changes
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
<<<<<<< Updated upstream
    backgroundColor: '#fff',
  },
  newBadge: {
    backgroundColor: 'red',
    color: '#fff',
    paddingHorizontal: 6,
    paddingVertical: 2,
=======
    position: 'relative',
    minHeight: 100,
  },
  achievementCardEmpty: {
    width: (screenWidth - wp(20)) / 3,
    height: hp(12),
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    minHeight: 100,
  },
  nuevoLabel: {
    position: 'absolute',
    top: hp(0.5),
    left: wp(1),
    fontSize: getFontSize(10),
    backgroundColor: 'red',
    color: '#fff',
    paddingHorizontal: wp(1),
>>>>>>> Stashed changes
    borderRadius: 4,
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  achievementText: {
<<<<<<< Updated upstream
    fontSize: 11,
    fontWeight: 'bold',
    color: '#132257',
    textAlign: 'center',
  },
  subText: {
    fontSize: 11,
    color: '#555',
    textAlign: 'center',
    marginVertical: 12,
  },
});
=======
    fontSize: getFontSize(12),
    marginTop: hp(0.5),
    textAlign: 'center',
  },
  banner: {
    width: screenWidth - wp(10),
    height: hp(12),
    marginTop: hp(30),
    borderRadius: 10,
    marginHorizontal: wp(5),
    minHeight: 100,
  },
});
>>>>>>> Stashed changes
