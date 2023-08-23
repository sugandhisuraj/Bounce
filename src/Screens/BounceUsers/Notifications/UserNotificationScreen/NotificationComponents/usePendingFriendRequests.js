import React, {useMemo} from 'react'; 

import {FriendRequest} from '@components';
import {filterArrayByDate,} from '../../../../../app/utils';
import MobxStore from '../../../../../mobx';

const usePendingFriendRequests = () => { 
  const {authStore} = MobxStore;
  const userinfo = authStore.user;
  const userPendingRequests = userinfo?.user?.pendingRequests?.slice() ?? [];

  const NotificationData = useMemo(() => {
    if (userPendingRequests.length == 0) {
      return [];
    }
    return filterArrayByDate(userPendingRequests.slice()) ?? [];
  }, [userinfo]);

  const createdAt = useMemo(() => {
    if (NotificationData.length == 0) {
      return null;
    }
    return NotificationData[0]?.createdAt ?? null;
  }, [userinfo]);
  const NotificationComponent = useMemo(() => {
    if (NotificationData.length == 0) {
      return null;
    }
    return (
      <FriendRequest
        Message_Stack={NotificationData}
        heading={'Pending Friend Requests'}
        type={FriendRequest.types.OutgoingRequest}
      />
    );
  }, [userinfo]);

  return {
    createdAt,
    NotificationData,
    NotificationComponent,
  };
};

export default usePendingFriendRequests;

/*
const pendingFriendRequests = useMemo(() => {
    let returnData = {
      Component: null,
      pendingRequestByDesc: [],
      createdAt: null,
    };
    returnData.pendingRequestByDesc = filterArrayByDate(
      userinfo?.user?.pendingRequests?.slice() ?? [],
    );
    if (returnData.pendingRequestByDesc.length == 0) {
      return returnData;
    }
    returnData.createdAt = returnData.pendingRequestByDesc[0].createdAt;
    returnData.Component = (
      <FriendRequest
        Message_Stack={returnData.pendingRequestByDesc}
        heading={'Pending Friend Requests'}
        type={FriendRequest.types.OutgoingRequest}
      />
    );
    return returnData;
  }, [userinfo?.user?.pendingRequests]);
  */
