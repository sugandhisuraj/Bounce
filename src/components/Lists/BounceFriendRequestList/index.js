import React from 'react';

import {observer} from 'mobx-react';
import * as ListTiles from '../../ListTiles';
import ToggleList from '../ToggleList';
import MobxStore from '../../../mobx';
import Styles from './indexCss';
import { Text } from 'react-native';

const BounceFriendRequestList = props => {
  const {
    ListData,
    searchQuery,
    heading,
    minRender,
    onRightIconPress,
    onTitlePress,
    containerStyle,
    listContainerStyle,
    contentContainerStyle,
    tileType,
  } = props;
  const {bounceUsersStore} = MobxStore;

  const BounceFriendTileRender = ({item, index}) => {
     
    return (
      <ListTiles.BounceFriendRequestStatus
        tileType={tileType}
        onRightIconPress={onRightIconPress}
        onTitlePress={onTitlePress}
        friend={item}
        friendTileProp={{
          onAvatarPress: () => onTitlePress(item)
        }}
      />
    );
  };
  const ListDataCustom = bounceUsersStore.bounceUsersFilteredByBlocking;
  //bounceUsersStore.bounceUsers
  return (
    <ToggleList
      {...props}
      containerStyle={[Styles.container, containerStyle]}
      listContainerStyle={[Styles.listContainerStyle, listContainerStyle]}
      searchQuery={searchQuery}
      searchFilter={ToggleList.SEARCH_FILTERS.FRIEND}
      ListTile={BounceFriendTileRender}
      ListData={ListData ? ListData : ListDataCustom ?? []}
    />
  );
};

BounceFriendRequestList.defaultProps = {
  searchQuery: '',
  heading: 'All Friends',
  minRender: 0,
  onRightIconPres: null,
  onTitlePres: null,
  containerStyle: {},
  listContainerStyle: {},
  contentContainerStyle: {},
  ListData: null,
  tileType: null,
};
export default observer(BounceFriendRequestList);
