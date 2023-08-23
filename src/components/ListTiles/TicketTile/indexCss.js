import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';

import {FONTFAMILY, FONTSIZE, getHp, getWp} from '../../../app/utils';

export default StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'white',
    paddingVertical: getHp(15),
  },
  ticketTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: getWp(25),
    paddingRight: getWp(20),
    //alignItems: 'center',
  },
  textTitleText: {
    fontWeight: '600',
    fontFamily: FONTFAMILY.AvenirNextMedium,
    fontSize: FONTSIZE.Text22,
    color: '#000',
    width: '60%',
  },
  priceStyle: {
    paddingLeft: getWp(27),
    fontWeight: '500',
    fontFamily: FONTFAMILY.AvenirNextMedium,
    fontSize: FONTSIZE.Text16,
    color: '#000',
    marginTop: getHp(10),
  },
  titleDescriptionText: {
    marginTop: getHp(15),
    paddingHorizontal: getWp(20),
    fontWeight: '500',
    color: '#000',
    fontFamily: FONTFAMILY.AvenirNextMedium,
    fontSize: FONTSIZE.Text16,
    width: '100%',
  },
  showMore: {
    top: getHp(4),
    color: '#1FAEF7',
    fontSize: FONTSIZE.Text16,
    fontWeight: '500',
    fontFamily: FONTFAMILY.AvenirNextRegular,
    left: getWp(30),
  },
  shadowStyle: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  quantityTray: {
    flexDirection: 'row',
    alignItems: 'center',
    width: getWp(100),
    justifyContent: 'center',
    backgroundColor: '#F6F6F6',
    height: getHp(27),
  },
  quantityTextContainer: {
    backgroundColor: '#F2F5F6',
    alignItems: 'center',
    justifyContent: 'center',
    width: getWp(40),
    height: '100%',
  },
  plusMinusContainer: {
    position: 'absolute',
    height: getHp(30),
    width: getHp(30),
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  quantityText: {
    fontWeight: '600',
    fontSize: FONTSIZE.Text18,
    fontFamily: FONTFAMILY.AvenirNextRegular,
    letterSpacing: 0.2,
    color: '#000',
  },
  soldOutText: {
    fontFamily: FONTFAMILY.AvenirNextRegular,
    fontSize: FONTSIZE.Text20,
    letterSpacing: 0.4,
    color: '#FF005C',
  },
  viewDollarText: {
    fontWeight: '600',
    fontFamily: FONTFAMILY.AvenirNextRegular,
    fontSize: FONTSIZE.Text16,
    color: '#000',
  },
});

export const Styled = {
  ShadowView: styled.TouchableOpacity`
    background: #ffffff;
    box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.13);
    border-radius: 10px;
  `,
  Container: styled.View`
    background: #ffffff;
    box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.05);
    border-radius: 0px;
  `,
};
