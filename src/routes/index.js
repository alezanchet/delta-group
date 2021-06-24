import React, { useState, useEffect } from 'react';
import AppLoading from 'expo-app-loading';
import firebase from 'firebase';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

const Routes = () => {
  const [loggedIn, setLoggedIn] = useState(null);

  useEffect(() => {
    firebase.initializeApp({
      apiKey: 'AIzaSyA1LbFhCoyZwh9orOpyRtj8jFbk4jGEy68',
      authDomain: 'delta-group-dceba.firebaseapp.com',
      projectId: 'delta-group-dceba',
      storageBucket: 'delta-group-dceba.appspot.com',
      messagingSenderId: '477387154951',
      appId: '1:477387154951:web:dfed3b43f3c07e667d2ca2',
      measurementId: 'G-1RZN58CT64',
    });

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });
  }, []);

  const renderContent = () => {
    switch (loggedIn) {
      case true:
        return <AppRoutes />;
      case false:
        return <AuthRoutes />;
      default:
        return <AppLoading />;
    }
  };

  return renderContent();
};

export default Routes;
