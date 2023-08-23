import {Dimensions, StyleSheet} from 'react-native';
import styled from 'styled-components/native';

import {FONTFAMILY, FONTSIZE, getHp, getWp} from '../../../app/utils';

export default StyleSheet.create({
  backStyleContainer: {
    position: 'absolute',
    top: getHp(45),
    zIndex: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '95%',
    alignSelf: 'center',
  },
  partyTitleText: {
    fontFamily: FONTFAMILY.AvenirNextRegular,
    fontWeight: '700',
    fontSize: FONTSIZE.Text22,
    letterSpacing: 0.4,
    //textShadowColor: 'rgba(0, 0, 0, 0.77)',
    color: '#FFF',
    paddingHorizontal: getWp(15),
  },
  partyDateText: {
    fontSize: FONTSIZE.Text14,
    fontFamily: FONTFAMILY.AvenirNextRegular,
    fontWeight: '800',
    letterSpacing: 0.4,
    //textShadowColor: 'rgba(0, 0, 0, 0.77)',
    color: '#FFF',
    paddingHorizontal: getWp(15),
  },
  partyInfoText: {
    //position: 'absolute',
    //bottom: getHp(45),
    height: '63.6%',
    paddingTop: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.24)',
    zIndex: 10,
  },
  iconStyle: {
    shadowColor: '#000',
    shadowOffset: {
      width: -1,
      height: -1,
    },
    shadowOpacity: 10,
    shadowRadius: 15,

    elevation: 12,
  },
  roundView: {
    height: getHp(8),
    width: getWp(8),
    borderRadius: getHp(20),
    backgroundColor: 'white',
  },
  priceRangeContainer: {
    backgroundColor: '#FFF',
    height: getHp(24),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: getWp(5),
    borderRadius: getHp(7),
    flexDirection: 'row',
    marginLeft: getWp(10),
  },
  priceRangeText: {
    fontWeight: '700',
    fontSize: FONTSIZE.Text14,
    fontFamily: FONTFAMILY.AvenirNextRegular,
    letterSpacing: 0.4,
    color: '#000',
  },
  reportDotContainer: {position: 'absolute', right: getWp(10)},

  actionTrayStyle: {
    marginTop: getHp(15),
  },
  addressFeaturingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: getHp(15),
  },
  addressWidgetContainer: {
    marginVertical: getHp(0),
    width: '48%',
    height: getHp(36),
  },
  featureBtn: {
    width: '48%',
    height: getHp(36),
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: getWp(12),
  },
  featuringText: {
    letterSpacing: 0.7,
    color: '#FFC700',
    fontWeight: '600',
    fontFamily: FONTFAMILY.AvenirNextRegular,
    fontSize: FONTSIZE.Text15,
  },
  addressWidgetContainerForNoFeaturing: {
    width: '100%',
    height: getHp(36),
    marginTop: getHp(15),
  },
  countView: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 12
  },
  countText:{
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
    paddingHorizontal: 5
  }
});

export const Styled = {
  PartyText: styled.Text`
    text-shadow: 0px 0px 0px rgba(0, 0, 0, 0.77);
  `,
  TouchShadow: styled.TouchableOpacity`
    box-shadow: 0px 0px 10px #000000;
  `,
};
