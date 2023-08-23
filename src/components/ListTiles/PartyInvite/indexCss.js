import {StyleSheet} from 'react-native';

import { FONTSIZE, FONTFAMILY,getWp,getHp } from '../../../app/utils';
export default StyleSheet.create({
  renderContainer: {
    backgroundColor: '#FFF', 
    padding: 20,
  },
  shadowStyle: {
    // shadowColor: '#000',
    // shadowOffset: {width: 1, height: 1},
    // shadowRadius: 5,
    // shadowOpacity: 0.1,
  },
  flexDirectionStyle: {
    flexDirection: 'row',
    // justifyContent: 'space-between',

    alignItems: 'center',
  },
  textStyle: {
    color: '#000',
    fontSize: FONTSIZE.Text16,
    fontFamily: 'AvenirNext-Medium',
  },
  timeStyle: {
    color: '#696969',
    marginTop: getHp(10),
    fontSize: FONTSIZE.Text14,
    fontFamily: 'AvenirNext-Regular',
    letterSpacing: 0.2,
    // marginLeft:48
  },
  flexDirectionStyle: {
    flexDirection: 'row',
    // justifyContent: 'space-between',

    alignItems: 'center',
},
});
