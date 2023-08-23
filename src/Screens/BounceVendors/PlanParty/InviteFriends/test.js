import React, {
    Fragment,
    useState,
    useCallback,
    useEffect,
    useMemo,
  } from 'react';
  import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    TextInput,
  } from 'react-native';
  import {
    Header,
    SearchBar,
    Footer,
    CustomButton,
    Toggle,
    Calender,
    ModalPopup,
    Root,
    PastGuestList,
    Scaffold,
    AppTabs,
    Buttons,
    Lists,
    ListTiles,
  } from '@components';
  import {Girl} from '@assets';
  import {
    Info,
    AddBlueWhite,
    ContactWhite,
    List,
    BlackMenubar,
    BlackContact,
    Dollar,
    CohostWhite,
    SelectedBlueTick,
  } from '@svg';
  import {KeyboardAvoidingView} from 'react-native';
  import {FONTSIZE, getHp, getWp} from '@utils';
  import {FONTFAMILY} from '@utils';
  import {useSearchBar} from '../../../../app/hooks';
  import MobxStore from '../../../../mobx';
  import AntDesign from 'react-native-vector-icons/AntDesign';
  import {observer} from 'mobx-react';
  import styles from './indexCss';
  import InviteFriendsModel from './InviteFriendsModel';
  import {CohostSvg} from '@svg';
  import {PartyService} from '../../../../app/services';
  import ToastUtil from '../../../../app/constants/toast';
  import HostViewModel from '../HostView/HostViewModel';
  import {hp, wp} from '../../../../app/utils';
  const DATA = [
    {
      icon: Girl,
      messageName: 'Jessica Lambert',
    },
    {
      icon: Girl,
      messageName: 'Jessica Lambert',
    },
    {
      icon: Girl,
      messageName: 'Jessica Lambert',
    },
    {
      icon: Girl,
      messageName: 'Jessica Lambert',
    },
    {
      icon: Girl,
      messageName: 'Jessica Lambert',
    },
    {
      icon: Girl,
      messageName: 'Jessica Lambert',
    },
    {
      icon: Girl,
      messageName: 'Jessica Lambert',
    },
    {
      icon: Girl,
      messageName: 'Jessica Lambert',
    },
    {
      icon: Girl,
      messageName: 'Jessica Lambert',
    },
  ];
  
  function InviteFriends(props) {
    const [activeTab, setActiveTab] = useState(0);
  
    const [currentTab, setCurrentTab] = useState({heading: 'All'});
    const [allSelectedUnSelectedTab, setAllSelectedUnSelectedTab] =
      useState(null);
    const {
      searchQuery,
      SearchBarComponent,
      onChangeText: setSearchQuery,
    } = useSearchBar();
    const {deviceContactsStore, bounceUsersStore} = MobxStore;
    const hostViewModel = HostViewModel.instance();
    const inviteFriendsModel = InviteFriendsModel.instance();
    let allCohosts = inviteFriendsModel.cohost.cohosts();
    let allBounceInvites = inviteFriendsModel.bounceInvites.bounceInvites();
    let allContactInvites = inviteFriendsModel.contactInvites.contactInvites();
  
    const sendInvite = async () => {
      try {
        if (
          allCohosts.length == 0 &&
          allBounceInvites == 0 &&
          allContactInvites == 0
        ) {
          return ToastUtil('Select atleast 1 Invite or Cohost', {
            duration: 3000,
          });
        }
        MobxStore.toggleLoader(true);
        let coHostRes = '';
        let inviteRes = '';
        if (allCohosts.length > 0) {
          const cohostAddResponse = await PartyService.addPartyHost(
            hostViewModel.currentParty.party.id,
            inviteFriendsModel.cohosts.cohosts(true),
          );
          console.log("COHOST_RES_DATA - ", cohostAddResponse);
        }
        if (allBounceInvites.length > 0 || allContactInvites.length > 0) {
          let contactsInvites = allContactInvites.map(
            ch => ch.getPhoneNumbers().sanatizeNumber,
          );
          contactsInvites = contactsInvites.filter(
            ch => ch != undefined && ch != '' && ch != null,
          );
          const sendInviteResponse = await PartyService.sendPartyInvites(
            allBounceInvites,
            contactsInvites,
            hostViewModel.currentParty.id,
          );
        }
        ToastUtil('Invites Successfully Send');
      } catch (error) {
        console.log('ERROR_HERE ', error);
        let msg =
          error?.response?.data?.Message ?? 'Something went wrong! Try Again';
        ToastUtil(msg);
      } finally {
        MobxStore.toggleLoader(false);
      }
    };
    const onAllItemRightPress = friend => {
      if (currentTab?.heading == 'On Bounce') {
        if (inviteFriendsModel.mode == InviteFriendsModel.Mode.Friends) {
          if (inviteFriendsModel.cohost.isCohostExist(friend).exist) {
            inviteFriendsModel.cohost.removeCohostIfExist(friend);
          } else {
            inviteFriendsModel.bounceInvites.toggleBounceInvites(friend);
          }
        } else {
          inviteFriendsModel.bounceInvites.removeBounceInviteIfExist(friend);
          inviteFriendsModel.cohost.toggleCohosts(friend);
        }
      } else if (currentTab?.heading == 'Contact') {
        inviteFriendsModel.contactInvites.toggleContactInvites(friend);
      } else if (currentTab?.heading == 'All') {
        // if (friend.isDeviceContact) {
        //   inviteFriendsModel.contactInvites.toggleContactInvites(friend);
        // } else {
        //   inviteFriendsModel.bounceInvites.toggleBounceInvites(friend);
        // }
      }
    };
    const onAllItemIsFriendSelected = friend => {
      if (currentTab?.heading == 'On Bounce') {
        if (inviteFriendsModel.mode != InviteFriendsModel.Mode.Friends) {
          return inviteFriendsModel.cohost.isCohostExist(friend).exist;
        } else {
          let cohostExistResult =
            inviteFriendsModel.cohost.isCohostExist(friend).exist;
          if (cohostExistResult) {
            return {
              exist: true,
              SVGComponent: <CohostSvg height={getHp(40)} width={getHp(40)} />,
            };
          }
          return inviteFriendsModel.bounceInvites.isBounceInviteExist(friend)
            .exist;
        }
      } else if (currentTab?.heading == 'Contact') {
        return inviteFriendsModel.contactInvites.isContactInviteExist(friend)
          .exist;
      } else if (currentTab?.heading == 'All') {
        if (friend.isDeviceContact) {
          return inviteFriendsModel.contactInvites.isContactInviteExist(friend)
            .exist;
        } else {
          let cohostExistResult =
            inviteFriendsModel.cohost.isCohostExist(friend).exist;
          if (cohostExistResult) {
            return {
              exist: true,
              SVGComponent: <CohostSvg height={getHp(40)} width={getHp(40)} />,
            };
          }
          return inviteFriendsModel.bounceInvites.isBounceInviteExist(friend)
            .exist;
        }
      }
      return false;
    };
    const ToggleFriendListTile = (
      item,
      SelectedSvg,
      disableUnSelectedIcon = false,
    ) => {
      let tileStyles = {
        tileIconContainerStyle: {width: '15%'},
        tileTitleContainerStyle: {width: '70%'},
      };
      if (item?.isDeviceContact) {
        return (
          <ListTiles.ToggleContactTile
            isContactSelected={onAllItemIsFriendSelected}
            onTitlePress={onAllItemRightPress}
            tileStyles={tileStyles}
            contact={item}
          />
        );
      }
  
      return (
        <ListTiles.ToggleFriendTile
          tileStyles={tileStyles}
          friend={item}
          isFriendSelected={onAllItemIsFriendSelected}
          onTitlePress={onAllItemRightPress}
          SelectedSvg={SelectedSvg}
          disableUnSelectedIcon={disableUnSelectedIcon}
          // <CohostSvg height={getHp(40)} width={getHp(40)} />
        />
      );
    };
  
    const ContactTabComponent = () => {
      let ListData = deviceContactsStore.deviceContacts;
      return (
        <View style={[styles.allComponentContainer, {flex: 1}]}>
          {SearchBarComponent({
            placeholder: 'Search Contacts',
            containerStyle: styles.searchContainer,
          })}
          <View
            style={{
              marginTop: getHp(20),
              backgroundColor: 'rgba(255, 255, 255, 0.66)',
            }}>
            <Lists.ToggleList
              listContainerStyle={{marginTop: 0}}
              listContainerViewStyle={{height: '95%'}}
              searchQuery={searchQuery}
              searchFilter={Lists.ToggleList.SEARCH_FILTERS.Contact}
              ListTile={({item}) => ToggleFriendListTile(item, null, null)}
              heading={''}
              ListData={ListData}
            />
          </View>
        </View>
      );
    };
  
    const OnBounceTabComponent = () => {
      let disableUnSelectedIcon =
        inviteFriendsModel.mode != InviteFriendsModel.Mode.Friends;
      let SVGICON = disableUnSelectedIcon ? (
        <CohostSvg height={getHp(40)} width={getHp(40)} />
      ) : (
        <SelectedBlueTick height={getHp(40)} width={getHp(40)} />
      );
      let ListData = bounceUsersStore.bounceUsers;
      return (
        <View style={[styles.allComponentContainer, {flex: 1}]}>
          {SearchBarComponent({
            placeholder: 'Search Friends',
            containerStyle: styles.searchContainer,
          })}
          <View
            style={{
              marginTop: getHp(10),
              backgroundColor: 'rgba(255, 255, 255, 0.66)',
            }}>
            <Lists.ToggleList
              listContainerStyle={{marginTop: 0}}
              listContainerViewStyle={{height: '95%'}}
              searchQuery={searchQuery}
              searchFilter={Lists.ToggleList.SEARCH_FILTERS.FRIEND}
              ListTile={({item}) =>
                ToggleFriendListTile(item, SVGICON, disableUnSelectedIcon)
              }
              heading={''}
              ListData={ListData}
            />
          </View>
        </View>
      );
    };
    const AllTabComponent = () => {
      let allBounceUsers = bounceUsersStore.bounceUsers;
      let allContacts = deviceContactsStore.deviceContacts;
  
      let ListData = allBounceUsers.concat(allContacts);
  
      if (allSelectedUnSelectedTab?.heading == 'Selected') {
        ListData = ListData.filter(allData => {
          if (allData?.isDeviceContact) {
            return inviteFriendsModel.contactInvites.isContactInviteExist(allData)
              .exist;
          }
          let isExistInInvite =
            inviteFriendsModel.bounceInvites.isBounceInviteExist(allData).exist;
          if (isExistInInvite) {
            return true;
          }
          return inviteFriendsModel.cohost.isCohostExist(allData).exist;
        });
  
        let newCohostListRender = ListData.filter(li => {
          return inviteFriendsModel.cohost.isCohostExist(li).exist;
        });
        let newBounceInviteListRender = ListData.filter(li => {
          return inviteFriendsModel.bounceInvites.isBounceInviteExist(li).exist;
        });
        let newDeviceContactInviteRender = ListData.filter(li => {
          return li?.isDeviceContact;
        });
        ListData = [
          ...newCohostListRender,
          ...newBounceInviteListRender,
          ...newDeviceContactInviteRender,
        ];
      } else if (allSelectedUnSelectedTab?.heading == 'Unselected') {
        ListData = ListData.filter(allData => {
          if (allData?.isDeviceContact) {
            return (
              inviteFriendsModel.contactInvites.isContactInviteExist(allData)
                .exist == false
            );
          }
          return (
            inviteFriendsModel.bounceInvites.isBounceInviteExist(allData).exist ==
            false
          );
        });
        ListData = ListData.filter(allData => {
          return inviteFriendsModel.cohost.isCohostExist(allData).exist == false;
        });
      }
      return (
        <View style={[styles.allComponentContainer, {flex: 1}]}>
          {SearchBarComponent({
            placeholder: 'Search Friends or Contacts',
            containerStyle: styles.searchContainer,
          })}
          <AppTabs.SelectedUnselectedTabs
            tabContainerStyle={{marginTop: getHp(20)}}
            selectedTab={allSelectedUnSelectedTab}
            onSelect={tab => {
              console.log('TAB_REC - ', tab);
              if (tab.heading == allSelectedUnSelectedTab?.heading) {
                return setAllSelectedUnSelectedTab(null);
              }
              setAllSelectedUnSelectedTab(tab);
            }}
            tabs={[
              {
                heading: 'Selected',
              },
              {
                heading: 'Unselected',
                style: {
                  marginLeft: getWp(5),
                },
              },
            ]}
          />
          <View style={{backgroundColor: 'rgba(255, 255, 255, 0.66)'}}>
            <Lists.ToggleList
              listContainerStyle={{marginTop: 0}}
              listContainerViewStyle={{height: '92%'}}
              searchQuery={searchQuery}
              searchFilter={Lists.ToggleList.SEARCH_FILTERS.FRIEND.concat(
                Lists.ToggleList.SEARCH_FILTERS.Contact,
              )}
              ListTile={({item}) => ToggleFriendListTile(item)}
              heading={''}
              ListData={ListData}
            />
          </View>
        </View>
      );
    };
    const TabConfig = useMemo(() => {
      return [
        {
          heading: 'All',
          Component: AllTabComponent,
        },
        {
          heading: 'On Bounce',
          Component: OnBounceTabComponent,
        },
        {
          heading: 'Contact',
          Component: ContactTabComponent,
        },
      ];
    }, [
      currentTab,
      searchQuery,
      allCohosts,
      allBounceInvites,
      allContactInvites,
    ]);
  
    let modeObj = useMemo(() => {
      console.log('modeObj - useMemo()');
      return {
        title:
          inviteFriendsModel.mode == InviteFriendsModel.Mode.Friends
            ? 'Add Cohosts'
            : 'Confirm',
        onPress: () => {
          if (inviteFriendsModel.mode == InviteFriendsModel.Mode.Friends) {
            setActiveTab(1);
            return inviteFriendsModel.switchToCohostMode();
          } else {
            inviteFriendsModel.switchToFriendsMode();
          }
        },
      };
    }, [inviteFriendsModel.mode]);
  
    const PageTabs = useMemo(() => {
      console.log('PageTabs - useMemo()');
      return (
        <AppTabs.CommonTabs
          tabsProps={{
            initialPage: 0,
            page: activeTab,
          }}
          onChangeTab={(tab, i) => {
            setSearchQuery('');
            setActiveTab(i);
            setCurrentTab(t => tab);
            inviteFriendsModel.switchToFriendsMode();
          }}
          containerStyle={{
            borderWidth: 0,
            borderColor: 'blue',
            marginTop: getHp(20),
          }}
          tabContainerStyle={{height: 50}}
          tabData={TabConfig}
          polygonConfig={[getWp(47), getWp(180), getWp(320)]}
          polygonContainerStyle={{top: 32}}
        />
      );
    }, [TabConfig]);
  
    const CohostButton = useMemo(() => {
      console.log('COHOST_BUTTON - useMemo()');
      return (
        <View style={[styles.hostTray]}>
          <Buttons.PrimaryButton
            onPress={modeObj.onPress}
            title={modeObj.title}
            textColor={'#CF69FF'}
          />
          {/* <Buttons.PrimaryButton title={'Select All'} /> */}
        </View>
      );
    }, [modeObj]);
    const BottomButton = useMemo(() => {
      console.log('BOTTOM_BUTTON - useMemo()');
      return (
        <Buttons.LinearGradient
          onPress={sendInvite}
          title={'Send it'}
          titleStyle={{
            letterSpacing: 0.3,
            fontWeight: '700',
            fontSize: FONTSIZE.Text18,
          }}
          showArrow={false}
          linearGradientStyle={{
            marginTop: 15,
            width: '95%',
            height: getHp(50),
            alignSelf: 'center',
            borderRadius: getHp(20),
          }}
        />
      );
    }, []);
    return (
      <Scaffold>
        <ScrollView scrollEnabled={false} style={{backgroundColor: '#F9F9F9'}}>
          <Header
            onPress={() => {
              props.navigation.goBack();
            }}
            back
            headerContainerStyle={{backgroundColor: '#FFF'}}
            headerTitle={'Invite Friends'}
          />
          <View style={{height: hp(70), flex: 1}}>{PageTabs}</View>
  
          <View style={{backgroundColor: '#FBFBFB'}}>
            {CohostButton}
            {BottomButton}
          </View>
        </ScrollView>
      </Scaffold>
    );
  }
  
  InviteFriends.routeName = '/InviteFriends';
  
  export default observer(InviteFriends);
  
  /* <Buttons.ToggleIconButton
            containerStyle={{
              width: '90%',
              alignSelf: 'center',
              marginVertical: getHp(15),
            }}
            title={'Saved Guest List'}
            Icon={
              <AntDesign
                color={'black'}
                size={getHp(20)}
                name={true ? 'down' : 'up'}
              />
            }
          />
          <ListTiles.GuestTile
            guestData={DATA}
            guestPartyName={'Baverly Hills Bachelor Party'}
          />
          <ListTiles.GuestTile
            containerStyle={{marginTop: getHp(1)}}
            guestData={DATA}
            guestPartyName={'Adelson Gala'}
          />
          <ListTiles.GuestTile
            containerStyle={{marginTop: getHp(1)}}
            guestData={DATA}
            guestPartyName={"David's 20th"}
          /> */
  
  /*
  
          const onSendPress = async () => {
      try {
        if (allCohosts.length == 0) {
          return ToastUtil('Add atleast 1 Cohost');
        }
        MobxStore.toggleLoader(true);
        const cohostAddResponse = await PartyService.addPartyHost(
          party.id,
          inviteFriendsModel.cohosts(true),
        );
        ToastUtil(cohostAddResponse.Message ?? 'Cohost Successfully Added');
      } catch (error) {
        let msg = error?.response?.data?.Message ?? 'Something weng wrong';
        return ToastUtil(msg);
      } finally {
        MobxStore.toggleLoader(false);
      }
    };
    */
  