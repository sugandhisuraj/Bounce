import React, {Fragment, useEffect, useRef} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {observer} from 'mobx-react';
import Modal from 'react-native-modal';

import LinearGradient from 'react-native-linear-gradient';
import {Toast} from '../../../app/constants';
import {VendorService} from '../../../app/services';
import {Scanner, WhiteTick, WhiteCross} from '@svg';
import {useQRCodeScanner} from '../../../app/hooks';
import {Headers, Scaffold} from '../../../components';
import Styles from './indexCss';
import {Avatar} from 'react-native-elements';
import {Placeholder} from '../../../assets';
import {getHp} from '../../../app/utils';
import MobxStore from '../../../mobx';
import ScanTicketsModel from './ScanTickets.model';
import ToastUtil from '../../../app/constants/toast';

const ScanTickets = props => {
  const scanTicketsModel = useRef(ScanTicketsModel.instance);
  let isScanDataAvailable = !scanTicketsModel.current.isCurrentUserEmpty();
  let currentScanDetails;
  if (isScanDataAvailable) {
    currentScanDetails = scanTicketsModel.current.getCurrentScanDetails();
  }
  const partyData = props.route?.params?.partyData ?? {};
  const [QRCodeComponent, scanMode, setScanMode] = useQRCodeScanner({
    scanMode: true,
  });
  const purchasedTicketsCount =
    scanTicketsModel.current.getPurchasedTicketsCount();
  useEffect(() => {
    scanTicketsModel.current.setCurrentUser({});
  }, []);

  const getScanQrValue = async qrData => {
    try {
      setScanMode(false);
      MobxStore.toggleLoader(true);
      let partyId = partyData.party.id;
      let qrValue = qrData.data;
      console.log('QR_BODY_1 - ', JSON.stringify({partyId, qrValue}));
      const res = await VendorService.vendorScanQr(partyId, qrValue);
      console.log('RESPONSE_QR_SCAN_1 - ', JSON.stringify(res));
      if (res?.success) {
        scanTicketsModel.current.setCurrentUser(res);
      }
      if (!res?.success) {
        Toast(res.message, {duration: 5000});
        // if (scanTicketsModel.current.isCurrentUserEmpty()) {
        //   return props.navigation.goBack();
        // }
      }
    } catch (error) {
      MobxStore.toggleLoader(false);
      ToastUtil(error?.message ?? 'Something went wrong! Try Again');
    } finally {
      MobxStore.toggleLoader(false);
    }
  };
  const onCancelPressCamera = () => {
    if (!isScanDataAvailable) {
      return props.navigation.goBack();
    }
  };
  const AttendOrNotAttending = props => {
    let isNotAttending = !currentScanDetails.isAttending;

    const StatusSVG = isNotAttending ? (
      <WhiteCross height={getHp(40)} width={getHp(40)} />
    ) : (
      <WhiteTick height={getHp(17)} width={getHp(25)} />
    );
    let colors = ['#00E391', '#00E391'];
    if (isNotAttending) {
      colors = ['#FF005C', '#FF005C'];
    }
    return (
      <LinearGradient style={[Styles.attendNotAttendGradient]} colors={colors}>
        {StatusSVG}
        <Text style={[Styles.attendingOrNotAttendingText]}>Attending</Text>
      </LinearGradient>
    );
  };
  const RoundedView = props => {
    return (
      <View
        style={[
          Styles.roundeView,
          props?.guestStatus == ScanTickets.guestStatus.NotAttending &&
            Styles.roundeViewNotAttending,
        ]}>
        {props.children}
      </View>
    );
  };
  const ScreenComponent = () => {
    return (
      <Fragment>
        <Headers.BackTile
          title={'Guest Scanner'}
          onBackPress={() => props.navigation.goBack()}
        />
        <View style={[Styles.containerStyle]}>
          {isScanDataAvailable && (
            <RoundedView
              guestStatus={
                currentScanDetails.isAttending
                  ? ScanTickets.guestStatus.Attending
                  : ScanTickets.guestStatus.NotAttending
              }>
              <Avatar
                containerStyle={{marginTop: getHp(80)}}
                source={currentScanDetails.userAvatar}
                rounded
                size={getHp(242)}
              />
              <Text style={[Styles.guestName]}>
                {currentScanDetails.userName}
              </Text>
              {purchasedTicketsCount > 1 ? (
                <View style={[Styles.moreFriendsView]}>
                  <Text style={[Styles.moreFriendsText]}>
                    {`+ ${purchasedTicketsCount - 1} more friends`}
                  </Text>
                </View>
              ) : (
                <View style={{height: getHp(40)}} />
              )}

              <AttendOrNotAttending />
            </RoundedView>
          )}

          <TouchableOpacity
            onPress={() => setScanMode(true)}
            style={[
              Styles.scanNextContainer,
              !isScanDataAvailable && {marginTop: 0},
            ]}>
            <Scanner height={getHp(37)} width={getHp(37)} />
            <Text style={Styles.scanNextText}>
              {isScanDataAvailable ? 'Scan Next' : 'Scan User'}
            </Text>
          </TouchableOpacity>
        </View>
      </Fragment>
    );
  };

  return (
    <Scaffold
      statusBarStyle={{backgroundColor: '#FBFBFB'}}
      contentContainerStyle={{backgroundColor: '#FBFBFB'}}>
      {scanMode ? (
        <QRCodeComponent
          onCancelPress={onCancelPressCamera}
          onReadQr={getScanQrValue}
        />
      ) : (
        ScreenComponent()
      )}
    </Scaffold>
  );
};

ScanTickets.routeName = '/ScanTickets';

ScanTickets.guestStatus = {};
ScanTickets.guestStatus.Attending = 'Attending';
ScanTickets.guestStatus.NotAttending = 'NotAttending';
export default observer(ScanTickets);
