import {StyleSheet} from 'react-native';
import {getHp} from '../../app/utils';

export default StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: getHp(20),
  },
  shadowStyles: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
});
