import {StyleSheet} from 'react-native';
import {FONTFAMILY, FONTSIZE, getWp} from '../../app/utils';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flexDirection: 'row',
    marginLeft: getWp(13),
  },
  userNameText: {
    fontSize: FONTSIZE.Text18,
    fontWeight: '500',
    fontFamily: FONTFAMILY.AvenirNextMedium,
    color: '#000',
  },
  hintText: {
    fontSize: FONTSIZE.Text14,
    fontFamily: FONTFAMILY.AvenirNextMedium,
    color: '#000',
    alignSelf: 'flex-end',
    bottom: 1.5,
  },
});
