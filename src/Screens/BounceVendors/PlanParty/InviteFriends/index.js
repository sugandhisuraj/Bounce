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
import {PartyGuestService, PartyService} from '../../../../app/services';
import ToastUtil from '../../../../app/constants/toast';
import HostViewModel from '../HostView/HostViewModel';
import {copyArrayInItself, hp, wp} from '../../../../app/utils';
import {FriendRequestService} from '../../../../app/services';
import GuestProfile from '../../../BounceUsers/Profile/GuestProfile';
import CreateEditGuestListScreen from '../CreateEditGuestList';
import CreateEditGuestListModel from '../CreateEditGuestList/CreateEditGuestListModel';
import GuestListSection from './GuestListSection';
import {Headers} from '../../../../components';
function InviteFriends(props) {
  const [activeTab, setActiveTab] = useState(0);
  const [allSelectedUnSelectedTab, setAllSelectedUnSelectedTab] =
    useState(null);
  const [onBounceSelectedUnSelectedTab, onBounceSetSelectedUnSelectedTab] =
    useState(null);
  const [contactSelectedUnSelectedTab, contactSetSelectedUnSelectedTab] =
    useState(null);
  const {
    searchQuery,
    SearchBarComponent,
    onChangeText: setSearchQuery,
  } = useSearchBar();
  const {bounceUsersStore, deviceContactsStore} = MobxStore;
  const hostViewModel = HostViewModel.instance();
  const inviteFriendsModel = InviteFriendsModel.instance();
  const createEditGuestListModel = CreateEditGuestListModel.instance();
  let allCohosts = inviteFriendsModel.cohost.data();
  let allBounceInvites = inviteFriendsModel.bounceInvites.data();
  let allContactInvites = inviteFriendsModel.contactInvites.data();
  const allInviteTrack = inviteFriendsModel.inviteTrack.data();
  useEffect(() => {
    onScreenLoad();
  }, []);
  const onScreenLoad = () => {
    inviteFriendsModel.switchToFriendsMode();
    createEditGuestListModel.resetStoreData();
    inviteFriendsModel.initInvites(hostViewModel.currentParty);
    createEditGuestListModel.fetchGuestLists();
  };
  const onSelectAll = (mode = 1) => {
    console.log('MODE+_HERE', mode);
    if (activeTab == 0) {
      if (mode == 0) {
        let allContacts = deviceContactsStore.deviceContacts;
        let allBounceUsers = MobxStore.authStore.getMyFriends().filter(bU => {
          return inviteFriendsModel.cohost.isDataExist(bU).exist == false;
        });
        inviteFriendsModel.bounceInvites.resetAndAddDatas(allBounceUsers);
        inviteFriendsModel.contactInvites.resetAndAddDatas(allContacts);
      } else if (mode == 1) {
        inviteFriendsModel.contactInvites.reset();
        inviteFriendsModel.bounceInvites.reset();
      }
    } else if (activeTab == 1) {
      if (mode == 0) {
        let allBounceUsers = MobxStore.authStore.getMyFriends().filter(bU => {
          return inviteFriendsModel.cohost.isDataExist(bU).exist == false;
        });
        inviteFriendsModel.bounceInvites.resetAndAddDatas(allBounceUsers);
        console.log('INC  ', allBounceUsers);
      } else if (mode == 1) {
        inviteFriendsModel.bounceInvites.reset();
      }
    } else if (activeTab == 2) {
      if (mode == 0) {
        let allContacts = deviceContactsStore.deviceContacts;
        inviteFriendsModel.contactInvites.resetAndAddDatas(allContacts);
      } else if (mode == 1) {
        inviteFriendsModel.contactInvites.reset();
      }
    }
    inviteFriendsModel.syncInviteTrack();
  };
  const sendInvite = async () => {
    try {
      // if (
      //   allCohosts.length == 0 &&
      //   allBounceInvites == 0 &&
      //   allContactInvites == 0
      // ) {
      //   return ToastUtil('Select atleast 1 Invite or Cohost', {
      //     duration: 3000,
      //   });
      // }
      MobxStore.toggleLoader(true);

      const cohostAddResponse = await PartyService.addPartyHost(
        hostViewModel.currentParty.id,
        inviteFriendsModel.cohost.data(),
      );
      console.log('COHOST_TIOGG_RES - ', JSON.stringify(cohostAddResponse));
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

      await PartyService.loadCurrentParty();
      onScreenLoad();
      ToastUtil('Invites Successfully Send', {
        duration: 2000,
      });
    } catch (error) {
      console.log('SEND_INVITE_ERROR ', error);
      let msg =
        error?.message ??
        error?.response?.data?.Message ??
        'Something went wrong! Try Again';
      ToastUtil(msg);
    } finally {
      MobxStore.toggleLoader(false);
    }
  };

  const onTitleAndAvatarPress = async guestUser => {
    try {
       
      props.navigation.navigate(GuestProfile.routeName, {
        guestUser
      });
    } catch (error) {}
  };
  const onAllItemRightPress = friend => {
    if (activeTab == 1) {
      if (inviteFriendsModel.mode == InviteFriendsModel.Mode.Friends) {
        if (inviteFriendsModel.cohost.isDataExist(friend).exist) {
          inviteFriendsModel.cohost.removeDataIfExist(friend);
        } else {
          inviteFriendsModel.bounceInvites.toggle(friend);
        }
      } else {
        inviteFriendsModel.bounceInvites.removeDataIfExist(friend);
        inviteFriendsModel.cohost.toggle(friend);
      }
    } else if (activeTab == 2) {
      inviteFriendsModel.contactInvites.toggle(friend);
    } else if (activeTab == 0) {
      if (friend.isDeviceContact) {
        inviteFriendsModel.contactInvites.toggle(friend);
      } else {
        if (inviteFriendsModel.cohost.isDataExist(friend).exist) {
          inviteFriendsModel.cohost.removeDataIfExist(friend);
        } else {
          inviteFriendsModel.bounceInvites.toggle(friend);
        }
      }
    }
    inviteFriendsModel.syncInviteTrack();
  };
  const onAllItemIsFriendSelected = friend => {
    if (activeTab == 1) {
      if (inviteFriendsModel.mode != InviteFriendsModel.Mode.Friends) {
        return inviteFriendsModel.cohost.isDataExist(friend).exist;
      } else {
        let cohostExistResult =
          inviteFriendsModel.cohost.isDataExist(friend).exist;
        if (cohostExistResult) {
          return {
            exist: true,
            SVGComponent: <CohostSvg height={getHp(40)} width={getHp(40)} />,
          };
        }
        return inviteFriendsModel.bounceInvites.isDataExist(friend).exist;
      }
    } else if (activeTab == 2) {
      return inviteFriendsModel.contactInvites.isDataExist(friend).exist;
    } else if (activeTab == 0) {
      if (friend.isDeviceContact) {
        return inviteFriendsModel.contactInvites.isDataExist(friend).exist;
      } else {
        let cohostExistResult =
          inviteFriendsModel.cohost.isDataExist(friend).exist;
        if (cohostExistResult) {
          return {
            exist: true,
            SVGComponent: <CohostSvg height={getHp(40)} width={getHp(40)} />,
          };
        }
        return inviteFriendsModel.bounceInvites.isDataExist(friend).exist;
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
          onRightIconPress={onAllItemRightPress}
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
        onRightIconPress={onAllItemRightPress}
        SelectedSvg={SelectedSvg}
        disableUnSelectedIcon={disableUnSelectedIcon}
        onAvatarPress={onTitleAndAvatarPress}
        onTitlePress={onTitleAndAvatarPress}
      />
    );
  };

  const ContactTabComponent = () => {
    let ListData = deviceContactsStore.deviceContacts;
    if (contactSelectedUnSelectedTab == 0) {
      ListData = ListData.filter(li => {
        return inviteFriendsModel.contactInvites.isDataExist(li).exist;
      });
    }
    if (contactSelectedUnSelectedTab == 1) {
      ListData = ListData.filter(li => {
        return inviteFriendsModel.contactInvites.isDataExist(li).exist == false;
      });
    }
    return (
      <View style={[styles.allComponentContainer]}>
        {SearchBarComponent({
          placeholder: 'Search Contacts',
          containerStyle: styles.searchContainer,
        })}
        <AppTabs.SelectedUnselectedTabs
          tabContainerStyle={{marginTop: getHp(10)}}
          selectedTabIndex={contactSelectedUnSelectedTab}
          onSelect={(tab, i) => {
            inviteFriendsModel.switchToFriendsMode();
            if (i == contactSelectedUnSelectedTab) {
              return contactSetSelectedUnSelectedTab(null);
            }
            contactSetSelectedUnSelectedTab(i);
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
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(255, 255, 255, 0.66)',
          }}>
          <Lists.ToggleList
          listContainerStyle={{marginTop: getHp(10)}}
            listContentContainerStyle={{paddingBottom: getHp(20)}}
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
    //let ListData = bounceUsersStore.bounceUsers;
    let ListData = MobxStore.authStore.getMyFriends();
    if (onBounceSelectedUnSelectedTab == 0) {
      ListData = ListData.filter(li => {
        return (
          inviteFriendsModel.cohost.isDataExist(li).exist ||
          inviteFriendsModel.bounceInvites.isDataExist(li).exist
        );
      });
      let selectedChList = ListData.filter(li => {
        return inviteFriendsModel.cohost.isDataExist(li).exist;
      });
      let selectedInList = ListData.filter(li => {
        return inviteFriendsModel.bounceInvites.isDataExist(li).exist;
      });
      ListData = selectedChList.concat(selectedInList);
    }
    if (onBounceSelectedUnSelectedTab == 1) {
      ListData = ListData.filter(li => {
        return (
          inviteFriendsModel.cohost.isDataExist(li).exist == false &&
          inviteFriendsModel.bounceInvites.isDataExist(li).exist == false
        );
      });
    }
    return (
      <View style={[styles.allComponentContainer]}>
        {SearchBarComponent({
          placeholder: 'Search Friends',
          containerStyle: styles.searchContainer,
        })}
        <AppTabs.SelectedUnselectedTabs
          tabContainerStyle={{marginTop: getHp(10)}}
          selectedTabIndex={onBounceSelectedUnSelectedTab}
          onSelect={(tab, i) => {
            inviteFriendsModel.switchToFriendsMode();
            if (i == onBounceSelectedUnSelectedTab) {
              return onBounceSetSelectedUnSelectedTab(null);
            }
            onBounceSetSelectedUnSelectedTab(i);
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
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(255, 255, 255, 0.66)',
          }}>
          <Lists.ToggleList
          listContainerStyle={{marginTop: getHp(10)}}
            listContentContainerStyle={{paddingBottom: getHp(20)}}
            searchQuery={searchQuery}
            searchFilter={Lists.ToggleList.SEARCH_FILTERS.FRIEND}
            ListTile={({item}) => ToggleFriendListTile(item, SVGICON, false)}
            heading={''}
            ListData={ListData}
          />
        </View>
      </View>
    );
  };
  const AllTabComponent = () => {
    // let ListData = bounceUsersStore.bounceUsers.concat(
    //   deviceContactsStore.deviceContacts,
    // );
    let ListData = MobxStore.authStore
      .getMyFriends()
      .concat(deviceContactsStore.deviceContacts);
    if (allSelectedUnSelectedTab == 0) {
      ListData = ListData.filter(li => {
        return (
          inviteFriendsModel.cohost.isDataExist(li).exist ||
          inviteFriendsModel.bounceInvites.isDataExist(li).exist ||
          inviteFriendsModel.contactInvites.isDataExist(li).exist
        );
      });
      let selectedCohstList = ListData.filter(li => {
        return inviteFriendsModel.cohost.isDataExist(li).exist;
      });
      let selectedInviteList = ListData.filter(li => {
        return inviteFriendsModel.bounceInvites.isDataExist(li).exist;
      });
      let selectedContactList = ListData.filter(li => {
        return inviteFriendsModel.contactInvites.isDataExist(li).exist;
      });
      ListData = [
        ...selectedCohstList,
        ...selectedInviteList,
        ...selectedContactList,
      ];
    }
    if (allSelectedUnSelectedTab == 1) {
      ListData = ListData.filter(li => {
        return (
          inviteFriendsModel.cohost.isDataExist(li).exist == false &&
          inviteFriendsModel.bounceInvites.isDataExist(li).exist == false &&
          inviteFriendsModel.contactInvites.isDataExist(li).exist == false
        );
      });
    }
    //ListData = copyArrayInItself(ListData, 100);
    return (
      <View style={[styles.allComponentContainer]}>
        {SearchBarComponent({
          placeholder: 'Search Friends or Contacts',
          containerStyle: styles.searchContainer,
        })}
        <AppTabs.SelectedUnselectedTabs
          tabContainerStyle={{marginTop: getHp(10)}}
          selectedTabIndex={allSelectedUnSelectedTab}
          onSelect={(tab, i) => {
            if (i == allSelectedUnSelectedTab) {
              return setAllSelectedUnSelectedTab(null);
            }
            setAllSelectedUnSelectedTab(i);
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
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(255, 255, 255, 0.66)',
            //borderWidth:1,
          }}>
          <Lists.ToggleList
            listContainerStyle={{marginTop: getHp(10)}}
            listContentContainerStyle={{paddingBottom: getHp(20)}}
            searchQuery={searchQuery}
            searchFilter={Lists.ToggleList.SEARCH_FILTERS.FRIEND.concat(
              Lists.ToggleList.SEARCH_FILTERS.Contact,
            )}
            ListTile={({item}) => ToggleFriendListTile(item)}
            heading={null}
            ListData={[...ListData]}
          />
        </View>
      </View>
    );
  };
  const TabConfig = [
    {
      heading: 'All',
      Component: AllTabComponent,
    },
    {
      heading: 'My Friends',
      Component: OnBounceTabComponent,
    },
    {
      heading: 'Contact',
      Component: ContactTabComponent,
    },
  ];

  let modeObj = useMemo(() => {
    return {
      title:
        inviteFriendsModel.mode == InviteFriendsModel.Mode.Friends
          ? 'Add Cohosts'
          : 'Confirm',
      onPress: () => {
        if (inviteFriendsModel.mode == InviteFriendsModel.Mode.Friends) {
          setActiveTab(1);
          onBounceSetSelectedUnSelectedTab(null);
          setTimeout(() => {
            return inviteFriendsModel.switchToCohostMode();
          }, 100);
        } else {
          inviteFriendsModel.switchToFriendsMode();
        }
      },
    };
  }, [inviteFriendsModel.mode]);

  const PageTabs = (
    <AppTabs.CommonTabs
      tabsProps={{
        initialPage: 0,
        page: activeTab,
      }}
      onChangeTab={(tab, i) => {
        setSearchQuery('');
        setActiveTab(i);
        inviteFriendsModel.switchToFriendsMode();
        setAllSelectedUnSelectedTab(null);
        onBounceSetSelectedUnSelectedTab(null);
        contactSetSelectedUnSelectedTab(null);
      }}
      tabContainerStyle={{height: 50}}
      tabData={TabConfig}
      polygonConfig={[getWp(47), getWp(180), getWp(320)]}
      polygonContainerStyle={{top: 32}}
    />
  );

  const SelectAllBTN = useMemo(() => {
    let btnMode = {
      onPress: onSelectAll.bind(null, 0),
      heading: 'Select All',
    };
    if (
      allSelectedUnSelectedTab == 0 ||
      onBounceSelectedUnSelectedTab == 0 ||
      contactSelectedUnSelectedTab == 0
    ) {
      btnMode.onPress = onSelectAll.bind(null, 1);
      btnMode.heading = 'UnSelect All';
    }
    return (
      <Buttons.PrimaryButton
        onPress={btnMode.onPress}
        title={btnMode.heading}
      />
    );
  });
  // console.log(
  //   'ANDROID_CHECj = ',
  //   JSON.stringify(deviceContactsStore.deviceContacts),
  // );
  let renderGuestList = createEditGuestListModel.isAtleastAnyGuestPresent();
  //renderGuestList = true;
  return (
    <Scaffold
      contentContainerStyle={{backgroundColor: '#FBFBFB'}}
      statusBarStyle={{backgroundColor: '#FFF'}}>
      <View>
        <Headers.BackTile
          onBackPress={() => {
            props.navigation.goBack();
          }}
          containerStyle={{backgroundColor: '#FFF'}}
          title={'Invite Friends'}
        />
        <TouchableOpacity
          onPress={() => {
            inviteFriendsModel.undo();
          }}
          style={styles.undoContainer}>
          <Text style={styles.undoText}>Undo</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        keyboardShouldPersistTaps={'always'}
        nestedScrollEnabled={true}
        bounces={false}
        alwaysBounceVertical={false}
        scrollEnabled={true}
        style={{backgroundColor: '#FBFBFB'}}>
        {renderGuestList && <GuestListSection {...props} />}
        <View style={{height: hp(renderGuestList ? 63 : 70), flex: 1}}>
          {PageTabs}
        </View>

        <View style={{backgroundColor: '#FBFBFB'}}>
          <View style={[styles.hostTray]}>
            <Buttons.PrimaryButton
              onPress={modeObj.onPress}
              title={modeObj.title}
              textColor={'#CF69FF'}
            />
            {SelectAllBTN}
          </View>
          <Buttons.LinearGradient
          touchContainerStyle={styles.sendItTouchContainer}
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
        </View>
        {/* <View style={{height: 40}} /> */}
      </ScrollView>
    </Scaffold>
  );
}

InviteFriends.routeName = '/InviteFriends';

export default observer(InviteFriends);

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
