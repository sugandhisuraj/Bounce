/*
{"code": "AF", 
"dial_code": "+93", "flag": "🇦🇫", 
"name": {"by": "", "cz": "Afghánistán", "en": "Afghanistan",
 "pl": "Afganistan", "ru": "Афганистан", "ua": "Афганістан"}}
*/
class CountryCodeEntity {
  name;
  code;
  dial_code;
  flag;
  id;

  constructor(countryData) {
    this.name = countryData.name.en;
    this.code = countryData.code;
    this.dial_code = countryData.dial_codel;
    this.flag = countryData.flag;
  }
  serialize = () => {
    return {
      name: this.name,
      dial_code: this.dial_code,
      code: this.code,
      flag: this.flag,
    };
  };
}

export default CountryCodeEntity;