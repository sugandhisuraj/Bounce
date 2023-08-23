import React, {Fragment, useEffect} from 'react';
import {Text, View, ScrollView, TouchableOpacity} from 'react-native';
import {observer} from 'mobx-react';
import {
  Scaffold,
  Headers,
  ListTiles,
  Lists,
  Buttons,
} from '../../../../components';

import {FilterSvg} from '@svg';
import Styles from './indexCss';
import {useSearchBar} from '../../../../app/hooks';
import {PartyService, VendorService} from '../../../../app/services';
import HireVendorStrore from '../ChooseVendor/HIreVendorStore';
import {getHp} from '../../../../app/utils';
import MobxStore from '../../../../mobx';
import ToastUtil from '../../../../app/constants/toast';
import FilterVendorScreen from '../FilterVendorScreen';
import ConfirmHireVendorScreen from '../ConfirmHireVendorScreen';
import FilterVendorModel from '../FilterVendorScreen/FilterVendorModel';
import VendorProfileScreen from '../VendorProfileScreen';

const VendorListScreen = props => {
  const hireVendorStore = HireVendorStrore.getInstance();
  const filterVendorModel = FilterVendorModel.getInstance();
  let allSelectedVendors = hireVendorStore.selectedVendors.data();

  const {
    searchQuery,
    SearchBarComponent,
    onChangeText: setSearchQuery,
  } = useSearchBar();
  useEffect(() => {
    hireVendorStore.syncCurrentSelectedCategory();
  }, [hireVendorStore._vendorsByCategory]);

  const onVendorFavouritePress = async vendorData => {
    try {
      await VendorService.setToggleFavVendor(vendorData.id);
    } catch (error) {}
  };

  let selectedVendorByCategory = hireVendorStore.selectedVendorByCategory;
  let allVendors = selectedVendorByCategory.vendor;
  if (filterVendorModel.isFilterModeOn) {
    allVendors = filterVendorModel.filteredVendorData;
  }
  let allFavVendors = allVendors.filter(v =>
    hireVendorStore.isThisVendorFavorite(v.id),
  );
  let allNotFavVendors = allVendors.filter(
    v => hireVendorStore.isThisVendorFavorite(v.id) == false,
  );
  const VendorsTile = ({item, index}) => {
    item = {...item};
    item.isFavourite = hireVendorStore.isThisVendorFavorite(item.id);
    return (
      <ListTiles.VendorTile
        onFavoritePress={onVendorFavouritePress}
        vendorData={item}
        onTilePress={() => {
          hireVendorStore.selectedVendors.toggle(item);
        }}
        isSelected={() =>
          hireVendorStore.selectedVendors.isDataExist(item).exist
        }
        onAvatarTitlePress={() => {
          let VIndex = allVendors.findIndex(v => v.id == item.id);
          hireVendorStore.setCurrentVendorIndex(VIndex);
          props.navigation.navigate(VendorProfileScreen.routeName, {
            listMode: null,
          });
        }}
      />
    );
  };
  return (
    <Scaffold statusBarStyle={{backgroundColor: '#FFFFFF'}}>
      <Headers.BackTile
        containerStyle={[Styles.headerContainerStyle]}
        title={`${selectedVendorByCategory.vendorCategory} Search`}
        onBackPress={() => {
          props.navigation.goBack();
        }}
      />
      <View style={[Styles.container]}>
        <View style={[Styles.searchFilterContainer]}>
          {SearchBarComponent({
            placeholder: 'Search',
            containerStyle: Styles.searchContainer,
          })}
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate(FilterVendorScreen.routeName);
              setSearchQuery('');
            }}
            style={[Styles.filterContainer]}>
            <FilterSvg />
          </TouchableOpacity>
        </View>
        <ScrollView bounces={false}>
          {allFavVendors.length > 0 && (
            <Lists.NewToggleList
              flatListProps={{
                scrollEnabled: false,
                bounces: false,
              }}
              searchQuery={searchQuery}
              containerStyle={{marginTop: getHp(10)}}
              heading={'Favorites'}
              ListData={allFavVendors}
              ListTile={VendorsTile}
              CustomDivider={<View style={{height: getHp(7)}} />}
              searchFilter={Lists.NewToggleList.SEARCH_FILTERS.HireVendorList}
              listViewContainerStyle={{marginTop: getHp(12)}}
            />
          )}
          {allNotFavVendors.length > 0 && (
            <Lists.NewToggleList
              flatListProps={{
                scrollEnabled: false,
                bounces: false,
              }}
              searchQuery={searchQuery}
              containerStyle={[
                allFavVendors.length > 0 && {marginTop: getHp(45)},
                allFavVendors.length == 0 && {marginTop: getHp(10)},
              ]}
              heading={'All'}
              ListData={allNotFavVendors}
              ListTile={VendorsTile}
              CustomDivider={<View style={{height: getHp(7)}} />}
              searchFilter={Lists.NewToggleList.SEARCH_FILTERS.HireVendorList}
              listViewContainerStyle={{marginTop: getHp(12)}}
            />
          )}

          <View style={{marginVertical: getHp(20)}} />
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
VendorListScreen.routeName = '/VendorListScreen';

export default observer(VendorListScreen);
