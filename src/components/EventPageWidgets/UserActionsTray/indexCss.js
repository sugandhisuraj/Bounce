import {Platform, StyleSheet} from 'react-native';
import {FONTSIZE, getHp, getWp, wp} from '../../../app/utils';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: getHp(11),
    backgroundColor: 'transparent',
  },
  verticalIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: getHp(60),
    width: getHp(80),
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    opacity: 0.9,
    ...Platform.select({
      android: {
        shadowColor: '#000',
        elevation: 2.8,
      },
      ios: {},
    }),
    // shadowColor: 'rgba(0, 0, 0, 0.1)',
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 1,
    // shadowRadius: 2.22,

    // elevation: 3,
  },
  bounceGuestImgStackContainer: {
    width: '100%',
    //borderWidth: 1,
    justifyContent: 'center',
    paddingRight: getWp(20),
  },
  wideAttendButton: {
    paddingHorizontal: getWp(25),
    height: getHp(70),
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  wideActionTray: {
    flexDirection: 'column',
  },
  wideAttendButtonTitleStyle: {
    marginLeft: getWp(20),
    fontWeight: '600',
    fontSize:FONTSIZE.Text18,
    letterSpacing: 0.2,
    color: '#000'
  }
});
