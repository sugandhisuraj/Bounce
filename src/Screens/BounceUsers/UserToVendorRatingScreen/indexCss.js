import {StyleSheet} from 'react-native';
import {FONTFAMILY, FONTSIZE, getHp, getWp} from '../../../app/utils';

export default StyleSheet.create({
  container: {
    //backgroundColor: 'red',
    backgroundColor: '#FBFBFB',
    flex: 1,
  },
  backIconContainer: {
    marginLeft: getWp(20),
    marginTop: getHp(10),
  },
  avatarContainerStyle: {
    marginTop: getHp(20),
    alignSelf: 'center',
  },
  ratingContainerStyle: {
    alignSelf: 'center',
    marginTop: getHp(20),
  },
  breakLine: {
    backgroundColor: '#DDDDDD',
    height: getHp(1),
    width: '90%',
    alignSelf: 'center',
    marginTop: getHp(20),
  },
  commentInputText: {
    marginTop: getHp(11),
    width: '85%',
    alignSelf: 'center',
    fontWeight: '500',
    fontSize: FONTSIZE.Text16,
    fontFamily: FONTFAMILY.AvenirNextRegular,
    color: '#000000',
    maxHeight: getHp(120),
    minHeight: getHp(120),
  },
  preTextContainer: {
    height: getHp(35),
    borderRadius: getHp(24),
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: getHp(15),
    marginRight: getWp(8),
    marginTop: getHp(8),
  },
  preTextStyle: {
    fontWeight: '400',
    fontSize: FONTSIZE.Text14,
    fontFamily: FONTFAMILY.AvenirNextRegular,
    color: '#000',
  },
  pretextConsumeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: getHp(10),
    paddingHorizontal: getHp(10),
  },
  selectButtonStyle: {
    backgroundColor: 'red',
    height: getHp(45),
    width: '95%',
    alignSelf: 'center',
    marginBottom: getHp(10),

     
  },
  selectButtonTitleStyle: {
    fontWeight: '500',
    fontFamily: 'ROBOTO',
    fontSize: FONTSIZE.Text20,
    letterSpacing: 0.8,
    color: '#FFF',
  },
});
