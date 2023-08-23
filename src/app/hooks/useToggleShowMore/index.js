import React, {useCallback, useState} from 'react';
import {Buttons} from '../../../components';

const useToggleShowMore = () => {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = useCallback(() => setShowMore(i => !i), []);
  const ToggleShowMoreComponent = btnProps => {
    return (
      <Buttons.ToggleShowMore
        onButtonPress={toggleShowMore}
        showMore={showMore}
        {...btnProps}
      />
    );
  };
  return {
    showMore,
    ToggleShowMoreComponent,
  };
};

export default useToggleShowMore;
