import {StyleSheet} from 'react-native';
import {FONTFAMILY, FONTSIZE, getHp, getWp} from '../../../app/utils';

export default StyleSheet.create({
  container: {
    height: getHp(115),
    width: getWp(90),
    borderRadius: getHp(8),
    borderWidth: 1,
    borderColor: '#E4EEF1',
    overflow: 'hidden',
    backgroundColor: '#FBFBFB',
  },
  image: {
    height: getHp(86),
    width: getWp(90),
    borderTopEndRadius: getHp(7),
    borderTopStartRadius: getHp(7),
    borderTopLeftRadius: getHp(7),
    borderTopRightRadius: getHp(7),
  },
  friendNameContainer: {
    flex: 1,
    borderWidth: 0,
    borderColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  friendNameText: {
      alignSelf: 'center',
      fontSize: FONTSIZE.Text12,
      fontWeight: '500',
      fontFamily: FONTFAMILY.AvenirNextMedium
  },
});
