import React, {Suspense} from 'react';

import Checkout from '@/app/component/form/User/checkout';

const CheckoutPage = () => {
    return (
        <Suspense fallback = {<div>Loading...</div>}>
        <Checkout />
        </Suspense>
    );
    
};
export default CheckoutPage;