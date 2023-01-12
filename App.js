// In App.js in a new project
import "react-native-gesture-handler";
import * as React from "react";
import { SafeAreaView ,View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import Home from "./screens/Home";
import SplashScreen from "./screens/Splash";
import LoginScreen from "./screens/Login";
import ProfileScreen from "./screens/Profile";
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const HomeDrawer = () =>{
  return(
    <Drawer.Navigator initialRouteName="Home" screenOptions={{headerShown:false}}>
      <Drawer.Screen name="Home" component={Home}/>
      <Drawer.Screen name="Login" component={LoginScreen}/>
      <Drawer.Screen name="Profile" component={ProfileScreen} />
    </Drawer.Navigator>  
  );
}

function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}
        >
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            // options= {{title: 'Welcome HomeScreen'}}
          />
          <Stack.Screen name="HomeDrawer" component={HomeDrawer} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

export default App;
