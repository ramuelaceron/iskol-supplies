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
  const addToCart = async (ItemId, optionValues) => {
    if (!optionValues) {
      toast.error('Please select an option to continue');
      return;
    }

    const updatedCart = { ...cartItems };

    if (!updatedCart[ItemId]) {
         updatedCart[ItemId] = {[optionValues] : 1}
    } else {
         updatedCart[ItemId][optionValues] = (updatedCart[ItemId][optionValues] || 0) + 1;
    }
    
    setCartItems(updatedCart);

    console.log(`Product added to cart: ItemId - ${ItemId}, Option - ${optionValues}`);
        
    toast.success('Product added to Cart');
    
    
    if(token){
      try {
        await axios.post(backendUrl + '/api/cart/add', {ItemId, optionValues}, {headers: {token}})
      } catch (error) {
        console.log(error)
        toast.error(error.message)
      }
    }

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
  const updatedQuantity = async(ItemId, optionValues, quantity) => {
    let cartData = structuredClone(cartItems)

    cartData[ItemId][optionValues] = quantity;

    setCartItems(cartData)

    if(token){
      try {
        await axios.post(backendUrl + '/api/cart/update', {ItemId, optionValues, quantity}, {headers: {token}})
      } catch (error) {
        console.log(error)
        toast.error(error.message)
      }
    }

  }

  const getUserCart = async(token) => {
    try {
      const response = await axios.post(backendUrl + '/api/cart/get', {}, {headers: {token}})
      if(response.data.success){
        setCartItems(response.data.cartData)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }


  // Function to get the cart total
  const getCartAmount = () => {
    let totalAmount = 0;

    for (const ItemId in cartItems) {
      const itemInfo = products.find((product) => product._id === ItemId);

      if (itemInfo) {
        for (const optionValues in cartItems[ItemId]) {
          totalAmount += itemInfo.price * cartItems[ItemId][optionValues];
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

  useEffect(()=>{
    if (!token && localStorage.getItem('token')){
      setToken(localStorage.getItem('token'));
      getUserCart(localStorage.getItem('token'))
    }
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
    setToken,
    setCartItems
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvide;
