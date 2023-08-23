import {StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';
import {FONTSIZE,FONTFAMILY, getHp, getWp} from '@utils'; 
 

export default StyleSheet.create({ 
    infoBlurContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blurWhiteContainer: {
    width: '90%',
    backgroundColor: '#FFF',
    borderRadius: getHp(25),
    borderWidth: 0.5,
    borderColor: '#DDDDDD',
    paddingHorizontal: getWp(27),
  },
  infoTextHeading: {
    marginTop: getHp(20),
    fontWeight: '600',
    fontSize: FONTSIZE.Text20,
    fontFamily: 'AvenirNext-Medium',
  },
  infoText: {
    marginTop: getHp(20),
    fontWeight: '400',
    fontSize: FONTSIZE.Text16,
    fontFamily: 'AvenirNext-Medium',
    marginBottom: getHp(31),
  },
  closeBlurStyle: {
    height: getHp(75),
    width: getHp(75),
    borderRadius: getHp(150),
    backgroundColor: 'white',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: getHp(100),
  },
  closeIcon: {
    fontSize: FONTSIZE.Text45,
  },
  attendingTabContainerStyle: {
    width: '100%',
    paddingHorizontal: getWp(7),
    alignSelf: 'center',
    paddingBottom: getHp(30),
  },
  topGuestListText: {
    fontWeight: '600',
    fontFamily: FONTFAMILY.AvenirNextMedium,
    fontSize: FONTSIZE.Text13,
    letterSpacing: 0.4,
    marginLeft: getWp(15),
    marginTop: getHp(20),
  },
  topGuestContainer: {
    marginTop: getHp(13),
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
