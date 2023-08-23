import {StyleSheet} from 'react-native';
import {FONTSIZE, getWp, getHp} from '../../../app/utils';

export default StyleSheet.create({
  containerStyle: {
    backgroundColor: '#FBFBFB',
    flex: 1,
  },
  tabContainerStyle: {
    height: 42,
    backgroundColor: '#FBFBFB',
    borderBottomWidth: 0,
  },
  tabBarUnderlineStyle: {backgroundColor: null},
  tabStyle: {backgroundColor: '#FBFBFB'},
  textStyle: {
    fontSize: FONTSIZE.Text16,
    color: '#000',
    fontFamily: 'AvenirNext-Medium',
  },
  activeTabStyle: {backgroundColor: '#FBFBFB', borderRadius: getWp(10)},
  activeTextStyle: {
    letterSpacing: 0.5,
    color: '#00E08F',
    fontWeight: '700',
    fontFamily: 'AvenirNext-Regular',
  },
  polygonContainerStyle: {
    position: 'absolute',
    //backgroundColor: 'red',

    zIndex: 1000,
    top: getHp(28),
  },
  polygonCustomView: {
    width: 0,
    height: 0,
    borderLeftWidth: 20,
    borderRightWidth: 20,
    borderBottomWidth: 21,
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#FFF',
    position: 'absolute',
    zIndex: 1000,
    top: getHp(28),
  },
});
