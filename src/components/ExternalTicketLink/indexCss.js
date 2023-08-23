import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import {FONTFAMILY, FONTSIZE, getHp, getWp} from '../../app/utils';

export default StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: getWp(15),
    paddingVertical: getHp(10),
    backgroundColor: 'white',
    borderRadius: getHp(15),
  },
  shadowStyle: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  containerTitleView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerTitle: {
    fontFamily: FONTFAMILY.AvenirNextRegular,
    fontWeight: '500',
    fontSize: FONTSIZE.Text17,
    color: '#999999',
  },
  linkUrlContainer: {
    marginTop: getHp(5),
    flexDirection: 'row',
  },
  linkUrlText: {
    color: '#00CFFF',
    fontWeight: '500',
    fontFamily: FONTFAMILY.AvenirNextRegular,
    fontSize: FONTSIZE.Text16,
    letterSpacing: 0.1,
    textDecorationLine: 'underline',
    marginLeft: getWp(10),
  },
  menuItemStyle: {
    height: getHp(30),
  },
  menuContentStyle: {
    borderTopLeftRadius: getHp(15),
    borderBottomLeftRadius: getHp(15),
    borderBottomRightRadius: getHp(15),
    height: getHp(40),
    width: getHp(110),
    marginRight: getWp(30),
    marginTop: getHp(20),
  },
  menuTitleTextStyle: {
    fontWeight: '600',
    fontFamily: FONTFAMILY.AvenirNextRegular,
    fontSize: FONTSIZE.Text14,
    color: '#000',
    letterSpacing: 0.2,
  },
});
