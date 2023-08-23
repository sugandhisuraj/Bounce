import {StyleSheet} from 'react-native';
import {FONTFAMILY, FONTSIZE, getHp, getWp} from '../../../app/utils';

export default StyleSheet.create({
  containerStyle: {
    flex: 1,
    paddingHorizontal: getWp(15),
    marginTop: getHp(25),
  },
  roundeView: {
    borderRadius: getHp(30),
    backgroundColor: 'rgba(0, 227, 145, 0.2)',
    borderWidth: getHp(3),
    borderColor: '#FFF',
    height: '80%',
    alignItems: 'center',
  },
  roundeViewNotAttending: {
    backgroundColor: '#FCC9DB',
  },
  scanNextContainer: {
    height: getHp(80),
    backgroundColor: '#FFF',
    //backgroundColor: 'red',
    alignItems: 'center',
    paddingLeft: getWp(42),
    borderRadius: getHp(30),
    marginTop: getHp(25),
    flexDirection: 'row',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  guestName: {
    marginTop: getHp(30),
    fontWeight: '700',
    fontFamily: FONTFAMILY.AvenirNextRegular,
    fontSize: FONTSIZE.Text24,
    letterSpacing: 0.2,
    color: '#000',
  },
  moreFriendsView: {
    height: getHp(25),
    backgroundColor: 'white',
    borderRadius: getHp(7),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: getHp(10),
    marginTop: getHp(12),
  },
  moreFriendsText: {
    fontFamily: FONTFAMILY.AvenirNextRegular,
    fontSize: FONTSIZE.Text14,
    letterSpacing: 0.4,
    color: '#000',
    fontWeight: '600',
  },
  attendNotAttendGradient: {
    marginTop: getHp(60),
    width: '88%',
    height: getHp(60),
    borderRadius: getHp(20),
    alignItems: 'center',
    paddingHorizontal: getWp(30),
    flexDirection: 'row',
  },
  attendingOrNotAttendingText: {
    fontWeight: '700',
    fontFamily: FONTFAMILY.AvenirNextRegular,
    fontSize: FONTSIZE.Text22,
    color: '#FFF',
    letterSpacing: 0.2,
    marginLeft: getWp(25),
  },
  scanNextText: {
    fontWeight: '700',
    fontSize: FONTSIZE.Text24,
    fontFamily: FONTFAMILY.AvenirNextRegular,
    letterSpacing: 0.2,
    color: '#000',
    marginLeft: getWp(30),
  },
});
