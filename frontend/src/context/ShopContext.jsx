import { createContext, useEffect, useState } from 'react';
import { product } from '../assets/assets';
import { toast } from 'react-toastify';
import axios from 'axios'
import { backendUrl } from '../App';

export const ShopContext = createContext();

const ShopContextProvide = ({ children }) => {

  const currency = '₱';
  const service_fee = 5;

  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState(product);
  const [searchTerm, setSearchTerm] = useState('');

  const [token, setToken] = useState('')

  const updateSearchTerm = (term) => {
    setSearchTerm(term);
  };

  // Function to add items to cart
  const addToCart = async (itemId, optionValue) => {
    if (!optionValue) {
      toast.error('Please select an option to continue');
      return;
    }

    const updatedCart = { ...cartItems };

    if (!updatedCart[itemId]) {
         updatedCart[itemId] = {[optionValue] : 1}
    } else {
         updatedCart[itemId][optionValue] = (updatedCart[itemId][optionValue] || 0) + 1;
    }
    
    setCartItems(updatedCart);

    console.log(`Product added to cart: ItemId - ${itemId}, Option - ${optionValue}`);
        
    toast.success('Product added to Cart');
  };

  // function to get the amount of items in the cart
  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems){
        for (const item in cartItems[items]){
            if(cartItems[items][item] > 0) {
                totalCount += cartItems[items][item]
            }
        }
    }
    return totalCount;
  }

  // FUNCTION TO UPDATE QUANTITY
  const updatedQuantity = async(itemId, optionValue, quantity) => {
    let cartData = structuredClone(cartItems)

    cartData[itemId][optionValue] = quantity;

    setCartItems(cartData)
  }

  // Function to get the cart total
  const getCartAmount = () => {
    let totalAmount = 0;

    for (const itemId in cartItems) {
      const itemInfo = products.find((product) => product._id === itemId);

      if (itemInfo) {
        for (const optionValue in cartItems[itemId]) {
          totalAmount += itemInfo.price * cartItems[itemId][optionValue];
        }
      }
    }

    return totalAmount;
  };

  const getProductData = async ()=> {
    try {
      const response = await axios.get(backendUrl + '/api/product/list')
      // console.log(response.data)
      if(response.data.success){
        setProducts(response.data.products)
      }else{
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(()=> {
    getProductData()
  }, [])

  const value = {
    products,
    service_fee,
    cartItems,
    currency,
    searchTerm,
    updateSearchTerm,
    addToCart,
    getCartCount,
    updatedQuantity,
    getCartAmount,
    token,
    setToken
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvide;
