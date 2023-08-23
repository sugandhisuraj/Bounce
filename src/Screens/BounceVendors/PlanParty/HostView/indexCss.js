import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';

import {FONTFAMILY, FONTSIZE, getHp, getWp} from '../../../../app/utils';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBFBFB',
    //backgroundColor: 'red'
  }, 
  partyDescriptionContainerStyle: {
    fontWeight: '500',
    fontSize: FONTSIZE.Text14,
    color: '#000',
    letterSpacing: 0.3,
  },
  attendingTabContainerStyle: {
    width: '100%',
    paddingHorizontal: getWp(7),
    alignSelf: 'center',
    paddingBottom: getHp(30),
  },

  allGuestsBtnContainerStyle: {
    marginTop: getHp(20),
    width: '95%',
    alignSelf: 'center',
  },
  featuredVendorContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '95%',
    alignSelf: 'center'
  },
  addressTextContainer: {
    width: '100%',
    height: getHp(36),
    marginTop: getHp(15),
  },
  backStyleContainer: {
    position: 'absolute',
    top: getHp(45),
    zIndex: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '95%',
    alignSelf: 'center',
  },
});

export const Styled = {
  PartyText: styled.Text`
    text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.77);
  `,
  TouchShadow: styled.TouchableOpacity`
    box-shadow: 0px 0px 10px #000000;
  `,
};