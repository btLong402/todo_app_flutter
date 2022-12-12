import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createDrawerNavigator } from '@react-navigation/drawer';
import Login from './Login';
import Splash from './Splash';
const Tab = createBottomTabNavigator();
// const Drawer = createDrawerNavigator();

export default function HomeScreen() {
  return (
      <Tab.Navigator>
        <Tab.Screen name="Login" component={Login} />
        <Tab.Screen name="Splash" component={Splash} />
      </Tab.Navigator>
  );
}
