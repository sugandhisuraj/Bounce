import {StyleSheet} from 'react-native';
import {getHp} from '../../../app/utils';

export default StyleSheet.create({
  containerStyle: {
    width: '100%',
    height: getHp(400),
    // borderWidth: 1,
    // borderColor: 'red',
  },
  imageContainer: {
    height: getHp(400),
    width: '100%',
    borderRadius: 0
  },
  paginationDotStyle: {
    //width: getHp(8),
    height: getHp(5),
    borderRadius: getHp(3),
    //marginHorizontal: -10,
    backgroundColor: '#FFF',
    //backgroundColor: '#1FAEF7',
  },
  paginationContainerStyle: {
    position: 'absolute',
    bottom: getHp(-25),
    backgroundColor: 'transparent',
    //marginVertical: -getHp(22),
    width: '100%',
  },
  paginationInactiveDotScale: {
    //width: getHp(8),
    height: getHp(8),
    backgroundColor: '#696969',
  },
});
