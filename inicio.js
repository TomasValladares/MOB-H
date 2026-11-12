import {Animated, Image, Pressable, Text, StyleSheet, useAnimatedValue } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Inicio() {
    const navigation = useNavigation();
    const animatedIn = useAnimatedValue(1);
    const opacityAni = useAnimatedValue(1);
    const zoomIn = () => {
        Animated.parallel([
        Animated.timing(animatedIn, {
            toValue: 2, 
            duration: 2500, 
            useNativeDriver: true,
        }),
        Animated.timing(opacityAni, {
            toValue: 0, 
            duration: 2500, 
            useNativeDriver: true,
        })]).start(() => navigation.replace('Home'))
    };
    return (
    <Pressable onPress={() => zoomIn()} style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 30 }}>
        <Animated.Image source={require('./assets/Vector.png')} style={{width: '100%', height: '100%', position: 'absolute', opacity: opacityAni, transform: [{scale: animatedIn}]}} resizeMode='cover'/>
        <Text style={{fontSize: 25, fontWeight: 'bold'}}>Bienvenidos a RamosRank UC</Text>
        <Text style = {{fontSize: 12,fontStyle: 'italic'}}>Apreta en cualquier parte para seguir</Text>
    </Pressable>
  );
}