import {StyleSheet, Platform} from 'react-native';

import {getHp, getWp, FONTSIZE, FONTFAMILY} from '@utils';

export default StyleSheet.create({
  searchContainer: {
    width: '90%',
    backgroundColor: '#F2F5F6',
    height: Platform.OS == 'ios' ? getHp(40) : 40,
    borderRadius: getHp(15),
    marginTop: getHp(10),
    marginBottom: getHp(20)
  },
  textStyle: {
    color: '#FFFFFF',
    fontSize: FONTSIZE.Text13,
    fontFamily: 'AvenirNext-Bold',
  },
  dividerStyle: {
      marginVertical: getHp(10)
  }
});
