import {Platform, StyleSheet} from 'react-native';
import {FONTFAMILY, FONTSIZE, getHp, getWp} from '../../../../app/utils';

export default StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 0,
    borderColor: 'red',
    backgroundColor: '#FBFBFB',
  },
  headerContainerStyle: {
    backgroundColor: '#FFF',
    height: getHp(60),
  },
  searchContainer: {
    width: '90%',
    backgroundColor: '#FFF',
     
    height: Platform.select({ios: getHp(40), android: 40}),
    borderRadius: getHp(15),
    marginVertical: getHp(20),
  },
  selectButtonStyle: {
    marginVertical: getHp(10),
    height: getHp(50),
    width: '95%',
    alignSelf: 'center',
  },
  selectButtonTitleStyle: {
    fontWeight: '500',
    fontFamily: 'ROBOTO',
    fontSize: FONTSIZE.Text20,
    letterSpacing: 0.8,
    color: '#FFF',
  },
  scrollViewContainer: {
    backgroundColor: '#FBFBFB',
  },
  bottomContainer: {
    paddingLeft: getWp(40),
    paddingRight: getWp(15),
    backgroundColor: 'white',
    height: getHp(80),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  clearText: {
    color: '#1FAEF7',
    fontWeight: '600',
    fontFamily: FONTFAMILY.AvenirNextRegular,
    letterSpacing: 0.2,
    fontSize: FONTSIZE.Text20,
    alignSelf: 'center',
  },
  resultContainer: {
    height: getHp(50),
    width: getWp(240),
    marginTop: -getHp(2),
  },
});
