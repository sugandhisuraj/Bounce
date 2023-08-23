class SearchEventDTO {
  duration = [];
  address = '';

  fromDistance = 0;

  toDistance = 100;

  fromPrice = 0;

  toPrice = 1000;

  plus18 = false;

  plus21 = false;

  searchText = '';

  currentFields = {};
  updater = null;
  constructor(updater = null) {
    if (updater) {
      this.updater = updater;
    }
    this.setButtons();
  }
  setDurationStatus = (durat, i) => {
    let newduration = this.duration.slice();
    newduration[i].value = !newduration[i].value;
    this.duration = newduration;
    if (this.updater) {
      this.updater({...this});
    }
  };
  setAgeStatus = (age, i) => {
    let newAgeButtons = this.ageButtons.slice();
    newAgeButtons[i].value = !newAgeButtons[i].value;
    this.ageButtons = newAgeButtons;
    if (this.updater) {
      this.updater({...this});
    }
  };
  setValue = obj => {
    Object.assign(this, obj);
    this.updater({...this});
  };
  setButtons = () => {
    SearchEventDTO.DURATIONS.map(dText => {
      this.duration.push({...dText});
    });
  };
  reset = () => { 
    let newObj = new SearchEventDTO();
    newObj.updater= this.updater;
    Object.assign(this, newObj);
    this.updater({...this});
  }
  toJSON = () => {
    return {
      duration: this.duration,
      address: this.address,
      fromDistance: this.fromDistance,
      toDistance: this.toDistance,
      fromPrice: this.fromPrice,
      toPrice: this.toPrice,
      plus18: this.plus18,
      plus21: this.plus21,
      searchText: this.searchText,
    };
  };
  initCurrentField = () => {
    if (Object.keys(this.currentFields).length == 0) {
      this.reset();
    }else {   
    Object.assign(this, this.currentFields);
    this.updater({...this});
    }
  }
  static DURATIONS = [
    {key: 'today', value: false, heading: 'Today'},

    {key: 'tomorrow', value: false, heading: 'Tomorrow'},

    {key: 'thisWeek', value: false, heading: 'This week'},

    {key: 'nextWeek', value: false, heading: 'Next week'},

    {key: 'thisMonth', value: false, heading: 'This month'},

    {key: 'nextMonth', value: false, heading: 'Next month'},
  ];
}

export default SearchEventDTO;

/*

{

    "duration":[

        { "key": "today", "value": false},

        { "key": "tomorrow", "value": false},

        { "key": "thisWeek", "value": false},

        { "key": "nextWeek", "value": false},

        { "key": "thisMonth", "value": false},

        { "key": "nextMonth", "value": false}

    ],

    "address":"indore",

    "fromDistance":0,

    "toDistance":100,

    "fromPrice":0,

    "toPrice":1000,

    "plus18":false,

    "plus21":false,

    "searchText":""

}
*/
