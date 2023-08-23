let VendorCategories = [
  {
    id: 1,
    vendorCategory: 'Coordinators',
    categoryImage:
      'https://bounce-prod-media.s3.us-east-2.amazonaws.com/2021-04-29/47a60f790a6cc9417263531be93ca667ee97e1a4/051334e84f87ba86a415ef324b62ccfe/Icons_8.svg',
    createdAt: '2021-04-29T05:52:24.840Z',
  },
  {
    id: 2,
    vendorCategory: 'Music',
    categoryImage:
      'https://bounce-prod-media.s3.us-east-2.amazonaws.com/2021-04-29/25b36548e1e2632a86184781f7e9fdae7fd17bba/37ae147765597aa469709f84462380e1/Icons_7.svg',
    createdAt: '2021-04-29T05:54:01.251Z',
  },
  {
    id: 3,
    vendorCategory: 'Food',
    categoryImage:
      'https://bounce-prod-media.s3.us-east-2.amazonaws.com/2021-04-29/854bf34d06a3d2025a0e00ceac36d36bc99027d4/592fc8329cc1af4892f5a781a7c39401/Icons_6.svg',
    createdAt: '2021-04-29T05:55:00.526Z',
  },
  {
    id: 4,
    vendorCategory: 'Drinks',
    categoryImage:
      'https://bounce-prod-media.s3.us-east-2.amazonaws.com/2021-04-29/4de1d948cd485492f79f2dbde26b46ee1c6171ce/24318c2ec0f6b1cf53e4b498b1246b8c/Icons_5.svg',
    createdAt: '2021-04-29T05:56:11.799Z',
  },
  {
    id: 5,
    vendorCategory: 'Photo',
    categoryImage:
      'https://bounce-prod-media.s3.us-east-2.amazonaws.com/2021-04-29/5a5b2d9c4f50e7de575dce82cfbdd80373b0a0c4/6a255ed25a47eec23145bef85189be48/Icons_4.svg',
    createdAt: '2021-04-29T05:57:04.834Z',
  },
  {
    id: 6,
    vendorCategory: 'Security',
    categoryImage:
      'https://bounce-prod-media.s3.us-east-2.amazonaws.com/2021-04-29/4f50502ac40c75146bda07030c3e1fbce031a654/421770bc894dcf607de704f22b5753db/Icons_3.svg',
    createdAt: '2021-04-29T05:57:48.990Z',
  },
  {
    id: 7,
    vendorCategory: 'Event Rentals',
    categoryImage:
      'https://bounce-prod-media.s3.us-east-2.amazonaws.com/2021-04-29/410057a26bd8bc2c5ea19c00ae77695e8b64b57c/76ba98a5ac53a6d01d6a6422474af674/Icons_1.svg',
    createdAt: '2021-04-29T05:58:49.265Z',
  },
  {
    id: 8,
    vendorCategory: 'Cleaning Crew',
    categoryImage:
      'https://bounce-prod-media.s3.us-east-2.amazonaws.com/2021-04-29/241c78836c1274dd9e65cec5d7f9042c70ef84b4/78346afe899aba4fd12b8c6ebd163e5a/Icons_2.svg',
    createdAt: '2021-04-29T05:59:37.743Z',
  },
  {
    id: 9,
    vendorCategory: 'Video',
    categoryImage:
      'https://bounce-prod-media.s3.us-east-2.amazonaws.com/2021-04-29/854bf34d06a3d2025a0e00ceac36d36bc99027d4/592fc8329cc1af4892f5a781a7c39401/Icons_6.svg',
    createdAt: '2021-08-26T07:02:53.866Z',
  },
];
let VendorFields = [
  {
    id: 1,
    fields: {
      MultipleMediaFiles: true,
      Name: true,
      City: true,
      Ratings: true,
      Price: true,
      Description: true,
      Website: true,
      Language: true,
      Reviews: true,
    },
    isCoordinators: true,
    priceTypeString: 'base package',
    priceDetails: [
      {
        total: 5,
        selected: 1,
        price: '0 - 300',
        fromPrice: 0,
        toPrice: 300
      },
      {
        total: 5,
        selected: 2,
        price: '301 - 600',
        fromPrice: 301,
        toPrice: 600
      },
      {
        total: 5,
        selected: 3,
        price: '601 - 900',
        fromPrice: 601,
        toPrice: 900
      }, 
      {
        total: 5,
        selected: 4,
        price: '901 - 1,200',
        fromPrice: 901,
        toPrice: 1200
      },
      {
        total: 5,
        selected: 5,
        price: '1,201 +',
        fromPrice: 1201,
        toPrice: 2000
      },
    ],
  },
  {
    id: 2,
    fields: {
      MultipleMediaFiles: true,
      Name: true,
      City: true,
      Price: true,
      Ratings: true,
      Description: true,
      Language: true,
      Genres: true,
      DJEquipments: true,
      Website: true,
      Reviews: true,
    },
    isMusic: true,
    priceTypeString: 'base package',
    priceDetails: [
      {
        total: 5,
        selected: 1,
        price: '0 - 75',
        fromPrice: 0,
        toPrice: 75
      },
      {
        total: 5,
        selected: 2,
        price: '76 - 350',
        fromPrice: 76,
        toPrice: 350
      },
      {
        total: 5,
        selected: 3,
        price: '351 - 1,000',
        fromPrice: 351,
        toPrice: 1000
      }, 
      {
        total: 5,
        selected: 4,
        price: '1,000 - 1,999',
        fromPrice: 1000,
        toPrice: 1999
      },
      {
        total: 5,
        selected: 5,
        price: '2,000 +',
        fromPrice: 2000,
        toPrice: 3000
      },
    ],
  },
  {
    id: 3,
    fields: {
      MultipleMediaFiles: true,
      Name: true,
      City: true,
      Ratings: true,
      Price: true,
      Description: true,
      MenuButton: true,
      Website: true,
      Language: true,
      Reviews: true,
      Cuisines: true,
      FoodServices: true,
    },
    isFood: true,
    priceTypeString: 'per person',
    priceDetails: [
      {
        total: 5,
        selected: 1,
        price: '0 - 50',
        fromPrice: 0,
        toPrice: 50
      },
      {
        total: 5,
        selected: 2,
        price: '51 - 100',
        fromPrice: 51,
        toPrice: 100
      },
      {
        total: 5,
        selected: 3,
        price: '101 - 150',
        fromPrice: 101,
        toPrice: 150
      }, 
      {
        total: 5,
        selected: 4,
        price: '151 - 200',
        fromPrice: 151,
        toPrice: 200
      },
      {
        total: 5,
        selected: 5,
        price: '201 +',
        fromPrice: 201,
        toPrice: 300
      },
    ],
  },
  {
    id: 4,
    fields: {
      MultipleMediaFiles: true,
      Name: true,
      City: true,
      Ratings: true,
      Price: true,
      Description: true,
      Website: true,
      Language: true,
      Reviews: true,
      DrinksServices: true,
      DrinksEquipments: true,
    },
    isDrinks: true,
    priceTypeString: 'per hour',
    priceDetails: [
      {
        total: 5,
        selected: 1,
        price: '0 - 15',
        fromPrice: 0,
        toPrice: 15
      },
      {
        total: 5,
        selected: 2,
        price: '16 - 30',
        fromPrice: 16,
        toPrice: 30
      },
      {
        total: 5,
        selected: 3,
        price: '31 - 45',
        fromPrice: 31,
        toPrice: 45
      }, 
      {
        total: 5,
        selected: 4,
        price: '46 - 60',
        fromPrice: 46,
        toPrice: 60
      },
      {
        total: 5,
        selected: 5,
        price: '61 +',
        fromPrice: 61,
        toPrice: 70
      },
    ],
  },
  {
    id: 5,
    fields: {
      MultipleMediaFiles: true,
      Name: true,
      City: true,
      Ratings: true,
      Price: true,
      Description: true,
      Website: true,
      Language: true,
      Reviews: true,
      PhotoServices: true,
      PhotoEquipments: true,
    },
    isPhoto: true,
    priceTypeString: 'per hour',
    priceDetails: [
      {
        total: 5,
        selected: 1,
        price: '0 - 50',
        fromPrice: 0,
        toPrice: 50
      },
      {
        total: 5,
        selected: 2,
        price: '51 - 100',
        fromPrice: 51,
        toPrice: 100
      },
      {
        total: 5,
        selected: 3,
        price: '101 - 150',
        fromPrice: 101,
        toPrice: 150
      }, 
      {
        total: 5,
        selected: 4,
        price: '151 - 200',
        fromPrice: 151,
        toPrice: 200
      },
      {
        total: 5,
        selected: 5,
        price: '201 +',
        fromPrice: 201,
        toPrice: 300
      },
    ],
  },
  {
    id: 6,
    fields: {
      MultipleMediaFiles: true,
      Name: true,
      City: true,
      Ratings: true,
      Price: true,
      Description: true,
      Website: true,
      GuardCertification: true,
      Language: true,
      Reviews: true,
      Armed: true,
    },
    isSecurity: true,
    priceTypeString: 'per hour',
    priceDetails: [
      {
        total: 5,
        selected: 1,
        price: '0 - 15',
        fromPrice: 0,
        toPrice: 15
      },
      {
        total: 5,
        selected: 2,
        price: '16 - 30',
        fromPrice: 16,
        toPrice: 30
      },
      {
        total: 5,
        selected: 3,
        price: '30 - 45',
        fromPrice: 30,
        toPrice: 45
      }, 
      {
        total: 5,
        selected: 4,
        price: '46 - 60',
        fromPrice: 46,
        toPrice: 60
      },
      {
        total: 5,
        selected: 5,
        price: '61+',
        fromPrice: 61,
        toPrice: 300
      },
    ],
  },
  {
    id: 7,
    fields: {
      MultipleMediaFilesWithInventory: true,
      Name: true,
      City: true,
      Ratings: true,
      Price: false,
      Description: true,
      Website: true,
      Language: true,
      Reviews: true,
    },
    isEventRentals: true,
  },
  {
    id: 8,
    fields: {
      MultipleMediaFiles: true,
      Name: true,
      City: true,
      Ratings: true,
      Price: true,
      Description: true,
      Website: true,
      Language: true,
      Reviews: true,
      CleaningCrewServices: true,
    },
    isCleaningCrew: true,
    priceTypeString: 'per hour',
    priceDetails: [
      {
        total: 5,
        selected: 1,
        price: '0 - 20',
        fromPrice: 0,
        toPrice: 20
      },
      {
        total: 5,
        selected: 2,
        price: '21 - 40',
        fromPrice: 21,
        toPrice: 40
      },
      {
        total: 5,
        selected: 3,
        price: '41 - 60',
        fromPrice: 41,
        toPrice: 60
      }, 
      {
        total: 5,
        selected: 4,
        price: '61 - 80',
        fromPrice: 61,
        toPrice: 80
      },
      {
        total: 5,
        selected: 5,
        price: '81+',
        fromPrice: 81,
        toPrice: 300
      },
    ],
  },
  {
    id: 9,
    fields: {
      MultipleMediaFiles: true,
      Name: true,
      City: true,
      Ratings: true,
      Price: true,
      Description: true,
      Website: true,
      Language: true,
      Reviews: true,
      VideoServices: true,
      VideoEquipments: true,
    },
    isVideo: true,
    priceTypeString: 'per hour',
    priceDetails: [
      {
        total: 5,
        selected: 1,
        price: '0 - 50',
        fromPrice: 0,
        toPrice: 50
      },
      {
        total: 5,
        selected: 2,
        price: '51 - 100',
        fromPrice: 51,
        toPrice: 100
      },
      {
        total: 5,
        selected: 3,
        price: '101 - 150',
        fromPrice: 101,
        toPrice: 150
      }, 
      {
        total: 5,
        selected: 4,
        price: '151 - 200',
        fromPrice: 151,
        toPrice: 200
      },
      {
        total: 5,
        selected: 5,
        price: '201+',
        fromPrice: 201,
        toPrice: 300
      },
    ],
  },
];
const VendorFieldsRecords = VendorCategories.map(vCategory => {
  const vFields = VendorFields.find(vF => vF.id == vCategory.id);
  return {
    ...vCategory,
    ...vFields,
  };
});
export class VendorFieldsData {
  static getFields = vendorCategoryId => {
    let categoryRecord = VendorFieldsRecords.find(category => {
      return category.id == vendorCategoryId;
    });
    return categoryRecord ? categoryRecord?.fields : {};
  };
  static getFromToPrices = (categoryId) => {
    let categoryData = this.getCategory(categoryId);
    let returnData = {
      fromPrice: 0,
      toPrice: 1000
    }
    if (categoryData.fields?.Price) {
      returnData.fromPrice = categoryData.priceDetails[0].fromPrice;
      returnData.toPrice = categoryData.priceDetails[categoryData.priceDetails.length - 1].fromPrice;
    }
    return returnData;
  }
  static getCategory = vendorCategoryId => {
    let categoryRecord = VendorFieldsRecords.find(category => {
      return category.id == vendorCategoryId;
    });
    return categoryRecord ? categoryRecord : {};
  };

  static pullUpNestedObjectFromVendors = (array = [], subKeyName, field) => {
    if (array && 'push' in array) {
      let arr = [];
      array.map(a => {
        if (subKeyName in a) {
          arr.push({...a[subKeyName]});
        }
      });
      return arr;
    }
    return [];
  };

  static getDollarsFromPrice = (categoryId, from, to) => {
    let currentCategoryData = this.getCategory(categoryId);

    let fIndex = -1;  
    let dollars = [];
    if (!currentCategoryData?.fields?.Price) {
      return dollars;
    }
    console.log("HERE_DOLLAR_TEST_1 - ", JSON.stringify(currentCategoryData));
    for (let i = 0; i < currentCategoryData.priceDetails.length; i++) {
      const { fromPrice,toPrice } = currentCategoryData.priceDetails[i];
      if (from >= fromPrice) {
        fIndex = i;
      }
    }

    for (let j = fIndex; j < currentCategoryData.priceDetails.length; j++) {
      const { fromPrice,toPrice,selected } = currentCategoryData.priceDetails[j];
      if (to > toPrice) {
        dollars.push(selected);
      } else if (this.isIn(to, fromPrice,toPrice)) {
        dollars.push(selected);
      }
    }

    return dollars;
  };
  static isIn = (x, min, max) => {
    return x > min && x <= max;
  } 
}

export let VendorsStartingPrices = [
  {
    total: 5,
    selected: 1,
    price: '0 - 75',
  },
  {
    total: 5,
    selected: 2,
    price: '75 - 350',
  },
  {
    total: 5,
    selected: 3,
    price: '351 - 1000',
  },
  ,
  {
    total: 5,
    selected: 4,
    price: '1,000 - 1,999',
  },
  {
    total: 5,
    selected: 5,
    price: '2,000 +',
  },
];
