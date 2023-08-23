import moment from 'moment';
import {Placeholder} from '../../assets';
import {utcToCurrentTimeZone} from './dateTime';

export const maxNumberArrOfObj = (array, key) => {
  return Math.max.apply(
    Math,
    array.map(function (o) {
      return o[key];
    }),
  );
};

export const removeDuplicateFromArr = (array, key) => {
  const counterVar = new Set();

  const filteredArr = array.filter(el => {
    const duplicate = counterVar.has(el[key]);
    counterVar.add(el[key]);
    return !duplicate;
  });
  return filteredArr;
};

export const sortArrayAlphabatically = (arr, key) => {
  return arr.slice().sort((i, j) => {
    if (i[key] > j[key]) {
      return 1;
    } else {
      return -1;
    }
  });
};

export const getFirstKeyValueFromObject = obj => {};



export const filterArrayByDate = (
  arr = [],
  mode = 'desc',
  dateKey = 'createdAt',
) => {
  return arr.sort(function (a, b) {
    if (
      a != null &&
      b != null &&
      typeof a == 'object' &&
      typeof b == 'object' &&
      dateKey in a &&
      dateKey in b
    ) {
      if (mode == 'desc') {
        return moment(a[dateKey]).isBefore(moment(b[dateKey]));
      } else {
        return moment(b[dateKey]).isBefore(moment(a[dateKey]));
      }
    } else {
      return false;
    }
  });
};

export const filterPartyOnFutureAndPast = (parties = []) => {
  let futureParties = [];
  let pastParties = [];

  parties.map(party => {
    let partyTime = utcToCurrentTimeZone(party.date);
    let currentTime = new Date();
    if (partyTime.getTime() > currentTime.getTime()) {
      futureParties.push(party);
    } else {
      pastParties.push(party);
    }
  });
  futureParties = filterArrayByDate(futureParties, 'desc', 'date');
  pastParties = filterArrayByDate(pastParties, 'desc', 'date');
  return {
    futureParties,
    pastParties,
  };
};

/*

let pDate = new Date('2021-08-13T17:15:27.000Z');
    let cDate = new Date();
    console.log("PARTY_DATE - ", pDate);
    console.log("CURERNT_DATe - ", cDate); 
    console.log("PTIMETO_IN_UTC - ", utcToCurrentTimeZone(pDate));
    */

export const copyArrayInItself = (array, len = 5) => {
  let returnArr = [];
  for (let i = 1; i <= len; i++) {
    returnArr = [...returnArr, ...array];
  }
  return returnArr;
};
