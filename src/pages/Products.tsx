import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useProducts } from '../contexts/ProductContext';
import type { Product } from '../contexts/CartContext';
import './Products.css';

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
          {productState.products.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-image" onClick={() => openProductDetail(product)}>
                <img src={product.image} alt={product.name} />
              </div>
              <div className="product-info">
                <h3 onClick={() => openProductDetail(product)}>{product.name}</h3>
                <p>{product.description.substring(0, 80)}...</p>
                <div className="product-footer">
                  <span className="product-price">${product.price}</span>
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
                  <div className="modal-price">${selectedProduct.price}</div>
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