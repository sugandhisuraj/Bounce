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
  checkoutButtonStyle: {
    width: '90%',
    height: getHp(40),
    marginBottom: getHp(10),
    borderRadius: getHp(10),
    alignSelf: 'center',
  },
  centerViewContainerStyle: isPaymentMode => ({
    borderRadius: getHp(30),
    maxHeight: '60%',
    minHeight: '60%',
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
    marginBottom: getHp(5),
  },
  popupContainer: {
    maxHeight: '80%',
    minHeight: '80%',
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
  userQrComponentContainer: {marginBottom: getHp(20), marginTop: getHp(10)},
  changeRSVPText: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: FONTSIZE.Text16,
    fontFamily: FONTFAMILY.AvenirNextRegular,
    letterSpacing: 0.1,
    color: '#999',
    marginTop: getHp(30),
  },
  RSVPContainer: {
    width: '100%',
    alignSelf: 'center',
    marginTop: getHp(15),
  },
  externalLinkContainer: {marginTop: getHp(10)},
  templatForOnlyTicketLinkContainer: {
    flex: 1,
    width: '92%',
    alignSelf: 'center',
  },
  rsvpHeadingText: {
    color: '#999',
    fontWeight: '600',
    fontFamily: FONTFAMILY.AvenirNextRegular,
    fontSize: FONTSIZE.Text18,
  },
  backToEventContainer: {
    width: '90%',
    alignSelf: 'center',
    height: getHp(40),
    bottom: getHp(20),
  },
});
