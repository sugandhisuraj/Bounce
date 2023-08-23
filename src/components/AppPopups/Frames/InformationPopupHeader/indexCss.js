import {StyleSheet} from 'react-native';

import {getHp, getWp, FONTFAMILY, FONTSIZE} from '../../../../app/utils';
export default StyleSheet.create({
  topHeadingContainer: {
    flexDirection: 'row',
    marginTop: getHp(20),
    marginBottom: getHp(15),
    marginHorizontal: getHp(20),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  descriptionText: {
    fontSize: FONTSIZE.Text20,
    fontFamily: FONTFAMILY.AvenirNextRegular,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  lineBreak: {
    borderWidth: 1,
    borderColor: '#F2F5F6',
  },
});
