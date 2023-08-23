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
import {RedHeart} from '@svg';
import {Divider} from 'react-native-elements';
import Styles from './indexCss';
import {useSearchBar} from '../../../../app/hooks';
import {VendorService} from '../../../../app/services';
import HireVendorStrore from './HIreVendorStore';
import {getHp, getWp} from '../../../../app/utils';
import VendorListScreen from '../VendorListScreen';
import MobxStore from '../../../../mobx';
import FilterVendorModel from '../FilterVendorScreen/FilterVendorModel';
import ConfirmHireVendorScreen from '../ConfirmHireVendorScreen';
import ToastUtil from '../../../../app/constants/toast';
import FavoriteVendorScreen from '../FavoriteVendorScreen';
const ChooseVendorScreen = props => {
  const filterVendorModel = FilterVendorModel.getInstance();
  const hireVendorStore = HireVendorStrore.getInstance();
  let allSelectedVendors = hireVendorStore.selectedVendors.data();
  const {
    searchQuery,
    SearchBarComponent,
    onChangeText: setSearchQuery,
  } = useSearchBar();

  useEffect(() => {
    MobxStore.appStore.fetchVendorSignupData();
    VendorService.setVendorByCategory();
    VendorService.setHiredorRequestedVendors();
    VendorService.setRatingAndReviewVendors();
    hireVendorStore.selectedVendors.reset();
  }, []);
  console.log(
    'ALL_VENDORS_BY_CATEGORY - ',
    JSON.stringify(hireVendorStore.vendorsByCategory),
  );

  const VendorCategoryListTile = ({item, index}) => {
    return (
      <ListTiles.ChooseVendorTile
        vendorCategory={item}
        onPress={item => {
          hireVendorStore.setSelectedVendorByCategory(item);
          filterVendorModel.clearList(item);
          props.navigation.navigate(VendorListScreen.routeName);
        }}
      />
    );
  };
  const VendorCategoryListData =
    hireVendorStore.vendorCategoryList(searchQuery);

  const favVendors = hireVendorStore.favoriteVendors;
  return (
    <Scaffold statusBarStyle={{backgroundColor: '#FFFFFF'}}>
      <Headers.BackTile
        containerStyle={[Styles.headerContainerStyle]}
        title={`Choose Vendor`}
        onBackPress={() => {
          props.navigation.goBack();
        }}
      />
      <View style={[Styles.container]}>
        {SearchBarComponent({
          placeholder: 'Search',
          containerStyle: Styles.searchContainer,
        })}
        <ScrollView style={{marginBottom: getHp(20)}}>
          {hireVendorStore.vendorsByCategory?.length > 0 && (
            <Fragment>
              {favVendors?.length > 0 && (
                <Fragment>
                  <TouchableOpacity
                    onPress={() => props.navigation.navigate(FavoriteVendorScreen.routeName)}
                    style={[Styles.favContainer]}>
                    <RedHeart height={getHp(25)} width={getHp(25)} />
                    <Text style={[Styles.textFavContainer]}>Favorites</Text>
                  </TouchableOpacity>
                  <Divider
                    style={{marginTop: getHp(15), marginBottom: getHp(10)}}
                  />
                </Fragment>
              )}

              <Lists.NewToggleList
                flatListProps={{
                  scrollEnabled: false,
                }}
                searchQuery={searchQuery}
                // containerStyle={{paddingHorizontal: getHp(15)}}
                heading={''}
                ListData={VendorCategoryListData}
                ListTile={VendorCategoryListTile}
                dividerStyle={{marginVertical: getHp(20)}}
                //searchFilter={Lists.NewToggleList.SEARCH_FILTERS.Party}
                listViewContainerStyle={{marginTop: 0}}
              />
            </Fragment>
          )}
          <View style={{marginVertical: getHp(20)}} />
        </ScrollView>
        <Buttons.LinearGradient
          onPress={() => {
            if (allSelectedVendors.length == 0) {
              return ToastUtil('Select atleast 1 Vendor');
            }
            props.navigation.navigate(ConfirmHireVendorScreen.routeName);
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
ChooseVendorScreen.routeName = '/ChooseVendorScreen';

export default observer(ChooseVendorScreen);
