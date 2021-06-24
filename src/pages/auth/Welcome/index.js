/* eslint-disable react/style-prop-object */
/* eslint-disable react/jsx-no-undef */
import React from 'react';
import { Image, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Button from './components/Button';
import CustomTypeWriter from './components/CustomTypeWriter';

import logoBackground from '../../../assets/images/backgroundLogo.png';
import bigLogoWhite from '../../../assets/images/bigLogoWhite.png';

import { styles } from './styles';

const Welcome = () => {
  const insets = useSafeAreaInsets();

  const navigation = useNavigation();

  return (
    <>
      <StatusBar style="light" />

      <View
        style={[
          styles.container,
          { paddingTop: insets.top + 24, paddingBottom: insets.bottom },
        ]}
      >
        <Image source={logoBackground} style={styles.logoBackground} />

        <View style={styles.logoContainer}>
          <Image source={bigLogoWhite} />
        </View>

        <View style={{ width: '90%' }}>
          <Text style={styles.description}>
            LÍDER EM{'\n'}TECNOLOGIA{'\n'}PARA
          </Text>
          <CustomTypeWriter />
        </View>

        <Button
          onPress={() => {
            navigation.navigate('Login');
          }}
        />
      </View>
    </>
  );
};

export default Welcome;
