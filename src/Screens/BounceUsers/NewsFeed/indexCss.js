import {StyleSheet, Platform} from 'react-native';
import styled from 'styled-components/native';
import {FONTFAMILY, FONTSIZE, getHp, getWp} from '../../../app/utils';

const Styles = StyleSheet.create({
  searchContainerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FBFBFB',
    //backgroundColor: 'red',
    paddingHorizontal: getWp(16),
    paddingVertical: getHp(10),
  },
  searchContainer: {
    height: getHp(35),
    width: '85%',
    backgroundColor: 'white',
    elevation: 5,
  },
  interestCount: {
    position: 'absolute',
    fontWeight: '700',
    fontSize: FONTSIZE.Text14,
    fontFamily: FONTFAMILY.AvenirNextRegular,
    color: '#FFF',
  },
  newsFeedContainerStyle: {
    //borderWidth: 2,
    height: Platform.select({android: '84%', ios: '87%'}),
    borderColor: 'red',
  },
});

const Styled = {
  SearchContainer: styled.View`
    background: #ffffff;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.15);
    border-radius: 10px;
  `,
};

export {Styles, Styled};

//  == 'android' ? '84%' : '87%',
