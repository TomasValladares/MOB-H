import React, { useState, useCallback } from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';
import { collection, getDocs } from "firebase/firestore";
import { db } from './Firebase';
import { useFocusEffect } from '@react-navigation/native';

// Estrellas con decimales: fila gris de fondo + fila dorada recortada al porcentaje
const Estrellas = ({ promedio, size = 20 }) => {
  const porcentaje = (promedio / 5) * 100; // 3.7 -> 74%

  return (
    <View>
      <Text style={{ fontSize: size, color: '#bbb' }}>★★★★★</Text>
      <View style={[styles.recorte, { width: `${porcentaje}%` }]}>
        <Text style={{ fontSize: size, color: '#f5b301', width: size * 6}}>
          ★★★★★
        </Text>
      </View>
    </View>
  );
};

const Item = ({ posicion, ramo }) => (
  <View style={styles.item}>
    <Text style={styles.posicion}>{posicion}</Text>
    <View style={styles.info}>
      <Text style={styles.titulo}>{ramo.titulo}</Text>
      <Text style={styles.sigla}>{ramo.sigla}</Text>
    </View>
    <View style={styles.puntaje}>
      {ramo.cantidad > 0 ? (
        <>
          <Estrellas promedio={ramo.promedio} />
          <Text style={styles.detalle}>
            {ramo.promedio.toFixed(1)} ({ramo.cantidad})
          </Text>
        </>
      ) : (
        <Text style={styles.detalle}>Sin reseñas</Text>
      )}
    </View>
  </View>
);

export default function Ranking() {
  const [ranking, setRanking] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const cargarRanking = async () => {
        try {
          // 1. Descargar ramos y reseñas
          const ramosSnap = await getDocs(collection(db, "ramos"));
          const resenasSnap = await getDocs(collection(db, "resenas"));

          // 2. Partir de los ramos que existen
          const grupos = {};
          ramosSnap.forEach((doc) => {
            const r = doc.data();
            grupos[r.sigla] = { sigla: r.sigla, titulo: r.nombre, suma: 0, cantidad: 0 };
          });

          // 3. Sumar las reseñas (ignorando siglas que no estén en ramos)
          resenasSnap.forEach((doc) => {
            const r = doc.data();
            if (grupos[r.sigla]) {
              grupos[r.sigla].suma += r.calificacion;
              grupos[r.sigla].cantidad += 1;
            }
          });

          // 4. Promedio y orden: con reseñas primero (mayor a menor), sin reseñas al final
          const lista = Object.values(grupos)
            .map((g) => ({
              ...g,
              promedio: g.cantidad > 0 ? g.suma / g.cantidad : 0,
            }))
            .sort((a, b) => {
              if (a.cantidad === 0 && b.cantidad === 0) return a.titulo.localeCompare(b.titulo);
              if (a.cantidad === 0) return 1;
              if (b.cantidad === 0) return -1;
              return b.promedio - a.promedio;
            });

          setRanking(lista);
        } catch (error) {
          console.log("Error al cargar el ranking: ", error);
        }
      };

      cargarRanking();
    }, [])
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={ranking}
        keyExtractor={(item) => item.sigla}
        renderItem={({ item, index }) => <Item posicion={index + 1} ramo={item} />}
        ListEmptyComponent={<Text style={styles.vacio}>Aún no hay ramos</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9c2ff',
    padding: 16,
    marginVertical: 6,
    marginHorizontal: 16,
  },
  posicion: { fontSize: 24, fontWeight: 'bold', width: 40 },
  info: { flex: 1 },
  titulo: { fontSize: 18, fontWeight: 'bold' },
  sigla: { fontSize: 14 },
  puntaje: { alignItems: 'flex-end' },
  detalle: { fontSize: 12 },
  vacio: { textAlign: 'center', marginTop: 40 },
  recorte: {
    position: 'absolute',
    top: 0,
    left: 0,
    overflow: 'hidden',
  },
});