import React, {Fragment, useEffect} from 'react';
import {Text, View, ScrollView, TouchableOpacity} from 'react-native';
import {observer} from 'mobx-react';
import {
  Scaffold,
  Headers,
  ListTiles,
  Lists,
  Buttons,
  RowCheckBox,
  PriceRangeInput,
} from '../../../../components';

import Styles from './indexCss';
import {useSearchBar} from '../../../../app/hooks';
import {VendorService} from '../../../../app/services';
import HireVendorStrore from '../ChooseVendor/HIreVendorStore';
import {getHp, getWp} from '../../../../app/utils';
import VendorListScreen from '../VendorListScreen';
import {VendorFieldsData} from '../../../../app/constants';
import MobxStore from '../../../../mobx';
import FilterVendorModel from './FilterVendorModel';

const GENDERS = [
  {
    id: 0,
    name: 'Male',
  },
  {
    id: 1,
    name: 'Female',
  },
  {
    id: 2,
    name: 'Other',
  },
];
const FilterVendorScreen = props => {
  const filterVendorModel = FilterVendorModel.getInstance();
  let isFilterModeOn = filterVendorModel.isFilterModeOn;
  let filteredVendorData = filterVendorModel.filteredVendorData;
  const vendorSignupData = MobxStore.appStore?.vendorSignupData ?? {};
  const hireVendorStore = HireVendorStrore.getInstance();
  let allSelectedVendors = hireVendorStore.selectedVendors.data();
  const {
    searchQuery,
    SearchBarComponent,
    onChangeText: setSearchQuery,
  } = useSearchBar();

  useEffect(() => {
    if (!filterVendorModel.isFilterModeOn) {
      clearFilter();
    }
  }, []);
  function clearFilter() {
    filterVendorModel.clearList(hireVendorStore.selectedVendorByCategory);
  }
  let selectedVendorByCategory = hireVendorStore.selectedVendorByCategory;
  let currentVendorFields = VendorFieldsData.VendorFieldsData.getFields(
    selectedVendorByCategory.id,
  );
  let currentVendorData = VendorFieldsData.VendorFieldsData.getCategory(
    selectedVendorByCategory.id,
  );
  const CheckBoxRowListTile = (mobxFieldKey, {item, index}) => {
    return (
      <RowCheckBox
        containerStyle={{marginLeft: getWp(22)}}
        data={item}
        onCheckBoxPress={() =>
          filterVendorModel.toggleCheckLists(mobxFieldKey, item)
        }
        isChecked={filterVendorModel.checkItemInList(mobxFieldKey, item)}
      />
    );
  };

  const ListTile = (mobxFieldKey, {item, index}) => {
    return (
      <ListTiles.ToggleSubTagTile
        containerStyle={{
          marginTop: getHp(10),
          marginRight: getWp(10),
        }}
        isSelected={filterVendorModel.checkItemInList(mobxFieldKey, item)}
        data={item}
        onPress={item => {
          filterVendorModel.toggleCheckLists(mobxFieldKey, item);
        }}
      />
    );
  };

  const handleOnConfirmFilter = async () => {
    const response = await filterVendorModel.getFilteredVendorsData();
    if (response?.length > 0) {
      return props.navigation.goBack();
    }
  };

  filterVendorModel.armed.data();
  filterVendorModel.genres.data();
  filterVendorModel.cuisines.data();
  filterVendorModel.guardCertification.data();
  filterVendorModel.equipment.data();
  filterVendorModel.services.data();
  filterVendorModel.gender.data();
  let services = [];
  let equipments = [];

  if (currentVendorFields?.DrinksServices) {
    services = vendorSignupData?.bartender_services ?? [];
  }
  if (currentVendorFields?.FoodServices) {
    services = vendorSignupData?.catering_services ?? [];
  }
  if (currentVendorFields?.CleaningCrewServices) {
    services = vendorSignupData?.cleaning_crews_services ?? [];
  }
  if (currentVendorFields?.PhotoServices) {
    services = vendorSignupData?.photographer_services ?? [];
  }
  if (currentVendorFields?.VideoServices) {
    services = vendorSignupData?.videographer_services ?? [];
  }

  if (currentVendorFields?.DJEquipments) {
    equipments = vendorSignupData?.dj_equipment ?? [];
  }
  if (currentVendorFields?.DrinksEquipments) {
    equipments = vendorSignupData?.bartender_equipment ?? [];
  }
  if (currentVendorFields?.PhotoEquipments) {
    equipments = vendorSignupData?.photographer_equipment ?? [];
  }
  if (currentVendorFields?.VideoEquipments) {
    equipments = vendorSignupData?.videographer_equipment ?? [];
  }
  let priceRanges = VendorFieldsData.VendorFieldsData.getFromToPrices(
    selectedVendorByCategory.id,
  );
  return (
    <Scaffold statusBarStyle={{backgroundColor: '#FFFFFF'}}>
      <Headers.BackTile
        containerStyle={[Styles.headerContainerStyle]}
        title={`Filters`}
        onBackPress={() => {
          props.navigation.goBack();
        }}
      />
      <ScrollView style={Styles.scrollViewContainer}>
        <View style={{marginHorizontal: getWp(18)}}>
          {currentVendorFields?.Genres && (
            <Lists.TagsList
              heading={'Genres'}
              containerStyle={{marginVertical: getHp(20)}}
              ListData={vendorSignupData?.genres ?? []}
              ListTile={ListTile.bind(null, 'genres')}
            />
          )}

          {currentVendorFields?.Armed && (
            <Lists.TagsList
              heading={'Armed'}
              containerStyle={{marginVertical: getHp(20)}}
              ListData={vendorSignupData?.armed ?? []}
              ListTile={ListTile.bind(null, 'armed')}
            />
          )}
          {currentVendorFields?.GuardCertification && (
            <Lists.TagsList
              heading={'Guard Certification'}
              containerStyle={{marginVertical: getHp(20)}}
              ListData={vendorSignupData?.guard_certification ?? []}
              ListTile={ListTile.bind(null, 'guardCertification')}
            />
          )}
          {currentVendorFields?.Cuisines && (
            <Lists.TagsList
              heading={'Cuisines'}
              containerStyle={{marginVertical: getHp(20)}}
              ListData={vendorSignupData?.cuisines ?? []}
              ListTile={ListTile.bind(null, 'cuisines')}
            />
          )}

          {services.length > 0 && (
            <Lists.TagsList
              heading={'Services'}
              containerStyle={{marginVertical: getHp(20)}}
              ListData={services}
              ListTile={ListTile.bind(null, 'services')}
            />
          )}
          {equipments.length > 0 && (
            <Lists.TagsList
              heading={'Equipments'}
              containerStyle={{marginVertical: getHp(20)}}
              ListData={equipments}
              ListTile={ListTile.bind(null, 'equipment')}
            />
          )}
        </View>

        {currentVendorFields?.Price && (
          <PriceRangeInput
          priceRangeInfo={currentVendorData.priceTypeString}
            priceRanges={{
              min: priceRanges.fromPrice,
              max: priceRanges.toPrice,
            }}
            containerStyle={{marginTop: getHp(15)}}
            marker2Value={filterVendorModel.filterFields.toPrice}
            marker1Value={filterVendorModel.filterFields.fromPrice}
            onMarkersValueChange={([fromPrice, toPrice]) => {
              console.log('TO_FROM - ', fromPrice, toPrice);
              filterVendorModel.updateFilterFields({
                fromPrice,
                toPrice,
              });
            }}
          />
        )}

        <Lists.NewToggleList
          CustomDivider={<Fragment />}
          heading={'Genders'}
          headingTextStyle={{marginLeft: getWp(18)}}
          containerStyle={{marginVertical: getHp(20)}}
          ListData={GENDERS}
          ListTile={CheckBoxRowListTile.bind(null, 'gender')}
        />
        <View style={{height: getHp(100)}} />
      </ScrollView>
      <View style={[Styles.bottomContainer]}>
        <TouchableOpacity onPress={() => clearFilter()}>
          <Text style={[Styles.clearText]}>Clear</Text>
        </TouchableOpacity>
        <Buttons.LinearGradient
          titleStyle={[Styles.selectButtonTitleStyle]}
          linearGradientStyle={Styles.resultContainer}
          showArrow={false}
          title={
            isFilterModeOn ? `${filteredVendorData.length} Results` : 'Apply'
          }
          onPress={handleOnConfirmFilter}
        />
      </View>
    </Scaffold>
  );
};
FilterVendorScreen.routeName = '/FilterVendorScreen';

export default observer(FilterVendorScreen);
