import {StyleSheet} from 'react-native';
import {FONTFAMILY, FONTSIZE, getHp, getWp} from '../../../app/utils';

export default StyleSheet.create({
  container: {
    height: getHp(30),
    backgroundColor: '#F2F5F6',
    borderRadius: getHp(24),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: getWp(12),
  },
  emojiStyle: {
    bottom: 2,
  },
  emojiName: {
    fontWeight: '500',
    fontSize: FONTSIZE.Text12,
    fontFamily: FONTFAMILY.AvenirNextMedium,
    letterSpacing: 0.4,
    color: '#000',
    marginLeft: getWp(5),
  },
  percentageText: {
    marginLeft: getWp(3),
    fontWeight: '500',
    fontFamily: FONTFAMILY.AvenirNextMedium,
    fontSize: FONTSIZE.Text11,
    color: '#888888',
  },
  selectedContainer: {
    backgroundColor: '#CEF6E8',
  },
});
