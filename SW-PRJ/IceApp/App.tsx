/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';

import AppNavigator from './src/navigations/AppNavigation';
import { store } from './src/redux/store';
import { Provider } from 'react-redux';
// import Splash from './src/views/SplashScreen';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <AppNavigator />
      {/* <Splash /> */}
    </Provider>
  );
}
export default App;
