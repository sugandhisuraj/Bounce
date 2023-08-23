import {StyleSheet} from 'react-native';
import {FONTFAMILY, FONTSIZE, getHp, getWp} from '../../../../app/utils';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBFBFB',
  },
  checkoutTotalPriceTitle: {
    fontWeight: '600',
    fontSize: FONTSIZE.Text22,
    fontFamily: FONTFAMILY.AvenirNextMedium,
    color: '#000',
  },
  checkoutTotalPrice: {
    fontWeight: '600',
    fontSize: FONTSIZE.Text16,
    fontFamily: FONTFAMILY.AvenirNextMedium,
    color: '#000',
    marginLeft: getWp(12),
    top: getHp(1),
  },

  centerViewContainerStyle: isPaymentMode => ({
    borderRadius: getHp(30),
    maxHeight: '70%',
    minHeight: '70%',
    overflow: 'hidden',
  }),
  ticketInfoContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: getHp(30),
  },
  ticketTitleText: {
    fontWeight: '600',
    fontSize: FONTSIZE.Text20,
    fontFamily: FONTFAMILY.AvenirNextRegular,
    color: '#000',
    maxWidth: '60%',
  },
  ticketQuantityPriceText: {
    fontSize: FONTSIZE.Text16,
    fontWeight: '500',
    fontFamily: FONTFAMILY.AvenirNextRegular,
    color: '#000',
  },
  divider: {
    height: 1,
    borderRadius: getHp(30),
    backgroundColor: '#E4EEF1',
    marginVertical: getHp(12),
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: getHp(37),
    marginBottom: getHp(15),
  },
  popupContainer: {
    maxHeight: '83%',
    minHeight: '83%',
    marginTop: getHp(30),

    flexDirection: 'column',
    justifyContent: 'space-between',
    // borderWidth:1,
    // borderColor: 'red'
  },
  cardFieldStyle: {
    width: '100%',
    height: getHp(100),
    backgroundColor: '#F2F2F2',
    //backgroundColor: 'red',
  },
  scanIntoEventText: {
    textAlign: 'center',
    fontWeight: '500',
    fontFamily: FONTFAMILY.AvenirNextRegular,
    fontSize: FONTSIZE.Text16,
    letterSpacing: 0.4,
    color: '#000',
  },
  userQrComponentContainer: {marginVertical: getHp(50), marginTop: getHp(20)},
  changeRSVPText: {
    textAlign: 'center',
    fontWeight: '500',
    fontSize: FONTSIZE.Text16,
    fontFamily: FONTFAMILY.AvenirNextRegular,
    letterSpacing: 0.1,
  },
  RSVPContainer: {
    width: '65%',
    alignSelf: 'center',
    marginTop: getHp(11),
  },
  externalLinkContainer: {
    width: '90%',
    alignSelf: 'center',
    bottom: getHp(15),
  },
  checkoutButtonStyle: {
    width: '48%',
    height: getHp(40),
    marginBottom: getHp(10),
    borderRadius: getHp(10),
    alignSelf: 'center',
  },
  applePayButton: {
    width: '48%',
    alignSelf: 'center',
    height: getHp(40),
  },
  paymentOptionsContainer: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
