import {StyleSheet} from 'react-native';
import {FONTFAMILY, FONTSIZE, getHp} from '../../app/utils';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBFBFB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  updateBounceContainerStyle: {
    height: getHp(55),
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#00CFFF',
    marginTop: getHp(21),
    marginBottom: getHp(15),
  },
  updateBounceTitleStyle: {
    fontWeight: '700',
    fontFamily: FONTFAMILY.AvenirNextRegular,
    fontSize: FONTSIZE.Text20,
    letterSpacing: 0.1,
    color: '#FFF',
  },
  versionExpiredText: {
    color: '#7C8AB0',
    fontWeight: '600',
    fontSize: FONTSIZE.Text18,
    fontFamily: FONTFAMILY.AvenirNextRegular,
    letterSpacing: 0.2,
    textAlign: 'center',
  },
});
