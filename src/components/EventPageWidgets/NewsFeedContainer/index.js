import React, {Fragment} from 'react';
import {Text, View, ScrollView, ImageBackground} from 'react-native';

import UserActionsTray from '../UserActionsTray';
import PartyImgCarousalWithPartyDateTime from '../PartyImgCarousalWithPartyDateTime';
import PartyAddressWidget from '../PartyAddressWidget';
import PartyDescriptionWidget from '../PartyDescriptionWidget';
import {Styles} from './indexCss';
import * as ListTiles from '../../ListTiles';
import {
  copyArrayInItself,
  getHp,
  getWp,
  utcToCurrentTimeZone,
  toCurrentTimeZone,
} from '../../../app/utils';
import {PartyService, FriendRequestService} from '../../../app/services';
import SelectedTagsInParty from '../SelectedTagsInParty';
import FeaturingButton from '../FeaturingButton';
import MobxStore from '../../../mobx';
import ImagesStack from '../../ImagesStack';
import NewsFeedGuestList from '../../../Screens/BounceUsers/NewsFeedGuestList';
import moment from 'moment';
import {RegexCollection} from '../../../app/constants';
import {NewsFeedPopups} from '../../AppPopups';
import NavigationService from '../../../navigation/NavigationService';

const NewsFeedContainer = props => {
  const {popupStore} = MobxStore;
  const {
    containerStyle,
    widgetType,
    partyData,
    partyImgCarousalWithPartyDateTimeProps,
  } = props;
  //console.log("Party Data --> ", partyData);
  let friendsWantsToGo = partyData?.friendsWantsToGo ?? [];
  //friendsWantsToGo = copyArrayInItself(friendsWantsToGo, 100);
  let isMoreThanOneImg = partyData?.gallery?.length > 1 ?? false;

  const onPressImagesStack = () => {
    popupStore.setNewsFeedPopups({
      visible: true,
      currentParty: partyData,
      widgetType,
      popupWidgetType: NewsFeedPopups.popupWidgetType.FriendsWantToGo,
    });
  };

  const onFeaturingPress = () => {
    props.navigation.navigate(NewsFeedGuestList.routeName, {
      partyData,
    });
  };
  const onShowMorePress = () => {
    popupStore.setNewsFeedPopups({
      visible: true,
      currentParty: partyData,
      widgetType,
      popupWidgetType: NewsFeedPopups.popupWidgetType.DescWithTags,
    });
  };
  //partyData.description = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`;

  const LayoutIfFeaturing = () => {
    return (
      <Fragment>
        <UserActionsTray
          {...props}
          {...props.userActionsTrayProps}
          widgetType={widgetType}
          containerStyle={[
            Styles.actionTrayStyle,
            isMoreThanOneImg && {marginTop: getHp(35)},
          ]}
          ticketScreenIncommingRoute={widgetType}
        />
        <View style={[Styles.addressFeaturingContainer]}>
          <PartyAddressWidget
            currentParty={partyData}
            addressTextContainer={Styles.addressWidgetContainer}
            textRenderLength={15}
          />
          <FeaturingButton
            onPress={onFeaturingPress}
            totalHiredVendors={partyData.hiredVendors?.length}
          />
        </View>
      </Fragment>
    );
  };
  const LayoutIfNoFeaturing = () => {
    return (
      <Fragment>
        {/* <ImageBackground source={'../../../assets/CoverPhoto.png'} style={{height: 300, width: 300}}> */}
          <UserActionsTray
            {...props}
            {...props.userActionsTrayProps}
            widgetType={widgetType}
            containerStyle={[
              {marginTop: isMoreThanOneImg ? getHp(0) : getHp(15)},
            ]}
            ticketScreenIncommingRoute={widgetType}
          />
          <PartyAddressWidget
            currentParty={partyData}
            addressTextContainer={Styles.addressWidgetContainerForNoFeaturing}
            textRenderLength={30}
          />
        {/* </ImageBackground> */}
      </Fragment>
    );
  };
  return (
    <View key={partyData.id} style={[Styles.container, containerStyle]}>
      <PartyImgCarousalWithPartyDateTime
        {...partyImgCarousalWithPartyDateTimeProps}
        widgetType={widgetType}
        navigation={props.navigation}
        partyData={partyData}
      />
      {/* <View style={{paddingHorizontal: getWp(12)}}>
        {partyData.hiredVendors?.length > 0
          ? LayoutIfFeaturing()
          : LayoutIfNoFeaturing()}
        {partyData?.description?.length == 0 ? (
          <View style={{marginVertical: getHp(10)}} />
        ) : (
          <PartyDescriptionWidget
            onShowMorePress={onShowMorePress}
            currentParty={partyData}
            containerStyle={{
              marginTop: getHp(15),
              paddingHorizontal: getWp(10),
            }}
            textLength={80}
          />
        )}
        {friendsWantsToGo.length > 0 && (
          <ImagesStack
            containerStyle={{marginVertical: getHp(3)}}
            numOfStacks={5}
            images={friendsWantsToGo.map(i => i.profileImage?.filePath)}
            infoText={`${friendsWantsToGo.length} friend${
              friendsWantsToGo.length > 1 ? 's' : ''
            } wants to go!`}
            onPressContainer={onPressImagesStack}
          />
        )}

        <SelectedTagsInParty
          widgetType={widgetType}
          currentParty={partyData}
          tileContainerStyle={{marginRight: getWp(12)}}
          scrollViewProps={{
            style: {marginTop: getHp(10)},
          }}
        />
      </View> */}
    </View>
  );
};

NewsFeedContainer.defaultProps = {
  widgetType: NavigationService.screenNames.NewsFeed,
};
export default NewsFeedContainer;
