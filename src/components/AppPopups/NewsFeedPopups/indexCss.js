import {StyleSheet} from 'react-native';
import {FONTFAMILY, FONTSIZE, getHp, getWp} from '../../../app/utils';

export default StyleSheet.create({
  centerViewContainerStyle: {
    borderRadius: getHp(30),
    maxHeight: '85%',
    minHeight: '85%',
  },
  selectedTagsInPartyStyle: {
    width: '92%',
    flexWrap: 'wrap',
    alignSelf: 'center',
    marginTop: getHp(10),
  },
  dividerStyle: {
    borderWidth: 0.5,
    marginVertical: getHp(10),
    borderColor: '#F2F5F6',
  },
  interestedFriendsHeading: {
    fontWeight: '700',
    fontSize: FONTSIZE.Text20,
    fontFamily: FONTFAMILY.AvenirNextRegular,
    color: '#00E391',
    letterSpacing: 0.5,
  },
});
