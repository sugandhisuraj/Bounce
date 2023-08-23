import {StyleSheet} from 'react-native';
import {getHp, getWp} from '../../../app/utils';

export default StyleSheet.create({
  container: {
   // paddingBottom: getHp(5),
   paddingVertical: getHp(10),
   backgroundColor: '#FFF'
  },
  vendorTileContainerStyle: {
    paddingHorizontal: getWp(15),
    alignItems: 'center',
  },
});
