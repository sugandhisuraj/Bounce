import {StyleSheet} from 'react-native';
import {getHp} from '../../app/utils';

export default StyleSheet.create({
  container: {
    height: getHp(270),
    width: getHp(270),
    alignSelf: 'center',
    borderRadius: getHp(42),
    padding: getHp(10),
    backgroundColor: 'red',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadowStyle: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
});
