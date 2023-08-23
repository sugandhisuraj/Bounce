import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Header, Scaffold} from '@components';
import {getData} from '../../../FetchServices';
import {FONTSIZE, getHp, getWp} from '@utils';
import {useDispatch} from 'react-redux';
import {fetchVendorData} from '../../../reducer/mainexpensecategory';
import {
  Food,
  Security,
  Bartender,
  DjMusic,
  Cleaning,
  PartyRentals,
  Videographer,
} from '@svg';
import Spinner from 'react-native-loading-spinner-overlay';
import {SvgUri} from 'react-native-svg';
import {ApiClient, AuthService} from '../../../app/services';
import VendorSignup from './VendorSignup';
import {Toast} from '@constants';
import VendorSignupStore from './VendorSignupStore';
import {observer} from 'mobx-react';
import MobxStore from '../../../mobx';

function VendorCategory(props) {
  const vendorSignupStore = VendorSignupStore.getInstance();
  const vendorBusinessCategory = MobxStore.appStore?.vendorSignupData?.vendor_category ?? [];
  useEffect(() => {
    MobxStore.appStore.fetchVendorSignupData();
  }, []);

  const renderItem = ({item, index}) => { 
    return (
      <TouchableOpacity
        key={index}
        onPress={() => {
          vendorSignupStore.setVendorBusinessCategory(item);
          //dispatch(fetchVendorData(['VENDOR_TYPE', item.vendorCategory]));
          props.navigation.navigate(VendorSignup.routeName);
        }}>
        <View style={styles.iconStyle}>
          {item.categoryImage != undefined && (
            <SvgUri width={'40'} height={'40'} uri={item.categoryImage} />
          )}
          <Text style={styles.categoryStyle}>{item.vendorCategory}</Text>
        </View>

        {!(index + 1 == vendorBusinessCategory.length) && (
          <View style={{borderWidth: 0.5, borderColor: '#DDDDDD'}} />
        )}
      </TouchableOpacity>
    );
  };
  console.log("ALL_VE_CAT - ", JSON.stringify(vendorBusinessCategory));
  return (
    <Scaffold statusBarStyle={{backgroundColor: '#F4F4F4'}}>
      <View style={styles.container}>
        <ScrollView bounces={false} alwaysBounceVertical={false}>
          <Header
            headerBackColor={{
              paddingBottom: getHp(20),
              backgroundColor: '#F4F4F4',
            }}
            back
            headerStyleProp={{fontFamily: 'AvenirNext-DemiBold'}}
            headerTitle={'Select Business'}
            onPress={() => props.navigation.goBack()}
          />
          <FlatList
            bounces={false}
            data={vendorBusinessCategory}
            renderItem={renderItem}
            keyExtractor={index => index}
          />
        </ScrollView>
      </View>
    </Scaffold>
  );
}
VendorCategory.routeName = '/VendorCategory';
const styles = StyleSheet.create({
  categoryStyle: {
    color: '#000',
    fontSize: FONTSIZE.Text18,
    marginLeft: getHp(40),
    fontFamily: 'AvenirNext-Regular',
    marginVertical: getHp(20),
  },
  iconStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: getHp(20),
    paddingVertical: 5,
    backgroundColor: '#FBFBFB',
    marginVertical: 1,
  },
  container: {
    backgroundColor: '#FBFBFB',
    flex: 1,
  },
});

export default observer(VendorCategory);
