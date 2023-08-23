import {StyleSheet} from 'react-native';
import {FONTFAMILY, FONTSIZE, getHp, getWp} from '../../../app/utils';

export default StyleSheet.create({
  container: {
    padding: getHp(15),
    paddingHorizontal: getWp(20),
    width: '100%',
    backgroundColor: '#FBFBFB',
    // borderWidth:1,
    // borderColor:'red'
  },
  guestTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  guestPartyText: {
    fontWeight: '500',
    fontSize: FONTSIZE.Text18,
    fontFamily: FONTFAMILY.AvenirNextMedium,
    color: '#000',
  },
  guestTray: {
    marginTop: getHp(22),
    flexDirection: 'row',
    alignItems: 'center',
  },
  guestAvatar: {
    height: getHp(30),
    width: getHp(30),
    borderRadius: getHp(70),
    borderWidth: getHp(2),
    borderColor: '#FFFFFF',
    marginRight: -getWp(15),
  },
  guestCountText: {
    marginLeft: getWp(30),
    fontWeight: '400',
    fontSize: FONTSIZE.Text16,
    fontFamily: FONTFAMILY.AvenirNextMedium,
  },

  containerShadowStyle: {
    shadowColor: 'rgba(0, 0, 0, 0.07)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  selectedContainer : {
    backgroundColor: 'rgba(31, 174, 247, 0.13)'
  }
});
