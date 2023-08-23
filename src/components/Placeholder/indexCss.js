import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';

import {FONTFAMILY, FONTSIZE, getHp, getWp} from '../../app/utils';

export const Styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingHorizontal: getWp(15),  
    height: getHp(40),
  },
  text: {
    letterSpacing: 0.4,
    fontWeight: '400',
    fontSize: FONTSIZE.Text14,
    textDecorationLine: 'underline',
    fontFamily: FONTFAMILY.AvenirNextRegular,
    flexWrap: 'wrap',
    color: '#00C3F0',
    marginLeft: getWp(11),
  },
});

export const Styled = {
  WrapperTouchable: styled.TouchableOpacity`
    box-shadow: 0px 0px 11px rgba(0, 0, 0, 0.11);
    border-radius: 15px;
  `,
};
