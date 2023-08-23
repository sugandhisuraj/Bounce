import React, {Fragment} from 'react';
import {View, Text, FlatList} from 'react-native';
import {observer} from 'mobx-react';

import {Seperator} from '../..';
import {useToggleShowMore} from '../../../app/hooks';
import {getHp} from '../../../app/utils';
import Styles from './indexCss';
import {createFilter} from 'react-native-search-filter';
const ToggleList = props => {
  const {
    minRender = 0,
    heading = 'List Heading',
    ListData = [],
    ListTile,
    containerStyle = {},
    headingStyle = {},
    listContainerStyle = {},
    searchQuery = '',
    searchFilter = [],
    FooterComponent,
    listContentContainerStyle = {},
    listContainerViewStyle = {},
    seperatorContainerStyle = {},
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
  return (
    <View style={[Styles.container, containerStyle]}>
      {(heading != undefined) && heading?.length > 0 && (
        <Text style={[Styles.heading, headingStyle]}>{heading}</Text>
      )}

      {flatListDetails.data.length > 0 && (
        <View
          style={[
            listContainerViewStyle,
            // !showMore && minRender && {
            //   height: getHp(100) * minRender,
            // },
            // minRender == 0 && {
            //   height: getHp(80) * flatListDetails.data.length,
            // },
          ]}>
          <FlatList
          showsVerticalScrollIndicator={false}
            bounces={false}
            nestedScrollEnabled={true}
            alwaysBounceVertical={false}
            keyExtractor={(item, index) => item?.id ?? index}
            contentContainerStyle={[listContentContainerStyle]}
            ItemSeparatorComponent={() => (
              <Seperator
                containerStyle={[
                  {marginVertical: getHp(15)},
                  seperatorContainerStyle,
                ]}
              />
            )}
            style={[Styles.listContainer, listContainerStyle]}
            data={flatListDetails.data}
            renderItem={ListTile}
          />
          {flatListDetails.renderShowMoreBtn && (
            <ToggleShowMoreComponent itemLength={ListData.length - minRender} />
          )}
          {FooterComponent && <FooterComponent />}
        </View>
      )}
    </View>
  );
};
ToggleList.SEARCH_FILTERS = {};
ToggleList.SEARCH_FILTERS.FRIEND = ['fullName'];
ToggleList.SEARCH_FILTERS.Contact = ['getName'];
export default observer(ToggleList);
