import {StyleSheet} from 'react-native';
import {FONTFAMILY, FONTSIZE, getWp} from '../../../app/utils';

export default StyleSheet.create({
  userNameTextStyle: {
    fontSize: FONTSIZE.Text16,
    color: '#000',
    fontFamily: FONTFAMILY.AvenirNextRegular,
  },
  hintTextStyle: {
    fontSize: FONTSIZE.Text12,
    color: '#999',
    fontFamily: FONTFAMILY.AvenirNextRegular,
  },
  imageStackContainer: {position: 'absolute', right: getWp(40), bottom: 10},
});
