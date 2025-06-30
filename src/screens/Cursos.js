<<<<<<< Updated upstream
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
=======
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  FlatList,
  ActivityIndicator,
  Alert,
  Modal,
  Image,
  Linking
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';




const CursosTalleres = ({ navigation }) => {
  const frases = [
  'Un león bien capacitado… ¡es el rey de cualquier emergencia!',
  '¡Ruge con conocimiento! Un león bien capacitado siempre está un paso adelante.',
 'El poder del rugido está en la preparación… ¡capacítate como un verdadero león DIPA!',
'Más que fuerza, un león necesita sabiduría. ¡Capacítate!',
'Los rugidos más fuertes vienen de los leones mejor entrenados. ¡Sigue aprendiendo!'

];

const [indiceFrase, setIndiceFrase] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setIndiceFrase((prevIndex) => (prevIndex + 1) % frases.length);
  }, 5000); // Cambia cada 5 segundos

  return () => clearInterval(interval);
}, []);
  const [sedes, setSedes] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [sedeSeleccionada, setSedeSeleccionada] = useState(null);
  const [nombreSedeSeleccionada, setNombreSedeSeleccionada] = useState('Seleccionar sede...');
  const [tarjetaVolteada, setTarjetaVolteada] = useState(null);
  const [loading, setLoading] = useState(true);
  const [animatedValues, setAnimatedValues] = useState({});
  const [mostrarDropdown, setMostrarDropdown] = useState(false);

  // URL base de tu API - Cambia esta URL por la correcta
 

  // Función para obtener las sedes desde la BD
  const obtenerSedes = async () => {
    try {
      console.log('Obteniendo sedes...');
      const response = await fetch(`http://192.168.100.68:3000/api/sedes`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Sedes obtenidas:', data); // Para debugging
      
      setSedes(data);
      
      // Seleccionar automáticamente la primera sede si hay datos
      if (data.length > 0) {
        setSedeSeleccionada(data[0].id_sede);
        setNombreSedeSeleccionada(data[0].nombre_sede);
      }
    } catch (error) {
      console.error('Error al obtener sedes:', error);
      Alert.alert('Error', 'No se pudieron cargar las sedes. Verifica tu conexión.');
    }
  };

  // Función para obtener los cursos por sede
  const obtenerCursosPorSede = async (idSede) => {
    try {
      setLoading(true);
      console.log(`Obteniendo cursos para sede: ${idSede}`);

      const response = await fetch(`http://192.168.100.68:3000/api/cursos/sede/${idSede}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Cursos obtenidos:', data); // Para debugging
      
      setCursos(data);
      
      // Inicializar valores de animación para cada tarjeta
      const newAnimatedValues = {};
      data.forEach(curso => {
        newAnimatedValues[curso.id_curso] = new Animated.Value(0);
      });
      setAnimatedValues(newAnimatedValues);
      
    } catch (error) {
      console.error('Error al obtener cursos:', error);
      Alert.alert('Error', 'No se pudieron cargar los cursos. Verifica tu conexión.');
      setCursos([]); // Limpiar cursos en caso de error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerSedes();
  }, []);

  useEffect(() => {
    if (sedeSeleccionada) {
      obtenerCursosPorSede(sedeSeleccionada);
    }
  }, [sedeSeleccionada]);

  // Función para seleccionar sede
  const seleccionarSede = (sede) => {
    console.log('Sede seleccionada:', sede);
    setSedeSeleccionada(sede.id_sede);
    setNombreSedeSeleccionada(sede.nombre_sede);
    setMostrarDropdown(false);
    setTarjetaVolteada(null); // Resetear tarjetas volteadas
  };

  // Función para voltear la tarjeta
  const voltearTarjeta = (idCurso) => {
    const isFlipped = tarjetaVolteada === idCurso;
    
    if (isFlipped) {
      // Voltear de vuelta
      Animated.spring(animatedValues[idCurso], {
        toValue: 0,
        useNativeDriver: true,
      }).start();
      setTarjetaVolteada(null);
    } else {
      // Voltear hacia adelante
      if (tarjetaVolteada && animatedValues[tarjetaVolteada]) {
        // Primero voltear la tarjeta anterior
        Animated.spring(animatedValues[tarjetaVolteada], {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
      
      Animated.spring(animatedValues[idCurso], {
        toValue: 180,
        useNativeDriver: true,
      }).start();
      setTarjetaVolteada(idCurso);
    }
  };

  // Función para obtener el ícono del curso (agrégala si no la tienes)
  const obtenerIconoCurso = (nombreCurso) => {
    // Personaliza según tus cursos
    const iconos = {
      'primeros auxilios': '🚑',
      'animales peligrosos': '🐍',
      'default': '📚'
    };
    
    const nombre = nombreCurso.toLowerCase();
    for (const [key, icon] of Object.entries(iconos)) {
      if (nombre.includes(key)) return icon;
    }
    return iconos.default;
  };

  // Componente ComboBox para sedes
  const renderSedeComboBox = () => (
    <View style={styles.comboBoxContainer}>
      <Text style={styles.comboBoxLabel}>Selecciona tu sede:</Text>
      
      <TouchableOpacity
        style={styles.comboBoxButton}
        onPress={() => setMostrarDropdown(!mostrarDropdown)}
      >
        <View style={styles.comboBoxContent}>
          <Ionicons name="location-outline" size={20} color="#2196F3" />
          <Text style={[
            styles.comboBoxText,
            sedeSeleccionada ? styles.comboBoxTextSelected : styles.comboBoxTextPlaceholder
          ]}>
            {nombreSedeSeleccionada}
          </Text>
        </View>
        <Ionicons 
          name={mostrarDropdown ? "chevron-up" : "chevron-down"} 
          size={20} 
          color="#666" 
        />
      </TouchableOpacity>

      {/* Dropdown Modal */}
      <Modal
        visible={mostrarDropdown}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setMostrarDropdown(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setMostrarDropdown(false)}
        >
          <View style={styles.dropdownContainer}>
            <View style={styles.dropdownHeader}>
              <Text style={styles.dropdownTitle}>Seleccionar Sede</Text>
              <TouchableOpacity
                onPress={() => setMostrarDropdown(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.dropdownList}>
              {sedes.length > 0 ? (
                sedes.map((sede) => (
                  <TouchableOpacity
                    key={sede.id_sede}
                    style={[
                      styles.dropdownItem,
                      sedeSeleccionada === sede.id_sede && styles.dropdownItemSelected
                    ]}
                    onPress={() => seleccionarSede(sede)}
                  >
                    <View style={styles.dropdownItemContent}>
                      <Ionicons 
                        name="location" 
                        size={18} 
                        color={sedeSeleccionada === sede.id_sede ? "#2196F3" : "#666"} 
                      />
                      <Text style={[
                        styles.dropdownItemText,
                        sedeSeleccionada === sede.id_sede && styles.dropdownItemTextSelected
                      ]}>
                        {sede.nombre_sede}
                      </Text>
                    </View>
                    {sedeSeleccionada === sede.id_sede && (
                      <Ionicons name="checkmark" size={20} color="#2196F3" />
                    )}
                  </TouchableOpacity>
                ))
              ) : (
                <View style={styles.dropdownEmpty}>
                  <Text style={styles.dropdownEmptyText}>No hay sedes disponibles</Text>
                </View>
              )}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );

  const renderTarjetaCurso = ({ item }) => {
    const animatedValue = animatedValues[item.id_curso] || new Animated.Value(0);
    const isFlipped = tarjetaVolteada === item.id_curso;

    const frontAnimatedStyle = {
      transform: [
        {
          rotateY: animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['0deg', '180deg'],
          }),
        },
      ],
>>>>>>> Stashed changes
    };

    const backAnimatedStyle = {
      transform: [
        {
          rotateY: animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['180deg', '360deg'],
          }),
        },
      ],
    };

    return (
      <TouchableOpacity
        style={styles.tarjetaContainer}
        onPress={() => voltearTarjeta(item.id_curso)}
        activeOpacity={0.8}
<<<<<<< Updated upstream
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
=======
      >
        <View style={styles.tarjeta}>
          {/* Lado frontal */}
          <Animated.View style={[styles.tarjetaSide, styles.tarjetaFront, frontAnimatedStyle]}>
            <View style={styles.tarjetaHeader}>
              <Text style={styles.tarjetaIcon}>
                {obtenerIconoCurso(item.nombre_curso)}
              </Text>
              <Text style={styles.tarjetaTitulo} numberOfLines={2}>
                {item.nombre_curso}
              </Text>
            </View>
          </Animated.View>

          {/* Lado trasero */}
          <Animated.View style={[styles.tarjetaSide, styles.tarjetaBack, backAnimatedStyle]}>
            <View style={styles.tarjetaBackContent}>
              <Text style={styles.cursoTitulo}>{item.nombre_curso}</Text>
              
              <Text style={styles.cursoDescripcion} numberOfLines={3}>
                {item.descripcion || 'Descripción no disponible'}
              </Text>

              <View style={styles.cursoDetalles}>
                <View style={styles.modalidadContainer}>
                  <Text style={styles.modalidadText}>{item.modalidad || 'Modalidad no especificada'}</Text>
                </View>
                
                <View style={styles.horasContainer}>
                  <Ionicons name="time-outline" size={16} color="#fff" />
                  <Text style={styles.horasText}>{item.horas || 'N/A'}</Text>
                </View>
              </View>

              <TouchableOpacity style={styles.inscribirseButton} onPress={() => Linking.openURL('https://api.whatsapp.com/send?phone=3315857228')}>
                <Text style={styles.inscribirseText}>¡Quiero inscribirme!</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
>>>>>>> Stashed changes
      </TouchableOpacity>
    );
  };

<<<<<<< Updated upstream
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

=======
>>>>>>> Stashed changes
  return (
    <View style={styles.container}>
     <View style={styles.headerContainer}>
  {/* Botón regresar */}
  <TouchableOpacity onPress={() => navigation.goBack()}>
    <Ionicons name="chevron-back" size={24} color="#000" />
  </TouchableOpacity>
</View>



      {/* Título */}
      <Text style={styles.titulo}>Cursos y Talleres</Text>
      
<<<<<<< Updated upstream
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
=======
      {/* Mensaje informativo */}
     <View style={styles.mensajeContainer}>
  <Image
    source={require('../../assets/LeonOficial2.png')} // Asegúrate de guardar la imagen como leonMensaje.png
    style={styles.leonImage}
    resizeMode="contain"
  />
  <Animatable.Text
    style={styles.mensajeTexto}
    animation="fadeIn"
    duration={500}
    key={indiceFrase}
  >
    {frases[indiceFrase]}
  </Animatable.Text>
</View>


      {/* ComboBox de sedes */}
      {renderSedeComboBox()}

      {/* Lista de cursos */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2196F3" />
          <Text style={styles.loadingText}>Cargando cursos...</Text>
        </View>
      ) : cursos.length > 0 ? (
        <FlatList
          data={cursos}
          renderItem={renderTarjetaCurso}
          keyExtractor={(item) => item.id_curso.toString()}
          numColumns={2}
          contentContainerStyle={styles.cursosContainer}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.noCursosContainer}>
          <Ionicons name="school-outline" size={64} color="#ccc" />
          <Text style={styles.noCursosText}>
            No hay cursos disponibles en esta sede
          </Text>
        </View>
      )}
    </View>
>>>>>>> Stashed changes
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
 headerContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingHorizontal: 5,
  paddingTop: 1,
  paddingBottom: 1,
},

headerIcons: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 1,
},

iconBadge: {
  alignItems: 'center',
  justifyContent: 'center',
  marginHorizontal: 10,
  position: 'relative',
},

badgeText: {
  position: 'absolute',
  top: -6,
  right: -10,
  backgroundColor: '#fff',
  color: '#000',
  fontSize: 10,
  borderRadius: 10,
  paddingHorizontal: 4,
  fontWeight: 'bold',
},
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
<<<<<<< Updated upstream
  },
  mascotContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    marginBottom: 20,
    alignItems: 'center',
=======
    paddingHorizontal: 20,
    marginVertical: 20,
>>>>>>> Stashed changes
  },
mensajeContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#ffff',
  marginHorizontal: 20,
  padding: 15,
  borderRadius: 12,
  marginBottom: 20,
  gap: 10,
},

leonImage: {
  width: 80,
  height: 80,
},

mensajeTexto: {
  flex: 1,
  fontSize: 14,
  color: '#0D47A1',
  fontWeight: '600',
  lineHeight: 18,
},


  
  // Estilos para el ComboBox
  comboBoxContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  comboBoxLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  comboBoxButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  comboBoxContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
<<<<<<< Updated upstream
    backgroundColor: '#f0f0f0',
    borderRadius: 15,
    padding: 10,
    marginLeft: 10,
=======
>>>>>>> Stashed changes
  },
  comboBoxText: {
    fontSize: 16,
    marginLeft: 10,
  },
  comboBoxTextSelected: {
    color: '#333',
    fontWeight: '500',
  },
<<<<<<< Updated upstream
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
=======
  comboBoxTextPlaceholder: {
    color: '#999',
  },
  
  // Estilos para el Modal/Dropdown
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginHorizontal: 20,
    maxHeight: '70%',
    minWidth: '80%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  dropdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  dropdownTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    padding: 4,
  },
  dropdownList: {
    maxHeight: 300,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  dropdownItemSelected: {
    backgroundColor: '#E3F2FD',
  },
  dropdownItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  dropdownItemText: {
    fontSize: 16,
    marginLeft: 12,
    color: '#333',
  },
  dropdownItemTextSelected: {
    color: '#2196F3',
    fontWeight: '600',
  },
  
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  noCursosContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  noCursosText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 16,
  },
  cursosContainer: {
    padding: 15,
  },
  tarjetaContainer: {
    flex: 1,
    margin: 10, // Aumenté el margen de 8 a 10
    height: 250, // Aumenté la altura de 150 a 220
    minHeight: 250, // Altura mínima para consistencia
  },
  tarjeta: {
    flex: 1,
    position: 'relative',
  },
  tarjetaSide: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    borderRadius: 15,
  },
  tarjetaFront: {
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  tarjetaBack: {
    backgroundColor: '#1E3A8A',
    padding: 20, // Aumenté el padding de 15 a 20
  },
  tarjetaHeader: {
    alignItems: 'center',
  },
  tarjetaIcon: {
    fontSize: 50, // Aumenté el tamaño del ícono de 40 a 50
    marginBottom: 12, // Aumenté el margen de 10 a 12
  },
  tarjetaTitulo: {
    fontSize: 20, // Aumenté el tamaño de fuente de 14 a 16
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    paddingHorizontal: 8, // Agregué padding horizontal
  },
  tarjetaBackContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  cursoTitulo: {
    fontSize: 18, // Aumenté el tamaño de fuente de 16 a 18
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10, // Aumenté el margen de 8 a 10
  },
  cursoDescripcion: {
    fontSize: 14, // Aumenté el tamaño de fuente de 12 a 14
    color: '#E3F2FD',
    textAlign: 'center',
    lineHeight: 18, // Aumenté el line height de 16 a 18
  },
  cursoDetalles: {
    alignItems: 'center',
    gap: 8, // Aumenté el gap de 5 a 8
  },
  modalidadContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 14, // Aumenté el padding de 12 a 14
    paddingVertical: 6, // Aumenté el padding de 4 a 6
    borderRadius: 12,
  },
  modalidadText: {
    fontSize: 13, // Aumenté el tamaño de fuente de 12 a 13
    fontWeight: 'bold',
    color: '#1E3A8A',
  },
  horasContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8, // Aumenté el gap de 5 a 6
  },
  horasText: {
    fontSize: 13, // Aumenté el tamaño de fuente de 12 a 13
    color: '#fff',
    fontWeight: 'bold',
  },
  inscribirseButton: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    paddingVertical: 8, // Aumenté el padding de 5 a 8
    paddingHorizontal: 16, // Aumenté el padding horizontal de 10 a 16
  },
  inscribirseText: {
    fontSize: 14, // Aumenté el tamaño de fuente de 12 a 14
    color: '#81C784',
    fontWeight: 'bold',
  },
  cameraIcon: {
    alignItems: 'center',
    gap: 6, // Aumenté el gap de 5 a 6
  },
  cameraText: {
    fontSize: 10, // Aumenté el tamaño de fuente de 8 a 10
    color: '#B0BEC5',
    textAlign: 'center',
    lineHeight: 12, // Aumenté el line height de 10 a 12
  },
});

export default CursosTalleres;
>>>>>>> Stashed changes
