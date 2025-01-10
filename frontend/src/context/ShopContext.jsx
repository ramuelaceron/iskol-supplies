import { createContext, useState } from 'react';
import { product } from '../assets/assets';

export const ShopContext = createContext();

const ShopContextProvide = ({ children }) => {

  const currency = '₱';

  const [products, setProducts] = useState(product);

  const value = {
    products,
    currency,
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvide;
