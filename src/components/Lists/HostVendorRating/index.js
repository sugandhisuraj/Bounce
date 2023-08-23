import React from 'react';
import {Text, View} from 'react-native';
import {NewToggleList} from '..';
import {ListTiles} from '../..';

import Styles from './indexCss';
const HostVendorRating = props => {
  const {ratings} = props;
  const ListTile = ({item}) => {
    return <ListTiles.VendorReviewTile reviewData={item} />;
  };
  return (
    <NewToggleList heading={'Reviews'} 
    containerStyle={[Styles.listContainerStyle]}
    ListData={ratings} ListTile={ListTile} 
    CustomDivider={<View />}/>
  );
};

export default HostVendorRating;
