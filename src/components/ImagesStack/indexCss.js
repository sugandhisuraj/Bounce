import {StyleSheet} from 'react-native';
import {FONTFAMILY, FONTSIZE, getHp, getWp} from '../../app/utils';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainerViewStyle: {
    marginRight: getHp(-20),
    borderWidth: getHp(2),
    borderColor: '#FBFBFB',
    borderRadius: getHp(100),
  },
  infoText: {
    fontFamily: FONTFAMILY.AvenirNextRegular,
    fontSize: FONTSIZE.Text14,
    fontWeight: '600',
    letterSpacing: 0.2,
    color: '#000',
    marginLeft: getWp(30),
  },
  lastStackWithCountText: {
    fontWeight: '600',
    fontSize: FONTSIZE.Text11,
    fontFamily: FONTFAMILY.AvenirNextRegular,
    color: '#000',
    letterSpacing: 0.2,
  },
  lastStackWithCount: avatarSize => {
    return {
      height: avatarSize,
      width: avatarSize,
      borderWidth: getHp(2),
      borderColor: '#FBFBFB',
      borderRadius: getHp(100),
      backgroundColor: '#DDDDDD',
      justifyContent: 'center',
      alignItems: 'center',
    };
  },
});
