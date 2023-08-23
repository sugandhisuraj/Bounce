import React, {Fragment, useState} from 'react';
import {View} from 'react-native';
import {observer} from 'mobx-react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Divider} from 'react-native-elements';

import {Buttons, ListTiles} from '@components';
import CreateEditGuestListModel from '../CreateEditGuestList/CreateEditGuestListModel';
import Styles from './indexCss';
import {getHp, getWp} from '@utils';
import ToastUtil from '../../../../app/constants/toast';
import CreateEditGuestList from '../CreateEditGuestList';
import InviteFriendsModel from '../InviteFriends/InviteFriendsModel';
import {BlueTick} from '@svg';

AntDesign.loadFont();
const GuestListSection = props => {
  const [showGuestList, setShowGuestList] = useState(false);
  const inviteFriendsModel = InviteFriendsModel.instance();
  const createEditGuestListModel = CreateEditGuestListModel.instance();
  let guestLists = createEditGuestListModel.allGuestLists();

  const onGuestListItemPress = (itemType, gList) => {
    if (itemType == ListTiles.GuestTile.MenuOptions.Edit) {
      createEditGuestListModel.setCurrentOperateGuestList(gList);
      props.navigation.navigate(CreateEditGuestList.routeName);
    } else {
      //return ToastUtil('Under Development');
    }
  };

  const onGuestListTilePress = gList => {
    if (gList.guestList && gList.guestList.length == 0) {
      return;
    }
    let isGuestListAlreadyChecked =
      createEditGuestListModel.selectedGuestLists.isDataExist(gList).exist;
    if (isGuestListAlreadyChecked) {
      return createEditGuestListModel.selectedGuestLists.removeDataIfExist(
        gList,
      );
    }

    createEditGuestListModel.selectedGuestLists.toggle(gList);

    let allInvites = gList.guestList.map(i => i.guest);
    // let confirmedInvites = allInvites.filter(inv => {
    //   return inviteFriendsModel.cohost.isInviteExist(inv).exist == false;
    // });
    inviteFriendsModel.bounceInvites.addDatas(allInvites);
  };
  const renderGuestsList = (guestList, index, arrLen) => {
    let shouldRenderGuestList = guestList?.guestList?.length > 0 ?? false;
    if (!shouldRenderGuestList) {
      return null;
    }
    return (
      <Fragment>
        <ListTiles.GuestTile
          isSelected={
            createEditGuestListModel.selectedGuestLists.isDataExist(guestList)
              .exist
          }
          onTilePress={onGuestListTilePress}
          onMenuPress={onGuestListItemPress}
          guestListData={guestList}
        />
        {!(arrLen.length -1 == index) &&  <Divider style={{marginVertical: getHp(0)}} />}
      </Fragment>
    );
  };
  return (
    <View style={{backgroundColor: '#FBFBFB'}}>
      <Buttons.ToggleIconButton
        onPress={() => setShowGuestList(s => !s)}
        containerStyle={[
          Styles.savedGuestListContainerStyle,
          createEditGuestListModel.selectedGuestLists.data().length > 0 && {
            backgroundColor: 'rgba(31, 174, 247, 0.13)',
          },
        ]}
        title={'Saved Guest List'}
        Icon={
          <AntDesign
            color={'black'}
            size={getHp(20)}
            name={showGuestList ? 'down' : 'right'}
          />
        }
        RightIcon={
          createEditGuestListModel.selectedGuestLists.data().length > 0 ? (
            <View style={[Styles.absoluteCheckIconStyle]}>
              <BlueTick />
            </View>
          ) : null
        }
      />

      {showGuestList && guestLists?.map(renderGuestsList)}
    </View>
  );
};

export default observer(GuestListSection);
