import {StyleSheet} from 'react-native';
import {getHp, getWp} from '../../app/utils';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  genderRadioContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  radioContainer: {
    height: getHp(19),
    width: getHp(19),
    borderRadius: getHp(100),
    borderWidth: getHp(1.5),
    borderColor: 'grey',
  },
  radioSelectedContainer: {
    borderColor: '#1FAEF7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelectedChildView: {
    backgroundColor: '#1FAEF7',
    height: getHp(12),
    width: getHp(12),
    borderRadius: getHp(100),
  },
  title: {
    marginLeft: getWp(10),
  },
});

//
