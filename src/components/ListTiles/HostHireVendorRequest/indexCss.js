import {StyleSheet} from 'react-native';
import {FONTFAMILY, FONTSIZE, getHp, getWp} from '../../../app/utils';

export default StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingVertical: getHp(20),
    paddingHorizontal: getHp(20),
  },
  rowAvatarHireBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  hireBtn: {
    height: getHp(36),
    width: getWp(124),
  },
  messageInputStyle: {
    backgroundColor: '#FBFBFB', 
    height: getHp(36),
    borderRadius: getHp(15),
    paddingLeft: getWp(20),
    fontFamily: FONTFAMILY.AvenirNextRegular,
    fontWeight: '500',
    fontSize: FONTSIZE.Text15,
    color: '#CCCCCC',

    borderWidth: getHp(1),
    borderColor: '#EEEEEE',
  },
  thinkRequestTitleStyle: {
    fontWeight: '600',
    fontFamily: FONTFAMILY.AvenirNextRegular,
    fontSize: FONTSIZE.Text15,
    color: '#FFF',
    letterSpacing: 0.2,
  },
  thinkRequestContainerStyle: {
    backgroundColor: '#00CFFF',
    width: getWp(120),
    height: getHp(36),
    borderRadius: getHp(15),
  },
  bottomMessageTray: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: getHp(20),
  },
});
