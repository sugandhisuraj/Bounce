import {StyleSheet} from 'react-native';
import {FONTFAMILY, FONTSIZE, getHp} from '../../../app/utils';

export default StyleSheet.create({
  bottomRatingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingVertical: getHp(10),
  },
  leaveYourRatingText: {
    fontWeight: '400',
    fontSize: FONTSIZE.Text14,
    fontFamily: FONTFAMILY.AvenirNextRegular,
    letterSpacing: 0.1,
    color: '#1A1A1A',
    textAlign: 'center',
  },
  ratingContainerStyle: {
    alignSelf: 'center',
    marginTop: getHp(10),
  },
});
