/* http://3.12.168.164:3000/party/filter?
thisWeek=true&
tomorrow=true&
today=true&
plus18=true&
searchText=vinay&
fromPrice=750&
toPrice=900&
plus21=true */


class SearchPartyDTO {
  thisWeek = false;
  tomorrow = false;
  today = false;
  plus18 = false;
  searchText = '';
  fromPrice = 0;
  toPrice = 500;
  plus21 = false;
}


export default SearchPartyDTO;