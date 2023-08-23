import {StyleSheet} from 'react-native';

import {getHp, getWp} from '../../../app/utils';
export default StyleSheet.create({
  container: {
    height: getHp(100),
    width: getHp(100),
    borderRadius: getHp(15),
    marginRight: getWp(15),
    marginBottom: getHp(20),
  },
  imageContainerStyle: {
    height: getHp(100),
    width: getHp(100),
    borderRadius: getHp(15),
  },
  closeContainer: {
      position: 'absolute',
      zIndex: 10,
      right: getWp(5),
      top: getHp(5)
  }
});
