import {StyleSheet} from 'react-native';
import {FONTFAMILY, FONTSIZE, getHp} from '../../../app/utils';

export default StyleSheet.create({
  container: {
    alignSelf: 'center',
  },
  heading: {
    fontSize: FONTSIZE.Text20,
    fontWeight: '600',
    fontFamily: FONTFAMILY.AvenirNextMedium,
    lineHeight: getHp(27),
  },
  listContainer: {
    marginTop: getHp(25),
    borderWidth:0,
    borderColor: 'red'
  },
});
