import React, { useState, useCallback, useMemo } from 'react';
import TypeWriter from 'react-native-typewriter';

import { styles } from './styles';

const CustomTypeWriter = () => {
  const [typing, setTyping] = useState(1);
  const [typingTextStep, setTypingTextStep] = useState(1);

  const onTypingEnd = useCallback(() => {
    setTimeout(() => setTyping(-typing), 600);

    if (typing === -1 && typingTextStep === 6) {
      setTypingTextStep(1);
      return;
    }

    if (typing === -1) {
      setTypingTextStep(typingTextStep + 1);
    }
  }, [setTyping, typing]);

  const typingText = useMemo(() => {
    switch (typingTextStep) {
      case 1:
        return 'TRANSPORTADORAS';
      case 2:
        return 'SEGURADORAS';
      case 3:
        return 'CORRETORAS';
      case 4:
        return 'LOCADORAS';
      case 5:
        return 'COOPERATIVAS';
      case 6:
        return 'MONTADORAS';
      default:
        return ' ';
    }
  }, [typingTextStep]);

  return (
    <TypeWriter style={styles.text} onTypingEnd={onTypingEnd} typing={typing}>
      {typingText}
    </TypeWriter>
  );
};

export default CustomTypeWriter;
