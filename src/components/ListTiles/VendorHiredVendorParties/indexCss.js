import {StyleSheet} from 'react-native';
import {FONTFAMILY, FONTSIZE, getHp, getWp} from '../../../app/utils';

export default StyleSheet.create({
  container: {
    backgroundColor: '#FBFBFB',
    paddingTop: getHp(15),
    paddingBottom: getHp(25),
  },
  avatarWithUserNameContainer: {
    marginHorizontal: getWp(15),
  },
  partyTitleText: {
    fontFamily: FONTFAMILY.AvenirNextRegular,
    fontWeight: '700',
    fontSize: FONTSIZE.Text22,
    letterSpacing: 0.4,
    textShadowColor: 'rgba(0, 0, 0, 0.77)',
    color: '#FFF',
  },
  partyDateText: {
    fontSize: FONTSIZE.Text14,
  },
  upperActionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: getHp(15),
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: getHp(15),
  },
  calenderTicketContainerStyle: {
    width: '48%',
    backgroundColor: 'white',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  calenderTicketTitleStyle: {
    fontWeight: '500',
    fontFamily: FONTFAMILY.AvenirNextRegular,
    fontSize: FONTSIZE.Text15,
    letterSpacing: 0.1,
    top: 1,
  },
  partyInfoText: {
    position: 'absolute',
    bottom: getHp(40),
    left: getWp(15),
    zIndex: 10,
  },

   
  requestPaymentContainer: {
     
    backgroundColor: '#E7FFF6',
    borderRadius: getHp(20),
    width: '94%',
    alignSelf: 'center',
  },
  requestPaymentTitle: {
    color: '#00E391',
    fontWeight: '600',
    letterSpacing: 0.4,
    fontSize: FONTSIZE.Text18,
    fontFamily: FONTFAMILY.AvenirNextRegular,
  },
});
