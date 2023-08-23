import React, {useMemo, useState, Fragment} from 'react';
import {View, Text, ScrollView, TouchableOpacity, Platform} from 'react-native';
import {observer} from 'mobx-react';
import {createFilter} from 'react-native-search-filter';

import {GreenHeart, BounceSmallLogo, SvgUpArrowBlue} from '@svg';
import {
  Scaffold,
  EventPageWidgets,
  Buttons,
  ImagesStack,
} from '../../../components';
import MobxStore from '../../../mobx';
import {useSearchBar} from '../../../app/hooks';
import Styles from './indexCss';
import AddInterest from '../NewsFeed/AddInterest';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {getHp, hp, getWp} from '../../../app/utils';
import ToastUtil from '../../../app/constants/toast';
import MyBounceWithFriends from '../MyBounceWithFriends';
import ScreenPopups from './Popups';
import NavigationService from '../../../navigation/NavigationService';
import TicketListScreen from '../../BounceVendors/PlanParty/TicketList';

AntDesign.loadFont();

const MyBounceWithFriendsParties = props => {
  const [contentHeight, setContentHeight] = useState(0);
  const [commonInterestsPopup, setCommonInterestsPopup] = useState(false);
  const {searchQuery, SearchBarComponent} = useSearchBar();
  const {bounceWithFriendsStore} = MobxStore;
  let selectedBounceUsers = bounceWithFriendsStore.selectedBounceUsers.data();
  console.log(
    'TEST_FOR_BOUNCE_WITH_FRIEND_PARTIES_2 - ',
    JSON.stringify(bounceWithFriendsStore.getCommonParties()),
  );
  let selectedBounceUsersAvatars = [];
  selectedBounceUsers.map(user => {
    if (user?.profileImage?.filePath) {
      selectedBounceUsersAvatars.push(user?.profileImage?.filePath);
    }
  });

  const ticketListScreenEvents = async partyData => {
    try {
      console.log('PARTY_DATA_EVENTS_BWF_1 - ', JSON.stringify(partyData));
      await bounceWithFriendsStore.getPartyAndUpdateInBWF(partyData);
    } catch (error) {}
  };
  const onTicketRangePress = partyData => {
    props.navigation.navigate(TicketListScreen.routeName, {
      screenType: TicketListScreen.screenType.Purchase,
      partyData,
      inCommingRoutes: NavigationService.screenNames.BWF,
      ticketListScreenEvents,
    });
  };
  const BackSearchHeader = useMemo(() => {
    return (
      <View style={[Styles.searchContainerView]}>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <AntDesign name="left" color={'#000'} size={getHp(25)} />
        </TouchableOpacity>
        {SearchBarComponent({
          containerStyle: Styles.searchContainer,
          placeholder: 'Search',
          widthShadow: true,
        })}
        <TouchableOpacity onPress={() => setCommonInterestsPopup(i => true)}>
          <GreenHeart />
        </TouchableOpacity>
      </View>
    );
  }, [searchQuery]);
  function find_dimesions(layout) {
    const {x, y, width, height} = layout;
    setContentHeight(height);
  }
  let bwfData = bounceWithFriendsStore.getCommonParties();
  let bwfFinalData = bwfData.filter(createFilter(searchQuery, ['title']));
  return (
    <Fragment>
      <ScreenPopups
        commonInterestsPopup={commonInterestsPopup}
        setCommonInterestsPopup={setCommonInterestsPopup}
      />
      <Scaffold
        contentContainerStyle={{backgroundColor: '#FFF'}}
        statusBarStyle={{backgroundColor: '#FBFBFB'}}>
        {BackSearchHeader}
        <View
          onLayout={event => {
            find_dimesions(event.nativeEvent.layout);
          }}
          style={Styles.newsFeedContainerStyle}>
          <ScrollView bounces={false} pagingEnabled={true}>
            {bwfFinalData.map((partyData, index) => {
              if (contentHeight == 0) {
                return null;
              }
              return (
                <EventPageWidgets.NewsFeedContainer
                  {...props}
                  widgetType={NavigationService.screenNames.BWF}
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
        <View style={[Styles.bottomTray]}>
          <Buttons.SvgButton
            containerStyle={{
              height: getHp(45),
              width: '48%',
            }}
            Svg={BounceSmallLogo}
            SvgStyle={{
              preserveAspectRatio: 'none',
              height: getHp(45),
              width: getWp(45),
            }}
            onPress={() => {
              props.navigation.navigate(MyBounceWithFriends.routeName, {
                persistBWFRecords:
                  props.route.params?.persistBWFRecords ?? false,
              });
            }}
            title={'Add Friends'}
          />
          <View style={Styles.leftBottomTray}>
            <ImagesStack
              lastStackWithCountContainerStyle={{
                height: getHp(33),
                width: getHp(33),
              }}
              numOfStacks={4}
              lastStackWithCount={
                selectedBounceUsersAvatars.length > 6
                  ? selectedBounceUsersAvatars.length
                  : null
              }
              images={selectedBounceUsersAvatars}
            />
            <TouchableOpacity onPress={() => {
              //ToastUtil('Under Development')
            }}>
              <SvgUpArrowBlue />
            </TouchableOpacity>
          </View>
        </View>
      </Scaffold>
    </Fragment>
  );
};

MyBounceWithFriendsParties.routeName = '/MyBounceWithFriendsParties';

export default observer(MyBounceWithFriendsParties);

/*

 <ScrollView
          bounces={false}
          pagingEnabled={true}
          style={{backgroundColor: '#FBFBFB'}}>
          {bwfFinalData.map((partyData, index) => {
            return (
              <View style={{height: hp(100) - getHp(190)}}>
                <EventPageWidgets.NewsFeedContainer
                  {...props}
                  // containerStyle={{height: hp(5000)}}
                  partyData={partyData}
                  widgetType={EventPageWidgets.NewsFeedContainer.widgetType.BWF}
                />
              </View>
            );
          })}
        </ScrollView>
        */
