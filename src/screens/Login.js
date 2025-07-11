import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({ navigation }) {
  const [showPassword, setShowPassword] = useState(false);
  const [matricula, setMatricula] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
  try {
<<<<<<< Updated upstream
    const response = await axios.post('http://192.168.100.35:3000/Login', {
=======
    const response = await axios.post('http://192.168.100.68:3000/Login', {
>>>>>>> Stashed changes
      matricula,
      password,
    });

    if (response.data.success) {
      const { user } = response.data;

      await AsyncStorage.multiSet([
        ['nombre', user.nombre],
        ['app', user.app],
        ['matricula', user.matricula],
        ['academia', user.academia],
        ['sede', user.sede],
      ]);

      // Navega a Home
      navigation.navigate('Home');
    } else {
      Alert.alert('Error', response.data.message || 'Credenciales incorrectas');
    }
  } catch (error) {
    console.log('Error en login:', error.message);
    Alert.alert('Error', 'No se pudo conectar con el servidor');
  }
};


  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-outline" size={24} color="#000" />
      </TouchableOpacity>

      <Text style={styles.title}>Ingresa tus datos</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Número de matrícula"
          value={matricula}
          onChangeText={setMatricula}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.inputPassword}
            placeholder="Contraseña"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? 'eye-off-outline' : 'eye-outline'}
              size={22}
              color="#999"
            />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginText}>INGRESAR</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.link}>Restablecer contraseña</Text>
      </TouchableOpacity>

      <View style={styles.feedbackContainer}>
        <Text style={styles.brand}>Maxnic</Text>
        <Text style={styles.feedbackText}>
          ¿Estás disfrutando de mi compañía en la app?
        </Text>
        <View style={styles.stars}>
          {[1, 2, 3, 4].map((i) => (
            <Ionicons key={i} name="star" size={28} color="#00bfff" />
          ))}
          <Ionicons name="star-outline" size={28} color="#00bfff" />
        </View>
      </View>

      <Text style={styles.footerText}>
        Al registrarte en Maxnic, aceptas nuestros{' '}
        <Text style={styles.termsLink}>Términos y Políticas de privacidad.</Text>
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  backButton: { marginBottom: 10 },
  title: { fontSize: 16, textAlign: 'center', color: '#999', marginBottom: 20 },
  inputContainer: { gap: 12, alignItems: 'center' },
  input: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 10,
    fontSize: 16,
    width: '90%',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    borderRadius: 10,
    width: '90%',
  },
  inputPassword: { flex: 1, paddingVertical: 12, fontSize: 16 },
  loginButton: {
    backgroundColor: '#2E3870',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
  },
  loginText: { color: '#fff', fontWeight: 'bold' },
  link: {
    color: '#00bfff',
    textAlign: 'center',
    marginTop: 15,
    textDecorationLine: 'underline',
  },
  feedbackContainer: { marginTop: 40, alignItems: 'center' },
  brand: { fontSize: 28, fontWeight: 'bold', color: '#000' },
  feedbackText: {
    color: '#00bfff',
    fontSize: 14,
    marginVertical: 10,
    textAlign: 'center',
  },
  stars: { flexDirection: 'row', gap: 6 },
  footerText: { fontSize: 12, textAlign: 'center', marginTop: 30, color: '#999' },
  termsLink: { textDecorationLine: 'underline', color: '#000' },
});
