import {StyleSheet} from 'react-native';
import {getHp} from '../../../app/utils';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: getHp(10),
    paddingTop: getHp(8),
    justifyContent: 'space-around',
    backgroundColor: '#FBFBFB',
    width: '100%',
    paddingBottom: getHp(10),
    paddingTop: getHp(13),
  },
});
