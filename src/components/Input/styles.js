import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    paddingVertical: 0,
    paddingHorizontal: 16,
    borderRadius: 5,
    borderWidth: 1,
    flexDirection: 'row',
  },

  icon: {
    marginRight: 16,
    alignSelf: 'center',
  },

  input: {
    flex: 1,
    color: '#808080',
    fontSize: 12,
  },

  viewError: {
    marginBottom: 8,
    width: '90%',
  },

  textError: {
    marginTop: 4,
    color: '#FE4F4B',
    marginLeft: 4,
    fontFamily: 'SemiBold',
    fontSize: 12,
  },
});
