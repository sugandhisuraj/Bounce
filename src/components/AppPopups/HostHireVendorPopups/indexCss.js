import {StyleSheet} from 'react-native';
import {getHp, getWp, FONTSIZE, FONTFAMILY} from '../../../app/utils';

export default StyleSheet.create({
  blurContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  popupInfoText: {
    marginTop: getHp(12),
    fontWeight: '400',
    fontFamily: FONTFAMILY.AvenirNextRegular,
    fontSize: FONTSIZE.Text15,
    color: '#000',
    letterSpacing: 0.3,
    lineHeight: getHp(25)
  },
  avatarUserNameContainerStyle: {
    marginTop: getHp(27),
  },
  popupContainer: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: getHp(25),
    borderWidth: 1,
    borderColor: '#DDDDDD',
    paddingHorizontal: getWp(22),
  },
  logoutText: {
    fontWeight: '400',
    fontFamily: 'AvenirNext-Medium',
    fontSize: FONTSIZE.Text16,
    textAlign: 'center',
    color: '#000',
    letterSpacing: 0.2,
    marginTop: getHp(30),
  },
  buttonsTray: {
    marginTop: getHp(40),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: getHp(20),
  },
  actionButtons: {
    justifyContent: 'center',
    alignItems: 'center',
    height: getHp(36),
    width: '48%',
    borderRadius: getHp(15),
  },
  actionButtonsText: {
    fontWeight: '500',
    fontSize: FONTSIZE.Text16,
    letterSpacing: 0.4,
    fontFamily: FONTFAMILY.AvenirNextRegular,
  },
  shadowStyle: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
});
