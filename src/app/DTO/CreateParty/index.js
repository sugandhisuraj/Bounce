import {
  Party as CreatePartyEntity,
  Ticket as TicketEntity,
} from '../../Entities';
import {ReactModel} from '../../core';
import {ClassValidator} from '../../Validations';
import {utcToCurrentTimeZone} from '../../utils';
import * as yup from 'yup';

@ReactModel()
class CreatePartyDTO extends CreatePartyEntity {
  partyError = {};

  set = fields => {
    for (key in fields) {
      if (this.partyError[key]) {
        delete this.partyError[key];
      }
      this[key] = fields[key];
    }
    this.notifyListeners();
  };
  setAddress = addressStr => {
    this.location.addressStr = addressStr;
    this.notifyListeners();
  };
  updateGallery = images => {
    this.galleryFiles = images;
    this.notifyListeners();
  };
  addGallery = images => {
    this.galleryFiles.push(...images);
    this.notifyListeners();
  };

  removeGallery = (action = false, image) => {
    if (action == false) {
      let findIndex = this.galleryFiles.findIndex(i => i.path == image);
      if (findIndex > -1) {
        this.galleryFiles.splice(findIndex, 1);
      }
    } else {
      let findIndex = this.gallery.findIndex(i => i.filePath == image);
      if (findIndex > -1) {
        this.gallery.splice(findIndex, 1);
      }
    }

    this.notifyListeners();
  };
  setIsPrivate = value => {
    this.isPrivate = value;
    this.partyTags = [];
    this.fromAge = '';
    this.toAge = '';
    this.notifyListeners();
  };

  reset = (preParty = {}) => {
    if (Object.keys(preParty).length == 0) {
      Object.assign(this, new CreatePartyEntity());
    } else {
      Object.assign(this, CreatePartyEntity.fromJSON(preParty));
    }
    this.notifyListeners();
  };

  addTicketType = () => {
    this.tickets.push(new TicketEntity());
    this.notifyListeners();
  };

  onTicketChangeText = (data, index) => {
    this.tickets[index] = TicketEntity.update(this.tickets[index], data);
    this.notifyListeners();
  };

  onTicketDelete = index => {
    this.tickets = [...this.tickets.filter((_, i) => i != index)];
    this.notifyListeners();
  };

  addTags = ({tag, subTags}) => {
    try {
      let newTag = [...this.partyTags];
      let {tagIndex, tagExist, subTagIndex, subTagExist} = this.isSubTagExist(
        tag,
        subTags,
      );
      if (tagExist && subTagExist) {
        if (newTag[tagIndex].subTags.length == 1) {
          newTag = newTag.filter(i => i.id != tag.id);
        } else {
          newTag[tagIndex].subTags = newTag[tagIndex].subTags.filter(
            sT => sT.id != subTags.id,
          );
        }
      } else if (!tagExist && !subTagExist) {
        let newTagData = {
          ...tag,
          subTags: [subTags],
        };
        newTag.push(newTagData);
      } else if (!subTagExist) {
        newTag[tagIndex].subTags.push(subTags);
      }

      this.partyTags = newTag;
      this.notifyListeners();
    } catch (error) {
      console.log('ADD_TAGS_ERROR - ', error);
    }
  };

  isSubTagExist = (tag, subTag) => {
    // don't do any side effect to be call in declarative code
    let result = {
      tagIndex: -1,
      tagExist: false,
      subTagIndex: -1,
      subTagExist: false,
    };
    let tagIndex = this.partyTags.findIndex(t => tag.id == t.id);
    if (tagIndex == -1) {
      return result;
    }
    result.tagIndex = tagIndex;
    result.tagExist = true;
    let subTagIndex = this.partyTags[tagIndex].subTags.findIndex(
      sT => sT.id == subTag.id,
    );
    if (subTagIndex == -1) {
      return result;
    }
    result.subTagIndex = subTagIndex;
    result.subTagExist = true;
    return result;
  };

  validateOnBackPress = (party, isEditParty = false) => {
    if (isEditParty) {
      if (party.title != this.title) {
        return true;
      }
      if (party.gallery.length != this.gallery.length) {
        return true;
      }
      if (this.galleryFiles.length > 0) {
        return true;
      }
      if (utcToCurrentTimeZone(party.date).getTime() != this.date.getTime()) {
        return true;
      }
      if (party.location.addressStr != this.location.addressStr) {
        return true;
      }
      if (party.description != this.description) {
        return true;
      }

      if (party.isPrivate != this.isPrivate) {
        return true;
      }

      return false;
    }
    if (!isEditParty) {
      if (this.title != '') {
        return true;
      }
      if (this.galleryFiles.length > 0) {
        return true;
      }
      if (this.date) {
        return true;
      }
      if (this.location.addressStr.length > 0) {
        return true;
      }
      if (this.description.length > 0) {
        return true;
      }
      if (this.isPrivate == false) {
        return true;
      }
      if (this.fromAge) {
        return true;
      }
      if (this.toAge) {
        return true;
      }
      if (this.partyTags.length > 0) {
        return true;
      }
      if (this.tickets.length > 0) {
        return true;
      }
      return false;
    }

    return false;
  };

  isPartyValid = (isDraftMode = false, isEditMode = false) => {
    console.log('IS_DR_HERE_1 - ', isDraftMode);
    const returnData = {body: {}, success: true, errors: []};
    try {
      returnData.body = {...CreatePartyEntity.toJSON(this, isEditMode)};
      console.log('DATE_LEN_1 - ', returnData.body.date.length);
      returnData.body.isDraft = isDraftMode;
      const savePartyYup = yup.object().shape({
        title: yup.string().required('Required Party title'),
        ...this.getAgeValidation(returnData.body, isDraftMode, isEditMode),
        ...this.getValidationForSavingEvent(
          returnData.body,
          isDraftMode,
          isEditMode,
        ),
      });
      savePartyYup.validateSync(returnData.body, {abortEarly: false});
    } catch (error) {
      returnData.success = false;
      error?.inner?.forEach((e, i) => {
        returnData.errors.push({message: e.message, path: e.path});
        console.log('PARTY_FORM_ERROR - ' + i, e.message, e.path);
      });
    }
    console.log('RETURN_DATA_BODY_2 - ', JSON.stringify(returnData.body));
    if (returnData.success) {
      if (isDraftMode && returnData.body.location.addressStr?.length == 0) {
        delete returnData.body.location;
      }
      if (isDraftMode && returnData.body.date?.length == 0) {
        delete returnData.body.date;
      }
      if (returnData.body.fromAge?.length == 0) {
        returnData.body.fromAge = 0;
      }
      if (returnData.body.toAge?.length == 0) {
        returnData.body.toAge = 0;
      }
    }
    return returnData;
  };
  getAgeValidation = (body, isDraftMode, isEditMode) => {
    //fromAge toAge
    let toAgeVal = {};
    let fromAgeVal = {};
    console.log('BODY_FROM_AGE - ', body.fromAge);
    console.log('BODY_TO_AGE - ', body.toAge);
    if (!body.fromAge && !body.toAge) {
      return {};
    }
    if (body.fromAge?.length == 0 && body.toAge?.length == 0) {
      return {};
    }
    if (body.fromAge?.length > 0 && (!body.toAge || body.toAge?.length == 0)) {
      toAgeVal = {
        toAge: yup.string().required('Required Max Age'),
      };
    }
    if (
      (!body.fromAge || body.fromAge?.length == 0) &&
      body.toAge?.length > 0
    ) {
      fromAgeVal = {
        fromAge: yup.string().required('Required Min Age'),
      };
    }
    return {
      fromAge: yup
        .number()
        .positive('Min age must be a positive value')
        .min(14, 'Min age must be greater than 14')
        .typeError('Min age must be numeric')
        .test({
          test: value => {
            if (body.toAge?.length > 0 && !isNaN(body.toAge)) {
              if (Number(body.fromAge) > Number(body.toAge)) {
                return false;
              }
            }
            return true;
          },
          message: 'From age cannot be greater than to age',
        }),
      toAge: yup
        .number()
        .positive('Max age must be a positive value')
        .typeError('Max age must be numeric')
        .test({
          test: value => {
            if (
              body.fromAge?.length > 0 &&
              !isNaN(body.fromAge) &&
              body.toAge?.length == 0
            ) {
              return false;
            }
            return true;
          },
          message: 'Required To Age',
        }),
      ...fromAgeVal,
      ...toAgeVal,
    };
  };
  getValidationForSavingEvent = (body, isDraftMode, isEditMode) => {
    if (isDraftMode) {
      return {};
    }

    let partyTagVal = {};
    if (!body.isPrivate) {
      partyTagVal = {
        partyTags: yup.array().min(1, 'Required at least 1 Party Tag'),
      };
    }
    if (body.gallery?.length == 0) {
      partyTagVal = {
        ...partyTagVal,
        galleryFiles: yup.array().min(1, 'Required at least 1 Party Image'),
      };
    }
    return {
      date: yup.string().required('Required Party Date'),
      location: yup.object().shape({
        addressStr: yup.string().required('Required Party Address'),
      }),
      description: yup.string().required('Required Party Description'),
      ...partyTagVal,
    };
  };
  validateToAgeAndFromAge = () => {};
}

export default CreatePartyDTO;
