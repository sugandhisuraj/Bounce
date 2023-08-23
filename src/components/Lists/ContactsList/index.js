import React from 'react';

import {observer} from 'mobx-react';
import * as ListTiles from '../../ListTiles';
import ToggleList from '../ToggleList';
import MobxStore from '../../../mobx';
import Styles from './indexCss';

const ContactsList = props => {
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
    tileStyles = {}
  } = props;
  const {deviceContactsStore} = MobxStore;

  const ContactFriendTileRender = ({item, index}) => {
    return (
      <ListTiles.ContactTile
        {...tileStyles}
        onRightIconPress={onRightIconPress}
        onTitlePress={onTitlePress}
        contact={item}
      />
    );
  };
  return (
    <ToggleList 
      heading={heading}
      containerStyle={[Styles.container, containerStyle]}
      listContainerStyle={[Styles.listContainerStyle, listContainerStyle]}
      searchQuery={searchQuery}
      searchFilter={ToggleList.SEARCH_FILTERS.Contact}
      ListTile={ContactFriendTileRender}
      ListData={ListData ? ListData : deviceContactsStore.deviceContacts ?? []}
    />
  );
};

ContactsList.defaultProps = {
  searchQuery: '',
  heading: 'Contacts',
  minRender: 0,
  onRightIconPres: null,
  onTitlePres: null,
  containerStyle: {},
  listContainerStyle: {},
  contentContainerStyle: {},
  ListData: null,
};
export default observer(ContactsList);
