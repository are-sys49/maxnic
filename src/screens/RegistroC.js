import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

<<<<<<< Updated upstream
const RegistroC = ({ navigation }) => {
=======
const RegistroC = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // Navegar automáticamente a HomeScreen después de 3 segundos (3000 ms)
    const timer = setTimeout(() => {
      navigation.navigate('Home');
    }, 3000);

    // Limpiar el timeout si el componente se desmonta antes
    return () => clearTimeout(timer);
  }, [navigation]);

>>>>>>> Stashed changes
  return (
    <View style={styles.container}>
      {/* Barra de progreso con estrella */}
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBar} />
      </View>

      {/* Globo de diálogo */}
      <View style={styles.dialogBox}>
        <Text style={styles.dialogText}>¡Ya eres un rugidor oficial!</Text>
      </View>

      {/* Imagen del león */}
      <Image source={require('../../assets/LeonOficial.png')} style={styles.lionImage} />

<<<<<<< Updated upstream
      {/* Botón Continuar */}
      <TouchableOpacity
        style={styles.continueButton}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.continueButtonText}>Continuar</Text>
      </TouchableOpacity>
=======
>>>>>>> Stashed changes
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 60,
  },
  progressBarContainer: {
    width: '90%',
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 70,
    position: 'relative',
    marginBottom: 10,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  progressBar: {
    height: '100%',
    width: '100%',
    backgroundColor: '#2E3870', // azul oscuro
    borderRadius: 70,
  },
  dialogBox: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    marginTop: 30,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  dialogText: {
    fontSize: 16,
    color: '#2E4B9C',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  lionImage: {
    width: 500,
    height: 600,
    resizeMode: 'contain',
  },
  continueButton: {
    marginTop: 20,
    backgroundColor: '#132257',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 10,
  },
  continueButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default RegistroC;

