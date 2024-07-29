import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../Componets/HomeScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MovieScreen from '../Componets/MovieScreen';
import PersonScreen from '../Componets/PersonScreen';
import SearchScreen from '../Componets/SearchScreen';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen
          name="Movie"
          component={MovieScreen}
          options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen
          name="Person"
          component={PersonScreen}
          options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={{headerShown: false}}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
