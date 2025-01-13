import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../../context/ShopContext';
import { useParams } from 'react-router-dom';
import './ProductDetails.css';
import RelatedProduct from '../../components/RelatedProduct/RelatedProduct';

const ProductDetails = () => {
  const { products, currency, addToCart } = useContext(ShopContext);
  const { productId } = useParams();

  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  
  const fetchProductData = async () => {
    const foundProduct = products.find((item) => item._id === productId);
    if (foundProduct) {
      setProductData(foundProduct);
      setImage(foundProduct.image[0]); // Set initial image
      setSelectedOption(foundProduct.optionValues['']); // Set initial option
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div>
      <div className="product-container">
        <div className="product-content">
          <div className="product-images">
            <div className="thumbnail-container">
              {productData.image.map((item, index) => (
                <img
                  onClick={() => setImage(item)}
                  src={item}
                  key={index}
                  className="thumbnail"
                  alt={`Thumbnail ${index}`}
                />
              ))}
            </div>
            <div className="main-image-container">
              <img src={image} alt="Main Product" className="main-image" />
            </div>
          </div>
          <div className="product-info">
            <h1 className="product-name">{productData.name}</h1>
            <hr className="product-divider" />
            <p className="product-price">
              {currency} {productData.price}.00
            </p>
            <p className="product-description">{productData.description}</p>

            {/* Product Option (e.g., Type) */}
            {productData.productOption && productData.optionValues?.length > 0 && (
              <div className="choice-selector">
                <p>Select {productData.productOption}</p>
                <div className="choice-buttons">
                  {productData.optionValues.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedOption(item)}
                      className={`choice-button ${item === selectedOption ? 'active-choice' : ''}`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <hr className="product-divider" />
            <div className="product-policy">
              <p>No Delivery Service</p>
              <p>Seamless and Secure Payment</p>
              <p>Several payment options available</p>
            </div>

            <button
              onClick={() => addToCart(productData._id, selectedOption)} // Add to cart with selected option
              className="add-to-cart-btn"
            >
              ADD TO CART
            </button>
          </div>
        </div>
        <div className="description-review-sect">
          <div className="tabs">
            <b className="tab active">Description</b>
            <p className="tab">Reviews</p>
          </div>
          <div className="description-content">
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam,
              deserunt, facere consequuntur provident nulla vitae neque esse
              libero laborum in mollitia? Beatae sapiente ea eius accusamus
              dolore aperiam dolorem veritatis.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Doloribus explicabo id error inventore illum velit ducimus fugiat
              consequatur veritatis in enim facere non quam, ea neque eveniet
              vero! Consequatur, cupiditate.
            </p>
          </div>
        </div>
        <RelatedProduct category={productData.category} />
      </div>
    </div>
  ) : (
    <div>No product matches with the product id</div>
  );
};

export default ProductDetails;
