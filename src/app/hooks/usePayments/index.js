import React, {useState} from 'react';
import { APP_CONFIGURATIONS } from '../../../app/constants';

const usePayments = () => {
    const [publishableKey, setPublishableKey] = useState(
        APP_CONFIGURATIONS.STRIPE.publishingProductKey,
      );
    return {    

    }
}

export default usePayments;