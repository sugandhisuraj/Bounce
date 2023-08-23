import {StyleSheet} from 'react-native';
import {FONTFAMILY, FONTSIZE, getHp, getWp} from '../../../app/utils';

const BORDER_WIDTH = 0;
export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: getHp(20),
    borderWidth: BORDER_WIDTH,
    borderColor: 'blue',
    alignItems: 'center',
  },
  imageNameContainer: {
    flexDirection: 'row',
    width: '60%',
    borderWidth: BORDER_WIDTH,
    borderColor: 'red',
    alignItems: 'center',
  },
  categoryText: {
    marginLeft: getWp(20),
    fontWeight: '400',
    fontFamily: FONTFAMILY.AvenirNextRegular,
    fontSize: FONTSIZE.Text18,
    color: '#000'
  },
  rightText: {
    fontWeight: '400',
    fontFamily: FONTFAMILY.AvenirNextRegular,
    fontSize: FONTSIZE.Text16,
    color: '#999999'
  }
});
