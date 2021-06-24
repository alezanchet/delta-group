import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  buttonContainer: {
    height: 55,
    backgroundColor: '#F5B53F',
    flexDirection: 'row',
    borderRadius: 5,
    width: '90%',
    marginBottom: 25,
  },

  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  textButton: {
    fontFamily: 'Medium',
    fontSize: 16,
    color: '#f2f2f2',
  },

  iconContainer: {
    height: 55,
    width: 55,
    backgroundColor: '#0000001a',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
