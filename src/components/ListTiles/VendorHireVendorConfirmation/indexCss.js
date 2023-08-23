import {StyleSheet} from 'react-native';
import {FONTFAMILY, FONTSIZE, getHp, getWp} from '../../../app/utils';

export default StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#FBFBFB',
    paddingVertical: getHp(15),
    paddingHorizontal: getWp(20),
  }, 
  partyDetailContainer: {
    marginTop: getHp(20),
    alignSelf: 'center',
  },
  inviteDetailText: {
    textAlign: 'center',
    fontSize: FONTSIZE.Text16,
    fontWeight: '500',
    fontFamily: FONTFAMILY.AvenirNextMedium,
    letterSpacing: 0.2,
    color: '#000',
  },
  invitePartyText: {
    fontSize: FONTSIZE.Text18,
    fontFamily: 'Roboto',
    marginBottom: getHp(5),
  },
  buttonTrayContainer: {
    marginTop: getHp(15),
    alignSelf: 'center',
    width: '85%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pressButtonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: getHp(36),
    width: '47%',
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
    letterSpacing: 0.4,
    fontWeight: '500',
    fontFamily: 'Roboto',
    fontSize: FONTSIZE.Text15,
  },
});
