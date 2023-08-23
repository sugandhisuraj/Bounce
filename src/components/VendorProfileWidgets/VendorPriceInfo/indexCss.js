import {StyleSheet} from 'react-native';
import {FONTFAMILY, FONTSIZE, getHp, getWp} from '../../../app/utils';

export default StyleSheet.create({
  container: {
    paddingLeft: getWp(10),
    paddingRight: getWp(5),
    height: getHp(32),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: getHp(9),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  dollarSvgStyle: {
    marginRight: getWp(5),
  },
  menuContentStyle: {
    marginLeft: getWp(155),
    marginTop: getHp(32),
    backgroundColor: '#FFFFFF',
    borderTopRightRadius: getHp(13),
    borderBottomRightRadius: getHp(13),
    borderBottomLeftRadius: getHp(13),
    paddingHorizontal: getHp(5),
  },
  hourlyRateText: {
    fontSize: FONTSIZE.Text14,
    fontWeight: '500',
    fontFamily: FONTFAMILY.AvenirNextRegular,
    letterSpacing: 0.4,
    color: '#000',
  },
  hourlyRateTextInfo: {
    marginTop: getHp(5),
    fontFamily: FONTFAMILY.AvenirNextRegular,
    fontWeight: '400',
    fontSize: FONTSIZE.Text13,
    color: '#696969',
    letterSpacing: 0.3,
  },
});
