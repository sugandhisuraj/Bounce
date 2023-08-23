import {StyleSheet} from 'react-native';
import {FONTFAMILY, FONTSIZE, getHp, getWp} from '../../../app/utils';

export default StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#FFF',
    padding: getHp(15),
    marginBottom: getHp(5)
  },
  avatarWithUsernameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },  
  requestInfoText: {
    marginTop: getHp(21),
    fontFamily: FONTFAMILY.AvenirNextRegular,
    fontWeight: '400',
    fontSize: FONTSIZE.Text14,
    color: '#000',
    letterSpacing: 0.3,
  },
  messageInputStyle: {
    backgroundColor: '#FBFBFB',
    marginTop: getHp(20),
    height: getHp(36),
    borderRadius: getHp(15),
    paddingLeft: getWp(20),
    fontFamily: FONTFAMILY.AvenirNextRegular,
    fontWeight: '500',
    fontSize: FONTSIZE.Text15,
    color: '#CCCCCC',

    borderWidth: getHp(1),
    borderColor: '#EEEEEE',
  },
});
