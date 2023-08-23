import {StyleSheet} from 'react-native'; 
import { FONTFAMILY, FONTSIZE, getHp } from '../../../app/utils';

export default StyleSheet.create({
  modalContainerSyle: {
    flex: 1,
    borderWidth: 0,
    borderColor: 'red',
    justifyContent: 'flex-end',
  },
  closeButtonStyle: {
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
    paddingVertical: getHp(20),

    backgroundColor: 'white',
    borderRadius: getHp(30),
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
});
