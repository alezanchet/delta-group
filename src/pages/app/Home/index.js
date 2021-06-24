/* eslint-disable react/style-prop-object */
import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Image,
  FlatList,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import firebase from 'firebase';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import Button from '../../../components/Button';

import appIcon72 from '../../../assets/images/appIcon72.png';

import { styles } from './styles';

const Home = () => {
  const insets = useSafeAreaInsets();

  const navigation = useNavigation();

  const [students, setStudents] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection('students')
      .onSnapshot(snapshot => {
        const data = [];
        snapshot.forEach(doc => {
          data.push(doc.data());
        });
        data.sort((a, b) => a.createdAt - b.createdAt);

        setStudents([...data]);
      });
  }, []);

  const handleDeleteStudent = useCallback(id => {
    Alert.alert(
      'Deseja excluir o item?',
      '',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            firebase.firestore().collection('students').doc(id).delete();

            firebase.storage().ref().child(`students/${id}`).delete();
          },
        },
      ],
      { cancelable: false },
    );
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.itemListContainer}>
      <Image source={{ uri: item.avatar_url }} style={styles.itemAvatar} />
      <View style={{ marginLeft: 8, flex: 1 }}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemAddress}>
          {item.address.street}, {item.streetNumber}
        </Text>
        <Text style={styles.itemAddress}>{item.address.neighborhood}</Text>
        <Text style={styles.itemAddress}>
          {item.address.city}, {item.address.state}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('NewStudent', {
            routeImageAddItem: item.avatar_url,
            routeName: item.name,
            routeAddress: item.address,
            routeStreetNumber: item.streetNumber,
            routeId: item.id,
            routeCep: item.cep,
          });
        }}
        style={styles.itemButtonEdit}
      >
        <Feather name="edit-2" size={18} color="#51B8F9" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          handleDeleteStudent(item.id);
        }}
        style={styles.itemButtonDelete}
      >
        <Feather name="trash" size={18} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar style="dark" />

      <Image source={appIcon72} />

      {students.length > 0 ? (
        <FlatList
          style={styles.list}
          renderItem={renderItem}
          data={students}
          keyExtractor={item => item.id}
        />
      ) : (
        <View style={styles.containerEmpty}>
          <Text style={styles.emptyText}>
            A lista de alunos está vazia, faça o primeiro cadastro apertando o
            botão!
          </Text>
        </View>
      )}

      <View style={[styles.buttonContainer, { bottom: insets.bottom }]}>
        <Button
          theme="light"
          loading={false}
          onPress={() => {
            navigation.navigate('NewStudent', {
              routeImageAddItem:
                'https://firebasestorage.googleapis.com/v0/b/delta-group-dceba.appspot.com/o/avatarPlaceholder.png?alt=media&token=8888f4ed-2a29-49c9-87b1-eecb566d2fbc',
              routeName: '',
              routeAddress: {},
              routeCep: '',
              routeStreetNumber: '',
              routeId: '',
            });
          }}
        >
          Adicionar aluno
        </Button>
      </View>
    </View>
  );
};

export default Home;
