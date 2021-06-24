/* eslint-disable no-use-before-define */
/* eslint-disable react/style-prop-object */
import React, { useRef, useState, useCallback } from 'react';
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

import Input from '../../../components/Input';
import Button from '../../../components/Button';
import AuthCard from './components/AuthCard';

import getValidationErrors from '../../../utils/getValidationErrors';

import { styles } from './styles';

const Login = () => {
  const passwordInputRef = useRef(null);

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = useCallback(async () => {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string().required('Senha obrigatória'),
      });

      await schema.validate(
        {
          email,
          password,
        },
        {
          abortEarly: false,
        },
      );

      setLoading(true);

      await firebase.auth().signInWithEmailAndPassword(email, password);

      setLoading(false);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        if (errors.email) {
          setEmailError(errors.email);
        }

        if (errors.password) {
          setPasswordError(errors.password);
        }

        return;
      }

      setLoading(false);

      switch (err.code) {
        case 'auth/invalid-email':
          Alert.alert('E-mail inválido');
          break;
        case 'auth/user-disabled':
          Alert.alert('Usuário desabilitado');
          break;
        case 'auth/user-not-found':
          Alert.alert('Credenciais incorretas');
          break;
        case 'auth/wrong-password':
          Alert.alert('Credenciais incorretas');
          break;
        default:
          Alert.alert('Erro na autenticação');
      }
    }
  }, [email, password]);

  return (
    <>
      <StatusBar style="dark" />

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
              <AuthCard
                title="Bem-vindo(a)"
                subtitle="Faça login para continuar"
              />

              <Input
                theme="light"
                error={emailError}
                value={email}
                onChangeText={text => {
                  setEmail(text);
                  setEmailError('');
                }}
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                icon="mail"
                placeholder="E-mail"
                returnKeyType="next"
                onSubmitEditing={() => passwordInputRef.current?.focus()}
              />

              <Input
                theme="light"
                error={passwordError}
                value={password}
                onChangeText={text => {
                  setPassword(text);
                  setPasswordError('');
                }}
                ref={passwordInputRef}
                icon="lock"
                placeholder="Senha"
                secureTextEntry
                autoCapitalize="none"
                returnKeyType="send"
                onSubmitEditing={() => handleSignIn()}
              />

              <Button
                theme="light"
                loading={loading}
                onPress={() => handleSignIn()}
              >
                Entrar
              </Button>
            </View>
          </ScrollView>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </>
  );
};

export default Login;
