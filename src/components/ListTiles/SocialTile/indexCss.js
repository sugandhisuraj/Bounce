import {StyleSheet} from 'react-native';
import {FONTSIZE, getHp, getWp} from '../../../app/utils';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: getHp(8),
    justifyContent: 'space-between',
  },
  rowContainer: {
    flexDirection: 'row',
    height: getHp(50),
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: getHp(15),
    paddingHorizontal: getWp(15),
    justifyContent: 'space-between',
    width: '90%',
  },
  shadowStyle: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  titleStyle: {
    marginLeft: getWp(13),
    fontWeight: '500',
    fontSize: FONTSIZE.Text16,
    color: '#000',
    fontFamily: 'AvenirNext-Medium',
  },
  actionTitle: {
    color: '#1FAEF7',
    fontFamily: 'AvenirNext-Medium',
    letterSpacing: 0.4,
    fontWeight: '600',
    fontSize: FONTSIZE.Text16,
  },
  outerContainer: {
    width: '4%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  greyDots: {
    height: getHp(5),
    width: getHp(5),
    borderRadius: getHp(15),
    backgroundColor: '#CCCCCC',
  },
});
