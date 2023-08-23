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
  searchContainer: {
   marginVertical: getHp(13),
    width: '95%',
    backgroundColor: '#FFF',  
    alignSelf: 'center',
    borderRadius: getHp(15),
  },
  mainViewContainer: {
    backgroundColor: '#FBFBFB',
    flex:1,
  },  
  headerContainerStyle: {
    backgroundColor: '#FFF',
    height: getHp(50),
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
