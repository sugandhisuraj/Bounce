import * as yup from 'yup';
import {RegexCollection} from '../../constants';
class CreateVendor {
  username = '';
  password = '';
  email = '';
  phoneNumber = '';
  fullName = '';
  city = '';
  state = 'USA';
  about = '';
  website = '';
  language = [];
  genres = [];
  services = [];
  guardCertification = [];
  armed = [];
  cuisines = [];
  vendorType = 0;
  equipment = [];
  profileImageFile = null;
  gender = -1;
  dollar = -1;
  hourlyRate = '';
  businessOwnerName = '';
  countryCode = {
    id: 229,
    name: 'United States',
    dial_code: '+1',
    code: 'US',
    flag: '🇺🇸',
  };
  constructor(data = {}) {
    Object.assign(this, {...data});
  }
  toString = () => {
    return JSON.stringify(this);
  };

  validate = (forEdit = false, currentVendorFields = {}) => {
    let validationResult = {
      isValidate: false,
      errors: [],
      fields: {},
    };
    let validations = {};
    if (currentVendorFields?.Price) {
      validations = {dollar: yup.number().min(1, 'Select Price')};
    }
    try {
      validationResult.fields = this.toJSON(forEdit);
      let createVendorSchema = yup.object().shape({
        fullName: yup.string().required('Required Business Name'),
        phoneNumber: yup
          .string()
          .required('Required Phone Number')
          .matches(RegexCollection.phoneNumberRegex, 'Invalid Phone Number'),
        website: yup.string().url().required('Required Website'),
        city: yup.string().required('Required City'),
        about: yup.string().required('Required Description'),
        gender: yup.number().min(0, 'Required Gender'),
        ...validations,
      });
      let valid = createVendorSchema.validateSync(validationResult.fields, {
        abortEarly: false,
      });
      validationResult.isValidate = true;
    } catch (error) {
      error.inner.forEach(e => {
        validationResult.errors.push({message: e.message, field: e.path});
        console.log(e.message, e.path);
      });
    }
    return validationResult;
  };

  toJSON = forEdit => {
    let createVendorDTO = {};
    if (!forEdit) {
      createVendorDTO = {
        username: this.username.toLowerCase(),
        password: this.password,
        age: 1,
        vendorType: this.vendorType,
      };
    }
    return {
      ...createVendorDTO,
      phoneNumber: this.phoneNumber,
      fullName: this.fullName,
      hourlyRate: this.hourlyRate,
      about: this.about,
      gender: this.gender,
      city: this.city,
      email: this.email.toLowerCase(),
      businessOwnerName: this.businessOwnerName,
      equipment: this.equipment,
      website: this.website,
      countryCode: this.countryCode,
      genres: this.genres,
      services: this.services,
      cuisines: this.cuisines,
      armed: this.armed,
      guardCertification: this.guardCertification,
      profileImageFile: this.profileImageFile,
      dollar: this.dollar,
      language: this.language,
    };
  };

  updateFields = (fields = {}) => {
    Object.assign(this, fields);
  };

  static forEdit = userData => {
    let editVendor = new CreateVendor();
    editVendor.fullName = userData.fullName;
    editVendor.profileImageFile = userData?.profileImage?.filePath ?? null;
    editVendor.email = userData.email;
    editVendor.phoneNumber = userData.phoneNumber;
    editVendor.city = userData.city ?? '';
    editVendor.hourlyRate = userData?.vendor?.hourlyRate ?? '';
    editVendor.dollar = userData?.vendor?.dollar ?? -1;
    editVendor.website = userData?.vendor?.website ?? '';
    editVendor.about = userData?.about ?? '';
    const languages = [];
    userData?.language?.map(l => {
      languages.push(l.language);
    });
    editVendor.language = languages ?? [];
    // if (editVendor.language.length > 0) {
    //   console.log("LANG_TEST - ", editVendor.language);
    //   editVendor.language = editVendor.language.map((lang) => {
    //     return {label: lang.label, value: lang.value, code: lang.code};
    //   });
    //   console.log("LANG_TEST_AFTER - ", editVendor.language);
    // }
    editVendor.gender = userData?.gender ?? 0;
    editVendor.businessOwnerName = userData?.vendor?.businessOwnerName ?? '';
    editVendor.username = userData?.username ?? '';
    editVendor.vendorType = userData?.vendorType ?? 1;

    return editVendor;
  };
}

export default CreateVendor;
