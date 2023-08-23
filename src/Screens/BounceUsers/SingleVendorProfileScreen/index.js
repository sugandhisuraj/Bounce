import React, {useEffect, useState} from 'react';
import {Text, View, ScrollView} from 'react-native';
import {observer} from 'mobx-react';

import {Scaffold, Headers, VendorProfileWidgets} from '@components';
import SingleVendorProfileScreenModel from './Model';
import {VendorService} from '../../../app/services';
import ToastUtil from '../../../app/constants/toast';
import MobxStore from '../../../mobx';
import UserToVendorRatingScreen from '../UserToVendorRatingScreen';

const SingleVendorProfileScreen = props => {
  const model = SingleVendorProfileScreenModel.getInstance();
  const {vendorRequest} = props.route.params;
  const vendorId = vendorRequest?.vendor?.id;
  const partyId = vendorRequest?.party?.id;
  useEffect(() => {
    fetchVendorByIdAndPartyId(true, true);
  }, []);

  const fetchVendorByIdAndPartyId = async (
    resetPreviousData = false,
    showLoader = false,
  ) => {
    try {
      if (showLoader) {
        MobxStore.toggleLoader(true);
      }
      if (resetPreviousData) {
        model.resetVendorData();
      }

      const res = await VendorService.getVendorByIdAndPartyId(
        vendorId,
        partyId,
      );
      model.onVendorDataLoaded(res);
    } catch (error) {
      MobxStore.toggleLoader(false);
      ToastUtil('Something went wrong! Try Again');
      return props.navigation.goBack();
    } finally {
      MobxStore.toggleLoader(false);
    }
  };

  const onRatingPress = r => {
    console.log('Rating_Press - ', r);
    props.navigation.navigate(UserToVendorRatingScreen.routeName, {
      vendor: model.vendorData,
      party: vendorRequest?.party,
      ratingSelected: r,
      onSuccessRating: () => {
        fetchVendorByIdAndPartyId(false, true);
      },
    });
  };
  const onToggleFav = async httpToggleFav => {
    try {
      await httpToggleFav();
      console.log('EHRE_CONE');
      fetchVendorByIdAndPartyId(false, true);
    } catch (error) {}
  };
  if (model.loading) {
    return null;
  }
  const currentVendor = model.vendorData;
  const canGiveRatingAndReview = model.getVendorRatingReviewStatus();
  console.log(
    'SINGLE_CURRENT_VENDOR - ',
    JSON.stringify(currentVendor),
    canGiveRatingAndReview,
  );
  return (
    <Scaffold statusBarStyle={{backgroundColor: '#FFFFFF'}}>
      <Headers.BackTile
        title={`${currentVendor.username}`}
        onBackPress={() => props.navigation.goBack()}
        containerStyle={{backgroundColor: '#FFF'}}
      />
      <ScrollView style={{backgroundColor: '#FBFBFB'}}>
        <VendorProfileWidgets.VendorProfileScaffold
          currentVendor={currentVendor}
        />
      </ScrollView>
      {canGiveRatingAndReview && (
        <VendorProfileWidgets.GiveVendorRating
          partyTitle={vendorRequest?.party?.title ?? ''}
          onRatingPress={onRatingPress}
        />
      )}
      {/* <HostVendorProfileBottomTray
        disabledRequest={true}
        onButtonsPress={() => fetchVendorByIdAndPartyId()}
        currentVendor={currentVendor}
      /> */}
      <VendorProfileWidgets.BottomHireVendorRequestTray
        vendorData={currentVendor}
        isFavoriteVendor={currentVendor.isFavourite}
        onToggleFav={onToggleFav}
        widgetType={
          VendorProfileWidgets.BottomHireVendorRequestTray.widgetType.SingleVendorProfile
        }
      />
    </Scaffold>
  );
};
SingleVendorProfileScreen.routeName = '/SingleVendorProfileScreen';
export default observer(SingleVendorProfileScreen);
