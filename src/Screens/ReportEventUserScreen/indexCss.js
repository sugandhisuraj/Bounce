import {StyleSheet} from 'react-native';
import {FONTFAMILY, FONTSIZE, getHp} from '../../app/utils';

export default StyleSheet.create({
  reportInfoText: {
    fontFamily: FONTFAMILY.AvenirNextRegular,
    fontSize: FONTSIZE.Text15,
    fontWeight: '500',
    letterSpacing: 0.3,
    lineHeight: getHp(22),
    width: '90%',
    alignSelf: 'center',
    marginTop: getHp(20),
  },
  textInputContainer: {
    height: getHp(80),
    backgroundColor: 'white',
    width: '100%',
    borderRadius: getHp(15),
    paddingHorizontal: getHp(16),
    paddingVertical: getHp(10),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  textInput: {
    fontSize: FONTSIZE.Text16,
    fontFamily: FONTFAMILY.AvenirNextRegular,
    fontWeight: '400',
    letterSpacing: 0.2,
    height: '100%',
    borderWidth: 0,
    borderColor: 'red',
  },
  breakGuidelineTextInput: {
    marginTop: getHp(25),
    height: getHp(150),
  },
  reportContainerStyle: {
    marginTop: getHp(35),
  },
  reportTitleStyle: {
    fontWeight: '700',
    fontFamily: FONTFAMILY.AvenirNextRegular,
    fontSize: FONTSIZE.Text16,
    letterSpacing: 0.5,
    color: '#FFF',
  },
  guidelineText: {
    color:'#01CFFF',
    textDecorationLine:'underline'
  }
});
