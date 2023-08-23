import {StyleSheet} from 'react-native';
import {getHp, getWp, wp, FONTSIZE, FONTFAMILY} from '../../utils';

export default StyleSheet.create({
  OtpInputTray: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: getHp(10),
  },
  sendCodeContainerStyle: {
    borderRadius: getHp(10),
    width: wp(30),
    height: getHp(40),

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  showCountryCodeTextStyle: {
    fontFamily: FONTFAMILY.AvenirNextRegular,
    color: '#000',
    fontSize: FONTSIZE.Text17,
    paddingHorizontal: getWp(12),
    height: getHp(38),
    backgroundColor: '#fff',
    borderRadius: getHp(10),
    maxWidth: wp(20),
    width: wp(20),
  },
  countryCodeModalContainer: {
    zIndex: 1000,
    alignSelf: 'center',
    position: 'absolute',
    height: getHp(500),
    top: getWp(-20),
    width: '100%',
  },
  otpInputTextStyle: {
    width: wp(58),
    height: getHp(40),
    borderRadius: getHp(10),

    fontSize: FONTSIZE.Text16,
    fontFamily: FONTFAMILY.AvenirNextRegular,
    letterSpacing: 0.1,
    color: '#000',
    paddingLeft: getWp(15),
    fontWeight: '500',
    backgroundColor: '#F2F5F6',
  },
});
