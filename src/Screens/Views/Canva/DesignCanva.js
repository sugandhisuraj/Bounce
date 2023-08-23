import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {observer} from 'mobx-react';
import styled from 'styled-components/native';

import {Scaffold, SearchPageTab} from '@components';
import {getHp} from '@utils';
import {useSearchBar} from '@hooks';
import MobxStore from '../../../mobx';
import {PartyService} from '../../../app/services';
import SearchEventScreen from '../../BounceUsers/SearchEvent';
import ToastUtil from '../../../app/constants/toast';
import SearchEventModel from '../../BounceUsers/SearchEvent/SearchEvent.model';
import { SearchEventDTO } from '../../../app/DTO';
function DesignCanva(props) {
  const {searchEvents} = MobxStore;
  const {searchQuery, SearchBarComponent} = useSearchBar();
  const searchEventModel = SearchEventModel.getInstance();
  const searchDTO = searchEventModel.searchDTO;
  const filterBody = searchDTO.toJSON();
  useEffect(() => {
    searchEventModel.searchDTO.reset();
    handleSubmit(new SearchEventDTO().toJSON());
  }, []);
  const handleSubmit = async body => {
    try {
      MobxStore.toggleLoader(true);
      await PartyService.searchEvents(body);
    } catch (error) {
      ToastUtil(error?.response?.data?.message ?? error.message ?? 'Something went wrong! Try again');
      return Promise.reject(error);
    } finally {
      MobxStore.toggleLoader(false);
    }
  };
  const onFilterApply = async filteredBody => {
    try {
      await handleSubmit(filteredBody);
    } catch (error) {
      return Promise.reject(error);
    }
  };
  const onPressSearchBar = () => {
    props.navigation.navigate(SearchEventScreen.routeName, {
      screenType: SearchEventScreen.screenTypes.SearchEvent,
      onFilterApply,
    });
  };
  return (
    <Scaffold statusBarStyle={{backgroundColor: '#FFFFFF'}}>
      {SearchBarComponent({
        StyledComponent: Styled.SearchContainer,
        containerStyle: Styles.searchContainer,
        placeholder: 'Search',
        isTouchable: searchEvents.activeTab == 0,
        onPress: onPressSearchBar,

        value: searchEvents.activeTab == 0 ? '' : searchEvents.searchText,
        onChangeText: t => searchEvents.setSearchText(t),
        searchQuery: searchEvents.activeTab == 0 ? '' : searchEvents.searchText,
      })}
      <SearchPageTab {...props} />
    </Scaffold>
  );
}

const Styles = StyleSheet.create({
  searchContainer: {
    height: getHp(35),
    width: '90%',
    backgroundColor: 'white',
    elevation: 5,
    alignSelf: 'center',
    marginBottom: getHp(5),
  },
});
const Styled = {
  SearchContainer: styled.View`
    background: #ffffff;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.15);
    border-radius: 10px;
  `,
};
DesignCanva.routeName = '/DesignCanva';
export default observer(DesignCanva);
