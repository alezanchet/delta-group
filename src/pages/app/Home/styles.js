import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
  },

  list: {
    flex: 1,
    width: '100%',
    paddingTop: 24,
  },

  containerEmpty: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  emptyText: {
    fontSize: 16,
    color: '#0d0d0d',
    fontFamily: 'SemiBold',
    textAlign: 'center',
    width: '90%',
  },

  itemListContainer: {
    width: '90%',
    padding: 8,
    alignSelf: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 10,
    flexDirection: 'row',
    paddingRight: 46,
  },

  itemAvatar: {
    height: 100,
    width: 100,
    borderRadius: 5,
  },

  itemName: {
    fontSize: 14,
    color: '#0d0d0d',
    fontFamily: 'SemiBold',
    marginBottom: 4,
  },

  itemAddress: {
    fontSize: 12,
    color: '#0d0d0d',
    fontFamily: 'Regular',
    width: '100%',
  },

  itemButtonEdit: {
    height: 30,
    width: 30,
    borderWidth: 1,
    borderRadius: 5,
    position: 'absolute',
    top: 16,
    right: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#cccccc',
  },

  itemButtonDelete: {
    height: 30,
    width: 30,
    borderWidth: 1,
    borderRadius: 5,
    position: 'absolute',
    bottom: 16,
    right: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#cccccc',
  },

  buttonContainer: {
    position: 'absolute',
    width: '90%',
  },
});
