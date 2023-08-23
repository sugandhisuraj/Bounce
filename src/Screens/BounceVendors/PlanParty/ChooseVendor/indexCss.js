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
      alignSelf: 'center',
    borderRadius: getHp(15),
    marginVertical: getHp(20),
    
  },
  selectButtonStyle: {
    marginVertical: getHp(10),
    height: getHp(50),
    width: '95%',
    alignSelf: 'center'
  },
  selectButtonTitleStyle: {
    fontWeight: '500',
    fontFamily:'ROBOTO',
    fontSize: FONTSIZE.Text20,
    letterSpacing: 0.8,
    color:'#FFF'
  },
  favContainer: {
    height: getHp(60),
    flexDirection: 'row',
    marginHorizontal: getWp(18),
    backgroundColor: '#FFE2ED',
    alignItems: 'center',
    paddingHorizontal: getWp(20),
    borderRadius: getHp(15)
  },
  textFavContainer: {
    fontWeight: '400',
    fontFamily: FONTFAMILY.AvenirNextRegular,
    color: '#000',
    fontSize: FONTSIZE.Text18,
    marginLeft:getWp(25)
  }
});
