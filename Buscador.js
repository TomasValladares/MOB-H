import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, FlatList, StyleSheet } from 'react-native';
import { collection, getDocs } from "firebase/firestore";
import { db }  from './Firebase';

const Item = ({data}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{data.nombre}</Text>
  </View>
);

export default function Buscador({route}) {
  const [listaRamos, setListaRamos] = useState([]);

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
        renderItem={({item}) => <Item data={item.data} />}
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