import {StyleSheet} from 'react-native';
import {getWp, getHp, FONTSIZE} from '../../app/utils';
export default StyleSheet.create({
  NameStyle: {
    color: '#000',
    fontSize: FONTSIZE.Text18,
    fontFamily: 'AvenirNext-Medium',
  },
  mutualGreyText: {
    color: '#696969',
    fontSize: FONTSIZE.Text13,
    fontFamily: 'AvenirNext-Medium',
  },
  RenderItemViewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  contactRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  linearGradient: {
    elevation: 5,
    backgroundColor: '#fff',
    borderRadius: 20,
  },
  fourItems: {
    backgroundColor: '#000000',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  reviewsTitleStyle: {
    marginTop: getHp(20),
    marginBottom: getHp(10),
    paddingHorizontal: getWp(10),
    color: '#000',
    fontSize: FONTSIZE.Text18,
    fontFamily: 'AvenirNext-DemiBold',
  },
  footerList: {
    height: 70,
    width: 100,
    backgroundColor: '#1D1D1D',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  selectedFooterItem: {
    backgroundColor: 'rgba(255, 46, 0, 0.24)',
  },
  allContainerStyle: {
    // alignSelf: 'center',
    width: '100%',
    paddingRight: 5,
  },
  allButtonStyle: {
    // width: '10%',
    // borderRadius: 24,
    // backgroundColor: '#1FAEF7',
    // paddingHorizontal: 20,
    // paddingVertical: 5
  },
  allTitleStyle: {
    fontSize: FONTSIZE.Text14,
    fontFamily: 'AvenirNext-DemiBold',
    color: '#fff',
    letterSpacing: 0.5,
  },
});
