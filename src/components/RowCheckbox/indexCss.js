import {StyleSheet} from 'react-native';
import {FONTFAMILY, FONTSIZE} from '../../app/utils';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 0,
  },
  checkboxStyle: {},
  titleText: {
    fontFamily: FONTFAMILY.AvenirNextRegular,
    fontWeight: '400',
    fontSize: FONTSIZE.Text14,
    letterSpacing: 0.2,
    color: '#000',
  },
});
