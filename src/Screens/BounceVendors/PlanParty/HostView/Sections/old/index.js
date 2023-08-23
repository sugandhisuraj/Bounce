import React, {useState, useEffect, useContext, Fragment, useMemo} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {
  Header,
  ImageCarousel,
  EventTabview,
  ThreeFooterButtons,
  Footer,
  IconTitle,
  BlurView,
} from '@components';
import {styles} from './indexCss';

import {
  EditPen,
  ThreeBlackDots,
  TagPrice,
  DirectionBlue,
  BlackOutlineCalender,
  Peoples,
  Going,
  Interested,
  Cantgo,
  HirePeople,
  BlackSolidPeoples,
  BlackSolidShare,
  BlackSolidStar,
  Saved,
  GreenTickSvg,
  BlackClose,
  InterestedYellowSvg,
} from '@svg';
import {FONTSIZE, getPartyPhotoInSequence} from '@utils';
import {DJ} from '../../../../assets';
import {Scaffold, Placeholder, AppTabs, ListTiles, Lists} from '@components';
import PurchaseTickets from '../../../BounceUsers/EventPage/Public/PurchaseTickets';
import {FONTFAMILY, getHp, getWp} from '@utils';
import MobxStore from '../../../../mobx';
import HostViewModel from './HostViewModel';
import {RegexCollection} from '../../../../app/constants';
import moment from 'moment';
import {Buttons, Carousels} from '../../../../components';
import InviteFriends from '../InviteFriends';
import {observer} from 'mobx-react';
import ToastUtil from '../../../../app/constants/toast';
import {PartyService} from '../../../../app/services';
import {getTicketRange} from '../../../../app/utils';
import InviteFriendsModel from '../InviteFriends/InviteFriendsModel';
import CreateInvitation from '../CreateInvitation';
import MutualFriendBlurView from './MutualFriendBlurView';
import TicketListScreen from '../TicketList';
import GuestList from '../GuestList';
import {FriendRequestService} from '../../../../app/services';
import GuestProfile from '../../../BounceUsers/Profile/GuestProfile';
import ChooseVendor from '../ChooseVendor';
const DATA = [DJ, DJ, DJ];

function HostView(props) {
  const {party, mode = HostView.Modes.Host} = props.route.params;
  const [getImageState, setImageState] = useState(0);
  const {authStore, toggleLoader} = MobxStore;
  const hostViewInstance = HostViewModel.instance();
  const {currentParty, isThisPartyHostByMe, setCurrentParty} = hostViewInstance;
  const invitedInstance = InviteFriendsModel.instance();
  console.log('IS_HOST_2- ', isThisPartyHostByMe());
  useEffect(() => {
    setCurrentParty({});
    loadCurrentParty();
  }, []);

  const loadCurrentParty = async () => {
    try {
      await PartyService.loadCurrentParty(party.id);
    } catch (error) {
      return props.navigation.goBack();
    }
  };
  
  const addToInterested = async () => {
    try {
      MobxStore.toggleLoader(true);
      const res = await PartyService.addBookMark(currentParty.id);
      await loadCurrentParty();
      PartyService.getParty();
      ToastUtil(res.Message ?? 'Successfully Bookmarked');
    } catch (error) {
      ToastUtil('Something went wrong! Try Again');
    } finally {
      MobxStore.toggleLoader(false);
    }
  };
  const handleCarousel = () => {
    if (!currentParty?.gallery || currentParty?.gallery?.length == 0) {
      return null;
    }
    const sequencedImages = getPartyPhotoInSequence(currentParty?.gallery);
    return (
      <Carousels.ViewPartyImages
        imageData={sequencedImages.map(i => i.filePath)}
      />
    );
  };
  const userPartyGoingStatus = async (type = 'Going') => {
    try {
      MobxStore.toggleLoader(true);
      let toggleRes = null;
      if (type == 'Going') {
        toggleRes = await PartyService.partyToggleGo(currentParty.id);
      } else {
        toggleRes = await PartyService.partyToggleCantGo(currentParty.id);
      }

      await loadCurrentParty();
      if (type == 'Going') {
        type = !currentParty?.isAttending ? 'Going' : 'Not Going';
      }
      ToastUtil(`Party Status Changes to ${type}`, {
        duration: 2000,
      });
      PartyService.getParty();
    } catch (error) {
      ToastUtil(
        error?.response?.data?.message ?? 'Something went wrong try again!',
      );
    } finally {
      MobxStore.toggleLoader(false);
    }
  };
  const onFriendAvatarPress = async guestUser => {
    try {
       
      props.navigation.navigate(GuestProfile.routeName, {
        guestUser
      });
    } catch (error) {}
  };
  const AttendingTab = () => {
    return (
      <View style={styles.attendingTabContainerStyle}>
        <Lists.FriendAvatarList
          onPress={onFriendAvatarPress}
          renderFriendCountAndHeading={false}
          DataList={currentParty?.attending}
          listContainerStyle={{marginTop: 0}}
        />
        <Buttons.PrimaryGreyBgtBlackTitle
          title={'All Guests'}
          containerStyle={{marginTop: getHp(10)}}
          onPress={() => {
            props.navigation.navigate(GuestList.routeName);
          }}
        />
      </View>
    );
  };

  const AttendingFeaturingTab = useMemo(() => {
    const TabConfig = [
      {
        heading: 'Attending',
        Component: AttendingTab,
        shouldRender:
          currentParty?.attending && currentParty?.attending?.length > 0,
      },
      {
        heading: 'Featuring',
        shouldRender: false,
      },
    ];
    return (
      <AppTabs.CommonTabs
        polygonContainerStyle={{top: getHp(30)}}
        tabContainerStyle={{height: getHp(45)}}
        tabData={TabConfig}
        polygonConfig={[[getWp(180)]]}
      />
    );
  }, [currentParty]);
  console.log('RECENT_CHECK_HERE - ', JSON.stringify(currentParty));
  if (Object.keys(currentParty).length == 0) {
    return null;
  }
  return (
    <Scaffold statusBarStyle={{backgroundColor: '#FBFBFB'}}>
      <View style={styles.container}>
        <MutualFriendBlurView />
        <Header
          share={
            isThisPartyHostByMe() ? (
              <TouchableOpacity
                onPress={() => {
                  return props.navigation.navigate(CreateInvitation.routeName, {
                    party: party,
                    isEditParty: true,
                    onBackRoute: HostView.routeName,
                    onReload: loadCurrentParty,
                  });
                }}>
                <EditPen height={25} width={25} style={{marginRight: 5}} />
              </TouchableOpacity>
            ) : null
          }
          back
          headerTitle={`${currentParty.title}`}
          onPress={() => {
            props.navigation.goBack();
          }}
          headerBackColor={{backgroundColor: '#FBFBFB'}}
        />
        <ScrollView bounces={false} keyboardShouldPersistTaps={'always'}>
          {handleCarousel()}

          <View
            style={{
              marginTop: getHp(20),
              marginHorizontal: 10,
              marginBottom: 15,
            }}>
            <View style={styles.flex}>
              <Placeholder.IconText
                containerStyle={[
                  currentParty.tickets.length == 0 && {
                    width: '100%',
                    justifyContent: 'flex-start',
                  },
                ]}
                icon={<BlackOutlineCalender height={20} width={20} />}
                text={moment
                  .utc(currentParty.date)
                  .format(RegexCollection.PartyTimeFormat)}
              />
              {currentParty.tickets.length > 0 && (
                <Placeholder.IconText
                  icon={<TagPrice height={29} width={31} />}
                  text={getTicketRange(currentParty.tickets)}
                  onPress={() => {
                    props.navigation.navigate(TicketListScreen.routeName);
                  }}
                />
              )}
            </View>
                  {console.log("CURRENT_TICKET - ", JSON.stringify(currentParty.tickets))}
            <Placeholder.IconText
              containerStyle={{
                marginVertical: getHp(10),
                width: '100%',
                alignSelf: 'center',
                justifyContent: 'flex-start', 
              }}
              icon={<DirectionBlue height={22} width={22} />}
              text={currentParty.location?.addressStr}
              //text={`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`}
              textStyle={{
                letterSpacing: 0.04,
                fontWeight: '400',
                fontSize: FONTSIZE.Text15,
                textDecorationLine: 'underline',
                fontFamily: FONTFAMILY.AvenirNextBold,
                flexWrap: 'wrap'
              }}
            />
            <Placeholder.Text
              textLength={80}
              text={`${currentParty.description}`}
            />
          </View>

          {AttendingFeaturingTab}

          {hostViewInstance?.getTopGuestInterests()?.length > 0 && (
            <Fragment>
              <Text style={[styles.topGuestListText]}>Top Guest Interests</Text>
              <View style={[styles.topGuestContainer]}>
                {hostViewInstance?.getTopGuestInterests()?.map(tag => {
                  return (
                    <ListTiles.SubTagTile
                      key={tag.id}
                      containerStyle={{
                        marginLeft: getWp(9),
                        marginTop: getHp(8),
                      }}
                      subTag={tag}
                    />
                  );
                })}
              </View>
            </Fragment>
          )}
          <View style={{height: getHp(200)}} />
        </ScrollView>

        <View style={styles.bottomContainer}>
          {isThisPartyHostByMe() == false ? (
            <Fragment>
              <Buttons.VerticalIcon
                isHighlighted={currentParty?.isAttending}
                Icon={
                  currentParty?.isAttending ? (
                    <GreenTickSvg height={24} width={24} />
                  ) : (
                    <Going height={24} width={24} />
                  )
                }
                title={'Going'}
                onPress={() => userPartyGoingStatus()}
              />

              <Buttons.VerticalIcon
                highlightedColor={
                  currentParty?.isLiked ? 'rgba(248, 164, 30, 0.27)' : null
                }
                isHighlighted={currentParty?.isLiked}
                Icon={
                  currentParty?.isLiked ? (
                    <InterestedYellowSvg height={24} width={22} />
                  ) : (
                    <Interested height={24} width={22} />
                  )
                }
                title={'Interested'}
                onPress={addToInterested}
              />

              {currentParty?.isPrivate == true ? (
                <Buttons.VerticalIcon
                  isHighlighted={currentParty?.isCantGo}
                  Icon={<BlackClose height={22} width={22} />}
                  title={"Can't Go"}
                  onPress={() => userPartyGoingStatus("Can't Go")}
                />
              ) : (
                <Buttons.VerticalIcon
                  Icon={<BlackSolidShare height={25} width={27} />}
                  title={'Share'}
                />
              )}
            </Fragment>
          ) : (
            <Fragment>
              <Buttons.VerticalIcon
                Icon={<BlackSolidPeoples height={27} width={30} />}
                title={'Invite'}
                onPress={() => {
                  props.navigation.navigate(InviteFriends.routeName);
                }}
              />

              <Buttons.VerticalIcon
                Icon={<BlackSolidStar height={24} width={24} />}
                title={'Hire'}
                onPress={() => {
                  //window.toggleMutualFriendBlurView();
                  props.navigation.navigate(ChooseVendor.routeName);
                }}
              />

              <Buttons.VerticalIcon
                Icon={<BlackSolidShare height={25} width={27} />}
                title={'Promote'}
              />
            </Fragment>
          )}
        </View>
      </View>
    </Scaffold>
  );
}
HostView.routeName = '/HostView';
HostView.Modes = {};
HostView.Modes.Host = 'Host';
HostView.Modes.User = 'User';
export default observer(HostView);

/*

{true ? (
          <View style={styles.bottomContainer}>
            <ThreeFooterButtons
              icon={<Going height={24} width={24} />}
              ButtonTitle={'Going'}
            />
            <ThreeFooterButtons
              icon={<Interested height={20} width={20} />}
              ButtonTitle={'Interested'}
            />
            <ThreeFooterButtons
              icon={<Cantgo height={25} width={27} />}
              ButtonTitle={"Can't Go"}
            />
          </View>
        ) : false ? (
          <View style={styles.bottomContainer}>
            <ThreeFooterButtons
              icon={<BlackSolidPeoples height={27} width={30} />}
              ButtonTitle={'Invite'}
            />

            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate(PurchaseTickets.routeName)
              }>
              <ThreeFooterButtons
                icon={<BlackSolidStar height={24} width={24} />}
                ButtonTitle={'Hire'}
              />
            </TouchableOpacity>

            <ThreeFooterButtons
              icon={<BlackSolidShare height={25} width={27} />}
              ButtonTitle={'Promote'}
            />
          </View>
        ) : (
          <View style={styles.bottomContainer}>
            <ThreeFooterButtons
              icon={<BlackSolidPeoples height={25} width={30} />}
              ButtonTitle={'Invite'}
            />

            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate(PurchaseTickets.routeName)
              }>
              <ThreeFooterButtons
                icon={<BlackSolidStar height={24} width={24} />}
                ButtonTitle={'Hire'}
              />
            </TouchableOpacity>

            <ThreeFooterButtons
              icon={<BlackSolidShare height={25} width={27} />}
              ButtonTitle={'Promote'}
            />
          </View>
        )}
        */

/*

         const renderSmallButton = ({item, index}) => {
    console.log('item', item);
    return (
      <TouchableOpacity
        style={[
          styles.linearGradient,
          {
            marginRight: 10,
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
          },
        ]}>
        <Text
          style={{
            fontFamily: 'AvenirNext-Medium',
            fontSize: FONTSIZE.Text12,
            color: '#000',
          }}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };
  */
