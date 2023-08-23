import {StyleSheet} from 'react-native';
import {FONTFAMILY, FONTSIZE, getHp} from '../../app/utils';

export default StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingHorizontal: getHp(15),
    paddingVertical: getHp(10),
  },
  dollarContainer: {
    flexDirection: 'row',
  },
  svgsStyle: {
    marginLeft: getHp(5),
  },
  priceStyle: {
      fontFamily: FONTFAMILY.AvenirNextRegular,
      fontWeight: '500',
      fontSize: FONTSIZE.Text16,
      letterSpacing: 0.2,
      color: '#000'
  },
  selectedRowStyle: {
    backgroundColor: '#DDFFF3'
  }
});
