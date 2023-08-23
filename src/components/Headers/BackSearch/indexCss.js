import {StyleSheet} from 'react-native';
import {FONTFAMILY, getHp, FONTSIZE, getWp} from '../../../app/utils';

const borderWidth = 0;
export default StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth,
    borderColor: 'red',
    backgroundColor: 'white',
    height: getHp(50),
    justifyContent:'space-between', 
    paddingHorizontal: getWp(15)
  },
  backStyleContainer: {
      
  }, 
  searchContainerStyle: {
    height: getHp(35),  
    width: '88%'
  }
});
