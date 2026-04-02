import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useProducts } from '../contexts/ProductContext';
import './Home.css';
import chakli from '../assets/chakalimix.jpeg';
import chiwada from '../assets/chiwdamasala.jpeg';
import jamun from '../assets/gilabjamunaata.jpeg';
import papad from '../assets/papad-aata.jpeg';

const Home: React.FC = () => {
  const { addToCart } = useCart();
  const { state: productState, getFeaturedProducts } = useProducts();

  // Animation states
  const [heroVisible, setHeroVisible] = useState(false);
  const [authenticVisible, setAuthenticVisible] = useState(false);
  const [featuredVisible, setFeaturedVisible] = useState(false);
  const [signatureVisible, setSignatureVisible] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);

  // Refs for intersection observer
  const heroRef = useRef<HTMLDivElement>(null);
  const authenticRef = useRef<HTMLElement>(null);
  const featuredRef = useRef<HTMLElement>(null);
  const signatureRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);

  // const featuredProducts = getFeaturedProducts(4);
  // const signatureMixes = getFeaturedProducts(2);

  const handleAddToCart = (product: any) => {
    addToCart(product);
  };

  // Intersection Observer setup
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          if (target.classList.contains('hero-section')) {
            setHeroVisible(true);
          } else if (target.classList.contains('authentic-flavors')) {
            setAuthenticVisible(true);
          } else if (target.classList.contains('featured-products')) {
            setFeaturedVisible(true);
          } else if (target.classList.contains('signature-mixes')) {
            setSignatureVisible(true);
          } else if (target.classList.contains('cta-section')) {
            setCtaVisible(true);
          }
        }
      });
    }, observerOptions);

    // Observe elements
    if (heroRef.current) observer.observe(heroRef.current);
    if (authenticRef.current) observer.observe(authenticRef.current);
    if (featuredRef.current) observer.observe(featuredRef.current);
    if (signatureRef.current) observer.observe(signatureRef.current);
    if (ctaRef.current) observer.observe(ctaRef.current);

    return () => observer.disconnect();
  }, []);

  if (productState.loading && !productState.initialized) {
    return (
      <div className="loading-container">
        <div className="loading">Loading products...</div>
      </div>
    );
  }

  const signatureMixes = [
      {
        id: 1,
        name: 'Premium Papad Mix',
        price: 99,
        image: papad,
        description: 'Fresh premium pears, perfect for healthy snacking. Hand-picked and carefully selected for the best quality.'
      },
      {
        id: 2,
        name: 'Premium gulab jamun mix',
        price: 59,
        image: jamun,
        description: 'Collection of natural seeds and grains packed with nutrition and authentic flavors.'
      },];


  const featuredProducts = [
      {
        id: 1,
        name: 'Premium Papad Mix',
        price: 99,
        image: papad,
        description: 'Perfect for healthy snacking. Hand-picked and carefully selected for the best quality.'
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
     
    ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section ref={heroRef} className={`hero-section ${heroVisible ? 'animate' : ''}`}>
        <div className="hero-background">
          <img src="https://img1.wsimg.com/isteam/getty/544813460" alt="Traditional cooking" className="hero-image" />
          <div className="hero-overlay">
            <div className="container">
              <div className="hero-content">
                <h1 className={`hero-title ${heroVisible ? 'animate' : ''}`}>Taste the Tradition in Every Bite</h1>
                {/* class="text-5xl md:text-6xl font-bold text-white mb-6 font-serif leading-tight" */}
                <p className="hero-subtitle">
                  Discover authentic flavors with our premium collection of traditional ingredients and spice mixes
                </p>
             {/* class="text-xl text-white/90 mb-8 leading-relaxed" */}
                <button className={`hero-cta ${heroVisible ? 'animate' : ''}`}>Explore</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Authentic Indian Flavors */}
      <section ref={authenticRef} className={`authentic-flavors ${authenticVisible ? 'animate' : ''}`}>
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
          <h2 style={{animationDelay: '0.4s'}}>Featured Products</h2>
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
      <section ref={signatureRef} className={`signature-mixes ${signatureVisible ? 'animate' : ''}`}>
        <div className="container">
          <h2 style={{animationDelay: '0.6s'}}>Our Signature Mixes</h2>
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
                  <div className="signature-price">₹{product.price}</div>
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
          <h2 style={{animationDelay: '0.8s'}}>Ready to Bring Tradition to Your Table?</h2>
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