import React, {Fragment, useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, ImageBackground} from 'react-native';
import moment from 'moment';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';

import {ThreeDotGreyBackground, WhiteStar, UserIcon} from '@svg';
import MobxStore from '../../../mobx';
import {Carousels} from '../..';
import Styles, {Styled} from './indexCss';
import {RegexCollection} from '../../../app/constants';
import {FileMIMETypesUtils, getHp, getWp, PartyUtils} from '../../../app/utils';
import {NewsFeedPopups, ReportBlockPopups} from '../../AppPopups';
import {
  FeaturingButton,
  PartyAddressWidget,
  PartyDescriptionWidget,
  SelectedTagsInParty,
  UserActionsTray,
  ImagesStack,
} from '..';

AntDesign.loadFont();
MaterialIcons.loadFont();
Entypo.loadFont();

const PartyImgCarousalWithPartyDateTime = props => {
  const {partyData, onTicketRangePress, containerStyle, widgetType} = props;
  const {popupStore} = MobxStore;
  const [activeIndex, setActiveIndex] = useState(0);
  const [backImage, setBackImage] = useState('');
  const [BackImageType, setBackImageType] = useState(false);
  const allGalleryImagesSorted = PartyUtils.getPartyGalleryByFileSequence(
    partyData.gallery,
  ).map(m => m.filePath);
  //const partyCover = PartyUtils.getPartyURLOrPlaceholder(allGalleryImagesSorted[activeIndex]);

  useEffect(() => {
    const partyCover = PartyUtils.getPartyURLOrPlaceholder(
      allGalleryImagesSorted[activeIndex],
    );
    const resp = FileMIMETypesUtils.getAssetTypeFromFileURL(partyCover);
    setBackImageType(resp.isVideo);
    setBackImage(partyCover);
  }, [activeIndex]);

  //allGalleryImages = [];

  const onTicketPress = () => {
    onTicketRangePress(partyData);
  };
  const ticketRange = PartyUtils.partyTicketsStatus(partyData);

  const onReportPartyPress = () => {
    MobxStore.popupStore.setReportBlockPopup({
      visible: true,
      partyData,
      type: ReportBlockPopups.popupType.ReportParty,
    });
  };

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
      <View style={{paddingTop: getHp(20)}}>
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
          {/* <PartyAddressWidget
            currentParty={partyData}
            addressTextContainer={Styles.addressWidgetContainer}
            textRenderLength={15}
          /> */}
          <FeaturingButton
            onPress={onFeaturingPress}
            totalHiredVendors={partyData.hiredVendors?.length}
          />
        </View>
      </View>
    );
  };
  const LayoutIfNoFeaturing = () => {
    return (
      <View style={{paddingTop: getHp(20)}}>
        <UserActionsTray
          {...props}
          {...props.userActionsTrayProps}
          widgetType={widgetType}
          containerStyle={[
            {marginTop: isMoreThanOneImg ? getHp(0) : getHp(15)},
          ]}
          ticketScreenIncommingRoute={widgetType}
        />
        {/* <PartyAddressWidget
          currentParty={partyData}
          addressTextContainer={Styles.addressWidgetContainerForNoFeaturing}
          textRenderLength={30}
        /> */}
      </View>
    );
  };

  return (
    <View style={[containerStyle]}>
      {allGalleryImagesSorted.length == 0 ? (
        <View style={{height: getHp(375)}} />
      ) : (
        <Fragment>
          {/* <Carousels.ViewPartyImages imageData={allGalleryImages} /> */}
          <Carousels.PartyImageVideo
            setActiveIndex={setActiveIndex}
            data={allGalleryImagesSorted}
            pagination={true}
            containerStyle={{
              height:
                allGalleryImagesSorted.length == 1 ? getHp(375) : getHp(400),
            }}
            imageStyle={{height: getHp(375)}}
          />
          <TouchableOpacity
            onPress={onReportPartyPress}
            style={Styles.reportDotContainer}>
            <ThreeDotGreyBackground />
          </TouchableOpacity>
        </Fragment>
      )}
      <ImageBackground
        source={
          !BackImageType
            ? {uri: backImage?.uri}
            : {uri: '../../../assets/TestBack.jpg'}
        }
        defaultSource={require('../../../assets/TestBack.jpg')}
        resizeMode="cover"
        imageStyle={{transform: [{rotate: '180deg'}, {scaleX: -1}]}}
        style={{width: '100%', height: '63.7%', marginTop: -26}}
        progressiveRenderingEnabled={true}
        blurRadius={20}>
        <View
          style={[
            Styles.partyInfoText,
            allGalleryImagesSorted.length == 1 && {bottom: getHp(20)},
          ]}>
          {/* <Text style={[Styles.partyTitleText]}>{partyData.title}</Text> */}
          <Styled.PartyText style={[Styles.partyTitleText]}>
            {partyData.title}
          </Styled.PartyText>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Styled.PartyText style={[Styles.partyDateText, {paddingRight: 7}]}>
              {moment
                .utc(partyData.date)
                .format(RegexCollection.PartyTimeFormat)}
            </Styled.PartyText>
            {/* <Styled.TouchShadow style={[Styles.roundView]} /> */}
            {/* {(ticketRange.free ||
              ticketRange.bounceTicketAndTicketLink ||
              ticketRange.onlyBounceTicket) && (
              <TouchableOpacity
                style={Styles.priceRangeContainer}
                disabled={ticketRange.free}
                onPress={onTicketPress}>
                <Text style={[Styles.priceRangeText]}>
                  {ticketRange.ticketRange.length > 0
                    ? ticketRange.ticketRange
                    : 'Free'}
                </Text>
                {ticketRange.ticketRange.length > 0 && (
                  <Entypo name={'chevron-thin-right'} />
                )}
              </TouchableOpacity>
            )} */}
          </View>
          <View
            style={{
              paddingHorizontal: getWp(12),
              paddingVertical: getHp(2),
              //backgroundColor: 'transparent',
            }}>
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

            <View style={{flexDirection: 'row'}}>
              <View style={Styles.countView}>
                <UserIcon height={17} width={17} />
                <Text style={Styles.countText}>
                  {'5'}
                </Text>
              </View>
              <View style={Styles.countView}>
                <WhiteStar height={17} width={17} />
                <Text style={Styles.countText}>
                  {'3'}
                </Text>
              </View>
            </View>

            {partyData.hiredVendors?.length > 0
              ? LayoutIfFeaturing()
              : LayoutIfNoFeaturing()}

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

            {/* <SelectedTagsInParty
              widgetType={widgetType}
              currentParty={partyData}
              tileContainerStyle={{marginRight: getWp(12)}}
              scrollViewProps={{
                style: {marginTop: getHp(10)},
              }}
            /> */}
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

PartyImgCarousalWithPartyDateTime.defaultProps = {
  partyData: {},
  containerStyle: {},
};
export default PartyImgCarousalWithPartyDateTime;
