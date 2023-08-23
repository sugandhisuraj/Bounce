import {StyleSheet} from 'react-native';
import {FONTFAMILY, FONTSIZE, getHp, getWp} from '../../app/utils';

export default StyleSheet.create({
  container: {
    paddingHorizontal: getWp(20),
    paddingVertical: getHp(20),
    backgroundColor: 'white',
  },
  editRowContainer: {
    flexDirection: 'row',
    //borderWidth:1,
    justifyContent: 'flex-end',
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
  threeBackStyle: {
    fontSize: FONTSIZE.Text20,
  },
  inputPlaceholder: {
    fontFamily: FONTFAMILY.AvenirNextRegular,
    fontWeight: '500',
    fontSize: FONTSIZE.Text13,
    color: '#999999',
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: '#EEEEEE',
    marginTop: getHp(7),
    backgroundColor: 'rgba(238, 238, 238, 0.5)',
    height: getHp(35),
    borderRadius: getHp(10),
    paddingLeft: getWp(12),
  },
  priceQuantityRow: {
    width: '100%',
    marginTop: getHp(12),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priceInputStyle: {
    textAlign: 'center',
    fontWeight: '600',
    fontFamily: FONTFAMILY.AvenirNextRegular,
    fontSize: FONTSIZE.Text14,
    color: '#000',
  },
  titleDescStyle: {
    fontWeight: '500',
    fontFamily: FONTFAMILY.AvenirNextRegular,
    fontSize: FONTSIZE.Text14,
    color: '#000',
  },
});
