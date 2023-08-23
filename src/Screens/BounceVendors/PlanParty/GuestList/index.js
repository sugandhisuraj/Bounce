import React, {Fragment, useEffect, useMemo, useState} from 'react';
import {Text, ScrollView, View, TouchableOpacity} from 'react-native';
import {
  Scaffold,
  Header,
  Buttons,
  ContactList,
  ListTiles,
  Seperator,
  AppTabs,
  Lists,
  Headers,
  ToolTip,
} from '../../../../components';
import {Menu} from 'react-native-paper';

import styles from './indexCss';
import {getHp, getWp, removeDuplicateFromArr} from '../../../../app/utils';
import {useSearchBar, useSectionsSelection} from '../../../../app/hooks';
import MobxStore from '../../../../mobx';
import HostViewModel from '../HostView/HostViewModel';
import {observer} from 'mobx-react';
import GuestListModal from './GuestListModal';
import {
  CohostSvg,
  SelectedBlueTick,
  UserArrivedInPartySvg,
  HostRoundSvg,
  CohostRoundSvg,
} from '@svg';
import GuestProfile from '../../../BounceUsers/Profile/GuestProfile';
const GuestListScreen = props => {
  const [attendingSelectedTab, AttendingRenderSection, AttendingSections] =
    useSectionsSelection(null);
  const hostViewInstance = HostViewModel.instance();
  const guestListInstance = GuestListModal.instance();
  const {
    searchQuery,
    SearchBarComponent,
    onChangeText: onChangeSearchText,
  } = useSearchBar();

  console.log('SEARCH_QUERY = ', searchQuery);
  const onNavigateToGuestProfile = guestUser => {
    return props.navigation.navigate(GuestProfile.routeName, {
      guestUser,
    });
  };
  const AttendingListTiles = (tabType, {item}) => {
    let tileStyles = {
      tileContainerStyle: {paddingHorizontal: getWp(10)},
    };
    let friend = {...item, customMode: 'INTERESTED'};
    if (tabType == GuestListScreen.tabTypes.Hosting) {
      friend = {...item.host, customMode: 'HOST'};
      let isThisHost = guestListInstance.isThisHostOfCurrentParty(item.host);
      let ToolTipSvg = isThisHost ? <HostRoundSvg /> : <CohostRoundSvg />;
      return (
        <ListTiles.BounceFriendRequestStatus
          //tileType={ListTiles.BounceFriendRequestStatus.tileType.Icon}
          friend={friend}
          onTitlePress={onNavigateToGuestProfile} 
          friendTileProp={{
            ...tileStyles,
            onAvatarPress: () => onNavigateToGuestProfile(friend),
            avatarToolTipContainerStyle: {left: isThisHost ? -4 : -2},
            avatarTooltipComponent: () => {
              return (
                <ToolTip
                  menuContentStyle={[
                    {marginLeft: getWp(20), marginTop: getHp(20)},
                  ]}
                  menuAnchor={ToolTipSvg}>
                  <Text>{isThisHost ? 'Host' : 'Cohost'}</Text>
                </ToolTip>
              );
            },
          }}
        />
      );
    }
    return (
      <ListTiles.BounceFriendRequestStatus
        //tileType={ListTiles.BounceFriendRequestStatus.tileType.Icon}
        friend={friend}
        onTitlePress={onNavigateToGuestProfile}
        friendTileProp={{
          onAvatarPress: () => onNavigateToGuestProfile(friend),
        }}
      />
    );
  };
  const FeaturingTab = () => {
    return (
      <View style={{flex: 1}}>
        {SearchBarComponent({
          placeholder: 'Search',
          containerStyle: styles.searchBarStyle,
        })}
        <Lists.FeaturingVendorList
          {...props}
          containerStyle={styles.vendorListContainer}
          vendors={hostViewInstance?.currentParty?.hiredVendors ?? []}
        />
      </View>
    );
  };
  const AttendingTab = () => {
    let ListData = [
      ...guestListInstance.getAttendingGuest(),
      ...guestListInstance.getInterestedGuest(),
      ...guestListInstance.getCantGoGuest(),
    ];
    console.log('ATTENDING = ', attendingSelectedTab);
    if (attendingSelectedTab == 0) {
      ListData = guestListInstance.getAttendingGuest();
    }
    if (attendingSelectedTab == 1) {
      ListData = guestListInstance.getInterestedGuest();
    }
    if (attendingSelectedTab == 2) {
      ListData = guestListInstance.getCantGoGuest();
    }
    ListData = removeDuplicateFromArr(ListData, 'id');
    return (
      <View style={{flex: 1}}>
        {SearchBarComponent({
          placeholder: 'Search',
          containerStyle: styles.searchBarStyle,
        })}
        {AttendingRenderSection({
          isToggleMode: true,
          initialTab: AttendingSections.forGuestList[0],
          tabs: AttendingSections.forGuestList,
          tabContainerStyle: styles.attendingSectionStyle,
        })}

        <Lists.NewToggleList
          searchQuery={searchQuery}
          containerStyle={{paddingHorizontal: getHp(15), height: '90%'}}
          heading={''}
          ListData={ListData}
          ListTile={AttendingListTiles.bind(
            null,
            GuestListScreen.tabTypes.Attending,
          )}
          searchFilter={Lists.NewToggleList.SEARCH_FILTERS.FRIEND}
        />
      </View>
    );
  };

  const HostingTab = () => {
    ListData = guestListInstance.getCohosts().allHosts;
    console.log('ALL_HOST_DATA - ', JSON.stringify(ListData));
    return (
      <View style={{flex: 1}}>
        {SearchBarComponent({
          placeholder: 'Search',
          containerStyle: styles.searchBarStyle,
        })}

        <Lists.NewToggleList
          flatListProps={{
            bounces: false,
          }}
          searchQuery={searchQuery}
          containerStyle={{height: '86%', paddingHorizontal: getWp(5)}}
          heading={''}
          ListData={ListData}
          ListTile={AttendingListTiles.bind(
            null,
            GuestListScreen.tabTypes.Hosting,
          )}
          // flatListStyle={{
          //   paddingVertical: getHp(10),
          // }}
          dividerStyle={{marginVertical: getHp(15)}}
          searchFilter={Lists.NewToggleList.SEARCH_FILTERS.FRIEND}
        />
      </View>
    );
  };
  const TabConfig = [
    {
      heading: 'Hosting',
      Component: HostingTab,
      shouldRender: true,
    },
    {
      heading: 'Attending',
      Component: AttendingTab,
      shouldRender: true,
    },
    {
      heading: 'Featuring',
      Component: FeaturingTab,
      shouldRender: true,
    },
  ];
  console.log(
    'CURRENT_PART_CHCKSDF_FIN - ',
    JSON.stringify(guestListInstance._currentParty),
  );
  console.log('DONT_REMOVE_IT', guestListInstance.getInterestedGuest());
  return (
    <Scaffold
      statusBarStyle={{backgroundColor: '#FBFBFB'}}
      contentContainerStyle={{backgroundColor: '#FBFBFB'}}>
      <Headers.BackTile
        title={`${hostViewInstance.currentParty.title}`}
        onBackPress={() => {
          props.navigation.goBack();
        }}
      />
      <View style={{flex: 1}}>
        <AppTabs.CommonTabs
          containerStyle={{marginTop: getHp(10)}}
          onChangeTab={() => onChangeSearchText('')}
          tabData={TabConfig}
          polygonConfig={[getWp(40), getWp(180), getWp(320)]}
        />
      </View>
    </Scaffold>
  );
};
GuestListScreen.tabTypes = {};
GuestListScreen.tabTypes.Hosting = 'Hosting';
GuestListScreen.tabTypes.Attending = 'Attending';
GuestListScreen.routeName = '/GuestListScreen';

export default observer(GuestListScreen);
