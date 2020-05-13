import React from 'react';
import GlobalContextProvider from './src/context/GlobalContextProvider';
import ShopifyClientProvider from './src/context/ShopifyClientProvider';

import './src/styles/tailwind.css';

export const wrapRootElement = ({ element }) => {
  return (
    <GlobalContextProvider>
      <ShopifyClientProvider>{element}</ShopifyClientProvider>
    </GlobalContextProvider>
  );
};
