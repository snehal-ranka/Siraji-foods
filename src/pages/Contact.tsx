import React, { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import './Contact.css';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const whatsappNumber = '+918600140444';
  const whatsappMessage = 'Hello Siraji Udyog team, I would like to inquire about your products and pricing.';

  const handleWhatsAppClick = () => {
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="contact-page">
      <div className="container">
        <div className="page-header">
          <h1></h1>
           <h3 className='checkout-heading'>Contact Us</h3>
          <p>We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-card">
              <div className="contact-icon">
                <Mail />
              </div>
              <h3>Email Us</h3>
              <p>wah@sirajifood.com</p>
              <p>We reply within 24-48 hours</p>
            </div>

            <div className="contact-card">
              <div className="contact-icon">
                <Phone />
              </div>
              <h3>Call Us</h3>
              <p>+91 8600140444</p>
              <p>Mon-Fri 9am-6pm EST</p>
            </div>

            <div className="contact-card">
              <div className="contact-icon">
                <MapPin />
              </div>
              <h3>Visit Us</h3>
              <p>Siraji Udyog</p>
              <p>Plot no 19 and 26, Siraji nagar</p>
              <p>Hudkeahwar road, Nagpur</p>
            </div>

            <div className="contact-card whatsapp-card" onClick={handleWhatsAppClick}>
              <div className="contact-icon whatsapp-icon">
                <i className="fab fa-whatsapp" aria-hidden="true">📱</i>
              </div>
              <h3>WhatsApp Inquiry</h3>
              <p>Chat with us instantly</p>
              <p>+91 8600140444</p>
              <button type="button" className="whatsapp-btn">Start Chat</button>
            </div>
          </div>

          <div className="contact-form-container">
            <form className="contact-form" onSubmit={handleSubmit}>
              <h3>Send us a Message</h3>
              
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
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
                <label htmlFor="subject">Subject *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>

              <button type="submit" className="submit-btn">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;