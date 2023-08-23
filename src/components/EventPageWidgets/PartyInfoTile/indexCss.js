import {StyleSheet} from 'react-native';
import {FONTFAMILY, FONTSIZE, getHp, getWp} from '../../../app/utils';
export default StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
  },
  rightContainer: {
    // borderWidth: 1,
    // borderColor: 'red',
    flex: 1,
    paddingHorizontal: getWp(13),
    paddingVertical: getHp(3),
  },
  partyTitleStyle: {
    fontWeight: '500',
    fontSize: FONTSIZE.Text16,
    fontFamily: FONTFAMILY.AvenirNextRegular,
    color: '#000',
  },
  partyAddressStyle: {
    fontWeight: '500',
    fontFamily: FONTFAMILY.AvenirNextRegular,
    color: '#999999',
    fontSize: FONTSIZE.Text14,
    marginTop: getHp(5),
  },
  partySubTagContainerStyle: {
    marginTop: getHp(10),
  },
  onlyDraftView: {
    position: 'absolute',
    bottom: 0,
    borderTopStartRadius: 0,
    borderBottomStartRadius: getHp(10),
    borderTopEndRadius: getHp(5),
    borderBottomEndRadius: 0,
  },
  onlyPrivateView: {position: 'absolute', bottom: 0},
});
