import React, {useMemo} from 'react';

import {FriendRequest} from '@components';
import {filterArrayByDate} from '../../../../../app/utils';
import MobxStore from '../../../../../mobx';

const useIncommingFriendRequests = () => {
  const {authStore} = MobxStore;
  const userinfo = authStore.user;
  const userIncommingRequests = userinfo?.user?.incomingRequests?.slice() ?? [];

  const NotificationData = useMemo(() => {
    if (userIncommingRequests.length == 0) {
      return [];
    }
    return filterArrayByDate(userIncommingRequests.slice()) ?? [];
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
        heading={'Friend Requests'}
        type={FriendRequest.types.InCommingRequest}
      />
    );
  }, [userinfo]);

  return {
    createdAt,
    NotificationData,
    NotificationComponent,
  };
};

export default useIncommingFriendRequests;

/*
 const incommingFriendRequests = useMemo(() => {
    const returnData = {
      Component: null,
      incomingRequestByDesc: [],
      createdAt: null,
    };
    returnData.incomingRequestByDesc = filterArrayByDate(
      userinfo?.user?.incomingRequests?.slice() ?? [],
    );
    if (returnData.incomingRequestByDesc.length == 0) {
      return returnData;
    }
    returnData.createdAt = returnData.incomingRequestByDesc[0].createdAt;
    returnData.Component = (
      <FriendRequest
        Message_Stack={returnData.incomingRequestByDesc}
        heading={'Friend Requests'}
        type={FriendRequest.types.InCommingRequest}
      />
    );

    return returnData;
  }, [userinfo?.user?.incomingRequests]);
  */
