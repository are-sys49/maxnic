import { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Image } from "expo-image";

export default function Splash({ navigation }) {
    useEffect(() => {
        setTimeout(() => {
            navigation.replace('Inicio');
        }, 9000); // tiempo de pantalla
    }, []);

    return (
        <View style={styles.container}>

            <Image
<<<<<<< Updated upstream
                source={require('../../assets/leon.gif')}
=======
                source={require('../../assets/AnimacionFondoAzul.gif')}
>>>>>>> Stashed changes
                style={styles.image}
                resizeMode="contain"
            />

            <Text style={styles.title}>Maxnic</Text>
            <Text style={styles.subtitle}>Centro Universitario DIPA A.C.</Text>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
<<<<<<< Updated upstream
        flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#263278'
=======
        flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#2e3871'
>>>>>>> Stashed changes
    },
    title: {
        fontSize: 70,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: .5,
    },
    subtitle: {
        fontSize: 16,
        color: '#fff',
        marginBottom: 10,
    },
    image: {
        width: 200, height: 200
    }
});