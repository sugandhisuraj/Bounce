import {StyleSheet} from 'react-native';
import {FONTFAMILY, FONTSIZE, getHp, getWp} from '../../app/utils';

const BORDER_WIDTH = 0;
export default StyleSheet.create({
  container: {
    width: '100%',
    borderWidth: BORDER_WIDTH,
    borderColor: 'red',
    alignSelf: 'center',
  },
  rangeTrackStyle: {
    backgroundColor: 'lightgrey',
    height: getHp(10),
    borderRadius: getHp(100),
  },
  rangeSelectedStyle: {
    backgroundColor: 'rgba(31, 174, 247, 0.24)',
    height: getHp(10),
    borderRadius: getHp(100),
  },
  rangeMarkerContainerStyle: {marginTop: getHp(3.5)},
  rangeContainerStyle: {alignSelf: 'center'},
  infoTextContainer: {
    marginLeft: getWp(18),
  },
  priceRangeText: {
    fontSize: FONTSIZE.Text20,
    fontFamily: FONTFAMILY.AvenirNextRegular,
    fontWeight: '600',
    letterSpacing: 0.2,
    color: '#000',
  },
  hourlyRateText: {
    fontSize: FONTSIZE.Text12,
    fontFamily: FONTFAMILY.AvenirNextRegular,
    fontWeight: '400',
    letterSpacing: 0.2,
    color: '#999',
  },
  priceToFromRange: {
    fontSize: FONTSIZE.Text14,
    fontFamily: FONTFAMILY.AvenirNextRegular,
    fontWeight: '400',
    letterSpacing: 0.2,
    color: '#000',
    marginTop: getHp(6),
  },
  markerStyle: {
    borderRadius: getHp(100),
    height: getHp(28),
    width: getHp(28),
    backgroundColor: 'white',
    elevation: 1,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 1,
    shadowOpacity: 0.1,
  },
});
