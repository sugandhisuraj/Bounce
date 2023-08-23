import React, {Fragment} from 'react';
import {View} from 'react-native';

import {
  Certified,
  Armed,
  Multilingual,
  Services,
  Cuisines,
  Equipments,
} from '@svg';
import {VendorFieldsData} from '../../../app/constants';
import {IconTitle} from '../..';
import {getHp, getWp} from '../../../app/utils';
import Styles from './indexCss';

const VendorAmenities = props => {
  const {vendorData} = props;
  console.log("VENDOR_AMEN_CHECk_3 - ", JSON.stringify(vendorData));
  let currentVendorFields = VendorFieldsData.VendorFieldsData.getFields(
    vendorData.vendorType,
  );
  const extractDataFromAmenitiesObject = (keyFlag, entityKeyName) => {
    const {vendor} = vendorData;

    if (!keyFlag) {
      return null;
    }
    let oprArr = [];
    if (typeof keyFlag == 'string') {
      if (!(keyFlag in vendor)) {
        return null;
      }
      oprArr = vendor[keyFlag];
    } else {
      oprArr = keyFlag;
    }

    return oprArr.map((entity, i) => {
      let comma = oprArr.length - 1 > i ? ', ' : '';
      return entity[entityKeyName]?.name + comma;
    });
  };

  let services = [];
  let equipments = [];

  if (currentVendorFields?.DrinksServices) {
    services = vendorData?.vendor?.bartenderServicesVendor ?? [];
  }
  if (currentVendorFields?.FoodServices) {
    services = vendorData?.vendor?.cateringServicesVendor ?? [];
  }
  if (currentVendorFields?.CleaningCrewServices) {
    services = vendorData?.vendor?.cleaningcrewsServicesVendor ?? [];
  }
  if (currentVendorFields?.PhotoServices) {
    services = vendorData?.vendor?.photoServicesVendor ?? [];
  }
  if (currentVendorFields?.VideoServices) {
    services = vendorData?.vendor?.videoServicesVendor ?? [];
  }

  if (currentVendorFields?.DJEquipments) {
    equipments = vendorData?.vendor?.djEquipmentVendor ?? [];
  }
  if (currentVendorFields?.DrinksEquipments) {
    equipments = vendorData?.vendor?.bartenderEquipmentVendor ?? [];
  }
  if (currentVendorFields?.PhotoEquipments) {
    equipments = vendorData?.vendor?.photoEquipmentVendor ?? [];
  }
  if (currentVendorFields?.VideoEquipments) {
    equipments = vendorData?.vendor?.videoEquipmentVendor ?? [];
  }

  return (
    <View style={{paddingVertical: 0}}>
      {currentVendorFields?.GuardCertification && (
        <Fragment>
          <IconTitle
            textStyle={Styles.belowTextStyle}
            text={extractDataFromAmenitiesObject(
              'guardCertVendor',
              'certificate',
            )}
            icon={<Certified height={getHp(60)} width={getWp(60)} />}
            iconBelowText={'Certificate'}
          />
          <IconTitle
            textStyle={Styles.belowTextStyle}
            text={extractDataFromAmenitiesObject('armedVendor', 'armed')}
            icon={<Armed height={getHp(50)} width={getWp(50)} />}
            iconBelowText={'Armed'}
          />
        </Fragment>
      )}
      {currentVendorFields?.Cuisines && (
        <IconTitle
          textStyle={Styles.belowTextStyle}
          text={extractDataFromAmenitiesObject('cuisinesVendor', 'cuisines')}
          icon={<Cuisines height={getHp(60)} width={getWp(60)} />}
          iconBelowText={'Cuisines'}
        />
      )}
      {currentVendorFields?.Genres && (
        <IconTitle
          textStyle={Styles.belowTextStyle}
          text={extractDataFromAmenitiesObject('genresVendor', 'genres')}
          icon={<Certified height={getHp(60)} width={getWp(60)} />}
          iconBelowText={'Genres'}
        />
      )}
      {services.length > 0 && (
        <IconTitle
          textStyle={Styles.belowTextStyle}
          text={extractDataFromAmenitiesObject(services, 'services')}
          icon={<Services height={getHp(60)} width={getWp(60)} />}
          iconBelowText={'Services'}
        />
      )}
      {equipments.length > 0 && (
        <IconTitle
          textStyle={Styles.belowTextStyle}
          text={extractDataFromAmenitiesObject(equipments, 'equipment')}
          icon={<Equipments height={getHp(60)} width={getWp(60)} />}
          iconBelowText={'Equipment'}
        />
      )}
      {vendorData?.language?.length > 1 && (
        <IconTitle
          textStyle={Styles.belowTextStyle}
          text={(() => {
            return vendorData?.language?.map((l, i, a) => {
              let str = l?.language?.name + `, `;
              if (a.length - 1 == i) {
                return str.slice(0, -2);
              }
              return str;
            });
          })()}
          icon={<Multilingual height={getHp(60)} width={getWp(60)} />}
          iconBelowText={'Multilingual'}
        />
      )}
    </View>
  );
};

export default VendorAmenities;
