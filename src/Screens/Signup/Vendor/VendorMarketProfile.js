import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {
  Header,
  GooglePlacesInput,
  CustomDropdown,
  Root,
  CustomButton,
  FloatingInput,
  ModalDropDownComponent,
  PriceInfoRow,
  Buttons,
} from '@components';
import axios from 'axios';
import {axiosPost, getData} from '../../../FetchServices';
import {FONTSIZE, getHp} from '@utils';
import {useSelector, useDispatch} from 'react-redux';
import {fetchCurrentLoginData} from '../../../reducer/CurrentData';
import CustomTextinput from '../../../components/CustomTextinput';
import {LocalStorage} from '../../../app/utils/localStorage';
import {UserContext} from '../../../context/profiledataProvider';
import Spinner from 'react-native-loading-spinner-overlay';
import MobxStore from '../../../mobx';
import {ApiClient, AuthService, CreateFormData} from '../../../app/services';
import {Scaffold} from '@components';
import {Toast, VendorFieldsData} from '@constants';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import VendorSignupStore from './VendorSignupStore';
import {FONTFAMILY, getWp, wp} from '../../../app/utils';
import {GenderInput, Lists, ListTiles} from '../../../components';
import {observer} from 'mobx-react';
import {RadioButton} from 'react-native-paper';
import CountryPicker from 'react-native-country-codes-picker';
import ToastUtil from '../../../app/constants/toast';
import AuthNavigation from '../../../navigation/AuthNavigation';
import VendorHomeDrawerNavigator from '../../../navigation/VendorNavigation/drawerNavigation';
import {APP_CONFIGURATIONS} from '../../../app/constants';
function VendorMarketProfile(props) {
  const timerRef = useRef(null);
  const [otpInput, setOtpInput] = useState('');
  const vendorSignupStore = VendorSignupStore.getInstance();
  const [showCountryCode, setShowCountryCode] = useState(false);
  const [correctOtp, setCorrectOtp] = useState(null);
  const [timer, setTimer] = useState(0);
  const {authStore} = MobxStore;
  const currentVendorFields = VendorFieldsData.VendorFieldsData.getFields(
    vendorSignupStore.selectedVendorBusinessCategory.id,
  );
  const currentVendorAllFields = VendorFieldsData.VendorFieldsData.getCategory(
    vendorSignupStore.selectedVendorBusinessCategory.id,
  );
  const vendorSignupData = MobxStore.appStore?.vendorSignupData ?? {};
  const scrollRef = useRef();

  vendorSignupStore.listener;
  vendorSignupStore.armed.data();
  vendorSignupStore.genres.data();
  vendorSignupStore.cuisines.data();
  vendorSignupStore.guard_certification.data();
  vendorSignupStore.equipment.data();
  vendorSignupStore.services.data();
  const handleSubmit = async () => {
    try {
      let vendorFormStatus = vendorSignupStore.vendorFields.validate(
        false,
        currentVendorFields,
      );
      console.log(
        'VENDOR_FORM_VALIDATE_1 - ',
        JSON.stringify(vendorFormStatus),
      );
      if (!vendorFormStatus.isValidate) {
        return ToastUtil(vendorFormStatus.errors[0].message, {
          duration: 3000,
        });
      }
      if (APP_CONFIGURATIONS.IS_PRODUCTION) {
        if (+otpInput != correctOtp) {
          return ToastUtil('Invalid OTP!');
        }
      }
      const newVendorFields = {...vendorFormStatus.fields};
      const website = newVendorFields.website;
      delete newVendorFields.website;
      MobxStore.toggleLoader(true);
      const formData = CreateFormData.objectToFormData(newVendorFields);
      formData.append('website', website);
      console.log('VENDOR_FORM_DATA_1 - ', JSON.stringify(formData));
      //return;
      const response = await ApiClient.instance.post(
        ApiClient.endPoints.vendorRegister,
        formData,
      );
      response.data.token = response.data.accessToken;
      console.log('VENDOR_REGISTRATION_DATA - ', JSON.stringify(response.data));
      if (response.status == 201) {
        AuthService.onUserAuthenticated(response.data);
        if (authStore.user?.isAuthenticated && authStore.user?.isVendor) {
          return props.navigation.replace(VendorHomeDrawerNavigator.routeName);
        }
      } else {
        ToastUtil(response.data?.message ?? 'Something went wrong! Try Again');
      }
    } catch (error) {
      console.log('ERROR_CREATE_VENDOR - ', error);
      ToastUtil(
        error?.response.data?.message ?? 'Something went wrong! Try Again',
      );
    } finally {
      MobxStore.toggleLoader(false);
    }
  };
  const sendOtp = useCallback(async () => {
    try {
      setOtpInput(_ => '');
      setCorrectOtp(_ => '');
      MobxStore.toggleLoader(true);
      let selectedCountryCode =
        vendorSignupStore?.vendorFields?.countryCode?.dial_code ?? '+1';
      let mobileNo = selectedCountryCode.concat(
        vendorSignupStore.vendorFields.phoneNumber,
      );
      const otp = await AuthService.sendAuthOtp(mobileNo);
      setCorrectOtp(_ => otp.otp);
      startTimer();
    } catch (error) {
      console.log(error);
      Toast(
        error?.response?.data?.message ?? 'Something went wrong! Try Again',
      );
    } finally {
      MobxStore.toggleLoader(false);
    }
  }, [MobxStore, correctOtp]);
  const startTimer = useCallback(() => {
    setTimer(_ => 30);
    timerRef.current = setInterval(() => {
      setTimer(t => {
        if (t == 0) {
          clearInterval(timerRef.current);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  }, []);
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
  let LanguageArr = vendorSignupData.language;
  console.log('WEBS_TE_TEST - ', vendorSignupStore.vendorFields.website);
  return (
    <Scaffold statusBarStyle={{backgroundColor: '#F5F5F5'}}>
      <View style={styles.container}>
        <Header
          withShadow={false}
          headerBackColor={{paddingBottom: 20, backgroundColor: '#F5F5F5'}}
          back
          headerTitle={`Create ${vendorSignupStore.selectedVendorBusinessCategory.vendorCategory} Profile`}
          onPress={() => props.navigation.goBack()}
        />
        {showCountryCode && (
          <View
            style={{
              zIndex: 1000,
              alignSelf: 'center',
              position: 'absolute',
              height: getHp(500),
              top: getWp(-20),
              width: '100%',
            }}>
            <CountryPicker
              show={showCountryCode}
              pickerButtonOnPress={item => {
                console.log('SELECTED_ITEM - ', item);
                vendorSignupStore.updateVendorFields({
                  countryCode:
                    MobxStore.appStore.getCountryCodeDataOnDialCode(item),
                });
                setShowCountryCode(false);
              }}
            />
          </View>
        )}
        <KeyboardAwareScrollView
          style={{backgroundColor: '#FBFBFB'}}
          keyboardShouldPersistTaps={'always'}
          ref={scrollRef}
          bounces={false}
          alwaysBounceVertical={false}
          onTouchStart={() => {
            setShowCountryCode(false);
          }}>
          <View
            onTouchStart={() => {
              setShowCountryCode(false);
            }}
            style={{margin: getHp(13)}}>
            {currentVendorFields?.Name && (
              <FloatingInput
                floatingLabel={'Business Name'}
                onChange={fullName =>
                  vendorSignupStore.updateVendorFields({
                    fullName,
                  })
                }
                value={vendorSignupStore.vendorFields.fullName}
              />
            )}

            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <TouchableOpacity
                //style={{borderWidth: 1, borderColor: 'red'}}
                onPress={() => {
                  console.log('PRESS');
                  setShowCountryCode(true);
                }}>
                <TextInput
                  pointerEvents={'none'}
                  editable={false}
                  selectTextOnFocus={false}
                  autoCorrect={false}
                  autoCapitalize={false}
                  keyboardType={'numeric'}
                  placeholder="@phone"
                  placeholderTextColor="#999"
                  style={styles.showCountryCodeTextStyle}
                  value={`${vendorSignupStore.vendorFields.countryCode.dial_code}`}
                  onChangeText={() => {}}
                />
              </TouchableOpacity>
              <View style={{width: wp(73), paddingLeft: getWp(10)}}>
                <FloatingInput
                  keyboardType={'numeric'}
                  floatingLabel={'Phone Number'}
                  onChange={phoneNumber =>
                    vendorSignupStore.updateVendorFields({
                      phoneNumber,
                    })
                  }
                  value={vendorSignupStore.vendorFields.phoneNumber}
                />
              </View>
            </View>

            {APP_CONFIGURATIONS.IS_PRODUCTION &&
              vendorSignupStore.vendorFields.phoneNumber.length > 0 && (
                <View
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{width: wp(60)}}>
                    <FloatingInput
                      keyboardType={'numeric'}
                      floatingLabel={'Enter 6-digit code'}
                      onChange={setOtpInput}
                      value={otpInput}
                    />
                  </View>
                  <Buttons.PrimaryButton
                    containerStyle={{
                      borderRadius: getHp(10),
                      width: wp(30),
                      height: getHp(52),
                    }}
                    onPress={timer != 0 ? null : () => sendOtp()}
                    title={timer == 0 ? 'Send Code' : timer}
                    withShadow={true}
                  />
                </View>
              )}

            {currentVendorFields?.City && (
              <GooglePlacesInput
                floatingLabel={'City (or cities)'}
                onPress={city => {
                  vendorSignupStore.updateVendorFields({
                    city: city.description,
                  });
                }}
              />
            )}

            {/* <FloatingInput
                keyboardType={'numeric'}
                floatingLabel={'Starting Price'}
                onChange={value => setPrice(value)}
                value={price}
              /> */}

            <FloatingInput
              autoCapitalize={'none'}
              floatingLabel={'Website'}
              onChange={website => {
                console.log('Website - ', website);
                vendorSignupStore.updateVendorFields({
                  website,
                });
              }}
              // placeholder={'https://www.abc.com'}
              value={vendorSignupStore.vendorFields.website}
            />
            <CustomTextinput
              text={'Description'}
              multiline
              value={vendorSignupStore.vendorFields.about}
              onChange={about =>
                vendorSignupStore.updateVendorFields({
                  about,
                })
              }
            />

            {LanguageArr.length > 0 && currentVendorFields.Language && (
              <>
                <ModalDropDownComponent
                  readOnly
                  onDropDownPress={() => {
                    // scrollRef.current.scrollToEnd({animated: true});
                  }}
                  placeholder={'Languages'}
                  options={LanguageArr}
                  labelProp={'name'}
                  uniqueProp={'id'}
                  onSelectItems={language => {
                    vendorSignupStore.updateVendorFields({
                      language,
                    });
                  }}
                />
              </>
            )}
            {
              <View>
                <Text style={styles.startingPriceText}>Gender</Text>
                <GenderInput
                  value={vendorSignupStore.vendorFields.gender}
                  onPress={genderData => {
                    vendorSignupStore.updateVendorFields({
                      gender: genderData.value,
                    });
                  }}
                />
              </View>
            }
            {currentVendorFields?.Price && (
              <View>
                <Text style={styles.startingPriceText}>
                  {`Starting Price (${currentVendorAllFields.priceTypeString})`}
                </Text>
                {currentVendorAllFields.priceDetails.map(
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
          </View>
          <View
            style={{
              marginBottom: getHp(30),
              alignSelf: 'center',
              width: '95%',
            }}>
            <CustomButton complete onPress={handleSubmit} />
          </View>
        </KeyboardAwareScrollView>
      </View>
    </Scaffold>
  );
}
VendorMarketProfile.routeName = '/VendorMarketProfile';

const styles = StyleSheet.create({
  showCountryCodeTextStyle: {
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
    backgroundColor: 'white',
    fontFamily: 'AvenirNext-Medium',
    color: '#000',
    fontSize: FONTSIZE.Text17,
    paddingHorizontal: getWp(12),
    elevation: 2,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 9.5,
    marginTop: getHp(10),
    maxWidth: wp(20),
    width: wp(20),
  },
  startingPriceText: {
    fontSize: FONTSIZE.Text18,
    fontWeight: '600',
    fontFamily: FONTFAMILY.AvenirNextRegular,
    marginTop: getHp(25),
    marginBottom: getHp(15),
  },
  container: {
    backgroundColor: '#FBFBFB',
    flex: 1,
  },

  ButtonStyle2: {
    backgroundColor: '#212121',
    justifyContent: 'space-around',
    flexDirection: 'row',
    width: '90%',
    borderRadius: 22,
    paddingVertical: 20,
    marginVertical: 10,
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
    paddingVertical: 10,
  },
  Title1Style: {
    fontSize: 18,
    opacity: 0.7,
    color: '#fff',
    fontFamily: 'AvenirNext-Regular',
  },
  Title2Style: {
    fontSize: 17,
    // opacity:0.8,
    // fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'AvenirNext-Regular',
  },
  TitleStyle: {
    fontSize: 16,
    paddingVertical: 5,
    fontFamily: 'AvenirNext-Regular',
  },
});

export default observer(VendorMarketProfile);

/*

 {vendorType == 'Music' ? (
              <>
                {genreReduxObject.length > 0 ? (
                  <>
                    <ModalDropDownComponent
                      readOnly
                      onDropDownPress={() => {
                        scrollRef.current.scrollToEnd({animated: true});
                      }}
                      placeholder={'Please select genre'}
                      options={genreReduxObject}
                      labelProp={'label'}
                      uniqueProp={'value'}
                      onSelectItems={item => {
                        setGenre({countries: item});
                      }}
                    />
                  </>
                ) : null}

                <CustomTextinput
                  text={'Equipment'}
                  multiline
                  value={equipment}
                  onChange={value => setEquipment(value)}
                />
              </>
            ) : null}

            {vendorType == 'Security' ? (
              <>
                {certificationReduxObject.length > 0 ? (
                  <>
                    <ModalDropDownComponent
                      readOnly
                      onDropDownPress={() => {
                        scrollRef.current.scrollToEnd({animated: true});
                      }}
                      placeholder={'Please select certification'}
                      options={certificationReduxObject}
                      labelProp={'label'}
                      uniqueProp={'value'}
                      onSelectItems={item => {
                        setCertification({certi: item});
                      }}
                    />
                  </>
                ) : null}

                <FloatingInput
                  floatingLabel={'Armed'}
                  onChange={value => setArmed(value)}
                  value={armed}
                />
              </>
            ) : null}

            {vendorType == 'Food' ? (
              <>
                <FloatingInput
                  floatingLabel={'Cuisines'}
                  onChange={value => setCuisines(value)}
                  value={cuisines}
                />
                <FloatingInput
                  floatingLabel={'Services'}
                  onChange={value => setServices(value)}
                  value={services}
                />
              </>
            ) : null}
            {vendorType != 'Food' &&
            vendorType != 'Security' &&
            vendorType != 'Music' ? (
              <>
                <FloatingInput
                  floatingLabel={'Services'}
                  onChange={value => setServices(value)}
                  value={services}
                />
              </>
            ) : null}

            try {
      if (
        business.length > 0 &&
        city.length > 0 &&
        price.length &&
        website.length > 0 &&
        description.length > 0
        // && language.lang.length > 0
      ) {
        try {
          setLoader(true);
          let milliseconds = new Date().getTime();
          let imgObj = {
            uri: `${login.picture.path}`,
            type: 'image/jpeg',
            name: `image-${milliseconds}.jpg`,
          };
          let body = {
            username: login.username,
            password: login.password,
          };

          let formData = new FormData();
          formData.append('username', login.username);
          formData.append('password', login.password);
          formData.append('email', login.email);
          formData.append('phoneNumber', login.phone);
          formData.append('fullName', business);
          formData.append('city', city);
          formData.append('state', 'MP');
          formData.append('about', description);
          formData.append('website', website);
          formData.append('language', JSON.stringify(language.lang));
          formData.append('genres', JSON.stringify(genre.countries));
          formData.append('services', services);
          formData.append(
            'guardCertification',
            JSON.stringify(certification.certi),
          );
          formData.append('armed', armed);
          formData.append('cuisines', cuisines);
          formData.append('vendorCategoryName', vendorType);
          formData.append('equipment', equipment);
          formData.append('profileImageFile', imgObj);
          formData.append('hourlyRate', price);

          const response = await ApiClient.instance.post(
            ApiClient.endPoints.vendorRegister,
            formData,
          );

          console.log('RESPONSE IN FETCH SERVICES -- >', response);
          if (response.status == 201 || response.status == 200) {
            const result = await JSON.stringify(response.data);
            console.log('result in fetch', result);
            await LocalStorage.storeToken(JSON.stringify(body));
            await LocalStorage.onSignUp(
              response.data.accessToken,
              JSON.stringify(response.data.user),
            );
            authStore.onVendorRegistration({
              token: response.data.accessToken,
              user: response.data.user,
            });
            setLoader(false);
          } else {
            setLoader(false);
          }
        } catch (e) {
          console.log(e);
          setLoader(false);
          Alert.alert('Something went wrong!');
        }
      } else {
        setLoader(false);
        Toast("Please fill all the field's with valid data !");
      }
    } catch (error) {
      console.log('GLOBAL_CREATE_ERROR - ', error);
      setLoader(false);
      return Alert.alert('Message', 'Something went wrong');
    }
            */
