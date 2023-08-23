import React, {useCallback, useState} from 'react';
import {Search} from '../../../components';

const useSearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const onChangeText = useCallback(text => setSearchQuery(i => text), []);
  const SearchBarComponent = useCallback(({...searchProps}) => {
    return (
      <Search
        value={searchQuery}
        onChangeText={onChangeText}
        searchQuery={searchQuery}
        {...searchProps}
      />
    );
  }, [searchQuery]);
  return {
    searchQuery,
    SearchBarComponent,
    onChangeText
  };
};
export default useSearchBar;
