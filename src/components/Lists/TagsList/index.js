import React from 'react';
import {Text, View, FlatList} from 'react-native';

import Styles from './indexCss';

const TagsList = props => {
  const {
    containerStyle,
    heading,
    headingStyle,
    ListData,
    listViewStyle,
    listStyle,
    listContainerStyle,
    ListTile,
  } = props;

  return (
    <View style={[Styles.container, containerStyle]}>
      {heading && heading.length > 0 && (
        <Text style={[Styles.heading, headingStyle]}>{heading} </Text>
      )}
      <View style={[Styles.listView, listViewStyle]}>
        <FlatList
          data={ListData}
          style={[Styles.listStyle, listStyle]}
          contentContainerStyle={[
            Styles.listContainerStyle,
            listContainerStyle,
          ]}
          renderItem={ListTile}
        />
      </View>
    </View>
  );
};
TagsList.defaultProps = {
  containerStyle: {},
  heading: 'Add Heading',
  headingStyle: {},
  ListData: [],
  listViewStyle: {},
  listStyle: {},
  listContainerStyle: {},
  ListTile: null,
};

export default TagsList;
