export const insertStringAtPos = (insertStr, actualStr, position = 0) => {
  return [
    insertStr.slice(0, position),
    actualStr,
    insertStr.slice(position),
  ].join('');
};

export const insertPeriodInString = (str = '', strLen = 10) => {
  if (str.length < strLen) {
    return str;
  }
  return str.substr(0,strLen) + '...';
}