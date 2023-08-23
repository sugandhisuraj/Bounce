import {StyleSheet} from 'react-native';
import {getHp, getWp, FONTSIZE, FONTFAMILY} from '../../../../app/utils';

export default StyleSheet.create({
  blurContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  popupContainer: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: getHp(25),
    borderWidth: 1,
    borderColor: '#DDDDDD',
  },
  logoutText: {
    fontWeight: '400',
    fontFamily: 'AvenirNext-Medium',
    fontSize: FONTSIZE.Text16,
    textAlign: 'center',
    color: '#000',
    letterSpacing: 0.2,
    marginTop: getHp(30),
    paddingHorizontal: getWp(10),
  },
  buttonsTray: {
    marginTop: getHp(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: getWp(15),
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
    fontSize: FONTSIZE.Text14,
    letterSpacing: 0.4,
    fontFamily: 'Roboto',
  },
});
