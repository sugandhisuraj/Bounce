import {StyleSheet} from 'react-native';
import {FONTFAMILY, FONTSIZE, getHp, getWp} from '../../../app/utils';

export default StyleSheet.create({
  container: {
    backgroundColor: '#F2F5F6',
    paddingVertical: getHp(20),
    paddingHorizontal: getWp(25),
  },
  vendorTileContainerStyle: {
    //marginTop: getHp(10),
  },
  ratingContainerStyle: {
    marginTop: getHp(16),
  },
  starContainerStyle: {
    backgroundColor: 'white',
    height: getHp(24),
    width: getHp(24),
  },
  toggleShowMoreText: {
    marginTop: getHp(15),
  },
  descriptionTextStyle: {
    fontWeight: '400',
    fontSize: FONTSIZE.Text14,
    fontFamily: FONTFAMILY.AvenirNextRegular,
    letterSpacing: 0.2,
    color: '#000',
  },
  vendorSubTitleStyle: {
    fontSize: FONTSIZE.Text14,
    color: '#696969',
    fontWeight: '400',
    fontFamily: FONTFAMILY.AvenirNextRegular,
    letterSpacing: 0.5,
  },
});
