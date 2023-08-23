import React, {Fragment, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
  Keyboard,
} from 'react-native';
import {
  Header,
  CustomButton,
  CustomTextinput,
  FloatingInput,
  Toggle,
  ImageCarousel,
  TicketComponent,
  Scaffold,
  TagsCollapsible,
  GooglePlacesAutoComplete,
  ExternalTicketLink,
  RecurringEvent,
} from '@components';
import {UploadBlue, Info, BlueCamera, Add_Outline, AddBlue} from '@svg';
import {FONTSIZE, getHp, getWp, PartyUtils} from '@utils';
import {
  AgeField,
  SwitchButton,
  DollarField,
} from '../../../../components/BreakedComponents';
import PlanPartyModel from './PlanPartyModel';
import {observer} from 'mobx-react';
import UploadMedia from './UploadMedia';
import {CreateFormData, PartyService} from '../../../../app/services';
import DatePick from '../../../../components/DatePick';

import {Toast} from '@constants';
import UserHomeScreen from '../../../BounceUsers/UserFriendsProfile';
import {Carousels, Headers, ImagePickerModal} from '../../../../components';
import {ConfirmationPopups} from '../../../../components/AppPopups';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {FONTFAMILY} from '../../../../app/utils';
import CreateInvitationPopup from './Widgets/CreateInvitationPopups';
import MobxStore from '../../../../mobx';
import ToastUtil from '../../../../app/constants/toast';
import UserHomeDrawerNavigator from '../../../../navigation/UserNavigation/drawerNavigation';
import RecurringEventPopup from './Widgets/RecurringEventPopup';

function CreateInvitation(props) {
  const {authStore} = MobxStore;
  const createInvitationPopupRef = useRef();
  const imagePickerModalRef = useRef(null);
  let party = {};
  let isEditParty = false;
  let onBackRoute = null;
  let onReload = null;
  if (props.route?.params) {
    party = {...props.route?.params?.party};
    isEditParty = props?.route?.params?.isEditParty;
    onBackRoute = props?.route?.params?.onBackRoute;
    onReload = props?.route?.params?.onReload;
  }
  console.log('EDITED_PARTY - ', JSON.stringify(party));
  console.log('LOGGED_IN_1 - ');
  const {tagStore} = MobxStore;
  const partyModel = PlanPartyModel.getInstance();
  const [state, setState] = useState({});
  const [getImageState, setImageState] = useState(0);

  useEffect(async () => {
    const Tags = await PartyService.getTags();
  }, []);

  useEffect(() => {
    const listener = partyModel.party?.subscribe(() => {
      setState(() => ({}));
    });
    if (isEditParty) {
      party.gallery = PartyUtils.getPartyPhotoInSequence(party.gallery);
      partyModel.setEditParty(party);
    }
    return () => {
      partyModel.reset();
      console.log('UMOUNTED');
      listener.unsubscribe();
    };
  }, []);

  const handleOnPress = async isDraftMode => {
    try {

      const res = partyModel.party.isPartyValid(isDraftMode,partyModel.isEditMode); 
      console.log("PARTY_TEST - ", JSON.stringify(res))
      if (!res.success && res.errors?.length > 0) { 
        let msg = res.errors[0].message; 
        Toast(msg);
        return;
      }

      const savePartyResponse = await PartyService.createOrUpdateParty(
        res.body,
        partyModel.editParty?.id,
      ); 
      Toast(
        partyModel.isEditMode
          ? 'Party Updated Successfully'
          : isDraftMode
          ? 'Party saved to Draft'
          : 'Party Created Successfully',
      );
      if (!isEditParty) {
        partyModel.reset();
      }
      
      if (onReload) {
        onReload();
      }
      if (onBackRoute) {
        return props.navigation.navigate(onBackRoute);
      }
      props.navigation.navigate(UserHomeScreen.routeName);
    } catch (error) {
      let res =
        error?.response?.data?.message ?? 'Something went wrong! Try Again';
      console.log('ERROR - ', error);
      Toast(res);
      // Toast('Party Created Successfully');
      // props.navigation.goBack()
    }
  };

  const handleImage = async () => {
    return props.navigation.navigate(UploadMedia.routeName, {
      goBack: true,
    });
  };

  const handleCarousel = () => {
    let img = [];
    if (partyModel?.party?.galleryFiles?.length > 0) {
      partyModel.party.galleryFiles.map(i => i?.path && img.push(i.path));
    }
    if (partyModel?.party?.gallery?.length > 0) {
      partyModel.party.gallery.map(i => img.push(i.filePath));
    }

    return (
      <View style={[styles.mediaContainer]}>
        <Carousels.PartyImageVideo
          data={img}
          pagination={true}
          containerStyle={{height: getHp(400)}}
        />
        <TouchableOpacity
          onPress={() => {
            handleImage();
          }}
          style={styles.imageButton}>
          <AddBlue height={20} width={20} />
        </TouchableOpacity>
      </View>
    );
    return (
      <View style={{marginTop: getHp(15), marginBottom: getHp(5)}}>
        <ImageCarousel
          onPre
          value={'CreateInvitation'}
          // onPress={handleImage}
          pagination
          imageArray={img.length == 0 ? [] : img}
          onSnapToItem={index => setImageState(index)}
          state={getImageState}
        />
      </View>
    );
  };
  const handleDeleteEvent = async () => {
    try {
      if (party.buyTickets?.length > 0) {
        createInvitationPopupRef.current.setType(
          CreateInvitationPopup.types.DELETE_EVENT,
        );
        return;
      }
      MobxStore.toggleLoader(true);
      await PartyService.deleteParty(party.id);
      await PartyService.getParty();
      ToastUtil('Party Successfully Deleted!');
      props.navigation.pop(party?.isDraft ? 1 : 2);
    } catch (e) {
      ToastUtil(
        e?.response?.data?.message ?? 'Something went wrong! Try Again',
      );
    } finally {
      MobxStore.toggleLoader(false);
    }
  };
  const onSelectImagePickerOptions = selectedOption => {
    console.log('SELECTD_OPTION - ', selectedOption);
    handleImage();
  };

  // return (
  //   <Scaffold>
  //     <RecurringEvent.ConfigureInput />
  //   </Scaffold>
  // );
  return (
    <Fragment>
      {/* <RecurringEventPopup /> */}
      <CreateInvitationPopup
        onCloseEvents={(type, item) => {
          console.log('EVENT_ITEM- ', item);
          partyModel.party.set({externalLink: item});
        }}
        ref={createInvitationPopupRef}
      />

      <Scaffold contentContainerStyle={{backgroundColor: '#FBFBFB'}}>
        <Headers.BackTile
          containerStyle={{backgroundColor: '#FBFBFB'}}
          title={'Create Event'}
          onBackPress={() => {
            if (!partyModel?.party?.validateOnBackPress(party, isEditParty)) {
              return props.navigation.goBack();
            }
            return MobxStore.popupStore.setConfirmationPopup({
              visible: true,
              type: ConfirmationPopups.popupType.LeaveEvent,
              onCancel: () => {
                props.navigation.goBack();
              },
              onSuccess: () => {
                handleOnPress();
              },
            });
          }}
        />

        <KeyboardAwareScrollView
          automaticallyAdjustContentInsets={false}
          keyboardShouldPersistTaps={'always'}
          bounces={false}
          alwaysBounceVertical={false}>
          <View
            style={{
              marginTop: getHp(10),
              paddingHorizontal: 10,
              backgroundColor: '#FBFBFB',
            }}>
            <FloatingInput
              floatingLabel={'Event title'}
              value={partyModel.party.title?.toString()}
              onChange={title => {
                partyModel.party.set({title: title});
              }}
              errorMessage={partyModel.party?.partyError?.title}
              createEvent
            />
          </View>

          {partyModel?.party?.gallery?.length == 0 &&
          partyModel?.party?.galleryFiles?.length == 0 ? (
            <TouchableOpacity
              onPress={() => imagePickerModalRef.current.toggleModal()}
              style={{
                marginVertical: getHp(40),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={[
                  styles.shadowStyle,
                  {
                    borderRadius: 100,
                    elevation: 2,
                    backgroundColor: '#fff',
                  },
                ]}>
                <UploadBlue height={getHp(100)} width={getHp(100)} />
              </View>
              <Text
                style={{
                  fontSize: FONTSIZE.Text14,
                  color: '#696969',
                  marginTop: 10,
                  fontFamily: 'AvenirNext-Regular',
                }}>
                {'Upload Media'}
              </Text>
            </TouchableOpacity>
          ) : (
            handleCarousel()
          )}

          <View style={{marginHorizontal: 10}}>
            <View style={{flexDirection: 'row'}}>
              <DatePick
                containerStyle={{width: '100%'}}
                createEvent
                placeholder={'Date / Time'}
                handleChange={date => {
                  console.log('DATE_ON_CHANGE - ', date);
                  partyModel.party.set({date});
                }}
                value={partyModel.party.date}
                pickerMode={'datetime'}
                //minimumDate={moment().toDate()}
                // maximumDate={moment().add(30, 'day').toDate()}
                errorMessage={partyModel.party?.partyError?.date}
              />
              {/* <TouchableOpacity style={styles.recuringEventDurationContainer}>
                <Text style={[styles.recuringEventDurationText]}>
                  Every 5 Day
                </Text>
              </TouchableOpacity> */}
            </View>

            {/* <FloatingInput
            createEvent
            floatingLabel={'Address'}
            value={partyModel.party.location?.addressStr?.toString()}
            onChange={address => {
              partyModel.party.setAddress(address);
            }}
            errorMessage={partyModel.party?.partyError?.address}
          /> */}
            <GooglePlacesAutoComplete
              geolocationTextInputStyle={{backgroundColor: '#FFF'}}
              geolocationContainerStyle={[styles.geolocationContainerStyle]}
              placeholder={'Address'}
              onPress={d => {
                partyModel.party.setAddress(d.description);
              }}
              textInputProps={{
                placeholderTextColor: '#999999',
                value: partyModel.party.location?.addressStr?.toString(),
                onChangeText: address => {
                  partyModel.party.setAddress(address);
                },
              }}
            />
            <CustomTextinput
              createEvent
              text={'Description...'}
              multiline
              value={partyModel.party.description?.toString()}
              onChange={description => {
                partyModel.party.set({description: description.toString()});
              }}
              errorMessage={partyModel.party?.partyError?.description}
            />
          </View>

          {/* <View style={[styles.flex, { paddingHorizontal: 15 }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
              <Text style={[{
                fontFamily: 'AvenirNext-Regular',
                marginRight: getWp(10),
                fontSize: FONTSIZE.Text20
              }]}>
                {"Custom Invitation"}
              </Text>
              <Info height={20} width={20} />
            </View>
            <Toggle />
          </View> */}

          <View style={{marginVertical: 5, paddingHorizontal: 10}}>
            <SwitchButton
              value={partyModel.party.isPrivate}
              onPrivatePress={() => {
                Keyboard.dismiss();
                partyModel.party.setIsPrivate(true);
              }}
              onPublicPress={() => {
                Keyboard.dismiss();
                partyModel.party.setIsPrivate(false);
                Toast('Your event is now public!', {duration: 3000});
              }}
            />
          </View>
          {partyModel.party.isPrivate ? (
            <Text style={[styles.privatePublicDesc]}>
              Only invited guests can view this event in your profile.
            </Text>
          ) : (
            <Text
              style={[
                styles.privatePublicDesc,
                !partyModel.party.isPrivate && {marginBottom: 10},
              ]}>
              Public events are visible to everyone on the News Feed.
            </Text>
          )}
          {!partyModel.party.isPrivate && (
            <Fragment>
              <View
                style={[
                  styles.eventContainer,
                  {
                    justifyContent: 'space-between',
                    paddingHorizontal: 10,
                  },
                ]}>
                <TextInput
                  keyboardType={'numeric'}
                  placeholder={'Min Age'}
                  placeholderTextColor={'#999999'}
                  value={partyModel.party.fromAge?.toString()}
                  onChangeText={fromAge => {
                    partyModel.party.set({fromAge: fromAge});
                  }}
                  errorMessage={partyModel.party?.partyError?.fromAge}
                  style={[styles.textInput]}
                />
                <TextInput
                  keyboardType={'numeric'}
                  value={partyModel.party.toAge?.toString()}
                  onChangeText={toAge => {
                    partyModel.party.set({toAge: toAge});
                  }}
                  errorMessage={partyModel.party?.partyError?.toAge}
                  placeholder={'Max Age'}
                  placeholderTextColor={'#999999'}
                  style={[styles.textInput]}
                />
              </View>

              <Text
                style={[
                  styles.headerTitle,
                  {marginLeft: 10, marginTop: getHp(25), color: '#999999'},
                ]}>
                {'Select tags to help people find your event'}
              </Text>
              <View style={{marginBottom: 5}}>
                {tagStore.partyTags?.map(t => {
                  return (
                    <TagsCollapsible
                      Data={t}
                      isOnSelect={({tagObj, item}) => {
                        let isPartySelected = partyModel.party.isSubTagExist(
                          tagObj,
                          item,
                        );
                        return (
                          isPartySelected.tagExist &&
                          isPartySelected.subTagExist
                        );
                      }}
                      isTagSelected={({tagObj, item}) => {
                        let isPartySelected = partyModel.party.isSubTagExist(
                          tagObj,
                          item,
                        );
                        return isPartySelected.tagExist;
                      }}
                      onAdd={tag => partyModel.party.addTags(tag)}
                    />
                  );
                })}
              </View>
            </Fragment>
          )}

          {partyModel.party.tickets?.map((t, index) => {
            return (
              <TicketComponent
                data={t}
                onChangeText={data => {
                  partyModel.party.onTicketChangeText(data, index);
                }}
                onTicketDelete={() => {
                  partyModel.party.onTicketDelete(index);
                }}
              />
            );
          })}

          <TouchableOpacity
            onPress={() => {
              Keyboard.dismiss();
              partyModel.party.addTicketType();
            }}
            style={[
              {
                alignSelf: 'center',
                backgroundColor: '#D7F7FF',
                borderRadius: 13,
                width: '92%',
                elevation: 1,
                marginVertical: getHp(20),
              },
            ]}>
            <Text
              style={[
                styles.headerTitle,
                {
                  fontWeight: '700',
                  fontFamily: 'AvenirNext-DemiBold',
                  fontSize: FONTSIZE.Text18,
                  color: '#1FAEF7',
                  paddingVertical: 10,
                  textAlign: 'center',
                  letterSpacing: 0.5,
                },
              ]}>
              {'Add Ticket Type'}
            </Text>
          </TouchableOpacity>
          {partyModel?.party?.externalLink?.length == 0 ? (
            <TouchableOpacity
              onPress={() => {
                //hideKeyboard();
                createInvitationPopupRef.current.setType(
                  CreateInvitationPopup.types.EXTERNAL_TICKET_LINK,
                  partyModel.party.externalLink,
                );
              }}>
              <Text style={styles.pastTicketLink}>
                Paste Ticket Website Link
              </Text>
            </TouchableOpacity>
          ) : (
            <ExternalTicketLink
            widgetType={ExternalTicketLink.widgetType.WithActions}
              onEvents={() => partyModel.party.set({externalLink: ''})}
              withShadow={false}
              containerStyle={[styles.externalLinkContainer]}
              externalTicketLink={partyModel.party.externalLink}
              //externalTicketLink={'https://www.google.com'}
              containerTitle={'Tickets available at'}
              containerTitleStyle={styles.containerTitleStyle}
            />
          )}

          {isEditParty && PartyService.isIAMCreator(party) && (
            <TouchableOpacity
              onPress={handleDeleteEvent}
              style={{
                alignSelf: 'center',
                marginTop: getHp(10),
              }}>
              <Text style={[styles.deleteEventText]}>Delete Event</Text>
            </TouchableOpacity>
          )}

          <View style={{height: getHp(15)}} />
        </KeyboardAwareScrollView>

        {/* Footer Picture selector */}

        <CustomButton
          // bar
          containerStyle={{
            height: getHp(70),
            borderTopWidth: 0,
            backgroundColor: 'rgba(255, 255, 255, 255)',
            marginVertical: 0,
            paddingTop: 20,
          }}
          rowDoubleButton
          ButtonTitle={'Save As Draft'}
          ButtonTitle2={'Complete'}
          onSaveDraftPress={() => handleOnPress(true)}
          onContinuePress={() => handleOnPress(false)}
        />

        <ImagePickerModal
          onSelect={onSelectImagePickerOptions}
          ref={imagePickerModalRef}
        />

        {/*END Footer Picture selector */}
      </Scaffold>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  mediaContainer: {marginTop: getHp(15), marginBottom: getHp(5)},
  recuringEventDurationText: {
    fontWeight: '500',
    fontSize: FONTSIZE.Text13,
    fontFamily: FONTFAMILY.AvenirNextRegular,
    color: '#00CFFF',
  },
  recuringEventDurationContainer: {
    position: 'absolute',
    height: getHp(50),
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    width: getWp(150),
    right: 0,
    borderRadius: getWp(13),
    alignSelf: 'center',
  },
  externalLinkContainer: {
    width: '90%',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#F2F5F6',
  },
  containerTitleStyle: {
    fontSize: FONTSIZE.Text12,
    fontWeight: '500',
    fontFamily: FONTFAMILY.AvenirNextRegular,
    color: '#999999',
  },
  deleteEventText: {
    color: '#FF005C',
    fontSize: FONTSIZE.Text14,
    fontWeight: '500',
    fontFamily: FONTFAMILY.AvenirNextRegular,
  },
  pastTicketLink: {
    marginTop: getHp(5),
    color: '#00CFFF',
    fontWeight: '500',
    fontFamily: FONTFAMILY.AvenirNextRegular,
    fontSize: FONTSIZE.Text14,
    alignSelf: 'center',
    textDecorationLine: 'underline',
  },
  geolocationContainerStyle: {
    backgroundColor: 'white',

    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
    backgroundColor: '#fff',
    borderRadius: 13,
    marginVertical: 8,
  },
  privatePublicDesc: {
    fontWeight: '500',
    fontSize: FONTSIZE.Text13,
    fontFamily: 'AvenirNext-Medium',
    color: '#999999',
    marginLeft: getWp(16),
    bottom: 5,
    letterSpacing: 0.2,
  },
  footerText: {
    fontFamily: 'AvenirNext-Medium',
    fontSize: FONTSIZE.Text15,
    color: '#000',
  },
  footerPicture: {
    backgroundColor: '#fff',
    width: '100%',
    height: '30%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 2,
    borderColor: '#F2F5F6',
    borderBottomWidth: 0,
  },
  imageButton: {
    position: 'absolute',
    bottom: 50,
    right: 25,
    borderRadius: 100,
    elevation: 10,
    backgroundColor: '#fff',
    padding: 10,
    zIndex: 100,
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: getHp(5),
    height: getHp(60),
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    borderColor: '#EEEEEE',
  },
  shadowStyle: {
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 4,
    shadowOpacity: 0.1,
  },
  textInput: {
    height: getHp(46),
    backgroundColor: 'rgba(238, 238, 238, 0.5)',
    fontSize: FONTSIZE.Text16,
    fontFamily: 'AvenirNext-Medium',
    color: 'black',
    width: '48%',
    elevation: 0,
    borderWidth: 0.3,
    borderColor: '#EEEEEE',
    paddingLeft: 10,
    marginVertical: 5,
    borderRadius: 10,
    alignSelf: 'center',
  },
  eventContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginVertical: getHp(10),
  },
  smallButtonStyle: {
    margin: getWp(5),
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginRight: 5,
    elevation: 1,
    backgroundColor: '#EEEEEE',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: '#000',
    fontSize: FONTSIZE.Text14,
    fontFamily: 'AvenirNext-Medium',
  },

  cameraStyle: {
    padding: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#FBFBFB',
    flex: 1,
  },
  bottomContainer: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-around',
    backgroundColor: '#000000',
    width: '100%',
  },
  bottomButton: {
    borderRadius: 24,
    backgroundColor: '#333333',
    flexDirection: 'column',
    paddingVertical: 10,
    maxHeight: '100%',
    minWidth: '45%',
    alignItems: 'center',
  },
  ContainerStyle: {
    width: '100%',
    marginVertical: 4,
  },
  ButtonStyle: {
    backgroundColor: '#212121',
    borderRadius: 10,
    justifyContent: 'flex-start',
    paddingLeft: 20,
  },
  crossButton: {
    elevation: 10,
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 10,
    position: 'absolute',
    right: -10,
    top: -10,
  },
});
CreateInvitation.routeName = '/CreateInvitation';
CreateInvitation.routeNameForBottom = '/CreateInvitationForBottom';
export default observer(CreateInvitation);

/*
  {footerOpen && (
        <View style={[styles.footerPicture]}>
          <TouchableOpacity
            onPress={() => {
              setFooterOpen(!footerOpen);
              handleImage();
            }}
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: getHp(20),
              paddingHorizontal: getWp(10),
            }}>
            <Text style={styles.footerText}>{'Take Photo or Video'}</Text>
            <BlueCamera height={getHp(20)} width={getHp(20)} />
          </TouchableOpacity>

          <View
            style={{
              height: 1,
              backgroundColor: '#EEEEEE',
            }}
          />

          <TouchableOpacity
            onPress={() => {
              setFooterOpen(!footerOpen);
              handleImage();
            }}
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: getHp(20),
              paddingHorizontal: getWp(10),
            }}>
            <Text style={styles.footerText}>{'Photo Library'}</Text>
            <BlueCamera height={getHp(20)} width={getHp(20)} />
          </TouchableOpacity>

          <View
            style={{
              height: 1,
              backgroundColor: '#EEEEEE',
            }}
          />

          <TouchableOpacity
            onPress={() => {
              setFooterOpen(!footerOpen);
              handleImage();
            }}
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: getHp(20),
              paddingHorizontal: getWp(10),
            }}>
            <Text style={styles.footerText}>{'Browse'}</Text>
            <BlueCamera height={getHp(20)} width={getHp(20)} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setFooterOpen(!footerOpen)}
            style={[
              styles.shadowStyle,
              {
                alignSelf: 'center',
                backgroundColor: '#FFFFFF',
                borderRadius: 13,
                width: '95%',
                elevation: 1,
              },
            ]}>
            <Text
              style={[
                styles.headerTitle,
                {
                  fontFamily: 'AvenirNext-DemiBold',
                  fontSize: FONTSIZE.Text18,
                  color: '#1FAEF7',
                  paddingVertical: 10,
                  textAlign: 'center',
                  letterSpacing: 0.5,
                },
              ]}>
              {'Cancel'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
*/
