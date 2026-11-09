import { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { RatingContainer } from './Stars';
 
export default function Reviews({route}) {
    const [text, onChangeText] = useState('');
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Sigla:{route.params.sigla}</Text>
      <Text>Titulo Ramo:{route.params.titulo}</Text>
      <Text>Comentario:</Text>
      <TextInput 
        onChangeText={onChangeText}
        value={text}
      >

      </TextInput>
      <TouchableOpacity>
        <RatingContainer></RatingContainer>
      </TouchableOpacity> 
      <TouchableOpacity style={styles.button}>
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

});