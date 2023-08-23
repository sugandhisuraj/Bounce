import {StyleSheet} from 'react-native';
import {FONTFAMILY, FONTSIZE, getHp, getWp} from '../../../app/utils';

export default StyleSheet.create({
  container: {
    marginTop: getHp(20),
    paddingHorizontal: getHp(15),
  },
  topGuestText: {
    fontWeight: '600',
    fontFamily: FONTFAMILY.AvenirNextRegular,
    fontSize: FONTSIZE.Text13,
    color: '#000000',
    letterSpacing: 0.4,
  },
  onAvgTextContainer: {
    marginTop: getHp(10),
    borderRadius: getHp(10),
    backgroundColor: '#FFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    //backgroundColor: 'red',
    opacity: 0.7,
    paddingVertical: getHp(10),
    paddingHorizontal: getWp(7),
    width: '98%',
    alignSelf: 'center',
  },
  avgText: {
    fontFamily: FONTFAMILY.AvenirNextRegular,
    fontWeight: '500',
    fontSize: FONTSIZE.Text12,
    color: '#999999',
    letterSpacing: 0.1,
  },
  topGuestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  subtagContainerStyle: {
    marginRight: getHp(7),
    marginTop: getHp(15),
    backgroundColor: '#F2F5F6',
  },
});
