import {createStaticNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './Homescreen'; 
import Ranking from './Ranking';
import Buscador from './Buscador';
import Reviews from './Reviews';
import Inicio from './inicio';


const RootStack = createNativeStackNavigator({
  initialRouteName: 'Inicio', 
  screens: {
    Inicio : {
      screen: Inicio,
      options: {headerShown: false},
    },
    Home: {
      screen: HomeScreen,
      options: {title: 'RamosRank UC'},
    },
    Ranking: {
      screen: Ranking,
    },
    Buscador: {
      screen: Buscador,
    },
    Reviews: {
      screen: Reviews,
    },
  },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return <Navigation />;
}