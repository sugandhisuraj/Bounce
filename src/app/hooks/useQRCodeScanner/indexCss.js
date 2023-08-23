import {StyleSheet} from 'react-native';
import {getHp, getWp} from '../../utils';

export default StyleSheet.create({
  closeContainer: {position: 'absolute', right: getWp(20), top: getHp(10)},
});
