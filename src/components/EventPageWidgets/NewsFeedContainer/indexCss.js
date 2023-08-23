import {StyleSheet} from 'react-native';

import {FONTFAMILY, FONTSIZE, getHp, getWp} from '../../../app/utils';

export const Styles = StyleSheet.create({
  container: {},
  actionTrayStyle: {
    marginTop: getHp(15),
  },
  addressFeaturingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: getHp(15),
  },
  addressWidgetContainer: {
    marginVertical: getHp(0),
    width: '48%',
    height: getHp(36),
  },
  featureBtn: {
    width: '48%',
    height: getHp(36),
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: getWp(12),
  },
  featuringText: {
    letterSpacing: 0.7,
    color: '#FFC700',
    fontWeight: '600',
    fontFamily: FONTFAMILY.AvenirNextRegular,
    fontSize: FONTSIZE.Text15,
  },
  addressWidgetContainerForNoFeaturing: {
    width: '100%',
    height: getHp(36),
    marginTop: getHp(15),
  },
});
