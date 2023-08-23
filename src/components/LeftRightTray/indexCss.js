import {StyleSheet} from 'react-native';
import {FONTFAMILY, FONTSIZE, getHp, getWp} from '../../app/utils';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    height: getHp(50),
    alignItems: 'center',
    paddingHorizontal: getWp(20),
  },
  textStyle: {
    fontFamily: FONTFAMILY.AvenirNextRegular,
    fontWeight: '600',
    fontSize: FONTSIZE.Text16,
    color: '#000',
    letterSpacing: 0.2,
  },
  shadowStyle: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: .5,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
    
    elevation: 1,
  },
});
