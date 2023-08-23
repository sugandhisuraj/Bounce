import React, {Fragment} from 'react';

import {ListTiles, Lists} from '@components';

const ToggleFriendList = props => {
  const {ListData, heading, ListTile, listTileProps, listProps} = props;

  const RenderItem = ({item}) => {
    return <ListTile friend={item} {...listTileProps} />;
  };
  return (
    <Lists.ToggleList
      {...listProps}
      searchFilter={Lists.ToggleList.SEARCH_FILTERS.FRIEND}
      ListTile={RenderItem}
      heading={heading}
      ListData={ListData}
    />
  );
};
ToggleFriendList.defaultProps = {
  heading: '',
  ListData: [],
  ListTile: ListTiles.ToggleFriendTile,
  listTileProps: {},
  listProps: {},
};
export default ToggleFriendList;
