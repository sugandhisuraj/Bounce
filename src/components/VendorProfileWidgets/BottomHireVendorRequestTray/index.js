import React from 'react';
import {View, Text} from 'react-native';
import {observer} from 'mobx-react';

import {VendorService} from '../../../app/services';
import {RedHeart, GreyHeart, BlackShare, BlackTick, BlueTick} from '@svg';
import {Buttons} from '../..';
import {getHp} from '../../../app/utils';
import Styles from './indexCss';
const BottomHireVendorRequestTray = props => {
  let {
    isVendorSelected,
    vendorData,
    widgetType,
    onToggleFav,
    isFavoriteVendor,
    onSelectVendor,
  } = props;
  const onFavoriteVendorPress = async () => {
    try {
      await VendorService.setToggleFavVendor(vendorData.id);
    } catch (error) {}
  };
  return (
    <View style={[Styles.container]}>
      <Buttons.VerticalIcon
        withShadow={true}
        containerStyle={{height: getHp(70)}}
        highlightedColor={isFavoriteVendor ? 'rgba(255, 46, 0, 0.2)' : null}
        Icon={(() => {
          return isFavoriteVendor ? (
            <RedHeart height={27} width={30} />
          ) : (
            <GreyHeart height={27} width={30} />
          );
        })()}
        title={(() => {
          return isFavoriteVendor ? 'Favorited' : 'Favorite';
        })()}
        onPress={() => onToggleFav(onFavoriteVendorPress)}
      />

      {widgetType ==
        BottomHireVendorRequestTray.widgetType.AllVendorProfile && (
        <Buttons.VerticalIcon
          withShadow={true}
          containerStyle={[
            {height: getHp(70)},
            isVendorSelected && {
              backgroundColor: 'rgba(31, 174, 247, 0.2)',
            },
          ]}
          Icon={
            isVendorSelected ? (
              <BlueTick height={getHp(30)} width={getHp(30)} />
            ) : (
              <BlackTick height={getHp(27)} width={getHp(27)} />
            )
          }
          title={isVendorSelected ? 'Selected' : 'Select'}
          onPress={onSelectVendor}
        />
      )}

      <Buttons.VerticalIcon
        withShadow={true}
        containerStyle={{height: getHp(70)}}
        Icon={<BlackShare height={25} width={27} />}
        title={'Share'}
      />
    </View>
  );
};

BottomHireVendorRequestTray.widgetType = {};
BottomHireVendorRequestTray.widgetType.SingleVendorProfile =
  'SingleVendorProfile';
BottomHireVendorRequestTray.widgetType.AllVendorProfile = 'AllVendorProfile';

BottomHireVendorRequestTray.defaultProps = {
  widgetType: BottomHireVendorRequestTray.widgetType.AllVendorProfile,

  isVendorSelected: false,
  vendorData: {},
  onToggleFav: () => null,
  isFavoriteVendor: false,
  onSelectVendor: () => null,
};
export default observer(BottomHireVendorRequestTray);
