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
    width: getWp(150),
  },
  messageInputStyle: {
    backgroundColor: '#FBFBFB',
    marginTop: getHp(20),
    height: getHp(38),
    borderRadius: getHp(15),
    paddingLeft: getWp(20),
    fontFamily: FONTFAMILY.AvenirNextRegular,
    fontWeight: '500',
    fontSize: FONTSIZE.Text15,
    color: '#CCCCCC',

    borderWidth: getHp(1),
    borderColor: '#EEEEEE',
  },
  hireButtonTitleStyle: {
    color: '#FFF',
    fontFamily: FONTFAMILY.AvenirNextRegular,
    fontWeight: '500',
    fontSize: FONTSIZE.Text16,
    letterSpacing: 0.4,
  },
});

