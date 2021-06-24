import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';

import { styles } from './styles';

const Button = ({ ...rest }) => (
  <TouchableOpacity {...rest} style={styles.buttonContainer}>
    <View style={styles.textContainer}>
      <Text style={styles.textButton}>Prosseguir ao login</Text>
    </View>
    <View style={styles.iconContainer}>
      <SimpleLineIcons name="login" size={20} color="#f2f2f2" />
    </View>
  </TouchableOpacity>
);

export default Button;
