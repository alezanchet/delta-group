import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../pages/app/Home';
import NewStudent from '../pages/app/NewStudent';

const App = createStackNavigator();

const AppRoutes = () => (
  <App.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <App.Screen name="Home" component={Home} />
    <App.Screen name="NewStudent" component={NewStudent} />
  </App.Navigator>
);

export default AppRoutes;
