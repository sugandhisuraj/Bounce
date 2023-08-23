import {StyleSheet} from 'react-native';
import {getHp} from '../../../app/utils';

export default StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingVertical: getHp(20),

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },
});
