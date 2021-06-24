import React, { useCallback } from 'react';
import { View, Image, Text, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import appIcon72 from '../../../../../assets/images/appIcon72.png';

import { styles } from './styles';

const AuthCard = ({ imageAddItem, setImageAddItem }) => {
  const handlePickImage = useCallback(async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Desculpe, precisamos de permissão para acessar as fotos');
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setImageAddItem(result);
    }
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePickImage}>
        <Image
          source={
            imageAddItem.uri ? { uri: imageAddItem.uri } : { uri: imageAddItem }
          }
          style={styles.image}
        />
      </TouchableOpacity>
      <Text style={styles.text}>Clique na foto para alterar</Text>
    </View>
  );
};

export default AuthCard;
