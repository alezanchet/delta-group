/* eslint-disable global-require */
/* eslint-disable camelcase */
/* eslint-disable react/style-prop-object */
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { View, LogBox } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';

import Routes from './src/routes';

const App = () => {
  useEffect(() => {
    LogBox.ignoreLogs(['Setting a timer']);
    LogBox.ignoreAllLogs();
  }, []);

  const [fontsLoaded] = useFonts({
    Light: require('./src/assets/fonts/Poppins-Light.ttf'),
    Regular: require('./src/assets/fonts/Poppins-Regular.ttf'),
    Medium: require('./src/assets/fonts/Poppins-Medium.ttf'),
    SemiBold: require('./src/assets/fonts/Poppins-SemiBold.ttf'),
    Bold: require('./src/assets/fonts/Poppins-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <View style={{ flex: 1, backgroundColor: '#f2f2f2' }}>
        <Routes />
      </View>
    </NavigationContainer>
  );
};

export default App;
