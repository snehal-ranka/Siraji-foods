import React, { useState } from 'react';
import './About.css';
import myImage from '../assets/aboutus.jpeg';

const About: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      message: ''
    });
  };

  return (
    <div className="about-page">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <h1>About Siraji Foods</h1>
            <h2>We believe that food is more than just nourishment </h2>
            <p>
             — It’s a connection to our roots, traditions, and memories.
            </p>
            <p>
              Founded with a passion for authentic taste, Siraji Foods brings you a carefully curated range of traditional food products, including spice mixes and sweets like gulab jamun, crafted using time-honored family recipes.
</p>
            <h3>
We focus on:
</h3><p>  </p>
            <p>
✅ High-quality ingredients
</p>
            <p>
✅ Authentic flavors
</p>
            <p>
✅ Hygienic preparation
</p>
            <p>
✅ Consistent taste
</p>
            <p>

Our mission is to make it easy for every household to enjoy the richness of traditional Indian cuisine without compromising on quality or convenience.
            </p>
           
  <div className="about-text">
               <h3>
            🍲 Our Story
            </h3>
            
            <p>  </p>
            <p>Siraji Foods started as a small initiative inspired by family traditions and recipes passed down through generations. What began in a home kitchen has now grown into a brand committed to delivering the same homemade taste to every customer.
 </p><p> 
Each product is made with care, ensuring that every bite reflects the warmth and authenticity of traditional cooking. </p>
           <p>
            
            </p>
               <p>
            
            </p>
            <h2>🎯 Our Vision </h2>
            <p>
            To become a trusted name in every kitchen by delivering authentic, high-quality food products that celebrate Indian culinary heritage.
            </p>
            <h2>❤️ Why Choose Us </h2>
            <p>
                        
✅  Authentic traditional recipes  </p> 
 <p>
✅ Premium quality ingredients  </p>
 <p>
✅ Made with care and hygiene  </p>
 <p>
✅ Perfect balance of taste and convenience  
</p> </div>
           
          </div>

          <div className="about-image">
            <img src={myImage} alt="Chef portrait" />
 <div className="contact-form-section">
              <h3>Contact me</h3>
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">First name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Your message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="submit-btn">Submit</button>
              </form>
            </div>





           
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;