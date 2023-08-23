import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';

import {Scaffold, Buttons} from '@components';
import {RequestSent, SendRequest, BlueTick, ShareSvg} from '@svg';
import {getHp, getWp} from '@utils';

import {Placeholder} from '@assets';
import MobxStore from '../../mobx';
import {observer} from 'mobx-react';
import styles from './indexCss';
import FriendTile from './FriendTile';
import SearchInput, {createFilter} from 'react-native-search-filter';
import MutualFriendTile from './MutualFriendTile';

function ContactList(props) {
  const {authStore} = MobxStore; 
  const {
    customHeading = '',
    searchQuery = '',
    mutual = true,
    dataList = [],
    minSize = 0,
    type,
    isMutualFriendSelected = () => {},
    onSelectMutualFriends = () => {},
    onSendFriendRequest = () => {},
    onPressShare = () => {},
  } = props;
  var FILTERS = {
    [ContactList.types.BounceFriends]: ['fullName'],
    [ContactList.types.MutualFriends]: ['fullName'],
    [ContactList.types.DeviceFriends]: ['givenName', 'familyName'],
  };
  const [showMore, setShowMore] = useState(false);
  const IconsForBounceFriendsection = item => {
    let userStatus = authStore.userFriendStatus(item.id);
    let icon = (
      <SendRequest height={27} width={25} style={{marginRight: getWp(0)}} />
    );
    if (userStatus.isRequestSend) {
      icon = <RequestSent height={50} width={50} style={{right: getWp(13)}} />;
    } else if (userStatus.isSendRequest) {
      icon = (
        <SendRequest height={27} width={25} style={{marginRight: getWp(0)}} />
      );
    } else if (userStatus.isFriend) {
      icon = (
        <BlueTick height={12} width={16} style={{marginRight: getWp(0)}} />
      );
    }
    return (
      <TouchableOpacity
        onPress={onSendFriendRequest.bind(null, item.id)}
        disabled={!userStatus.isSendRequest}
        style={{width: '7%'}}>
        {icon}
      </TouchableOpacity>
    );
  };

  const getRenderData = item => {
    const {BounceFriends, MutualFriends} = ContactList.types;
    let data = {
      city: '',
      avatarSource: null,
      fullName: '',
      icon: null,
      id: null,
    };
    if (type == BounceFriends || type == MutualFriends) {
      data.id = item.id;
      data.fullName = item.fullName;
      data.city = item.city;
      data.username = item.username;
      data.avatarSource =
        item?.profileImage == null
          ? Placeholder
          : {uri: item?.profileImage?.filePath};
      data.icon = IconsForBounceFriendsection(item);
    } else if (type == ContactList.types.DeviceFriends) {
      data.fullName = item.givenName + ' ' + item.familyName;
      data.city = '';
      data.avatarSource = !item.hasThumbnail
        ? Placeholder
        : {
            uri: item.thumbnailPath,
          };
      data.icon = (
        <TouchableOpacity onPress={onPressShare.bind(null, item)}>
          <ShareSvg height={25} width={25} style={{}} />
        </TouchableOpacity>
      );
    }
    if (data.avatarSource == null) {
      data.avatarSource = Placeholder;
    }
    return data;
  };
  const RenderItem = ({...data}) => {
    if (type == ContactList.types.MutualFriends) {
      return (
        <MutualFriendTile getRenderData={getRenderData} {...props} {...data} />
      );
    }
    return <FriendTile getRenderData={getRenderData} {...props} {...data} />;
  };

  const filteredData = dataList.filter(
    createFilter(searchQuery, FILTERS[type]),
  );
  const getListData = () => {
    return searchQuery.length > 0
      ? filteredData
      : minSize == 0
      ? dataList
      : !showMore
      ? dataList.slice(0, minSize)
      : dataList;
  };
  return (
    <View style={{marginVertical: getHp(10)}}>
      <Text style={styles.reviewsTitleStyle}>{customHeading.length == 0 ? type : customHeading}</Text>
      <FlatList
        data={getListData()}
        renderItem={RenderItem}
        keyExtractor={index => index}
      />
      {dataList.length > minSize && minSize > 0 && searchQuery.length == 0 && (
        <Buttons.ToggleShowMore
          showMore={showMore}
          itemLength={dataList.length - minSize}
          onButtonPress={() => setShowMore(i => !i)}
        />
      )}
    </View>
  );
}

ContactList.types = {
  BounceFriends: 'Find Friends',
  DeviceFriends: 'Contacts',
  MutualFriends: 'Mutual Friends',
};
export default observer(ContactList);