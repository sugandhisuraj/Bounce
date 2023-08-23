import {Platform, StyleSheet} from 'react-native';
import {getHp} from '../../../app/utils';

export default StyleSheet.create({
  menuContentStyle: {
    bottom: getHp(60),
    padding: 0,
    backgroundColor: 'transparent',
    shadowColor: Platform.select({ios: 'black', android: 'white'}),
    
  },
  contentContainerStyle: {padding: 0, justifyContent: 'center'},
});
