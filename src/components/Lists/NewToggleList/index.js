import React from 'react';
import {View, FlatList, Text} from 'react-native';
import {Divider} from 'react-native-elements';
import {createFilter} from 'react-native-search-filter';

import {observer} from 'mobx-react';
import Styles from './indexCss';
import {useToggleShowMore} from '../../../app/hooks';
const NewToggleList = props => {
  const {
    ListData,
    ListTile,
    heading,
    containerStyle,
    headingTextStyle,
    listViewContainerStyle,
    flatListStyle,
    flatListContentContainerStyle,
    dividerStyle,
    searchQuery,
    searchFilter,
    minRender,
    toggleShowMoreContainerStyle,
    CustomDivider,
    flatListProps,
  } = props;

  const {showMore, ToggleShowMoreComponent} = useToggleShowMore();

  const renderFlatListCheck = () => {
    let returnVal = {
      renderShowMoreBtn: false,
      data: ListData,
    };
    if (searchQuery.length > 0 && searchFilter.length > 0) {
      returnVal.data = ListData.filter(createFilter(searchQuery, searchFilter));
    } else {
      if (minRender && minRender > 0 && minRender < ListData.length) {
        returnVal.renderShowMoreBtn = true;
        returnVal.data = ListData.slice(
          0,
          showMore ? ListData.length : minRender,
        );
      }
    }
    return returnVal;
  };

  const flatListDetails = renderFlatListCheck();
  let divider = CustomDivider ? (
    CustomDivider
  ) : (
    <Divider style={[Styles.dividerStyle, dividerStyle]} />
  );
  return (
    <View style={[Styles.container, containerStyle]}>
      <Text style={[Styles.headingText, headingTextStyle]}>{heading}</Text>
      <View style={[Styles.listViewContainer, listViewContainerStyle]}>
        <FlatList
          nestedScrollEnabled={true}
          {...flatListProps}
          contentContainerStyle={[
            Styles.flatListContentContainerStyle,
            flatListContentContainerStyle,
          ]}
          ItemSeparatorComponent={() => divider}
          style={[Styles.flatListStyle, flatListStyle]}
          data={flatListDetails.data}
          renderItem={ListTile}
        />
      </View>
      {flatListDetails.renderShowMoreBtn && (
        <ToggleShowMoreComponent
          containerStyle={[
            Styles.toggleShowMoreContainer,
            toggleShowMoreContainerStyle,
          ]}
          itemLength={ListData.length - minRender}
        />
      )}
    </View>
  );
};

NewToggleList.defaultProps = {
  heading: 'Heading',
  containerStyle: {},
  headingTextStyle: {},
  listViewContainerStyle: {},
  flatListStyle: {},
  flatListContentContainerStyle: {},
  dividerStyle: {},
  ListData: [],
  ListTile: null,
  searchQuery: '',
  searchFilter: [],
  minRender: null,
  toggleShowMoreContainerStyle: {},
  CustomDivider: null,
  flatListProps: {},
};
NewToggleList.SEARCH_FILTERS = {};
NewToggleList.SEARCH_FILTERS.FRIEND = ['fullName'];
NewToggleList.SEARCH_FILTERS.Contact = ['getName'];
NewToggleList.SEARCH_FILTERS.Party = ['title'];
NewToggleList.SEARCH_FILTERS.HireVendorList = ['fullName'];
export default observer(NewToggleList);
