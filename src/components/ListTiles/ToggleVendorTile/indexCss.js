import {StyleSheet} from 'react-native';

import {getHp, getWp, FONTSIZE, FONTFAMILY} from '../../../app/utils';
const GRID_WIDTH = 0;
export default StyleSheet.create({
  tileContainer: {
    width: '100%',
    flexDirection: 'row',
  },
  avatarContainer: {
    width: '15%',
    borderWidth: GRID_WIDTH,
    borderColor: 'orange',
  },
  contentContainer: {
    paddingTop: getHp(2),
    width: '75%',
    borderWidth: GRID_WIDTH,
    borderColor: 'blue',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '10%',
    borderWidth: GRID_WIDTH,
    borderColor: 'red',
  },
  title: {
    fontSize: FONTSIZE.Text16,
    fontWeight: '500',
    lineHeight: getHp(22),
    fontFamily: FONTFAMILY.AvenirNextMedium,
    fontStyle: 'normal',
    color: '#000',
  },
  subTitle: {
    fontSize: FONTSIZE.Text12,
    fontWeight: '500',
    lineHeight: getHp(22),
    fontFamily: FONTFAMILY.AvenirNextRegular,
    fontStyle: 'normal',
    color: '#696969',
  },
  avatarToolTipContainer: {
    position: 'absolute',
    bottom: -getHp(3),
    left: -getWp(3),
  },
});
