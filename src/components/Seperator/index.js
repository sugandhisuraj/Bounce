import React from 'react';
import {StyleSheet, View} from 'react-native';

const Seperator = props => {
  const {containerStyle = {}} = props;
  return <View style={[styles.container, containerStyle]} />;
};
const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
});
export default Seperator;
