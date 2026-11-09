import {createStaticNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './Homescreen'; 
import Ranking from './Ranking';
import Buscador from './Buscador';
import Reviews from './Reviews';


const RootStack = createNativeStackNavigator({
  screens: {
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