import React, { useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ShopContext } from '../../context/ShopContext'
import writing_instruments from '../../assets/writing_banner.png'
import paper_products from '../../assets/paper_banner.png'
import arts_and_crafts from '../../assets/artsandcrafts_banner.png'

const Collection = () => {

  const {products, searchTerm} = useContext(ShopContext)

  const {category} = useParams();

  const filteredProducts = products.filter((product) => product.category.toLowerCase() === category.toLocaleLowerCase()
  && product.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()))

  const bannerImages = {
    Paper: paper_products,
    "Writing Materials": writing_instruments,
    "Arts and Crafts": arts_and_crafts,
  }
  return (
    <div>
      {/* Banner Section */}
      <div className="banner">
        {bannerImages[category] ? (
          <img src={bannerImages[category]} alt="banner-ig"/>
        ) : (
          <p>No image matches the category</p>
        )}
      </div>
      {/* Product Grid */}
      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div className="product-card" key={product._id}>
              <div className="product-image">
                <Link to={`/product/${product._id}`}>
                  <img src={product.image[0]} alt="" />
                </Link>
              </div>
                <h3>{product.name}</h3>
                <p>₱ {product.price}.00</p>
              </div>
          ))
        ) : (
          <p>No product is found in this category</p>
        )}
      </div>
      <hr className='footer-divider'/>
    </div>
  )
}

export default Collection
