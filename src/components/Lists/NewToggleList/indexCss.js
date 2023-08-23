import {StyleSheet} from 'react-native';
import {FONTFAMILY, FONTSIZE, getHp, getWp} from '../../../app/utils';

const borderWidth = 0;
export default StyleSheet.create({
  container: {
      borderWidth,
      borderColor: 'red'
  },
  listViewContainer: {
      marginTop: getHp(10),
      borderWidth,
      borderColor: 'blue', 
  },
  flatListStyle: {
      //paddingBottom: getHp(10)
  },
  headingText: {
    fontWeight: '600',
    fontFamily: FONTFAMILY.AvenirNextRegular,
    fontSize: FONTSIZE.Text20,
    color: '#000',
    marginLeft: getWp(22),
  },
  listViewContainerStyle: {
      marginTop: getHp(20)
  },
  dividerStyle: {
      marginVertical: getHp(20)
  },
  toggleShowMoreContainer: {
      
  }
});
