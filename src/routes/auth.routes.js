import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Welcome from '../pages/auth/Welcome';
import Login from '../pages/auth/Login';

const Auth = createStackNavigator();

const AuthRoutes = () => (
  <Auth.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Auth.Screen name="Welcome" component={Welcome} />
    <Auth.Screen name="Login" component={Login} />
  </Auth.Navigator>
);

export default AuthRoutes;
