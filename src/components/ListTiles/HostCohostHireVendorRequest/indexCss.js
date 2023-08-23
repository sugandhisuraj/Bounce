import {StyleSheet} from 'react-native';
import {FONTFAMILY, FONTSIZE, getHp, getWp} from '../../../app/utils';

export default StyleSheet.create({
  tileContainerStyle: {
    backgroundColor: '#FBFBFB',
    paddingTop: getHp(10),
  },
  vendorTileTitleContainerStyle: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingVertical: getHp(10),
    paddingHorizontal: getWp(15),
  },
  vendorTileTileTitleContainerStyle: {width: '52%'},
  thinkRequestTitleStyle: {
    fontWeight: '600',
    fontFamily: FONTFAMILY.AvenirNextRegular,
    fontSize: FONTSIZE.Text15,
    color: '#FFF',
    letterSpacing: 0.2,
  },
  thinkRequestContainerStyle: {
    backgroundColor: '#00CFFF',
    width: getWp(120),
    height: getHp(36),
    borderRadius: getHp(15),
  },
  tileSubTitleStyle: {
    fontSize: FONTSIZE.Text14,
    fontWeight: '400',
    fontFamily: FONTFAMILY.AvenirNextRegular,
    color: '#000',
    letterSpacing: 0.2,
  },

  messageInputStyle: {
    backgroundColor: '#FBFBFB',
    marginTop: getHp(17),
    marginBottom: getHp(20),
    height: getHp(40),
    borderRadius: getHp(15),
    paddingLeft: getWp(20),
    fontFamily: FONTFAMILY.AvenirNextRegular,
    fontWeight: '500',
    fontSize: FONTSIZE.Text15,
    color: '#CCCCCC',
    width: '95%',
    alignSelf: 'center',
    borderWidth: getHp(1),
    borderColor: '#EEEEEE',
  },
});
