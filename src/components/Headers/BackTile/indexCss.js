import {StyleSheet} from 'react-native';
import {FONTFAMILY, getHp, FONTSIZE} from '../../../app/utils';

const borderWidth = 0;
export default StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth,
    borderColor: 'red',
    backgroundColor: '#FBFBFB',
    height: getHp(50), 
  },
  backStyleContainer: {
    width: '10%',
    alignItems: 'flex-end',
    borderWidth,
    borderColor: 'blue',
  },
  titleContainer: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth,
    borderColor: 'orange',
    height: '100%',
  },
  titleText: {
    fontWeight: '600',
    fontFamily: FONTFAMILY.AvenirNextMedium,
    fontSize: FONTSIZE.Text22,
    color: '#000',
  },
});
