import { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { RatingContainer } from './Stars';
import { db } from './Firebase'
import { collection, addDoc } from "firebase/firestore";
 
export default function Reviews({route}) {
    const [text, onChangeText] = useState('');
    const [estrellas, setEstrellas] = useState(3);
    const enviarresena = async () => {
      try {
        const resena = {sigla: route.params.sigla, titulo: route.params.titulo, comentario: text, calificacion: estrellas}
        const docEnviado = await addDoc(collection(db, "resenas"), resena);
        console.log("Reseña subida exitosamente con ID: ", docEnviado.id);

        // vaciamos el comentario de la pestaña
        onChangeText('');

      } catch (error) {
        console.error("Error al subir la reseña: ", error);
      }
    };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Sigla:{route.params.sigla}</Text>
      <Text>Titulo Ramo:{route.params.titulo}</Text>
      <Text>Comentario:</Text>
      <TextInput 
        onChangeText={onChangeText}
        value={text}
        style={styles.input}
      >

      </TextInput>
      <TouchableOpacity>
        <RatingContainer estrellas={estrellas} setEstrellas={setEstrellas} />
      </TouchableOpacity> 
      <TouchableOpacity style={styles.button} onPress={enviarresena}>
        <Text>Subir Reseña</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },

  input: {
    backgroundColor: '#DDDDDD'
  },

});