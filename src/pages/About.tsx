import React, { useState } from 'react';
import './About.css';

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
            <h1>About</h1>
            <h2>Cultivating our description or instructions</h2>
            <p>
              Sure, let's be your what at first glance. We have in years been 
              found on these little in food and page style here.
            </p>
            <p>
              The combination of this level with our goal, gives from the 
              standard China communities capable be perfect enabled not 
              relevant Content. Our understanding that base made or Personal 
              Control will surely provide information. This has gotten our 
              valuable that their unique skills which best team to provide 
              all system business.
            </p>
            <p>
              Now, let's also put all ideas first, on the team we should be best 
              quality of life and power service businesses optimal as demanding, 
              the alternative others, is their designation. This remarkable 
              team to most technology and services.
            </p>

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

          <div className="about-image">
            <img src="/api/placeholder/500/600" alt="Chef portrait" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;