import {StyleSheet} from 'react-native';
import {FONTFAMILY, FONTSIZE, getHp, getWp} from '../../../app/utils';

export default StyleSheet.create({
  container: {
    paddingHorizontal: getWp(25),
    paddingVertical: getHp(22),
  },
  imageInputContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },

  coverPhotoText: {
    fontFamily: FONTFAMILY.AvenirNextRegular,
    fontWeight: '400',
    fontSize: FONTSIZE.Text18,
    color: 'rgba(0, 0, 0, 0.6)',
    marginBottom: getHp(10),
  },
  editPenContainer: {
    position: 'absolute',
    right: getHp(0),
  },
  videoStyle: {
    width: getWp(125),
    height: getHp(125),
    backgroundColor: 'red',
  },
});
