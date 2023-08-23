import {StyleSheet} from 'react-native';
import {FONTFAMILY, FONTSIZE, getHp} from '../../../app/utils';

export default StyleSheet.create({
  modalContainerSyle: {
    flex: 1,
    borderWidth: 0,
    borderColor: 'red',
    justifyContent: 'center',
  },
  closeButtonStyle: {
    position: 'absolute',
    bottom: getHp(20),
    marginTop: getHp(30),
    marginBottom: getHp(20),
    height: getHp(70),
    width: getHp(70),
    borderRadius: getHp(150),
    backgroundColor: 'white',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIcon: {
    fontSize: FONTSIZE.Text45,
    color: 'black',
  },
  userInfoContainer: {
    paddingHorizontal: getHp(31),
    paddingTop: getHp(30),
    paddingBottom: getHp(20),
    backgroundColor: 'white',
    borderRadius: getHp(25),
    borderWidth: 1,
    borderColor: '#DDDDDD',
  },
  avatarStyle: {
    alignSelf: 'center',
  },
  confirmTextStyle: {
    fontWeight: '500',
    fontFamily: FONTFAMILY.AvenirNextRegular,
    fontSize: FONTSIZE.Text15,
    alignSelf: 'center',
    marginTop: getHp(10),
    letterSpacing: 0.2,
    color: '#000',
  },
  unfriendButtonStyle: {
    marginTop: getHp(10),
    alignSelf: 'center',
    width: '90%',
    backgroundColor: '#FFD0C6',
    borderRadius: getHp(25),
  },
  unfriendButtonTextStyle: {
    fontFamily: FONTFAMILY.AvenirNextRegular,
    fontWeight: '600',
    fontSize: FONTSIZE.Text20,
    letterSpacing: 0.2,
  },
  partyTitleStyle: {
    fontFamily: FONTFAMILY.AvenirNextRegular,
    fontSize: FONTSIZE.Text20,
    color: '#000',
    fontWeight: '600',
  },
  partyDateTimeFormat: {
    color: '#1FAEF7',
    fontWeight: '600',
    fontSize: FONTSIZE.Text15,
    fontFamily: FONTFAMILY.AvenirNextRegular,
    marginTop: getHp(20),
  },
  continueButtonStyle: {
    marginTop: getHp(20),
    height: getHp(45),
  },

  pressButtonStyle: {
    marginTop: getHp(21),
    justifyContent: 'center',
    alignItems: 'center',
    height: getHp(44),
    width: '100%',
    backgroundColor: 'white',
    borderRadius: getHp(15),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  btnText: {
    letterSpacing: 0.6,
    fontWeight: '500',
    fontFamily: 'Roboto',
    fontSize: FONTSIZE.Text21,
  },
});
