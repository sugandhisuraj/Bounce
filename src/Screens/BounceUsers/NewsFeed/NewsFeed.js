import React, {useEffect, Fragment, useState} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
  Keyboard,
} from 'react-native';
import {observer} from 'mobx-react';
import {createFilter} from 'react-native-search-filter';

import {EventPageWidgets, Scaffold, DismissKeyboard} from '../../../components';
import {Styled, Styles} from './indexCss';
import {useSearchBar} from '../../../app/hooks';
import {LightGreenHeart} from '@svg';
import MobxStore from '../../../mobx';
import {
  ApiClient,
  AppNotificationService,
  DeviceContactService,
  FriendRequestService,
  PartyService,
  VendorService,
  DeeplinkingService
} from '../../../app/services';
import {CenterRoundBlurView} from '../../../components/AppPopups/Frames';
import {getHp, hp, wp} from '../../../app/utils';
import AddInterest from './AddInterest';
import NavigationService from '../../../navigation/NavigationService';
import TicketListScreen from '../../BounceVendors/PlanParty/TicketList';
import SearchEvent from '../SearchEvent';
import SearchEventScreen from '../SearchEvent';
import { SearchEventDTO } from '../../../app/DTO';


const NewsFeed = props => {
  const {navigation} = props;
  const {interestedParty} = MobxStore;
  const {searchQuery, SearchBarComponent} = useSearchBar();
  const [contentHeight, setContentHeight] = useState(0);
  const {user: userinfo} = MobxStore.authStore;
  const loadInitialData = props?.route?.params?.loadInitialData ?? true;
  //console.log('LOAD_INITIAL_NEWSFEED_1 ', loadInitialData);
  const initialRender = async () => {
    try {
      MobxStore.toggleLoader(true);
      await PartyService.getNewsFeed(null, false);
      await PartyService.getTags();

      if (!MobxStore.appStore.isProccessedDeeplinking) {
        FriendRequestService.getAllUser();
        PartyService.getParty();
        VendorService.setFavoritesVendor(false);
        DeviceContactService.checkPermission();
        DeeplinkingService.listenForDeepLink();
        MobxStore.appStore.setIsProcessedDeeplinking(true);
      }
      AppNotificationService.getUserNotification();

      //const link =await  DeeplinkingService.buildLink();
    } catch (error) {
    } finally {
      MobxStore.toggleLoader(false);
    }
  };

  useEffect(() => {
    if (loadInitialData) {
      initialRender();
    }
  }, [loadInitialData]);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      interestedParty.interestedTags.sync(userinfo.user.userInterest);
    });
    return unsubscribe;
  }, [navigation]);

  const newsFeeds = interestedParty.newsFeedsWithTopNewsFeed ?? [];
  let newsFeed = newsFeeds.filter(createFilter(searchQuery, ['title']));

  function find_dimesions(layout) {
    const {x, y, width, height} = layout;
    setContentHeight(height);
  }

  const ticketListScreenEvents = async partyData => {
    try {
      //console.log('PARTY_DATA_EVENTS_1 - ', JSON.stringify(partyData));
      await interestedParty.getPartyAndUpdateInNewsfeed(partyData);
    } catch (error) {}
  };
  const onTicketRangePress = partyData => {
    props.navigation.navigate(TicketListScreen.routeName, {
      screenType: TicketListScreen.screenType.Purchase,
      partyData,
      inCommingRoutes: NavigationService.screenNames.NewsFeed,
      ticketListScreenEvents,
    });
  };

  const onFilterApply = async filter => {
    //console.log('TEST_FILTER - ', JSON.stringify(filter));
    await PartyService.getNewsFeed(filter, true);
  };
  const onPressSearchBar = () => {
    props.navigation.navigate(SearchEventScreen.routeName, {
      screenType: SearchEventScreen.screenTypes.NewsFeed,
      onFilterApply,
    });
  };
  //console.log('NEW_DATE_33- ', new Date('2021-11-11T13:59:11.000Z').getHours());
  return (
    <Scaffold statusBarStyle={{backgroundColor: '#FBFBFB'}}>
      <View style={{flex: 1}} onTouchStart={() => Keyboard.dismiss()}>
        <View style={[Styles.searchContainerView]}>
          {/* <Styled.SearchContainer> */}
          {SearchBarComponent({
            StyledComponent: Styled.SearchContainer,
            containerStyle: Styles.searchContainer,
            placeholder: 'Search',
            isTouchable: true,
            onPress: onPressSearchBar,
          })}
          {/* </Styled.SearchContainer> */}
          <TouchableOpacity
            style={{justifyContent: 'center', alignItems: 'center'}}
            onPress={() => props.navigation.navigate(AddInterest.routeName)}>
            <LightGreenHeart height={getHp(32)} width={getHp(32)} />
            <Text style={Styles.interestCount}>
              {interestedParty.interestedTags.getAllSubTags().length}
            </Text>
          </TouchableOpacity>
        </View>
        <View
          onLayout={event => {
            find_dimesions(event.nativeEvent.layout);
          }}
          style={Styles.newsFeedContainerStyle}>
          <ScrollView bounces={false} pagingEnabled={true}>
            {newsFeed.map((partyData, index) => {
              if (contentHeight == 0) {
                return null;
              }
              return (
                <EventPageWidgets.NewsFeedContainer
                  {...props}
                  widgetType={NavigationService.screenNames.NewsFeed}
                  containerStyle={{
                    height: contentHeight,
                    // borderWidth: 2,
                    // borderColor: 'red',
                  }}
                  partyData={partyData}
                  partyImgCarousalWithPartyDateTimeProps={{
                    onTicketRangePress,
                  }}
                  userActionsTrayProps={{
                    userActionTrayEvents: ticketListScreenEvents,
                    ticketListScreenEvents,
                  }}
                />
              );
            })}
          </ScrollView>
        </View>
      </View>
    </Scaffold>
  );
};

NewsFeed.routeName = '/NewsFeed';
export default observer(NewsFeed);
 
