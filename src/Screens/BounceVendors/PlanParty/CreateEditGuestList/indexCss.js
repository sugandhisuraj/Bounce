import {Platform, StyleSheet} from 'react-native';
import {hp, wp, FONTSIZE, getHp, getWp} from '@utils';

const styles = StyleSheet.create({
  pageTabsContainer: {
    //height: hp(77),
    flex: 1,  
  },
  tabContainerRootStyle: {
    flex:1,  
    paddingVertical: getHp(13),
    paddingHorizontal: getWp(10),
  },
  searchContainer: {
    width: '100%',
    backgroundColor: '#F2F5F6', 
    height: Platform.select({ios: getHp(40), android: 40}),
    borderRadius: getHp(15),
  },
  listViewWrapperContainer: {
    marginTop: getHp(10),
    backgroundColor: 'rgba(255, 255, 255, 0.66)',
  },
});
export default styles;
