import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {Avatar} from 'react-native-elements';
import {getHp} from '../../../app/utils';
import {Placeholder} from '../../../assets';
import Styles from './indexCss';
import {VendorFieldsData} from '../../../app/constants';
const FeatureVendorTabTile = props => {
  const {vendor, containerStyle,onPress} = props;

  let source = Placeholder;
  if (vendor?.profileImage?.filePath) {
    source = {uri: vendor.profileImage.filePath};
  }
  let vendorCategory =
    VendorFieldsData.VendorFieldsData.getCategory(vendor.vendorType) ?? {};
  let vendorFullName = vendor.fullName ?? '';
  if (vendorFullName.length > 13) {
    vendorFullName = vendorFullName.substr(0, 13) + '...';
  }
  return (
    <View style={{alignItems: 'baseline'}}>
      <TouchableOpacity 
      disabled={!onPress}
      onPress={() => onPress(vendor)}
      style={[Styles.container, containerStyle]}>
        <Avatar
          containerStyle={{marginTop: getHp(11)}}
          avatarStyle={[Styles.avatarStyle]}
          size={getHp(50)}
          source={source}
        />
        <Text style={[Styles.vendorFullName]}>{vendorFullName}</Text>
        <Text style={[Styles.vendorCategoryText]}>
          {vendorCategory.vendorCategory}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

FeatureVendorTabTile.defaultProps = {
  containerStyle: {},
  onPress: null
};
export default FeatureVendorTabTile;
