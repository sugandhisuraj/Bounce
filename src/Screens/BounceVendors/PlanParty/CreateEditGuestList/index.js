import React, {useState, useMemo} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {observer} from 'mobx-react';

import {
  Scaffold,
  Header,
  AppTabs,
  Buttons,
  ListTiles,
  Lists,
} from '@components';
import HostViewModel from '../HostView/HostViewModel';
import InviteFriendsModel from '../InviteFriends/InviteFriendsModel';
import CreateEditGuestListModel from './CreateEditGuestListModel';
import {getWp, getHp, hp, wp, FONTSIZE} from '@utils';
import Styles from './indexCss';
import {useSearchBar} from '@hooks';
import MobxStore from '../../../../mobx';
import {CloseGreyCircularSvg} from '@svg';
import {PartyGuestService} from '../../../../app/services';
import ToastUtil from '../../../../app/constants/toast';

const CreateEditGuestListScreen = props => {
  const {
    searchQuery,
    SearchBarComponent,
    onChangeText: setSearchQuery,
  } = useSearchBar();
  const [currentRootTab, setCurrentRootTab] = useState(0);
  const {bounceUsersStore} = MobxStore;
  const hostViewModel = HostViewModel.instance();
  const createEditGuestListModel = CreateEditGuestListModel.instance();

  const {currentParty} = hostViewModel;
  let preSelectedGuests = createEditGuestListModel.preSelectedGuests.data();
  let newlyAddedGuests = createEditGuestListModel.newlyAddedGuests.data();

  const onContinueWithGuests = async () => {
    try {
      if (preSelectedGuests.length == 0 && newlyAddedGuests.length == 0) {
        return ToastUtil("GuestList can't be empty! Add atleast 1 guest", {
          duration: 2000,
        });
      }
      MobxStore.toggleLoader(true);
      let addGuestResponse = null;
      let editGuestResponse = await PartyGuestService.editGuestsInGuestList(
        createEditGuestListModel.currentOperateGuestList.id,
        preSelectedGuests,
      );
      if (newlyAddedGuests.length > 0) {
        addGuestResponse = await PartyGuestService.addGuestsInGuestList(
          createEditGuestListModel.currentOperateGuestList.id,
          newlyAddedGuests,
        );
      }

      createEditGuestListModel.newlyAddedGuests.reset();
      await createEditGuestListModel.fetchGuestLists(true);
      setCurrentRootTab(0);
      console.log('ADD_GUEST_RESPONSE - ', addGuestResponse);
      console.log('EDIT_GUEST_RESPONSE - ', editGuestResponse);
      ToastUtil('Guest List Successfully Updated');
    } catch (error) {
      console.log('ERROR_GUEST_LIST_CONTINUE - ', error);
      ToastUtil(
        error?.response?.data?.message ?? 'Something went wrong! Try Again',
      );
    } finally {
      MobxStore.toggleLoader(false);
    }
  };
  const isFriendSelected = friend => {
    if (currentRootTab == 0) {
      return {
        exist: true,
        SVGComponent: <CloseGreyCircularSvg />,
      };
    }
    return createEditGuestListModel.newlyAddedGuests.isDataExist(friend).exist;
  };
  const onRightIconPress = friend => {
    if (currentRootTab == 0) {
      return createEditGuestListModel.preSelectedGuests.toggle(friend);
    }
    return createEditGuestListModel.newlyAddedGuests.toggle(friend);
  };

  const GuestListComponent = () => {
    let tileStyles = {
      tileIconContainerStyle: {width: '15%'},
      tileTitleContainerStyle: {width: '70%'},
    };
    let ListData = preSelectedGuests;
    return (
      <View style={[Styles.tabContainerRootStyle]}>
        {SearchBarComponent({
          placeholder: 'Search',
          containerStyle: Styles.searchContainer,
        })}
        <View style={Styles.listViewWrapperContainer}>
          <Lists.ToggleFriendList
            listProps={{
              listContainerStyle: {marginTop: getHp(15)},
              listContentContainerStyle: {
                paddingBottom: getHp(40),
              },
              searchQuery,
            }}
            listTileProps={{
              tileStyles,
              isFriendSelected: isFriendSelected,
              onRightIconPress: onRightIconPress,
            }}
            searchFilter={Lists.ToggleList.SEARCH_FILTERS.FRIEND}
            heading={''}
            ListData={ListData}
          />
        </View>
      </View>
    );
  };

  const AddGuestsComponent = () => {
    let tileStyles = {
      tileIconContainerStyle: {width: '15%'},
      tileTitleContainerStyle: {width: '70%'},
    };
    let ListData = bounceUsersStore.bounceUsers.filter(u => {
      return (
        createEditGuestListModel.preSelectedGuests.isDataExist(u).exist ==
        false
      );
    });
    return (
      <View style={[Styles.tabContainerRootStyle]}>
        {SearchBarComponent({
          placeholder: 'Search',
          containerStyle: Styles.searchContainer,
        })}
        <View style={Styles.listViewWrapperContainer}>
          <Lists.ToggleFriendList
            listProps={{
              listContainerStyle: {marginTop: getHp(15)},
              listContentContainerStyle: {
                paddingBottom: getHp(40),
              },
              searchQuery,
            }}
            listTileProps={{
              tileStyles,
              isFriendSelected: isFriendSelected,
              onRightIconPress: onRightIconPress,
            }}
            searchFilter={Lists.ToggleList.SEARCH_FILTERS.FRIEND}
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
        heading: 'Guest List',
        Component: GuestListComponent,
      },
      {
        heading: 'Add Guests',
        Component: AddGuestsComponent,
      },
    ];
  }, [
    searchQuery,
    bounceUsersStore.bounceUsers,
    preSelectedGuests,
    newlyAddedGuests,
    currentRootTab,
  ]);
  const GuestListPageTabs = useMemo(() => {
    return (
      <AppTabs.CommonTabs
        tabsProps={{
          initialPage: 0,
          page: currentRootTab,
        }}
        onChangeTab={(tab, i) => {
          setCurrentRootTab(i);
          setSearchQuery('');
        }}
        tabContainerStyle={{height: 50}}
        tabData={TabConfig}
        polygonConfig={[getWp(75), getWp(285)]}
        polygonContainerStyle={{top: 33.5}}
      />
    );
  }, [TabConfig]);

  return (
    <Scaffold statusBarStyle={{backgroundColor: '#FFF'}}>
      <Header
        onPress={() => {
          props.navigation.goBack();
        }}
        back
        headerContainerStyle={{backgroundColor: '#FFF'}}
        headerTitle={
          createEditGuestListModel.currentOperateGuestList?.title ?? ''
        }
      />
      <View style={Styles.pageTabsContainer}>{GuestListPageTabs}</View>
      <Buttons.LinearGradient
        onPress={onContinueWithGuests}
        title={'Continue'}
        titleStyle={{
          letterSpacing: 0.3,
          fontWeight: '700',
          fontSize: FONTSIZE.Text18,
        }}
        showArrow={false}
        linearGradientStyle={{
          marginVertical: 15,
          width: '95%',
          height: getHp(42),
          alignSelf: 'center',
          borderRadius: getHp(20),
        }}
      />
    </Scaffold>
  );
};
CreateEditGuestListScreen.routeName = '/CreateEditGuestListScreen';
export default observer(CreateEditGuestListScreen);
