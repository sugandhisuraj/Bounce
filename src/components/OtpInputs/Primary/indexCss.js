import {StyleSheet} from 'react-native';
import {getHp, getWp} from '../../../app/utils';

export default StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: getHp(60),
    borderRadius: getHp(15),
    //backgroundColor: 'red',
    paddingHorizontal: getHp(10),
  },
  textInputStyle: {
    width: getWp(25),
  },
  otpContainerStyle: {bottom: getHp(5)},
});
