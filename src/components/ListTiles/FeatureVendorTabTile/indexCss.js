import {StyleSheet} from 'react-native';
import {FONTFAMILY, FONTSIZE, getHp} from '../../../app/utils';

export default StyleSheet.create({
  container: {
    height: getHp(110),
    width: getHp(115),
    alignItems: 'center',
    borderRadius: getHp(21),
    borderWidth: 1,
    borderColor: '#E4EEF1',
  },
  avatarStyle: {
    borderRadius: getHp(90),
  },
  vendorFullName: {
    color: '#000000',
    fontFamily: FONTFAMILY.AvenirNextRegular,
    fontSize: FONTSIZE.Text13,
    fontWeight: '400',
    marginTop: getHp(7),
    textAlign: 'center'
  },
  vendorCategoryText: {
    color: '#999999',
    letterSpacing: 0.2,
    fontWeight: '400',
    fontSize: FONTSIZE.Text12,
    fontFamily: FONTFAMILY.AvenirNextRegular,
    textAlign: 'center'
  },
});
