import {wp, hp, getHp, getWp, width, height} from './viewUtils';
import {FONTSIZE, FONTFAMILY} from './fontSize';
import {DRAWERNAV, setDrawerNav} from './navigationService';
import {transformFirebaseValues, getLargeNum} from './firebaseUtils';
import {
  maxNumberArrOfObj,
  removeDuplicateFromArr,
  sortArrayAlphabatically,
  filterArrayByDate,
  filterPartyOnFutureAndPast,
  copyArrayInItself,
} from './array';
import {
  isPartyBegin,
  getFromToDate,
  toCurrentTimeZone,
  filterArrOnDate,
  utcToCurrentTimeZone,
  wait,
  dateTimeAgo,
} from './dateTime';
import {smallHitSlop, bigHitSlop} from './hitSlop';
import {validateEmail, validatePass} from './validation';
import {insertStringAtPos, insertPeriodInString} from './string';
import {userQrEncryption} from './encryptions';
import {calculateTax, myParseFloat} from './currencyUtils';
import * as PartyUtils from './partyUtils';
import * as URLUtils from './urlUtils';
import * as FileMIMETypesUtils from './fileMimeTypes';
export {
  insertPeriodInString,
  copyArrayInItself,
  insertStringAtPos,
  wait,
  filterPartyOnFutureAndPast,
  filterArrayByDate,
  FONTFAMILY,
  validateEmail,
  validatePass,
  width,
  height,
  smallHitSlop,
  bigHitSlop,
  wp,
  hp,
  getHp,
  getWp,
  FONTSIZE,
  transformFirebaseValues,
  maxNumberArrOfObj,
  getFromToDate,
  getLargeNum,
  removeDuplicateFromArr,
  sortArrayAlphabatically,
  toCurrentTimeZone,
  filterArrOnDate,
  utcToCurrentTimeZone,
  dateTimeAgo,
  isPartyBegin,
  userQrEncryption,
  calculateTax,
  myParseFloat,
  PartyUtils,
  URLUtils,
  FileMIMETypesUtils,
};
