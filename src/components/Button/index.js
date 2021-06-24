/* eslint-disable consistent-return */
import React, { useMemo } from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';

import { styles } from './styles';

const Button = ({ theme, loading, children, ...rest }) => {
  const backgroundColor = useMemo(() => {
    if (theme === 'light') {
      return '#51B8F9';
    }
    if (theme === 'dark') {
      return '#F5B53F';
    }
  }, [theme]);

  return (
    <TouchableOpacity style={[styles.container, { backgroundColor }]} {...rest}>
      {loading ? (
        <ActivityIndicator size="small" color="#f2f2f2" />
      ) : (
        <Text style={styles.buttonText}>{children}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
