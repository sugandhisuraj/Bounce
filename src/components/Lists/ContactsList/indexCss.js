import {StyleSheet} from 'react-native';
import {FONTFAMILY, FONTSIZE, getHp} from '../../../app/utils';

export default StyleSheet.create({
  container: {
    width: '100%',
    alignSelf: 'center',
    backgroundColor: '#FBFBFB',
   
  }, 
  listContainerStyle: {
    marginTop: getHp(25)
  }
});
