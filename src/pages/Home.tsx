import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useProducts } from '../contexts/ProductContext';
import './Home.css';

const Home: React.FC = () => {
  const { addToCart } = useCart();
  const { state: productState, getFeaturedProducts } = useProducts();

  const featuredProducts = getFeaturedProducts(4);
  const signatureMixes = getFeaturedProducts(2);

  const handleAddToCart = (product: any) => {
    addToCart(product);
  };

  if (productState.loading && !productState.initialized) {
    return (
      <div className="loading-container">
        <div className="loading">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <img src="https://img1.wsimg.com/isteam/getty/544813460" alt="Traditional cooking" className="hero-image" />
          <div className="hero-overlay">
            <div className="container">
              <div className="hero-content">
                <h1 className="hero-title">Taste the Tradition in Every Bite</h1>
                {/* class="text-5xl md:text-6xl font-bold text-white mb-6 font-serif leading-tight" */}
                <p className="hero-subtitle">
                  Discover authentic flavors with our premium collection of traditional ingredients and spice mixes
                </p>
             {/* class="text-xl text-white/90 mb-8 leading-relaxed" */}
                <button className="hero-cta">Explore</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Authentic Indian Flavors */}
      <section className="authentic-flavors">
        <div className="container">
          <h2>Authentic Indian Flavors</h2>
          <div className="flavors-grid">
            <div className="flavor-item">
              <img src="https://img1.wsimg.com/isteam/getty/544813460" alt="Premium Pears" />
              <h3>Authentic Indian Flavors</h3>
            </div>
            <div className="flavor-item">
              <img src="https://img1.wsimg.com/isteam/getty/1345636846" alt="Mixed Seeds" />
              <h3>Made with Traditional Recipes</h3>
            </div>
            <div className="flavor-item">
              <img src="https://img1.wsimg.com/isteam/getty/2247867071" alt="Spice Collection" />
              <h3>All Natural Ingredients</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-products">
        <div className="container">
          <h2>Featured Products</h2>
          <div className="products-grid">
            {featuredProducts.map(product => (
              <div key={product.id} className="product-card">
                <img src={product.image} alt={product.name} />
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <div className="product-price">₹{product.price}</div>
                  <button 
                    className="add-to-cart-btn"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Signature Mixes */}
      <section className="signature-mixes">
        <div className="container">
          <h2>Our Signature Mixes</h2>
          <p className="section-subtitle">
            Hand-crafted with love, perfected over generations
          </p>
          <div className="signature-grid">
            {signatureMixes.map(product => (
              <div key={product.id} className="signature-card">
                <img src={product.image} alt={product.name} />
                <div className="signature-info">
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <div className="signature-price">${product.price}</div>
                  <button 
                    className="signature-btn"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Bring Tradition to Your Table?</h2>
            <p>
              Explore our range of authentic flavors with curated collections and handpicked ingredients
            </p>
            <Link to="/products" className="cta-button">Shop Now</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;