import React from 'react';
import { View, Image, Text } from 'react-native';

import appIcon72 from '../../../../../assets/images/appIcon72.png';

import { styles } from './styles';

const AuthCard = ({ title, subtitle }) => (
  <View style={styles.container}>
    <Image source={appIcon72} />
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.subtitle}>{subtitle}</Text>
  </View>
);

export default AuthCard;
