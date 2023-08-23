import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {SvgUri} from 'react-native-svg';

import Styles from './indexCss';

const ChooseVendorTile = props => {
  const {containerStyle, onPress, vendorCategory} = props;
  return (
    <TouchableOpacity
      disabled={!onPress}
      onPress={() => onPress(vendorCategory)}
      style={[Styles.container, containerStyle]}>
      <View style={[Styles.imageNameContainer]}>
        {vendorCategory?.categoryImage && (
          <SvgUri
            width={'40'}
            height={'40'}
            uri={vendorCategory?.categoryImage}
          />
        )}
        <Text style={[Styles.categoryText]}>
          {vendorCategory?.vendorCategory}
        </Text>
      </View>
      <Text style={[Styles.rightText]}>{vendorCategory.rightText ?? ''}</Text>
    </TouchableOpacity>
  );
};

ChooseVendorTile.defaultProps = {
  containerStyle: {},
  vendorCategory: {},
  onPress: null,
};
export default ChooseVendorTile;
