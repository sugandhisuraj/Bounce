import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Divider} from 'react-native-elements';
import {observer} from 'mobx-react';

import {getHp} from '../../../app/utils';
import {RedHeart, GreyHeart} from '@svg';
import * as ListTiles from '../../ListTiles';
import {VendorFieldsData} from '../../../app/constants';
import HireVendorStore from '../../../Screens/BounceVendors/PlanParty/ChooseVendor/HIreVendorStore';
import {VendorService} from '../../../app/services';
import ToastUtil from '../../../app/constants/toast';
import MobxStore from '../../../mobx';
import SingleVendorProfileScreen from '../../../Screens/BounceUsers/SingleVendorProfileScreen';
import HostViewModel from '../../../Screens/BounceVendors/PlanParty/HostView/HostViewModel';
import NavigationService from '../../../navigation/NavigationService';

const FeaturingVendorList = props => {
  const {
    containerStyle,
    flatlistStyle,
    flatlistContentContainerStyle,
    vendors,
    widgetType,
    partyData,
  } = props;
  const hireVendorStore = HireVendorStore.getInstance();
  const hostViewInstance = HostViewModel.instance();
  // Don't Remove
  hireVendorStore.favoriteVendors;
  // Don't Remove

  const onNavigateToVendorProfile = vendor => {
    let currentParty =
      widgetType == NavigationService.screenNames.NewsFeed
        ? partyData
        : hostViewInstance.currentParty;
    props.navigation.navigate(SingleVendorProfileScreen.routeName, {
      vendorRequest: {
        vendor,
        party: currentParty,
      },
    });
  };

  const renderItemTile = ({item}) => {
    const isThisFavVendor = hireVendorStore.isThisVendorFavorite(
      item.vendor.id,
    );
    let vendorName = item.vendor?.fullName ?? '';
    let vendorCategory =
      VendorFieldsData.VendorFieldsData.getCategory(item.vendor?.vendorType)
        ?.vendorCategory ?? '';
    return (
      <ListTiles.ToggleVendorTile
        onTitlePress={() => onNavigateToVendorProfile(item.vendor)}
        onAvatarPress={() => onNavigateToVendorProfile(item.vendor)}
        avatar={item?.vendor?.profileImage?.filePath}
        title={vendorName}
        subTitle={vendorCategory}
        Icon={isThisFavVendor ? <RedHeart /> : <GreyHeart />}
        onRightIconPress={() =>
          VendorService.toggleFavVendorAndSetVendorFav(item.vendor.id)
        }
      />
    );
  };
  return (
    <View style={[Styles.container, containerStyle]}>
      <FlatList
        bounces={false}
        style={[flatlistStyle]}
        contentContainerStyle={[flatlistContentContainerStyle]}
        data={vendors}
        renderItem={renderItemTile}
        ItemSeparatorComponent={() => <Divider style={[Styles.dividerStyle]} />}
      />
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {},
  dividerStyle: {
    marginVertical: getHp(12),
    marginHorizontal: getHp(10),
  },
});

 
FeaturingVendorList.defaultProps = {
  containerStyle: {},
  flatlistStyle: {},
  flatlistContentContainerStyle: {},
  widgetType: NavigationService.screenNames.EventPage,
  partyData: {},
};
export default observer(FeaturingVendorList);
