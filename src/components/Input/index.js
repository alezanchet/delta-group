/* eslint-disable consistent-return */
import React, {
  useState,
  useRef,
  useImperativeHandle,
  forwardRef,
  useCallback,
  useMemo,
  useEffect,
} from 'react';
import { View, TextInput, Text } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { Feather } from '@expo/vector-icons';

import { styles } from './styles';

const Input = (
  { theme, icon, value = '', error, mask = '', options, ...rest },
  ref,
) => {
  const inputElementRef = useRef(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  useEffect(() => {
    setIsFilled(!!value);
  }, [value]);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus();
    },
    isValid() {
      return inputElementRef.current.isValid();
    },
    getRawValue() {
      return inputElementRef.current.getRawValue();
    },
  }));

  const borderColor = useMemo(() => {
    if (error !== '') {
      return '#FE4F4B';
    }

    if (isFocused || isFilled) {
      if (theme === 'light') {
        return '#333333';
      }
      if (theme === 'dark') {
        return '#cccccc';
      }
    }
    if (theme === 'light') {
      return '#cccccc';
    }
    if (theme === 'dark') {
      return '#808080';
    }
  }, [isFocused, isFilled, theme, error]);

  const keyboardAppearance = useMemo(() => {
    if (theme === 'light') {
      return 'light';
    }
    if (theme === 'dark') {
      return 'dark';
    }
  }, [theme]);

  return (
    <>
      <View style={[styles.container, { borderColor }]}>
        <Feather
          style={styles.icon}
          name={icon}
          size={24}
          color={borderColor}
        />
        {mask === '' ? (
          <TextInput
            style={[
              styles.input,
              { fontFamily: isFilled ? 'Bold' : 'Regular' },
            ]}
            ref={inputElementRef}
            keyboardAppearance={keyboardAppearance}
            placeholderTextColor="#808080"
            value={value}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            {...rest}
          />
        ) : (
          <TextInputMask
            style={[
              styles.input,
              { fontFamily: isFilled ? 'Bold' : 'Regular' },
            ]}
            ref={inputElementRef}
            keyboardAppearance={keyboardAppearance}
            placeholderTextColor="#808080"
            type={mask}
            options={options}
            value={value}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            {...rest}
          />
        )}
      </View>
      <View style={styles.viewError}>
        {error !== '' && <Text style={styles.textError}>{error}</Text>}
      </View>
    </>
  );
};

export default forwardRef(Input);
