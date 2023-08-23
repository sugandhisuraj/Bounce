import React, {Fragment, useState} from 'react';
import {Text, View, TouchableOpacity, ScrollView, Linking} from 'react-native';
import {observer} from 'mobx-react';
import {Avatar} from 'react-native-elements';

import {
  AddBlueWhite,
  AddBlue,
  DollarOnlyWhite,
  Webpin,
  BlackMenubar,
  Certified,
  Armed,
  Multilingual,
  Services,
  Cuisines,
  Equipments,
  Pdf,
  BlackSolidShare,
  RedHeart,
  GreyHeart,
  PlusThink,
  BlackShare,
  PlusThinkBlue,
} from '@svg';

import Ratings from '../../../components/RatingStar/Ratings';
import {
  Headers,
  Scaffold,
  CustomText,
  ToggleShowMoreText,
  ImageCarousel,
  LeftRightTray,
  Buttons,
} from '@components';
import PageStyles from './indexCss';
import {
  getHp,
  getWp,
  FONTSIZE,
  FONTFAMILY,
  filterArrOnDate,
} from '../../../app/utils';
import {VendorFieldsData} from '../../../app/constants';
import {AppNotificationService, VendorService} from '../../../app/services';
import ToastUtil from '../../../app/constants/toast';
import MobxStore from '../../../mobx';
import VendorAmenities from '../VendorAmenities';
import AvgRating from '../AvgRating';
import VendorPriceInfo from '../VendorPriceInfo';
import {Lists} from '../..';

const VendorProfile = props => {
  const [getState, setState] = useState(0);
  const {uiStore} = MobxStore;
  const {currentVendor} = props;
  const vendorCategoryFieldsData =
    VendorFieldsData.VendorFieldsData.getCategory(currentVendor.vendorType);
  const {
    about,
    fullName,
    city,
    language,
    username,
    vendor = {},
    vendorCategoryName = {},
    profileImage,
    menu,
    gallery,
    vendorType,
  } = currentVendor;
  const {website, hourlyRate, inventory} = vendor;
  let styles = PageStyles(uiStore.theme);

  const handleCarousel = () => {
    return (
      <ImageCarousel
        addMoreIcon={false}
        onPress={() => {}}
        pagination
        imageArray={gallery.length == 0 ? [] : gallery}
        onSnapToItem={index => setState(index)}
        state={getState}
      />
    );
  };
  const PRhandleCarousel = () => {
    if (inventory != null && 'length' in inventory) {
      return (
        <ImageCarousel
          //onPress={onlyPartyRentalImage}
          imageBottomLeftText
          imageBottomRightRate
          pagination
          imageArray={inventory.length == 0 ? [] : inventory}
          onSnapToItem={index => setState(index)}
          state={getState}
        />
      );
    }
    return null;
  };
  return (
    <View>
      <View style={styles.subContainer}>
        <View style={{paddingHorizontal: 10}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 5,
            }}>
            {profileImage != null ? (
              <Avatar
                source={{uri: `${profileImage?.filePath}`}}
                size={getHp(80)}
                rounded
              />
            ) : null}

            <View
              style={{
                paddingLeft: 15,
                minWidth: '55%',
                maxWidth: '65%',
              }}>
              {fullName !== null ? (
                <Text style={[styles.fullName, {marginBottom: 0}]}>
                  {fullName}
                </Text>
              ) : null}
              {city !== null ? (
                <Text
                  style={[
                    styles.fullName,
                    {
                      opacity: 0.7,
                      fontFamily: 'AvenirNext-Regular',
                      color: uiStore.theme.colors.primaryText1,
                      fontSize: FONTSIZE.Text14,
                      marginTop: 4,
                    },
                  ]}>
                  {city.split(',', 1)}
                </Text>
              ) : null}
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginVertical: getHp(15),
              marginLeft: getWp(5),
            }}>
            <AvgRating ratingText={currentVendor.averageRating}/>
            <VendorPriceInfo
              vendor={currentVendor}
              containerStyle={{marginLeft: getWp(15)}}
            />
          </View>

          {website != null ? (
            <View style={styles.websiteView}>
              <Webpin height={getHp(21)} width={getWp(23)} />
              <Text
                onPress={() => Linking.openURL(`https://${website}`)}
                style={styles.webText}>
                {website}
              </Text>
            </View>
          ) : null}

          {/* <View
              style={[styles.partition, {marginTop: 20, marginBottom: 0}]}
            /> */}

          {about != null ? (
            <ToggleShowMoreText
              containerStyle={{marginTop: getHp(20)}}
              text={about}
              textLength={80}
              descriptionTextStyle={{
                fontFamily: FONTFAMILY.AvenirNextRegular,
                fontSize: FONTSIZE.Text16,
                color: '#000',
                letterSpacing: 0.2,
              }}
            />
          ) : null}

          <View style={[styles.partition]} />
        </View>

        {gallery && gallery?.length > 0 && (
          <>
            <View style={styles.prView}>
              <Text
                style={[
                  styles.mediaText,
                  {
                    fontSize: FONTSIZE.Text16,
                    fontFamily: 'AvenirNext-Medium',
                    color: '#000',
                    marginBottom: getHp(10),
                  },
                ]}>
                {'Media'}
              </Text>
            </View>
            {handleCarousel()}
          </>
        )}

        {vendorCategoryFieldsData?.isEventRentals && inventory?.length > 0 && (
          <>
            <View style={styles.prView}>
              <Text
                style={[
                  styles.mediaText,
                  {
                    fontSize: FONTSIZE.Text16,
                    fontFamily: 'AvenirNext-Medium',
                    color: '#000',
                    marginBottom: getHp(10),
                  },
                ]}>
                {'Media'}
              </Text>
              {/* <TouchableOpacity onPress={onlyPartyRentalImage} >
                  <View style={styles.onlyFlex}>
                    <AddBlueWhite height={20} width={20} />
                    <Text style={styles.addButton}>{"Add"}</Text>
                  </View>
                </TouchableOpacity> */}
            </View>
            {PRhandleCarousel()}
          </>
        )}

        {(vendorCategoryFieldsData?.isDrinks ||
          vendorCategoryFieldsData?.isFood ||
          vendorCategoryFieldsData?.isEventRentals) &&
          menu != null && (
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(menu?.filePath);
              }}
              style={[styles.addMediaButton, styles.shadowStyle]}>
              <Text
                style={[
                  styles.mediaText,
                  {
                    letterSpacing: 0.4,
                    color: '#1FAEF7',
                    fontSize: FONTSIZE.Text20,
                    fontFamily: 'AvenirNext-Medium',
                  },
                ]}>
                {vendorCategoryFieldsData?.isEventRentals
                  ? 'View All Inventory'
                  : 'View Menu'}
              </Text>
            </TouchableOpacity>
          )}
      </View>
      <VendorAmenities vendorData={currentVendor} />
      {currentVendor?.rating?.length > 0 && (
        <Lists.HostVendorRating
          ratings={filterArrOnDate(currentVendor.rating.slice())}
        />
      )}

      <View style={{height: getHp(100)}} />
    </View>
  );
};

export default VendorProfile;
