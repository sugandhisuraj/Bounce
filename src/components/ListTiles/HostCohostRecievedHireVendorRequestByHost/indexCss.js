
import {StyleSheet} from 'react-native';
import {FONTFAMILY, FONTSIZE, getHp, getWp} from '../../../app/utils';

export default StyleSheet.create({
  tileContainerStyle: {
    backgroundColor: '#FBFBFB',
    paddingTop: getHp(10)
  },
  vendorTileTitleContainerStyle: {
    marginTop: getHp(13),
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingVertical: getHp(10),
    paddingHorizontal: getWp(15),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  vendorTileTileTitleContainerStyle: {width: '78%'},
  thinkRequestTitleStyle: {
    fontWeight: '600',
    fontFamily: FONTFAMILY.AvenirNextRegular,
    fontSize: FONTSIZE.Text15,
    color: '#FFF',
    letterSpacing: 0.2,
  },
  thinkRequestContainerStyle: {
    backgroundColor: '#00CFFF',
    width: getWp(125),
    height: getHp(40),
    borderRadius: getHp(13),
  },
  tileSubTitleStyle: {
    fontSize: FONTSIZE.Text14,
    fontWeight: '400',
    fontFamily: FONTFAMILY.AvenirNextRegular,
    color: '#000',
    letterSpacing: 0.2,
  },
});
