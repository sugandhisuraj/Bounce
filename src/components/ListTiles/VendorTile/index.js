import React, {Fragment, useState, useCallback} from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {Avatar} from 'react-native-elements';

import {
  SelectedBlueTick,
  SelectedDollar,
  RedHeart,
  BlackOutlineShare,
  BlackOutlineHeart,
} from '@svg';
import * as Placeholder from '../../Placeholder';
import {getHp, getWp} from '../../../app/utils';
import Styles from './indexCss';
import {VendorFieldsData} from '../../../app/constants';
const VendorTile = props => {
  const {
    isSelected,
    onAvatarTitlePress,
    onTilePress,
    containerStyle,
    vendorData,
    textLength,
    onFavoritePress,
    renderCategoryAsSubtitle,
  } = props;

  let text = vendorData.about;
  //text = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`;
  let city = vendorData?.city ?? '';
  let shouldRenderShowMore = text.length > textLength;

  const [showMore, setShowMore] = useState(false);
  const toggleShowMore = useCallback(() => setShowMore(i => !i), []);

  let textContent = text;
  if (textLength) {
    textContent = text.substr(0, showMore ? text.length : textLength);
  }

  let FavSvg = BlackOutlineHeart;
  if (vendorData.isFavourite) {
    FavSvg = RedHeart;
  }
  let categoryTitle = '';
  if (renderCategoryAsSubtitle) {
    categoryTitle = VendorFieldsData.VendorFieldsData.getCategory(
      vendorData.vendorType,
    ).vendorCategory;
  }
  return (
    <TouchableOpacity
      style={[Styles.container, containerStyle]}
      disabled={!onTilePress}
      onPress={() => onTilePress(vendorData)}>
      <View style={[Styles.avatarVendorInfoContainer]}>
        <TouchableOpacity
          disabled={!onAvatarTitlePress}
          onPress={() => onAvatarTitlePress(vendorData)}
          style={{
            flexDirection: 'row',
            borderWidth: 0,
          }}>
          <Avatar
            source={{
              uri: vendorData.profileImage?.filePath,
            }}
            size={getHp(50)}
            rounded
          />
          <View style={[Styles.vendorNameInfoContainer]}>
            <Text style={[Styles.vendorNameText]}>{vendorData.fullName}</Text>
            <Text style={[Styles.vendorCityText]}>
              {categoryTitle.length > 0
                ? categoryTitle
                : city && city != 'null' && city.split(',', 1)}
            </Text>
          </View>
        </TouchableOpacity>
        {isSelected(vendorData) && (
          <SelectedBlueTick height={getHp(40)} width={getHp(40)} />
        )}
      </View>

      <Text style={[Styles.vendorDescriptionText]}>
        {textContent}
        {shouldRenderShowMore && !showMore && <Text>... </Text>}
        {shouldRenderShowMore && (
          <TouchableOpacity onPress={toggleShowMore}>
            <Text style={[Styles.showMore]}>
              {' '}
              view {showMore ? 'less' : 'more'}
            </Text>
          </TouchableOpacity>
        )}
      </Text>
      <View style={[Styles.footerTray]}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <SelectedDollar height={getHp(25)} width={getHp(25)} />
          <Text style={[Styles.pricePerHourText]}>{` 25 / hr`}</Text>
        </View>

        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            disabled={!onFavoritePress}
            onPress={() => onFavoritePress(vendorData)}>
            <FavSvg
              height={getHp(25)}
              width={getHp(25)}
              style={{marginRight: getWp(20)}}
            />
          </TouchableOpacity>
          <BlackOutlineShare height={24} width={26} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

VendorTile.defaultProps = {
  renderCategoryAsSubtitle: false,
  onTilePress: null,
  onAvatarTitlePress: null,
  containerStyle: {},
  vendorData: {},
  textLength: 130,
  onFavoritePress: null,
  isSelected: () => false,
};
export default VendorTile;
