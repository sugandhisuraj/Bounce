import {StyleSheet} from 'react-native';
import {FONTFAMILY, FONTSIZE, getHp, getWp} from '../../../app/utils';

export default StyleSheet.create({
  container: {
    paddingVertical: getHp(15),
    paddingHorizontal: getHp(25),
  },
  bWFContainer: {
    marginTop: getHp(20),
  },
  fromInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fromUserText: {
    marginLeft: getWp(15),
    fontFamily: FONTFAMILY.AvenirNextRegular,
    fontWeight: '500',
    fontSize: FONTSIZE.Text16,
  },
  fromUserInfoText: {
    color: '#999999',
    fontFamily: FONTFAMILY.AvenirNextRegular,
    fontWeight: '500',
    fontSize: FONTSIZE.Text14,
  },
});
