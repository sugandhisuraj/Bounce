import {StyleSheet} from 'react-native';
import {FONTSIZE, getHp, getWp} from '../../app/utils';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column-reverse',
  },
  cancelButton: {
    height: getHp(60),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: getHp(15),
    marginBottom: getHp(20),
  },
  cancelText: {
    color: '#1D6FE7',
    fontSize: FONTSIZE.Text20,
    fontWeight: '600',
  },
  optionContainer: {
    marginBottom: getHp(15),
    borderRadius: getHp(15),
    backgroundColor: 'white',
  },
  rowStyle: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: getHp(20),
      paddingHorizontal: getWp(20),
  },
  seperator: {
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5'
  },
  rowTextStyle: {
      fontSize: FONTSIZE.Text16,
      fontWeight: '400',
      letterSpacing: .5
  },
  icons: {
    height: getHp(30),
    width: getWp(30)
  }
});
