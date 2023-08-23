import React, {Fragment} from 'react';
import {ScrollView, View, Text} from 'react-native';
import {observer} from 'mobx-react';

import {ListTiles, Lists} from '../../';
import {CenterRoundBlurView, InformationPopupHeader} from '../Frames';
import MobxStore from '../../../mobx';
import Styles from './indexCss';
import {CloseGreyCircularSvg} from '@svg';
import {copyArrayInItself, getHp, getWp} from '../../../app/utils';
import {EventPageWidgets} from '../..';
import NavigationService from '../../../navigation/NavigationService';
import GuestProfile from '../../../Screens/BounceUsers/Profile/GuestProfile';

const NewsFeedPopups = () => {
  const {popupStore, interestedParty} = MobxStore;
  const popupData = popupStore.newsFeedPopups;
  const popupWidgetType = popupData?.popupWidgetType;
  const currentParty = popupData?.currentParty ?? {};
  if (!popupData.visible) {
    return null;
  }
  const onPressInterestedFriends = (guestUser) => {
    popupStore.resetNewsFeedPopups()
    NavigationService.navigate(GuestProfile.routeName, {
      guestUser
    });
  }
  const PopupForDescWithTags = () => {
    return (
      <Fragment>
        <EventPageWidgets.PartyDescriptionWidget
          containerStyle={{
            marginTop: getHp(15),
            paddingHorizontal: getWp(15),
          }}
          currentParty={currentParty}
          textLength={currentParty?.description?.length + 10 ?? 0}
          descriptionTextStyle={{color: '#000'}}
        />
        <EventPageWidgets.SelectedTagsInParty
          disableOnPressOnTags={true}
          widgetType={popupData.widgetType}
          currentParty={currentParty}
          tileContainerStyle={{marginTop: getHp(10), marginRight: getWp(10)}}
          scrollViewProps={{
            horizontal: false,
            contentContainerStyle: {
              flexDirection: 'row',
              flexWrap: 'wrap',
            },
            style: Styles.selectedTagsInPartyStyle,
          }}
        />
      </Fragment>
    );
  };

  const PopupForFriendsWantsToGo = () => {
    return (
      <Lists.NewToggleList
        CustomDivider={<View style={Styles.dividerStyle} />}
        heading={''}
        ListData={currentParty.friendsWantsToGo ?? []}
        ListTile={({item}) => (
          <ListTiles.FriendTile
            onTitlePress={onPressInterestedFriends.bind(null, item)}
            onRightIconPress={onPressInterestedFriends.bind(null, item)}
            onAvatarPress={onPressInterestedFriends.bind(null, item)}
            tileAvatarContainerStyle={{width: '18%'}}
            tileContainerStyle={{paddingHorizontal: getWp(20)}}
            avatar={item.profileImage.filePath}
            title={item.fullName}
            subTitle={item?.city ?? ''}
          />
        )}
      />
    );
  };

  const isForFriendsWantsToGo =
    popupWidgetType == NewsFeedPopups.popupWidgetType.FriendsWantToGo;
  return (
    <CenterRoundBlurView
      centerViewContainerStyle={Styles.centerViewContainerStyle}>
      <InformationPopupHeader
        title={isForFriendsWantsToGo ? 'Interested Friends' : 'Description'}
        descriptionTextStyle={
          isForFriendsWantsToGo ? [Styles.interestedFriendsHeading] : []
        }
        onClosePress={() => popupStore.resetNewsFeedPopups()}
      />
      <View style={{height: '87%'}}>
        <ScrollView bounces={false}>
          {!isForFriendsWantsToGo
            ? PopupForDescWithTags()
            : PopupForFriendsWantsToGo()}
        </ScrollView>
      </View>
    </CenterRoundBlurView>
  );
};

NewsFeedPopups.popupWidgetType = {};
NewsFeedPopups.popupWidgetType.DescWithTags = 'DescWithTags';
NewsFeedPopups.popupWidgetType.FriendsWantToGo = 'FriendsWantToGo';

export default observer(NewsFeedPopups);
