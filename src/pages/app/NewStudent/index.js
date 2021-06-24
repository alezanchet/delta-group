/* eslint-disable no-use-before-define */
/* eslint-disable react/style-prop-object */
import React, { useRef, useState, useCallback, useEffect } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  Platform,
  Keyboard,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import firebase from 'firebase';
import * as Yup from 'yup';
import axios from 'axios';
import * as ImageManipulator from 'expo-image-manipulator';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Input from '../../../components/Input';
import Button from '../../../components/Button';
import ImageInput from './components/ImageInput';

import getValidationErrors from '../../../utils/getValidationErrors';

import { styles } from './styles';

const NewStudent = ({ route }) => {
  const {
    routeImageAddItem,
    routeName,
    routeAddress,
    routeStreetNumber,
    routeId,
    routeCep,
  } = route.params;

  const insets = useSafeAreaInsets();

  const navigation = useNavigation();

  const cepInputRef = useRef(null);
  const streetNumberInputRef = useRef(null);

  const [itemId] = useState(routeId);
  const [imageAddItem, setImageAddItem] = useState(routeImageAddItem);
  const [name, setName] = useState(routeName);
  const [nameError, setNameError] = useState('');
  const [cep, setCep] = useState(routeCep);
  const [cepError, setCepError] = useState('');
  const [address, setAddress] = useState(routeAddress);
  const [streetNumber, setStreetNumber] = useState(routeStreetNumber);
  const [streetNumberError, setStreetNumberError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (cep.length === 9) {
      axios
        .get(`https://api.pagar.me/1/zipcodes/${cep}`)
        .then(response => {
          if (response.data.zipcode) {
            setAddress(response.data);
          } else {
            Alert.alert('Cep inválido');
          }
        })
        .catch(() => {
          Alert.alert('Cep inválido');
        });
    }
  }, [cep]);

  const handleAddStudent = useCallback(async () => {
    try {
      if (address.street === undefined) {
        Alert.alert('Cep inválido');
        return;
      }

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome completo obrigatório'),
        cep: Yup.string()
          .required('É necessário preencher o cep')
          .length(9, 'É necessário preencher o cep'),
        streetNumber: Yup.string().required('É necessário preencher o número'),
      });

      await schema.validate(
        {
          name,
          cep,
          streetNumber,
        },
        {
          abortEarly: false,
        },
      );

      setLoading(true);

      let blob;

      if (imageAddItem.uri) {
        let resizeObj = {};

        if (imageAddItem.height > imageAddItem.width) {
          resizeObj = { width: 500 };
        } else {
          resizeObj = { height: 500 };
        }

        const manipResult = await ImageManipulator.manipulateAsync(
          imageAddItem.uri,
          [{ resize: resizeObj }],
        );
        // eslint-disable-next-line no-undef
        const responseImage = await fetch(manipResult.uri);

        blob = await responseImage.blob();
      } else {
        const manipResult = await ImageManipulator.manipulateAsync(
          imageAddItem,
          [{ resize: { height: 500, width: 500 } }],
        );
        // eslint-disable-next-line no-undef
        const responseImage = await fetch(manipResult.uri);
        blob = await responseImage.blob();
      }

      let dbRef;

      if (itemId !== '') {
        dbRef = itemId;
      } else {
        dbRef = firebase.firestore().collection('students').doc().id;
      }

      console.log(dbRef);

      const uploadTask = firebase
        .storage()
        .ref()
        .child(`students/${dbRef}`)
        .put(blob);

      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        snapshot => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        error => {
          Alert.alert(error);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            const timestamp = Date.now();

            firebase
              .firestore()
              .collection('students')
              .doc(dbRef)
              .set({
                id: dbRef,
                avatar_url: downloadURL,
                name,
                address,
                streetNumber,
                cep,
                createdAt: timestamp,
                updatedAt: timestamp,
              })
              .then(() => {
                setLoading(false);
                setImageAddItem(
                  'https://firebasestorage.googleapis.com/v0/b/clau-6bb29.appspot.com/o/placeholderItem.png?alt=media&token=c94e4e87-a40e-4c87-a681-d1a7f749308d',
                );
                setName('');
                setCep('');
                setStreetNumber('');

                navigation.navigate('Home');

                Alert.alert('Aluno adicionado!');
              });
          });
        },
      );
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        if (errors.name) {
          setNameError(errors.name);
        }

        if (errors.cep) {
          setCepError(errors.cep);
        }

        if (errors.streetNumber) {
          setStreetNumberError(errors.streetNumber);
        }

        return;
      }

      setLoading(false);
    }
  }, [name, cep, streetNumber, imageAddItem, address, imageAddItem, itemId]);

  return (
    <>
      <StatusBar style="light" />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableOpacity
          activeOpacity={1}
          style={{ flex: 1 }}
          onPress={Keyboard.dismiss}
        >
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ flex: 1 }}
          >
            <View style={styles.container}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Home');
                }}
                style={[styles.buttonBack, { top: insets.top + 24 }]}
              >
                <AntDesign name="arrowleft" size={35} color="#cccccc" />
              </TouchableOpacity>
              <ImageInput
                setImageAddItem={setImageAddItem}
                imageAddItem={imageAddItem}
              />

              <Input
                theme="dark"
                error={nameError}
                value={name}
                onChangeText={text => {
                  setName(text);
                  setNameError('');
                }}
                autoCorrect={false}
                autoCapitalize="words"
                icon="user"
                placeholder="Nome completo"
                returnKeyType="next"
                onSubmitEditing={() => cepInputRef.current?.focus()}
              />

              <Input
                theme="dark"
                error={cepError}
                mask="zip-code"
                value={cep}
                onChangeText={text => {
                  setCep(text);
                  setCepError('');
                }}
                ref={cepInputRef}
                icon="map-pin"
                placeholder="Cep"
                keyboardType="number-pad"
                returnKeyType="send"
                onSubmitEditing={() => streetNumberInputRef.current?.focus()}
              />

              <Input
                theme="dark"
                error={streetNumberError}
                value={streetNumber}
                onChangeText={text => {
                  setStreetNumber(text);
                  setStreetNumberError('');
                }}
                ref={streetNumberInputRef}
                icon="home"
                placeholder="Número do endereço"
                keyboardType="number-pad"
                returnKeyType="send"
                onSubmitEditing={() => handleAddStudent()}
              />

              <Button
                theme="dark"
                loading={loading}
                onPress={() => handleAddStudent()}
              >
                Adicionar
              </Button>
            </View>
          </ScrollView>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </>
  );
};

export default NewStudent;
