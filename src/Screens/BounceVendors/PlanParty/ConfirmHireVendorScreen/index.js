import React, {useRef, useEffect} from 'react';
import {Text, View, ScrollView, TouchableOpacity, Alert} from 'react-native';
import {observer} from 'mobx-react';
import {
  Scaffold,
  Headers,
  ListTiles,
  Lists,
  Buttons,
} from '../../../../components';

import Styles from './indexCss';
import {useSearchBar} from '../../../../app/hooks';
import {AppNotificationService, PartyService, VendorService} from '../../../../app/services';
import HireVendorStrore from '../ChooseVendor/HIreVendorStore';
import {getHp} from '../../../../app/utils';
import MobxStore from '../../../../mobx';
import ToastUtil from '../../../../app/constants/toast';
import FilterVendorScreen from '../FilterVendorScreen';
import {ConfirmationPopups} from '../../../../components/AppPopups';
import HostViewModel from '../HostView/HostViewModel';
import VendorProfileScreen from '../VendorProfileScreen';

const ConfirmHireVendorScreen = props => {
  let checkRef = useRef(false);
  const hireVendorStore = HireVendorStrore.getInstance();
  let allSelectedVendors = hireVendorStore.selectedVendors.data();
  const hostViewStore = HostViewModel.instance();
  let allFavoriteVendor = hireVendorStore.favoriteVendors;
  
  
  useEffect(()=>{ 
    if (!checkRef.current && allSelectedVendors?.length == 0) {
      checkRef.current = true;
      return props.navigation.goBack();
    }
  }, [allSelectedVendors]);
  const onVendorFavouritePress = async vendorData => {
    try {
      MobxStore.toggleLoader(true);
      const toggleFavVendor = await VendorService.toggleFavVendor(
        vendorData.id,
      );
      //await VendorService.setVendorByCategory();
      await VendorService.setFavoritesVendor();
    } catch (error) {
      ToastUtil(
        error?.message ??
          error?.response?.data?.message ??
          'Something went wrong! Try Again',
      );
    } finally {
      MobxStore.toggleLoader(false);
    }
  };

  const onVendorTilePress = item => {
    return MobxStore.popupStore.setConfirmationPopup({
      visible: true,
      type: ConfirmationPopups.popupType.HireVendorUnselectVendor,
      onSuccess: () => {
        hireVendorStore.selectedVendors.toggle(item);
        // if (hireVendorStore.selectedVendors.data().length == 0) {
        //   return props.navigation.goBack();
        // }
      },
    });
  };
  const VendorsTile = ({item, index}) => {
    item = {...item};
    item.isFavourite = hireVendorStore.isThisVendorFavorite(item.id);
    return (
      <ListTiles.VendorTile
        onFavoritePress={onVendorFavouritePress}
        vendorData={item}
        onTilePress={onVendorTilePress.bind(null, item)}
        isSelected={() =>
          hireVendorStore.selectedVendors.isDataExist(item).exist
        }
        onAvatarTitlePress={() => {
          let VIndex = allSelectedVendors.findIndex(v => v.id == item.id);
          hireVendorStore.setCurrentVendorIndex(VIndex);
          props.navigation.navigate(VendorProfileScreen.routeName, {
            onVendorFavouritePress,
            listMode: VendorProfileScreen.ListMode.SelectedVendors
          });
        }}
      />
    );
  };  

  const onConfirmRequestPress = async () => {
    try {
      MobxStore.toggleLoader(true);
      const hireVendorRes = await VendorService.hireVendorRequestByHost(hireVendorStore.selectedVendors.data(true), hostViewStore.currentParty.id);
      hireVendorStore.selectedVendors.reset();
      ToastUtil('Request Successfully Send to Vendors', {
        duration: 2000
      });
      setTimeout(()=>{
        AppNotificationService.getUserNotification();
      }, 1000);
      return props.navigation.goBack();
    }catch(err) {
      let msg = err?.message ?? err?.response?.data?.message ?? 'Something went wrong! Try Again';
      ToastUtil(msg);
    } finally {
      MobxStore.toggleLoader(false);
    }
  }

  return (
    <Scaffold statusBarStyle={{backgroundColor: 'rgba(120, 212, 255, 0.8)'}}>
      <Headers.BackTile
        containerStyle={[Styles.headerContainerStyle]}
        title={`Selected`}
        onBackPress={() => {
          props.navigation.goBack();
        }}
      />

      <ScrollView style={[Styles.container]}>
        <Lists.NewToggleList
          flatListProps={{
            scrollEnabled: false,
          }}
          heading={''}
          ListData={allSelectedVendors}
          ListTile={VendorsTile}
          CustomDivider={<View style={{height: getHp(7)}} />}
          searchFilter={Lists.NewToggleList.SEARCH_FILTERS.HireVendorList}
          listViewContainerStyle={{marginTop: 0}}
          containerStyle={{marginTop: -getHp(15)}}
        />
        <View style={{height: getHp(30)}} />
      </ScrollView>
      <Buttons.LinearGradient
        titleStyle={[Styles.selectButtonTitleStyle]}
        linearGradientStyle={Styles.selectButtonStyle}
        showArrow={false}
        title={`Confirm Request`}
        onPress={onConfirmRequestPress}
      />
    </Scaffold>
  );
};
ConfirmHireVendorScreen.routeName = '/ConfirmHireVendorScreen';

export default observer(ConfirmHireVendorScreen);
