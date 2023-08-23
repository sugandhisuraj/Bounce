import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  useCallback,
  useMemo,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ToastAndroid,
} from 'react-native';
import {
  Header,
  Root,
  GooglePlacesInput,
  CustomDropdown,
  CustomButton,
  FloatingInput,
  ModalDropDownComponent,
} from '@components';
import {Avatar} from 'react-native-elements';
import {UploadBlue, BlackCircleCross, CloseGreenBG} from '@svg';
import ImagePicker from 'react-native-image-crop-picker';
import {FONTSIZE, getHp, getWp} from '@utils';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import CustomTextinput from '../../../components/CustomTextinput';
import Spinner from 'react-native-loading-spinner-overlay';
import {UserContext} from '../../../context/profiledataProvider';
import MobxStore from '../../../mobx';
import {observer} from 'mobx-react';
import UploadInventory from '../../host/UploadInventory';
// import { na } from '@react-navigation/native';
import {Scaffold} from '@components';
import {Toast} from '@constants';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import VendorSignupStore from '../../Signup/Vendor/VendorSignupStore';
import {VendorFieldsData} from '../../../app/constants';
import {FONTFAMILY} from '../../../app/utils';
import {Lists, ListTiles, PriceInfoRow} from '../../../components';
import ToastUtil from '../../../app/constants/toast';
import {ApiClient, AuthService, CreateFormData} from '../../../app/services';
import FastImage from 'react-native-fast-image';
function EditVendorScreen(props) {
  const {authStore} = MobxStore;
  const userinfo = authStore.user;
  console.log('WORK_EDIT_SCREEN - ', JSON.stringify(authStore.user));

  const vendorSignupStore = VendorSignupStore.getInstance();
  const vendorSignupData = MobxStore.appStore?.vendorSignupData ?? {};
  vendorSignupStore.listener;
  vendorSignupStore.armed.data();
  vendorSignupStore.genres.data();
  vendorSignupStore.cuisines.data();
  vendorSignupStore.guard_certification.data();
  vendorSignupStore.equipment.data();
  vendorSignupStore.services.data();
  const currentVendorFields = VendorFieldsData.VendorFieldsData.getFields(
    authStore.user.user?.vendorType,
  );
  const currentVendorAllFields = VendorFieldsData.VendorFieldsData.getCategory(
    authStore.user.user?.vendorType,
  );
  let LanguageArr = vendorSignupData?.language;
  // const { userinfo, fetchProfile } = useContext(UserContext);
  const {languageReduxObject, genreReduxObject, certificationReduxObject} =
    useSelector(state => state.currentStateData);

  const scrollRef = useRef();

  const user = userinfo?.user;

  const [loader, setLoader] = useState(false);

  const [footer, openFooter] = useState(false);

  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      vendorSignupStore.forEdit(authStore.user?.user);
    });
    return unsubscribe;
  }, [props.navigation, authStore.user]);
  useEffect(() => {
    MobxStore.appStore.fetchVendorSignupData();
  }, []);

  if (!user) {
    return null;
  }

  const {vendorCategoryName} = user;

  const handleImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    }).then(image => {
      vendorSignupStore.updateVendorFields({
        profileImageFile: image.path,
      });
    });
  };
  const ImageFooter = () => {
    return (
      <TouchableOpacity
        onPress={() =>
          vendorSignupStore.updateVendorFields({
            profileImageFile: null,
          })
        }
        style={styles.crossButton}>
        <BlackCircleCross height={30} width={30} />
      </TouchableOpacity>
    );
  };

  const handleSubmit = async () => {
    try {
      MobxStore.toggleLoader(true);
      let vendorFormStatus = vendorSignupStore.vendorFields.validate(
        true,
        currentVendorFields,
      );
      if (!vendorFormStatus.isValidate) {
        return ToastUtil(vendorFormStatus.errors[0].message);
      }

      const newVendorFields = {...vendorFormStatus.fields};
      const website = newVendorFields.website;
      delete newVendorFields.website;

      const formData = CreateFormData.objectToFormData(newVendorFields);
      formData.append('website', website);
      console.log('VENDOR_FORM_DATA_EDIT_2 - ', JSON.stringify(formData));
      //return;
      const response = await ApiClient.authInstance.post(
        ApiClient.endPoints.updateVendor,
        formData,
      );
      console.log(
        'UPDATE_VENDOR_RESPONSE_DATA - ',
        JSON.stringify(response.data),
      );
      await AuthService.reloadUser();
      return props.navigation.goBack();
    } catch (error) {
      let message =
        error?.message ??
        error?.response?.data?.message ??
        'Something went wrong! Try Again';
      ToastUtil(message);
    } finally {
      MobxStore.toggleLoader(false);
    }
  };

  const ListTile = (onPress, isSelected, {item, index}) => {
    return (
      <ListTiles.ToggleSubTagTile
        containerStyle={{
          marginTop: getHp(10),
          marginRight: getWp(10),
        }}
        isSelected={isSelected}
        data={item}
        onPress={onPress}
      />
    );
  };

  if (Object.keys(vendorSignupData).length == 0) {
    return <Spinner visible={true} />;
  }

  const RenderMedia = () => {
    let mediaImgs = userinfo.user.gallery;
    if (!mediaImgs && mediaImgs?.length && mediaImgs?.length == 0) {
      return null;
    }
    return (
      <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
        {mediaImgs.map(media => (
          <ListTiles.VendorMedia media={media} />
        ))}
      </ScrollView>
    );
  };
  return (
    <Scaffold statusBarStyle={{backgroundColor: '#F4F4F4'}}>
      <Spinner visible={loader} color={'#1FAEF7'} />
      <View style={styles.container}>
        {/* <ScrollView
                    keyboardShouldPersistTaps='always'
                    ref={scrollRef}
                    contentContainerStyle={{ flexGrow: 1 }}
                    style={{ flex: 1 }}
                > */}
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps={'handled'}
          ref={scrollRef}>
          <Header
            back
            headerTitle={'Edit Profile'}
            onPress={() => props.navigation.goBack()}
          />
          <View style={{paddingHorizontal: 10, paddingTop: 5}}>
            <FloatingInput
              custom
              floatingLabel={'Business Name'}
              onChange={fullName =>
                vendorSignupStore.updateVendorFields({
                  fullName,
                })
              }
              value={vendorSignupStore.vendorFields.fullName}
            />

            {vendorSignupStore.vendorFields?.profileImageFile == null ? (
              <TouchableOpacity
                onPress={handleImage}
                style={{
                  padding: 20,
                  marginVertical: getHp(30),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={[
                    styles.shadowStyle,
                    {
                      borderRadius: 100,
                      elevation: 10,
                      backgroundColor: '#fff',
                    },
                  ]}>
                  <UploadBlue height={getHp(100)} width={getHp(100)} />
                </View>
                <Text
                  style={{
                    fontSize: FONTSIZE.Text16,
                    color: '#000',
                    marginTop: 20,
                    fontFamily: 'AvenirNext-Regular',
                  }}>
                  {'Upload Profile Picture'}
                </Text>
              </TouchableOpacity>
            ) : (
              <>
                <TouchableOpacity onPress={() => openFooter(true)}>
                  <View
                    style={{
                      marginBottom: getHp(23),
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <View style={{marginVertical: 30}}>
                      <Avatar
                        source={{
                          uri: vendorSignupStore.vendorFields?.profileImageFile,
                        }}
                        size={getHp(250)}
                        rounded
                      />

                      <View style={styles.uploadCamera}>
                        <UploadBlue
                          height={getHp(100)}
                          width={getWp(120)}
                          style={{resizeMode: 'contain', alignSelf: 'center'}}
                        />
                      </View>
                      {footer ? <ImageFooter /> : null}
                    </View>
                  </View>
                </TouchableOpacity>
              </>
            )}
            <RenderMedia />
            <FloatingInput
              floatingLabel={'Full Name'}
              onChange={businessOwnerName =>
                vendorSignupStore.updateVendorFields({
                  businessOwnerName,
                })
              }
              value={vendorSignupStore.vendorFields.businessOwnerName}
            />
            <FloatingInput
              custom
              floatingLabel={'Email'}
              onChange={email =>
                vendorSignupStore.updateVendorFields({
                  email,
                })
              }
              value={vendorSignupStore.vendorFields.email}
            />
            <FloatingInput
              custom
              keyboardType={'numeric'}
              floatingLabel={'Phone Number'}
              onChange={phoneNumber =>
                vendorSignupStore.updateVendorFields({
                  phoneNumber,
                })
              }
              value={vendorSignupStore.vendorFields.phoneNumber}
            />

            <GooglePlacesInput
              custom
              floatingLabel={'City'}
              value={vendorSignupStore.vendorFields.city}
              onPress={city => {
                vendorSignupStore.updateVendorFields({
                  city: city.description,
                });
              }}
            />
            {/* 
            <FloatingInput
              custom
              keyboardType={'numeric'}
              floatingLabel={'Starting Price'}
              onChange={value => setPrice(value)}
              value={`${price}`}
            /> */}
            <FloatingInput
              custom
              floatingLabel={'Website'}
              onChange={website =>
                vendorSignupStore.updateVendorFields({
                  website,
                })
              }
              value={vendorSignupStore.vendorFields.website}
            />
            <CustomTextinput
              custom
              text={'Description'}
              multiline
              onChange={about =>
                vendorSignupStore.updateVendorFields({
                  about,
                })
              }
              value={vendorSignupStore.vendorFields.about}
            />

            {LanguageArr?.length > 0 && currentVendorFields?.Language && (
              <ModalDropDownComponent
                onDropDownPress={() => {
                  // scrollRef.current.scrollToEnd({animated: true});
                }}
                placeholder={'Languages'}
                options={LanguageArr}
                labelProp={'name'}
                uniqueProp={'id'}
                onInitialValue={vendorSignupStore.vendorFields.language}
                onSelectItems={language => {
                  vendorSignupStore.updateVendorFields({
                    language,
                  });
                }}
              />
            )}

            {currentVendorFields?.Price && (
              <View>
                <Text style={styles.startingPriceText}>
                  {`Starting Price (${currentVendorAllFields.priceTypeString})`}
                </Text>
                {VendorFieldsData.VendorsStartingPrices.map(
                  (prices, index, arr) => {
                    return (
                      <PriceInfoRow
                        data={prices}
                        containerStyle={{marginTop: getHp(5)}}
                        onPress={data => {
                          vendorSignupStore.updateVendorFields({
                            dollar: data.selected,
                            hourlyRate: data.price,
                          });
                        }}
                        isRowSelected={
                          prices.selected ==
                          vendorSignupStore.vendorFields.dollar
                        }
                      />
                    );
                  },
                )}
              </View>
            )}

            {currentVendorFields?.Armed && (
              <Lists.TagsList
                heading={'Armed'}
                containerStyle={{marginVertical: getHp(20)}}
                ListData={vendorSignupData?.armed ?? []}
                ListTile={({item, index}) => {
                  return ListTile(
                    data => {
                      return vendorSignupStore.toggleVendorLists(
                        'armed',
                        'armed',
                        data,
                      );
                    },
                    vendorSignupStore.armed.isDataExist(item).exist,
                    {item, index},
                  );
                }}
              />
            )}
            {currentVendorFields?.GuardCertification && (
              <Lists.TagsList
                heading={'Guard Certification'}
                containerStyle={{marginVertical: getHp(20)}}
                ListData={vendorSignupData?.guard_certification ?? []}
                ListTile={({item, index}) => {
                  return ListTile(
                    data => {
                      return vendorSignupStore.toggleVendorLists(
                        'guard_certification',
                        'guardCertification',
                        data,
                      );
                    },
                    vendorSignupStore.guard_certification.isDataExist(item)
                      .exist,
                    {item, index},
                  );
                }}
              />
            )}

            {currentVendorFields?.Genres && (
              <Lists.TagsList
                heading={'Genres'}
                containerStyle={{marginVertical: getHp(20)}}
                ListData={vendorSignupData?.genres ?? []}
                ListTile={({item, index}) => {
                  return ListTile(
                    data => {
                      return vendorSignupStore.toggleVendorLists(
                        'genres',
                        'genres',
                        data,
                      );
                    },
                    vendorSignupStore.genres.isDataExist(item).exist,
                    {item, index},
                  );
                }}
              />
            )}

            {currentVendorFields?.DJEquipments && (
              <Lists.TagsList
                heading={'Equipment'}
                containerStyle={{marginVertical: getHp(20)}}
                ListData={vendorSignupData?.dj_equipment ?? []}
                ListTile={({item, index}) => {
                  return ListTile(
                    data => {
                      return vendorSignupStore.toggleEquipments(data);
                    },
                    vendorSignupStore.equipment.isDataExist(item).exist,
                    {item, index},
                  );
                }}
              />
            )}

            {currentVendorFields?.FoodServices && (
              <Lists.TagsList
                heading={'Services'}
                containerStyle={{marginVertical: getHp(20)}}
                ListData={vendorSignupData?.catering_services ?? []}
                ListTile={({item, index}) => {
                  return ListTile(
                    data => {
                      return vendorSignupStore.toggleServices(data);
                    },
                    vendorSignupStore.services.isDataExist(item).exist,
                    {item, index},
                  );
                }}
              />
            )}
            {currentVendorFields?.Cuisines && (
              <Lists.TagsList
                heading={'Cuisines'}
                containerStyle={{marginVertical: getHp(20)}}
                ListData={vendorSignupData?.cuisines ?? []}
                ListTile={({item, index}) => {
                  return ListTile(
                    data => {
                      return vendorSignupStore.toggleVendorLists(
                        'cuisines',
                        'cuisines',
                        data,
                      );
                    },
                    vendorSignupStore.cuisines.isDataExist(item).exist,
                    {item, index},
                  );
                }}
              />
            )}

            {currentVendorFields?.DrinksServices && (
              <Lists.TagsList
                heading={'Services'}
                containerStyle={{marginVertical: getHp(20)}}
                ListData={vendorSignupData?.bartender_services ?? []}
                ListTile={({item, index}) => {
                  return ListTile(
                    data => {
                      return vendorSignupStore.toggleServices(data);
                    },
                    vendorSignupStore.services.isDataExist(item).exist,
                    {item, index},
                  );
                }}
              />
            )}

            {currentVendorFields?.CleaningCrewServices && (
              <Lists.TagsList
                heading={'Services'}
                containerStyle={{marginVertical: getHp(20)}}
                ListData={vendorSignupData?.cleaning_crews_services ?? []}
                ListTile={({item, index}) => {
                  return ListTile(
                    data => {
                      return vendorSignupStore.toggleServices(data);
                    },
                    vendorSignupStore.services.isDataExist(item).exist,
                    {item, index},
                  );
                }}
              />
            )}
            {currentVendorFields?.DrinksEquipments && (
              <Lists.TagsList
                heading={'Equipment'}
                containerStyle={{marginVertical: getHp(20)}}
                ListData={vendorSignupData?.bartender_equipment ?? []}
                ListTile={({item, index}) => {
                  return ListTile(
                    data => {
                      return vendorSignupStore.toggleEquipments(data);
                    },
                    vendorSignupStore.equipment.isDataExist(item).exist,
                    {item, index},
                  );
                }}
              />
            )}

            {currentVendorFields?.PhotoServices && (
              <Lists.TagsList
                heading={'Services'}
                containerStyle={{marginVertical: getHp(20)}}
                ListData={vendorSignupData?.photographer_services ?? []}
                ListTile={({item, index}) => {
                  return ListTile(
                    data => {
                      return vendorSignupStore.toggleServices(data);
                    },
                    vendorSignupStore.services.isDataExist(item).exist,
                    {item, index},
                  );
                }}
              />
            )}
            {currentVendorFields?.PhotoEquipments && (
              <Lists.TagsList
                heading={'Equipments'}
                containerStyle={{marginVertical: getHp(20)}}
                ListData={vendorSignupData?.photographer_equipment ?? []}
                ListTile={({item, index}) => {
                  return ListTile(
                    data => {
                      return vendorSignupStore.toggleEquipments(data);
                    },
                    vendorSignupStore.equipment.isDataExist(item).exist,
                    {item, index},
                  );
                }}
              />
            )}

            {currentVendorFields?.VideoServices && (
              <Lists.TagsList
                heading={'Services'}
                containerStyle={{marginVertical: getHp(20)}}
                ListData={vendorSignupData?.videographer_services ?? []}
                ListTile={({item, index}) => {
                  return ListTile(
                    data => {
                      return vendorSignupStore.toggleServices(data);
                    },
                    vendorSignupStore.services.isDataExist(item).exist,
                    {item, index},
                  );
                }}
              />
            )}

            {currentVendorFields?.VideoEquipments && (
              <Lists.TagsList
                heading={'Equipments'}
                containerStyle={{marginVertical: getHp(20)}}
                ListData={vendorSignupData?.videographer_equipment ?? []}
                ListTile={({item, index}) => {
                  return ListTile(
                    data => {
                      return vendorSignupStore.toggleEquipments(data);
                    },
                    vendorSignupStore.equipment.isDataExist(item).exist,
                    {item, index},
                  );
                }}
              />
            )}

            {currentVendorFields?.isEventRentals && (
              <TouchableOpacity
                style={[styles.colButtonStyle, styles.shadowStyle]}
                onPress={() =>
                  props.navigation.navigate(UploadInventory.routeName, {
                    image: user?.vendor?.inventory,
                  })
                }>
                <Text style={[styles.titleStyle]}>{'Edit Inventory'}</Text>
              </TouchableOpacity>
            )}
            <CustomButton
              complete
              onPress={handleSubmit}
              ButtonTitle={'Continue'}
            />
            <View style={{marginBottom: 10}} />
          </View>
        </KeyboardAwareScrollView>
      </View>
    </Scaffold>
  );
}
const styles = StyleSheet.create({
  startingPriceText: {
    fontSize: FONTSIZE.Text18,
    fontWeight: '600',
    fontFamily: FONTFAMILY.AvenirNextRegular,
    marginTop: getHp(25),
    marginBottom: getHp(15),
  },
  uploadCamera: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: -38,
    borderRadius: 100,
    elevation: 10,
    height: getHp(90),
    width: getHp(90),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  titleStyle: {
    fontFamily: 'AvenirNext-Regular',
    color: '#1FAEF7',
    fontSize: FONTSIZE.Text20,
    letterSpacing: 0.2,
  },
  container: {
    backgroundColor: '#FBFBFB',
    flex: 1,
  },
  crossButton: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  shadowStyle: {
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 5,
    shadowOpacity: 0.1,
  },
  colButtonStyle: {
    alignSelf: 'center',
    width: '95%',
    elevation: 2,
    backgroundColor: '#fff',
    borderRadius: 19,
    alignItems: 'center',
    height: getHp(54),
    justifyContent: 'center',
    marginTop: getHp(30),
    marginBottom: getHp(30),
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
  TitleStyle: {
    fontFamily: 'AvenirNext-Regular',
    fontSize: 16,
    paddingVertical: 5,
  },
});
EditVendorScreen.routeName = '/EditVendorScreen';

export default observer(EditVendorScreen);
