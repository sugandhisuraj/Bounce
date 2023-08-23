import {Platform, StyleSheet} from 'react-native';
import {FONTFAMILY, FONTSIZE, getHp, getWp} from '../../../app/utils';
export default StyleSheet.create({
  container: {},
  searchContainerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: getWp(15),
    backgroundColor: '#FBFBFB',
    paddingBottom: getHp(10),
  },
  searchContainer: {
    backgroundColor: 'white',
    width: '75%', 
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  bottomTray: {
    height: getHp(65),
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: getWp(15),
  },
  leftBottomTray: {
    width: '48%',
    height: getHp(45),
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: getHp(13),
    paddingHorizontal: getHp(8),

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  commonInterestPopupContainer: {
    paddingHorizontal: getWp(20),
    paddingVertical: getHp(22),
  },
  commonInterestHeading: {
    fontWeight: '700',
    fontFamily: FONTFAMILY.AvenirNextRegular,
    fontSize: FONTSIZE.Text20,
    letterSpacing: 0.5,
    color: '#000',
    marginLeft: getWp(15),
  },
  newsFeedContainerStyle: {
    //borderWidth: 2,
    height: Platform.select({android: '84%', ios: '87%'}),
    borderColor: 'red',
  },
});
