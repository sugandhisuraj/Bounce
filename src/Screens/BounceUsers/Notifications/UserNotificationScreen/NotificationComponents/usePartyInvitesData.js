import React, {useMemo} from 'react';
 
import { PartyService,AppNotificationService } from '../../../../../app/services';
import {Lists, ListTiles} from '../../../../../components'; 
import {filterArrayByDate, getHp} from '../../../../../app/utils';
import MobxStore from '../../../../../mobx';
import ToastUtil from '../../../../../app/constants/toast';
import HostView from '../../../../BounceVendors/PlanParty/HostView';

const usePartyInvitesData = (props) => {
  const {notificationsStore} = MobxStore; 
  let cohostInvites = notificationsStore?.cohostInvites?.slice() ?? [];
    let partyInvites = notificationsStore?.partyInvites?.slice() ?? [];
  const partyInvitesData = cohostInvites.concat(partyInvites) ?? [];  



  const onCohostActionPress = async (action, cohost) => {
    try {
      MobxStore.toggleLoader(true);
      let response = null;
      if (action == ListTiles.CohostInviteTile.actions.Accept) {
        response = await PartyService.acceptCohostInvite(
          cohost?.party?.id,
          cohost.setByUser,
        );
      } else {
        response = await PartyService.denyCohostInvite(cohost?.party?.id);
      }
      await AppNotificationService.getUserNotification();
      ToastUtil(response?.message ?? 'Request Successfully Processed', {
        duration: 2000,
      });
    } catch (error) {
      let msg =
        error?.response?.data?.message ?? 'Something went wrong! Try Again';
      ToastUtil(msg, {duration: 2000});
    } finally {
      MobxStore.toggleLoader(false);
    }
  };


  const onInvitePartyTilePress = inviteData => {
    // props.navigation.navigate(HostView.routeName, {
    //   party: inviteData.party,
    // });
    PartyService.navigationToEventPageOrNewsFeed(inviteData.party);
  };

  const NotificationData = useMemo(() => {
    if (partyInvitesData.length == 0) {
      return [];
    }
    return filterArrayByDate(partyInvitesData.slice()) ?? [];
  }, [notificationsStore.cohostInvites, notificationsStore.partyInvites]);

  const createdAt = useMemo(() => {
    if (NotificationData.length == 0) {
      return null;
    }
    return NotificationData[0]?.createdAt ?? null;
  }, [notificationsStore.cohostInvites, notificationsStore.partyInvites]);
  const NotificationComponent = useMemo(() => {
    if (NotificationData.length == 0) {
      return null;
    }
    return (
        <Lists.PartyInvites
        cohostInviteTileProps={{
          onCohostActionPress,
        }}
        inviteTileProps={{
          onInvitePartyTilePress,
        }}
        heading={'Invites'}
        ListData={NotificationData}
        listContainerStyle={{marginTop: getHp(20)}}
      />
    );
  }, [notificationsStore.cohostInvites, notificationsStore.partyInvites]);

  return {
    createdAt,
    NotificationData,
    NotificationComponent,
  };
};

export default usePartyInvitesData; 

/*

 const partyInvitesData = useMemo(() => {
    const returnData = {
      Component: null,
      partyInvitesByDesc: [],
      createdAt: null,
    };
    returnData.partyInvitesByDesc = filterArrayByDate(
      notificationsStore.cohostInvites
        .slice()
        .concat(notificationsStore.partyInvites.slice()),
    );
    if (returnData.partyInvitesByDesc.length == 0) {
      return returnData;
    }
    returnData.createdAt = returnData.partyInvitesByDesc[0].createdAt;
    returnData.Component = (
      <Lists.PartyInvites
        cohostInviteTileProps={{
          onCohostActionPress,
        }}
        inviteTileProps={{
          onInvitePartyTilePress,
        }}
        heading={'Invites'}
        ListData={returnData.partyInvitesByDesc}
        listContainerStyle={{marginTop: getHp(20)}}
      />
    );
    return returnData;
  }, [notificationsStore.cohostInvites, notificationsStore.partyInvites]);
  */