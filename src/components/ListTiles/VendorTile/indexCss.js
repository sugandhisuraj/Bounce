import {StyleSheet} from 'react-native';
import {FONTFAMILY, FONTSIZE, getHp, getWp} from '../../../app/utils';

export default StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: getHp(15),
    paddingVertical: getHp(20),
    backgroundColor: 'white',
  },
  avatarVendorInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth:0,
    borderColor:'red'
  },
  vendorNameInfoContainer: {
    marginLeft: getWp(20),
    borderWidth:0,
  },
  vendorNameText: {
    fontFamily: 'ROBOTO',
    fontWeight: '400',
    fontSize: FONTSIZE.Text19,
    color: '#000',
  },
  vendorCityText: {
    marginTop: getHp(1),
    fontWeight: '400',
    fontFamily: FONTFAMILY.AvenirNextRegular,
    fontSize: FONTSIZE.Text14,
    color: '#999',
  },
  vendorDescriptionText: {
    fontSize: FONTSIZE.Text14,
    fontFamily: FONTFAMILY.AvenirNextRegular,
    marginTop: getHp(22),
    letterSpacing: 0.3,
    color: '#000',
  },
  showMore: {
    top: getHp(3),
    color: '#1FAEF7',
    fontSize: FONTSIZE.Text16,
    fontWeight: '500',
    fontFamily: FONTFAMILY.AvenirNextRegular,
  },
  footerTray: {
    marginTop: getHp(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pricePerHourText: {
    fontFamily: FONTFAMILY.AvenirNextRegular,
    fontWeight: '400',
    fontSize: FONTSIZE.Text18,
    color: '#000',
    marginLeft: getWp(12),
  },
});
