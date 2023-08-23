import {StyleSheet} from 'react-native';
import {FONTFAMILY, FONTSIZE, getHp} from '../../../app/utils';

export default StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  contentContainer: {
    marginTop: getHp(20),
  },
  tabButton: {
    borderRadius: getHp(15),
    backgroundColor: '#F2F5F6',
    paddingHorizontal: getHp(15),
    height: getHp(30), 
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  selectedTabButton: {
    backgroundColor: '#D2EFFD',
  },
  headingTextStyle: {
    fontFamily: FONTFAMILY.AvenirNextMedium,
    color: '#999999',
    fontSize: FONTSIZE.Text15,
    fontWeight: '500',
  },
  selectedHeadingTextStyle: {
    color: '#1FAEF7',
  },
});
