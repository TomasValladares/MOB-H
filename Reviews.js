import React from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
 
export default function Reviews({route}) {
    const [text, onChangeText] = useState('');
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Sigla:</Text>
      <TextInput 
        onChangeText={onChangeText}
        value={text}
      > 
          
      </TextInput>
      <Text>Titulo Ramo:</Text>
      <TextInput 
        onChangeText={onChangeText}
        value={text}
      >

      </TextInput>
      <Text>Comentario:</Text>
      <TextInput 
        onChangeText={onChangeText}
        value={text}
      > 

      </TextInput>
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