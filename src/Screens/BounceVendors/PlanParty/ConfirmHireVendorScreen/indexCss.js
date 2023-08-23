import {Platform, StyleSheet} from 'react-native';
import {FONTSIZE, getHp, getWp} from '../../../../app/utils';

export default StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 0,
    borderColor: 'red',
    backgroundColor: '#FBFBFB',
    //backgroundColor: 'red',
  },
  headerContainerStyle: {
    backgroundColor: 'rgba(120, 212, 255, 0.8)',
    height: getHp(60),
  },

  selectButtonStyle: {
    marginVertical: getHp(10),
    marginTop: getHp(30),
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
  searchContainer: {
    width: '85%',
    backgroundColor: '#FFF', 
    height: Platform.select({ios: getHp(40), android: 40}),
    borderRadius: getHp(15),
  },
  searchFilterContainer: {
    marginHorizontal: getWp(15),
    marginVertical: getHp(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  filterContainer: {
    height: getHp(40),
    width: getHp(40),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: getHp(15),
  },
});
