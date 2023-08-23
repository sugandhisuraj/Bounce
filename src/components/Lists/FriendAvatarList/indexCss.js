import {StyleSheet} from 'react-native';
import {FONTFAMILY, FONTSIZE, getHp, getWp} from '../../../app/utils';

export default StyleSheet.create({
  container: { 
  },
  friendIcon: {
    fontSize: FONTSIZE.Text16,
  },
  friendHeadingText: {
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: getWp(12)
  },
  friendText: {
    marginLeft: getWp(10),
    color: '#000000',
  },
  friendTextData: {
    color: '#999999',
  },
  friendTextCommon: {
    fontSize: FONTSIZE.Text14,
    fontFamily: FONTFAMILY.AvenirNextMedium,
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  listContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: getHp(15)
  }
});
