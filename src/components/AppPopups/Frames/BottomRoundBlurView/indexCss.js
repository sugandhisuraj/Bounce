import {StyleSheet} from 'react-native';
import {getHp} from '../../../../app/utils';
export default StyleSheet.create({
  container: { 
    flex: 1,
    justifyContent:'flex-end',
    bottom: getHp(60)
  },
  centerViewContainer: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: getHp(25),
    borderWidth: 1,
    borderColor: '#DDDDDD',
    bottom: getHp(40)
  },
  closeButtonContainerStyle: {
    //bottom: getHp(80),
  },
});
