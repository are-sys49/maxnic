import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text,  View, TouchableOpacity, Image, ScrollView, SafeAreaView, Dimensions, StatusBar, Animated, Easing, Modal} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const frases = [
  "¡Ruge con conocimiento! Un león bien capacitado siempre está un paso adelante.",
  "La sabiduría es la mejor defensa. Prepárate para cualquier desafío.",
  "La educación es la clave para sobrevivir en la jungla de la vida.",
  "Conocimiento es poder. ¡Prepárate para la aventura!",
  "La preparación es la mejor defensa. ¡Conviértete en un experto!",
  "La curiosidad es el primer paso hacia el conocimiento. ¡Explora y aprende!",
  "La naturaleza es tu maestra. Aprende de ella y sobrevive.",
  "La valentía no es la ausencia de miedo, sino la capacidad de enfrentarlo con conocimiento.",
  "La supervivencia es un arte. Aprende las técnicas y conviértete en un maestro.",
];


export default function App({ navigation }) {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [fraseActual, setFraseActual] = useState('');
  
  const obtenerFraseAleatoria = () => {
    let nuevaFrase = fraseActual;
    while (nuevaFrase === fraseActual) {
      const indice = Math.floor(Math.random() * frases.length);
      nuevaFrase = frases[indice];
  }
    return nuevaFrase;
  };

  useEffect(() => {

    setFraseActual(obtenerFraseAleatoria());

    const interval = setInterval(() => {
      setFraseActual(obtenerFraseAleatoria());
    }, 5000); // Cambia la frase cada 5 segundos

    return () => clearInterval(interval);
  }, []);


  const [courses, setCourses] = useState([]);
  useFocusEffect(
    React.useCallback(() => {
      const fetchCourses = async () => {
        try {
          const response = await fetch(`http://192.168.100.35:3000/CursosSede/${matricula}`);
          const data = await response.json();
          setCourses(data.cursos);
        }
        catch (error) {
          console.error('Error fetching courses:', error);
        }
      }
      fetchCourses();
    }
    , [])
  );

  const FlipCard = ({ course }) => {
    const animatedValue = useRef(new Animated.Value(0)).current;
    const [flipped, setFlipped] = useState(false);
    
    const frontInterpolate = animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg']
    });
    
    const backInterpolate = animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg']
    });
  
    const flipCard = () => {
      Animated.timing(animatedValue, {
        toValue: flipped ? 0 : 180,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: true
      }).start(() => setFlipped(!flipped));
    };

    const showCourseDetails = () => {
      setSelectedCourse(course);
    };

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={flipCard}
        style={[styles.card, course.id === 1 && styles.highlightedCard]}
      >
        <Animated.View style={[
          styles.flipCard,
          { transform: [{ rotateY: frontInterpolate }] },
          { backgroundColor: course.color }
        ]}>
          <View style={styles.cardContent}>
            <Text style={styles.cardIcon}>{course.icon}</Text>
            <Text style={styles.cardTitle}>{course.title}</Text>
            <Text style={styles.cardHint}>Toca para voltear</Text>
          </View>
        </Animated.View>
        
        <Animated.View style={[
          styles.flipCard,
          styles.flipCardBack,
          { transform: [{ rotateY: backInterpolate }] }
        ]}>
          <View style={styles.cardBackContent}>
            <Text style={[styles.detailCardTitle, { color: course.color }]}>
              {course.title}
            </Text>
            <Text style={styles.detailCardDescription}>
              {course.details.description.substring(0, 60)}...
            </Text>
            <TouchableOpacity 
              style={[styles.actionButton, { backgroundColor: course.color }]}
              onPress={showCourseDetails}
            >
              <Text style={styles.actionButtonText}>
                {course.details.callToAction}
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  const CourseDetailsModal = ({ course, onClose }) => {
    if (!course) return null;
    
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={!!course}
        onRequestClose={onClose}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={[styles.modalHeader, { backgroundColor: course.color }]}>
              <Text style={styles.modalTitle}>{course.title}</Text>
              <Text style={styles.modalSubtitle}>Intervenciones oportunas</Text>
            </View>
            
            <ScrollView style={styles.modalBody}>
              <Text style={styles.modalDescription}>
                {course.details.description}
              </Text>
              
              <View style={styles.modalFeatures}>
                <View style={[styles.modalFeatureBox, { backgroundColor: course.color }]}>
                  <Text style={styles.modalFeatureText}>{course.details.modality}</Text>
                </View>
                <View style={[styles.modalFeatureBox, { backgroundColor: course.color }]}>
                  <Text style={styles.modalFeatureText}>{course.details.duration}</Text>
                </View>
              </View>
              
              <View style={styles.modalInfoItem}>
                <Ionicons name="location-outline" size={20} color="#555" />
                <Text style={styles.modalInfoText}>{course.details.location}</Text>
              </View>
              
              <View style={styles.modalInfoItem}>
                <Ionicons name="time-outline" size={20} color="#555" />
                <Text style={styles.modalInfoText}>{course.details.schedule}</Text>
              </View>
              
              <View style={styles.modalInfoItem}>
                <Ionicons name="alert-circle-outline" size={20} color="#555" />
                <Text style={styles.modalInfoText}>Requisitos: {course.details.requirements}</Text>
              </View>
            </ScrollView>
            
            <TouchableOpacity 
              style={[styles.modalCloseButton, { backgroundColor: course.color }]}
              onPress={onClose}
            >
              <Text style={styles.modalCloseText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#666" />
        </TouchableOpacity>
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <View style={[styles.statIcon, { backgroundColor: '#6ab04c' }]}>
              <Text>!</Text>
            </View>
            <Text style={styles.statValue}>1</Text>
          </View>
          
          <View style={styles.statItem}>
            <View style={[styles.statIcon, { backgroundColor: '#3498db' }]}>
              <Ionicons name="person" size={16} color="white" />
            </View>
            <Text style={styles.statValue}>0</Text>
          </View>
          
          <View style={styles.statItem}>
            <View style={[styles.statIcon, { backgroundColor: '#e17055' }]}>
              <Ionicons name="flame" size={16} color="white" />
            </View>
            <Text style={styles.statValue}>1</Text>
          </View>
          
          <View style={styles.statItem}>
            <View style={[styles.statIcon, { backgroundColor: '#6c5ce7' }]}>
              <Ionicons name="paw" size={16} color="white" />
            </View>
            <Text style={styles.statValue}>5</Text>
          </View>
        </View>
        
        <TouchableOpacity style={styles.settingsButton}>
          <Ionicons name="settings-outline" size={24} color="#666" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Cursos y Talleres</Text>
      </View>
      
      <View style={styles.mascotContainer}>
        <Image 
          source={{ uri: 'https://vignette.wikia.nocookie.net/doblaje/images/f/f2/Alexleon.png/revision/latest?cb=20141225032252&path-prefix=es' }} 
          style={styles.mascotImage} 
        />
        <View style={styles.speechBubble}>
          <Text style={styles.speechBubbleText}>
            {fraseActual}
          </Text>
        </View>
      </View>
      
      <View style={styles.cardsContainer}>
        <ScrollView contentContainerStyle={styles.cardsGrid}>
          {courses.map((course) => (
            <FlipCard 
              key={course.id} 
              course={course}
            />
          ))}
        </ScrollView>
      </View>
      
      <CourseDetailsModal 
        course={selectedCourse} 
        onClose={() => setSelectedCourse(null)} 
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  backButton: {
    padding: 8,
  },
  settingsButton: {
    padding: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  statIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statValue: {
    marginLeft: 3,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
  },
  titleContainer: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  mascotContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    marginBottom: 20,
    alignItems: 'center',
  },
  mascotImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  speechBubble: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 15,
    padding: 10,
    marginLeft: 10,
  },
  speechBubbleText: {
    color: '#1a397c',
    fontSize: 14,
    fontWeight: '500',
  },
  cardsContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  cardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  card: {
    width: (width - 30) / 2,
    height: (width - 30) / 2,
    borderRadius: 20,
    marginBottom: 35,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  highlightedCard: {
    borderColor: '#1a397c',
    borderWidth: 2,
  },
  flipCard: {
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
  },


  flipCardBack: {
    backgroundColor: 'white',
    backfaceVisibility: 'hidden',
  },

  
  cardContent: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginTop: 10,
  },
  cardIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  cardHint: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 10,
    textAlign: 'center',
  },

  cardBackContent: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  detailCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  detailCardDescription: {
    fontSize: 10,
    lineHeight: 16,
    color: '#333',
    marginBottom: 15,
  },
  
  actionButton: {
    marginTop: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: 'center',
    maxWidth: '90%',
  },
  
  actionButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: 'white',
    borderRadius: 15,
    overflow: 'hidden',
  },
  modalHeader: {
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  modalSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 5,
  },
  modalBody: {
    padding: 20,
  },
  modalDescription: {
    fontSize: 16,
    lineHeight: 22,
    color: '#333',
    marginBottom: 20,
  },
  modalFeatures: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  modalFeatureBox: {
    padding: 12,
    borderRadius: 8,
    width: '48%',
    alignItems: 'center',
  },
  modalFeatureText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  modalInfoText: {
    fontSize: 14,
    color: '#555',
    marginLeft: 10,
  },
  modalCloseButton: {
    padding: 15,
    alignItems: 'center',
  },
  modalCloseText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});