import {StyleSheet} from 'react-native';
import {FONTFAMILY, FONTSIZE, getHp} from '../../../app/utils';

export default StyleSheet.create({
  bottomViewContainerStyle: {
    height: getHp(186),
    backgroundColor: 'white',
    alignItems: 'center',
    paddingTop: getHp(15),
    paddingBottom: getHp(20),
  },
  flagPartyText: {
    fontWeight: '500',
    fontSize: FONTSIZE.Text14,
    fontFamily: FONTFAMILY.AvenirNextRegular,
    letterSpacing: 0.1,
    color: '#000',
    marginTop: getHp(15),
  },
  actionButtonContainer: {
    height: getHp(40),
    marginTop: getHp(10),
    backgroundColor: '#FFD0C6',
    width: '85%',
    borderRadius: getHp(25),
  },
  actionTitleStyle: {
    fontFamily: FONTFAMILY.AvenirNextRegular,
    fontWeight: '600',
    fontSize: FONTSIZE.Text18,
    color: '#FF2E00',
    letterSpacing: 0.2,
  },
});
