import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { collection, getDocs } from "firebase/firestore";
import { db }  from './Firebase';
import { useNavigation } from '@react-navigation/native';

const Item = ({data, onPress}) => (
  <TouchableOpacity style={styles.item} onPress={onPress}>
    <Text style={styles.title}>{data.nombre}</Text>
    <Text style={styles.title}>{data.sigla}</Text> 
  </TouchableOpacity>
);

export default function Buscador() {
  const [listaRamos, setListaRamos] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    // Definimos la función asíncrona (porque conectarse a internet toma tiempo)
    const descargarRamos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "ramos"));
        const ramosTemporales = [];
        querySnapshot.forEach((doc) => {
          console.log(`${doc.id} => ${doc.data()}`);
          ramosTemporales.push({id: doc.id, data: doc.data()})
        });

        setListaRamos(ramosTemporales);
        
      } catch (error) {
        console.log("Error al descargar los ramos: ", error);
      }
    };

    descargarRamos();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <FlatList
        data={listaRamos}
        renderItem={({item}) => 
        <Item 
          data={item.data} 
          onPress={() =>
          navigation.navigate('Reviews', {
            sigla: item.data.sigla, 
            titulo: item.data.nombre
          })
        } />}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});