import {StyleSheet} from 'react-native';
import {FONTFAMILY, FONTSIZE, getHp, getWp} from '../../../app/utils';

export default StyleSheet.create({
  centerViewContainerStyle: {
    maxHeight: '65%',
    height: '65%',
    paddingHorizontal: getWp(21),
    paddingVertical: getHp(20),
  },
  endUserAgreement: {
    textAlign: 'center',
    fontWeight: '700',
    fontFamily: FONTFAMILY.AvenirNextRegular,
    fontSize: FONTSIZE.Text20,
    letterSpacing: 0.5,
    color: '#000',
  },
  acceptTitleStyle: {
    letterSpacing: 0.3,
    fontWeight: '700',
    fontSize: FONTSIZE.Text18,
  },
  acceptLinearGradient: {
    marginTop: getHp(10),
    width: '95%',
    height: getHp(35),
    alignSelf: 'center',
    borderRadius: getHp(20),
  }
});
