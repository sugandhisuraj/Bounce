import {StyleSheet} from 'react-native';
import {getHp, getWp} from '../../../app/utils';
export default StyleSheet.create({
  imgStyle: {
    height: getHp(125),
    width: getHp(125),
    borderRadius: getHp(15),
  },
  videoStyle: {
    width: getWp(125),
    height: getHp(125),
    borderRadius: getHp(15),
  },
  loadingContainerStyle: {
    height: getHp(125),
    width: getHp(125),
    borderRadius: getHp(15),
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingSpinnerStyle: {height: getHp(50), width: getHp(50)},
});
