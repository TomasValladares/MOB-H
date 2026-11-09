import { Button, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();
  
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 30 }}>
      <Button
        title="Ranking de Ramos"
        onPress={() =>
          navigation.navigate('Ranking')
        }
      />

      <Button 
        title="Buscador de Ramos"
        onPress={() =>
          navigation.navigate('Buscador')
        }
      />

      <Button 
        title="Reseñas"
        onPress={() =>
          navigation.navigate('Reviews')
        }
      />
    </View>
  );
}