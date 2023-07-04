/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/react-in-jsx-scope */

import { NativeBaseProvider} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import Anticons from 'react-native-vector-icons/AntDesign';
// import {Badge, Box, HStack, Image} from 'native-base';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Splash from '../views/SplashScreen';
import MainPage from '../views/main_page/MainPage';
import Test from '../views/main_page/Test';
import Search from '../views/main_page/component/pages/Search';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName: string = '';
          if (route.name === 'MainPage') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Me') {
            iconName = focused ? 'person' : 'person-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'crimson',
        tabBarInactiveTintColor: 'gray',
        headerStyle: {
          backgroundColor: 'crimson',
          height: 80,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          display: 'none',
        },
        headerShadowVisible: false,
        headerShown: false,
        // headerRight: () => (
        //   <Flex direction="row" marginRight={'1'} height={'full'}>
        //     <Box margin={'1'}>
        //       <Badge // bg="red.400"
        //         borderWidth={'1'}
        //         borderColor={'white'}
        //         background={'crimson'}
        //         rounded="full"
        //         position={'absolute'}
        //         zIndex={1}
        //         variant="solid"
        //         alignSelf="flex-end"
        //         _text={{
        //           fontSize: 12,
        //         }}>
        //         2
        //       </Badge>
        //       <Anticons
        //         name="shoppingcart"
        //         size={35}
        //         onPress={() => {}}
        //         style={{marginRight: 10}}
        //         color="white"
        //       />
        //     </Box>
        //     <Box margin={'1'}>
        //       <Badge // bg="red.400"
        //         borderWidth={'1'}
        //         borderColor={'white'}
        //         background={'crimson'}
        //         rounded="full"
        //         position={'absolute'}
        //         zIndex={1}
        //         variant="solid"
        //         alignSelf="flex-end"
        //         _text={{
        //           fontSize: 12,
        //         }}>
        //         2
        //       </Badge>
        //       <Anticons
        //         name="message1"
        //         size={32}
        //         onPress={() => {}}
        //         style={{marginRight: 10}}
        //         color="white"
        //       />
        //     </Box>
        //   </Flex>
        // ),
      })}>
      <Tab.Screen name="MainPage" component={MainPage} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="MyTabs" component={MyTabs} />
          <Stack.Screen name="Test" component={Test} />
          <Stack.Screen name="Search" component={Search} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
