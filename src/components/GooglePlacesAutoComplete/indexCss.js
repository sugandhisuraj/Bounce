import {StyleSheet} from 'react-native';
import {FONTFAMILY, FONTSIZE, getHp} from '../../app/utils';

export default StyleSheet.create({
  geolocationContainer: {
    marginTop: getHp(10),
  },
  geolocationTextInput: {
    fontFamily: FONTFAMILY.AvenirNextRegular,
    fontWeight: '400',
    fontSize: FONTSIZE.Text15,
  },
});
