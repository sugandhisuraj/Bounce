import React, {Fragment, useEffect, useRef} from 'react';
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
import {PartyService, VendorService} from '../../../../app/services';
import HireVendorStrore from '../ChooseVendor/HIreVendorStore';
import {getHp} from '../../../../app/utils';
import MobxStore from '../../../../mobx';
import ToastUtil from '../../../../app/constants/toast';
import FilterVendorScreen from '../FilterVendorScreen';
import {ConfirmationPopups} from '../../../../components/AppPopups';
import ConfirmHireVendorScreen from '../ConfirmHireVendorScreen';
import VendorProfileScreen from '../VendorProfileScreen';
import ChooseVendor from '../ChooseVendor';
const FavoriteVendorScreen = props => {
  let checkRef = useRef(false);
  const hireVendorStore = HireVendorStrore.getInstance();
  let allSelectedVendors = hireVendorStore.selectedVendors.data();
  let allFavoriteVendor = hireVendorStore.favoriteVendors;
  const {
    searchQuery,
    SearchBarComponent,
    onChangeText: setSearchQuery,
  } = useSearchBar(); 
  useEffect(() => {
    if (!checkRef.current && allFavoriteVendor?.length == 0) {
      checkRef.current = true;
      return props.navigation.goBack();
    }
  }, [allFavoriteVendor]);
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
  const VendorsTile = ({item, index}) => {
    item = {...item};
    item.isFavourite = hireVendorStore.isThisVendorFavorite(item.id);
    return (
      <ListTiles.VendorTile
        renderCategoryAsSubtitle
        onFavoritePress={onVendorFavouritePress}
        vendorData={item}
        onTilePress={() => {
          hireVendorStore.selectedVendors.toggle(item);
        }}
        isSelected={() =>
          hireVendorStore.selectedVendors.isDataExist(item).exist
        }
        onAvatarTitlePress={() => {
          let VIndex = allFavoriteVendor.findIndex(v => v.id == item.id);
          hireVendorStore.setCurrentVendorIndex(VIndex);
          props.navigation.navigate(VendorProfileScreen.routeName, {
            onVendorFavouritePress,
            listMode: VendorProfileScreen.ListMode.FavoriteVendors,
          });
        }}
      />
    );
  };

  return (
    <Scaffold statusBarStyle={{backgroundColor: '#FFF'}}>
      <Headers.BackTile
        containerStyle={[Styles.headerContainerStyle]}
        title={`Favorites`}
        onBackPress={() => {
          props.navigation.goBack();
        }}
      />
      <View style={[Styles.mainViewContainer]}>
        {SearchBarComponent({
          placeholder: 'Search',
          containerStyle: Styles.searchContainer,
        })}
        <ScrollView style={[Styles.container]}>
          <Lists.NewToggleList
            flatListProps={{
              scrollEnabled: false,
            }}
            heading={''}
            searchQuery={searchQuery}
            ListData={allFavoriteVendor}
            ListTile={VendorsTile}
            CustomDivider={<View style={{height: getHp(7)}} />}
            searchFilter={Lists.NewToggleList.SEARCH_FILTERS.HireVendorList}
            listViewContainerStyle={{marginTop: 0}}
            containerStyle={{marginTop: -getHp(15)}}
          />
          <View style={{height: getHp(30)}} />
        </ScrollView>
        <Buttons.LinearGradient
          onPress={() => {
            if (allSelectedVendors.length == 0) {
              return ToastUtil('Select atleast 1 Vendor');
            }
            props.navigation.navigate(ConfirmHireVendorScreen.routeName);
            setSearchQuery('');
          }}
          titleStyle={[Styles.selectButtonTitleStyle]}
          linearGradientStyle={Styles.selectButtonStyle}
          showArrow={false}
          title={allSelectedVendors.length + ' Selected'}
        />
      </View>
    </Scaffold>
  );
};
FavoriteVendorScreen.routeName = '/FavoriteVendorScreen';

export default observer(FavoriteVendorScreen);
 