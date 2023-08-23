import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import {FONTFAMILY, FONTSIZE, getHp, getWp} from '../../../app/utils';

export default StyleSheet.create({
  searchShadowStyle: {
    backgroundColor: 'white',

    shadowColor: 'rgba(0, 0, 0, 0.15)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },
  findEventsInContainer: {
    marginTop: getHp(15),
  },
  findEventsInText: {
    fontWeight: '600',
    fontFamily: FONTFAMILY.AvenirNextRegular,
    fontSize: FONTSIZE.Text16,
    color: '#999999',
    letterSpacing: 0.5,
  },
  slidersSubTitleText: {
    fontWeight: '600',
    fontFamily: FONTFAMILY.AvenirNextRegular,
    fontSize: FONTSIZE.Text14,
    color: '#999',
    marginTop: getHp(3),
  },
  rangeSelectedStyle: {
    backgroundColor: 'rgba(0, 207, 255, 0.5)',
  },
  daysViewRoundBaseContainer: {
    marginRight: getWp(10),
    paddingVertical: 10,
    backgroundColor: '#FBFBFB',
  },
  geolocationContainerStyle: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  searchContainerStyle: {
    height: getHp(35),
    width: '88%',
    backgroundColor: 'white',
  },
  clearText: {
    color: '#1FAEF7',
    fontSize: FONTSIZE.Text16,
    fontWeight: '500',
  }
});

export const Styled = {
  SearchContainer: styled.View`
    background: #ffffff;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.15);
    border-radius: 10px;
  `,
};
