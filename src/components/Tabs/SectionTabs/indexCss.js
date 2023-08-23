import {StyleSheet} from 'react-native';
import {getHp} from '../../../app/utils';

export default StyleSheet.create({
  container: {
    marginTop: getHp(20),
    marginHorizontal: getHp(15),
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  contentContainer: {
       
      marginTop: getHp(20)
  }
});
