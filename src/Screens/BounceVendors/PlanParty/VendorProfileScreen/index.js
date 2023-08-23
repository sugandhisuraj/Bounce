import React, {useState} from 'react';
import {ScrollView} from 'react-native';
import {observer} from 'mobx-react';

import {ConfirmationPopups} from '../../../../components/AppPopups';
import {
  Headers,
  Scaffold,
  CustomText,
  ToggleShowMoreText,
  ImageCarousel,
  LeftRightTray,
  Buttons,
  VendorAmenities,
  Lists,
  VendorProfileWidgets,
  RatingComponent,
} from '../../../../components';
import HireVendorStrore from '../ChooseVendor/HIreVendorStore';
import FilterVendorModel from '../FilterVendorScreen/FilterVendorModel';
import PageStyles from './indexCss';
import MobxStore from '../../../../mobx';
import {
  getHp,
  getWp,
  FONTSIZE,
  FONTFAMILY,
  filterArrOnDate,
  wait,
} from '../../../../app/utils';
import {VendorFieldsData} from '../../../../app/constants';
import HostViewModel from '../HostView/HostViewModel';
import {AppNotificationService, VendorService} from '../../../../app/services';
import ToastUtil from '../../../../app/constants/toast';
import {HostHireVendorPopups} from '../../../../components/AppPopups';
import UserToVendorRatingScreen from '../../../BounceUsers/UserToVendorRatingScreen';
const VendorProfileScreen = props => {
  const {listMode} = props.route.params;
  const hostViewModel = HostViewModel.instance();
  const [getState, setState] = useState(0);
  const {uiStore} = MobxStore;
  const hireVendorStore = HireVendorStrore.getInstance();
  const filterVendorModel = FilterVendorModel.getInstance();
  let allSelectedVendors = hireVendorStore.selectedVendors.data();
  //let allFavoriteVendor = hireVendorStore.getFavoriteVendors();
  let allFavoriteVendor = hireVendorStore.favoriteVendors;
  let requestedOrHiredVendors = hireVendorStore.requestedOrHiredVendors;
  let currentVendorIndex = hireVendorStore.currentVendorIndex; //setCurrentVendorIndex

  let selectedVendorByCategory = hireVendorStore.selectedVendorByCategory;

  let allVendors = selectedVendorByCategory.vendor;
  if (listMode == VendorProfileScreen.ListMode.SelectedVendors) {
    allVendors = allSelectedVendors;
  } else if (listMode == VendorProfileScreen.ListMode.FavoriteVendors) {
    allVendors = allFavoriteVendor;
  } else if (filterVendorModel.isFilterModeOn) {
    allVendors = filterVendorModel.filteredVendorData;
  }

  let currentVendor = allVendors[currentVendorIndex];
  console.log('EV_! - ', JSON.stringify(currentVendor));
  const canGiveRatingAndReview = hireVendorStore.getVendorRatingReviewStatus(
    currentVendor.id,
  );

  let styles = PageStyles(uiStore.theme);

  const isThisFavVendor = hireVendorStore.isThisVendorFavorite(
    currentVendor.id,
  );
  const currentHiredRequestVendorDetails =
    hireVendorStore.isThisVendorHiredOrRequested(currentVendor);
  const isThisVendorRequested =
    currentHiredRequestVendorDetails?.isRequested ?? false;
  const isThisVendorHired = currentHiredRequestVendorDetails?.isHired ?? false;

  const onConfirmRequestPress = async (showPopup = true) => {
    try {
      if (isThisVendorRequested && showPopup) {
        return MobxStore.popupStore.setHostHireVendorCancelUnHirePopup({
          popupType: HostHireVendorPopups.popupType.CancelRequest,
          visible: true,
          vendorRequest: {vendor: currentVendor},
          onCancelRequest: onConfirmRequestPress.bind(null, false),
        });
      } else if (isThisVendorRequested) {
        MobxStore.toggleLoader(true);
        await VendorService.cancelHireRequestsByHost(
          currentVendor.id,
          hostViewModel.currentParty.id,
        );
      } else {
        MobxStore.toggleLoader(true);
        await VendorService.hireVendorRequestByHost(
          [currentVendor.id],
          hostViewModel.currentParty.id,
        );
      }
      await VendorService.setHiredorRequestedVendors();
      AppNotificationService.getUserNotification();
      ToastUtil('Request Successfully Send to Vendors', {
        duration: 2000,
      });
    } catch (err) {
      let msg =
        err?.message ??
        err?.response?.data?.message ??
        'Something went wrong! Try Again';
      ToastUtil(msg);
    } finally {
      MobxStore.toggleLoader(false);
    }
  };

  const onCancelHire = async (showPopup = true) => {
    try {
      if (showPopup) {
        MobxStore.popupStore.setHostHireVendorCancelUnHirePopup({
          popupType: HostHireVendorPopups.popupType.CancelHire,
          visible: true,
          vendorRequest: {vendor: currentVendor},
          onCancelHire: onCancelHire.bind(null, false),
        });
        return;
      }
      MobxStore.toggleLoader(true);
      const requestRes = await VendorService.cancelHireVendorByHost(
        currentVendor.id,
        hostViewModel.currentParty.id,
      );
      await VendorService.setHiredorRequestedVendors();
      AppNotificationService.getUserNotification();
    } catch (err) {
      let msg =
        err?.message ??
        err?.response?.data?.message ??
        'Something went wrong! Try Again';
      ToastUtil(msg);
    } finally {
      MobxStore.toggleLoader(false);
    }
  };
  const onRatingPress = r => {
    console.log('Rating_Press - ', r);
    props.navigation.navigate(UserToVendorRatingScreen.routeName, {
      vendor: currentVendor,
      party: hostViewModel.currentParty,
      ratingSelected: r,
      onSuccessRating: () => {
        VendorService.setVendorByCategory();
        // VendorService.setFavoritesVendor();
        VendorService.setRatingAndReviewVendors();
      },
    });
  };
  return (
    <Scaffold statusBarStyle={{backgroundColor: '#FFFFFF'}}>
      <Headers.BackTile
        containerStyle={{backgroundColor: '#FFF'}}
        title={`${currentVendor.username}`}
        onBackPress={() => props.navigation.goBack()}
      />
      <ScrollView style={{backgroundColor: '#FBFBFB'}}>
        <VendorProfileWidgets.VendorProfileScaffold
          currentVendor={currentVendor}
        />
      </ScrollView>
      {/* isThisVendorHired */}
      {isThisVendorHired && (
        <Buttons.PrimaryButton
          onPress={onCancelHire}
          containerStyle={[styles.cancelHireContainerStyle]}
          title={'Cancel Hire'}
          titleStyle={[styles.cancelHireTitleStyle]}
        />
      )}
      {canGiveRatingAndReview && (
        <VendorProfileWidgets.GiveVendorRating
          partyTitle={hostViewModel?.currentParty?.title ?? ''}
          onRatingPress={onRatingPress}
        />
      )}
      <LeftRightTray
        containerStyle={{marginBottom: getHp(10)}}
        onRightPress={() => {
          if (currentVendorIndex == allVendors.length - 1) {
            return;
          }
          hireVendorStore.setCurrentVendorIndex(++currentVendorIndex);
        }}
        onLeftPress={() => {
          if (currentVendorIndex == 0) {
            return;
          }
          hireVendorStore.setCurrentVendorIndex(--currentVendorIndex);
        }}
        total={allVendors.length}
        current={currentVendorIndex + 1}
      />
      <VendorProfileWidgets.BottomHireVendorRequestTray
        onSelectVendor={() => {
          if (
            hireVendorStore.selectedVendors.isDataExist(currentVendor).exist
          ) {
            return MobxStore.popupStore.setConfirmationPopup({
              visible: true,
              type: ConfirmationPopups.popupType.HireVendorUnselectVendor,
              onSuccess: async () => {
                if (listMode == VendorProfileScreen.ListMode.SelectedVendors) {
                  props.navigation.goBack();
                  await wait(1000);
                }

                hireVendorStore.selectedVendors.toggle(currentVendor);
              },
            });
          }
          hireVendorStore.selectedVendors.toggle(currentVendor);
        }}
        isVendorSelected={
          hireVendorStore.selectedVendors.isDataExist(currentVendor).exist
        }
        vendorData={currentVendor}
        isFavoriteVendor={isThisFavVendor}
        onToggleFav={httpToggleFav => {
          httpToggleFav();
          if (listMode == VendorProfileScreen.ListMode.FavoriteVendors) {
            return props.navigation.goBack();
          }
        }}
        widgetType={
          VendorProfileWidgets.BottomHireVendorRequestTray.widgetType
            .AllVendorProfile
        }
      />
    </Scaffold>
  );
};

VendorProfileScreen.routeName = '/VendorProfileScreen';
VendorProfileScreen.ListMode = {};
VendorProfileScreen.ListMode.SelectedVendors = 'SelectedVendors';
VendorProfileScreen.ListMode.FavoriteVendors = 'FavoriteVendors';
export default observer(VendorProfileScreen);

{
  /* <View style={styles.bottomContainer}>
        <Buttons.VerticalIcon
          withShadow={true}
          containerStyle={{height: getHp(70)}}
          highlightedColor={isThisFavVendor ? 'rgba(255, 46, 0, 0.2)' : null}
          Icon={(() => {
            return isThisFavVendor ? (
              <RedHeart height={27} width={30} />
            ) : (
              <GreyHeart height={27} width={30} />
            );
          })()}
          title={(() => {
            return isThisFavVendor ? 'Favorited' : 'Favorite';
          })()}
          onPress={() => {
            props.route.params.onVendorFavouritePress(currentVendor);
            if (listMode == VendorProfileScreen.ListMode.FavoriteVendors) {
              return props.navigation.goBack();
            }
          }}
        />

        <Buttons.VerticalIcon
          withShadow={true}
          containerStyle={[
            {height: getHp(70)},
            isThisVendorRequested && {
              backgroundColor: 'rgba(31, 174, 247, 0.2)',
            },
          ]}
          Icon={
            isThisVendorRequested ? (
              <PlusThinkBlue height={getHp(35)} width={getHp(35)} />
            ) : (
              <PlusThink height={getHp(24)} width={getHp(24)} />
            )
          }
          title={isThisVendorRequested ? 'Requested' : 'Request'}
          onPress={onConfirmRequestPress}
        />

        <Buttons.VerticalIcon
          withShadow={true}
          containerStyle={{height: getHp(70)}}
          Icon={<BlackShare height={25} width={27} />}
          title={'Share'}
        />
      </View> */
}
