import {StyleSheet} from 'react-native';

import {FONTFAMILY, FONTSIZE, getWp, getHp} from '../../app/utils';
export default StyleSheet.create({
  container: {
    
  }, 
  vendorCityText: {
    marginTop: getHp(1),
    fontWeight: '400',
    fontFamily: FONTFAMILY.AvenirNextRegular,
    fontSize: FONTSIZE.Text14,
    color: '#999',
  },
  descriptionText: {
    fontSize: FONTSIZE.Text14,
    fontFamily: FONTFAMILY.AvenirNextRegular, 
    letterSpacing: 0.3,
    color: '#000',
  },
  showMore: {
    top: getHp(3),
    //color: '#1FAEF7',
    color: '#FFF',
    fontSize: FONTSIZE.Text18,
    fontWeight: 'bold',
    fontFamily: FONTFAMILY.AvenirNextRegular,
  }, 
});
