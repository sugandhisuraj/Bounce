class FilterVendor {
  categoryId = null;
  gender = [];
  rating = [];
  fromPrice = 0;
  toPrice = 1000; 
  guardCertification = [];
  genres = [];
  equipment = [];
  services = [];
  cuisines = [];
  armed = [];
  dollar = [];
  constructor(fields = {}) {
    Object.assign(this, fields);
  }
  clone = (fields = {}) => {
    let newFilterVendor = new FilterVendor();
    Object.assign(newFilterVendor, fields, this);
    return newFilterVendor;
  };
}

export default FilterVendor;
