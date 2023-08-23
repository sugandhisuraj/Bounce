import {StyleSheet} from 'react-native';
import {getHp} from '../../../../app/utils';
export default StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
  },
  centerViewContainer: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: getHp(25),
    borderWidth: 1,
    borderColor: '#DDDDDD',
  },
  closeButtonContainerStyle: {
    bottom: getHp(80),
  },
});
