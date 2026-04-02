import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useProducts } from '../contexts/ProductContext';
import type { Product } from '../contexts/CartContext';
import './Products.css';
import chakli from '../assets/chakalimix.jpeg';
import chiwada from '../assets/chiwdamasala.jpeg';
import jamun from '../assets/gilabjamunaata.jpeg';
import methi from '../assets/kasturimethi.jpeg';
import achar from '../assets/lonchemasala.jpeg';
import papad from '../assets/papad-aata.jpeg';
import sabji from '../assets/sabjimasala.jpeg';
import gulabjamun from '../assets/premiumgulabjamunmix.jpeg';
import gulabjamunmix from '../assets/wahgulabjamunmix.jpeg';

const Products: React.FC = () => {
  const { addToCart } = useCart();
  const { state: productState } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  const openProductDetail = (product: Product) => {
    setSelectedProduct(product);
  };

  const closeProductDetail = () => {
    setSelectedProduct(null);
  };

const featuredProducts = [
      {
        id: 1,
        name: 'Premium Papad Mix',
        price: 99,
        image: papad,
        description: 'Fresh premium pears, perfect for healthy snacking. Hand-picked and carefully selected for the best quality.'
      },
      {
        id: 2,
        name: 'Premium Chiwda Masala',
        price: 59,
        image: chiwada,
        description: 'Collection of natural seeds and grains packed with nutrition and authentic flavors.'
      },
      {
        id: 3,
        name: 'Traditional Chakali Bhajani Peeth',
        price: 199,
        image: chakli,
        description: 'Authentic spice blend for traditional cooking. Made with the finest ingredients.'
      },
      {
        id: 4,
        name: 'Gulab Jamum Mix',
        price: 179,
        image: jamun,
        description: 'All natural ingredients for your kitchen. Perfect for traditional recipes.'
      },
      {
        id: 5,
        name: 'Premium Lonache Mix',
        price: 119,
        image: achar,
        description: 'Hand-crafted mix with perfect combination of spices and natural ingredients.'
      },
      {
        id: 6,
        name: 'Classic kasturimethi Mix',
        price: 49,
        image: methi,
        description: 'Traditional blend with authentic flavors that brings warmth to every dish.'
      }, {
        id: 7,
        name: 'Classic Sabji Masala',
        price: 179,
        image: sabji,
        description: 'All natural ingredients for your kitchen. Perfect for traditional recipes.'
      },
      {
        id: 8,
        name: 'Premium Gulab Jamun Mix',
        price: 119,
        image: gulabjamun,
        description: 'Hand-crafted mix with perfect combination of spices and natural ingredients.'
      },
      {
        id: 9,
        name: 'gulab jamun mix',
        price: 49,
        image: gulabjamunmix,
        description: 'Traditional blend with authentic flavors that brings warmth to every dish.'
      }
    ];

  if (productState.loading && !productState.initialized) {
    return (
      <div className="products-page">
        <div className="container">
          <div className="loading-container">
            <div className="loading">Loading products...</div>
          </div>
        </div>
      </div>
    );
  }

  if (productState.error && productState.products.length === 0) {
    return (
      <div className="products-page">
        <div className="container">
          <div className="error-container">
            <div className="error">
              <h2>Error Loading Products</h2>
              <p>{productState.error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="products-page">
      <div className="container">
        <div className="page-header">
          <h1>Our Products</h1>
          <p>Discover our carefully curated selection of traditional ingredients and authentic spice mixes</p>
        </div>

        <div className="products-grid">
            {/* productState.products */}
          {featuredProducts.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-image" onClick={() => openProductDetail(product)}>
                <img src={product.image} alt={product.name} />
              </div>
              <div className="product-info">
                <h3 onClick={() => openProductDetail(product)}>{product.name}</h3>
                <p>{product.description.substring(0, 80)}...</p>
                <div className="product-footer">
                  <span className="product-price">₹{product.price}</span>
                  <button 
                    className="add-to-cart-btn"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Product Detail Modal */}
        {selectedProduct && (
          <div className="product-modal" onClick={closeProductDetail}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="close-btn" onClick={closeProductDetail}>&times;</button>
              <div className="modal-body">
                <div className="modal-image">
                  <img src={selectedProduct.image} alt={selectedProduct.name} />
                </div>
                <div className="modal-info">
                  <h2>{selectedProduct.name}</h2>
                  <p className="modal-description">{selectedProduct.description}</p>
                  <div className="modal-price">₹{selectedProduct.price}</div>
                  <button 
                    className="modal-add-to-cart"
                    onClick={() => {
                      handleAddToCart(selectedProduct);
                      closeProductDetail();
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;