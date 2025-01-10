import { createContext, useState } from 'react';
import { product } from '../assets/assets';
import { toast } from 'react-toastify';

export const ShopContext = createContext();

const ShopContextProvide = ({ children }) => {

  const currency = '₱';
  const service_fee = 5;

  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState(product);
  const [searchTerm, setSearchTerm] = useState('');

  const updateSearchTerm = (term) => {
    setSearchTerm(term);
  };

  // Function to add items to cart
  const addToCart = async (itemId, size, color, type) => {
    if (!size && !color && !type) {
      toast.error('Please select to continue');
      return;
    }

    const updatedCart = { ...cartItems };

    if (!updatedCart[itemId]) {
      updatedCart[itemId] = {};
    }

    // Set key as the value of color, size and type
    const key = `${size}${color}${type}`;  
    updatedCart[itemId][key] = (updatedCart[itemId][key] || 0) + 1;

    setCartItems(updatedCart);

    // Adds only one (color, size or type) to the console
    if (size) {
        console.log(`Product added to cart: ItemId - ${itemId}, Size - ${size}`);
    } else if (color) {
        console.log(`Product added to cart: ItemId - ${itemId}, Color - ${color}`);
    } else if (type) {
        console.log(`Product added to cart: ItemId - ${itemId}, Type - ${type}`);
    }
        
    toast.success('Product added to Cart');
  };

  // Function to get the amount of items in the cart
  const getCartCount = () => {
    let totalCount = 0;
    for (const item in cartItems) {
      for (const variant in cartItems[item]) {
        totalCount += cartItems[item][variant];
      }
    }
    return totalCount;
  };

  // Function to update quantity
  const updateQuantity = async (itemId, key, quantity) => {
    const cartData = { ...cartItems };
    if (cartData[itemId] && cartData[itemId][key]) {
      cartData[itemId][key] = quantity;
      setCartItems(cartData);
    }
  };

  // Function to get the cart total
  const getCartAmount = () => {
    let totalAmount = 0;

    for (const itemId in cartItems) {
      const itemInfo = products.find((product) => product._id === itemId);

      if (itemInfo) {
        for (const key in cartItems[itemId]) {
          totalAmount += itemInfo.price * cartItems[itemId][key];
        }
      }
    }

    return totalAmount;
  };

  const value = {
    products,
    cartItems,
    currency,
    searchTerm,
    updateSearchTerm,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvide;
