import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import './Footer.css'

export default function Footer() {
  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
  };

  const hoverStyle = (e) => {
    e.target.style.color = '#ffc107';
  };

  const unhoverStyle = (e) => {
    e.target.style.color = 'white';
  };

  return (
    <footer className="basic text-light pt-5 pb-4">
      <Container>
        <Row className="mb-5">
          {/* About */}
          <Col xs={12} md={6} lg={3} className="mb-4">
            <h5 className="text-warning mb-3">D<span className="text-light">wella</span></h5>
            <p className="small text-white">
              Dwella designs modern furniture for stylish living. Elevate your space with comfort, elegance, and innovation.
            </p>
            <div className="d-flex gap-3 mt-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={linkStyle} onMouseEnter={hoverStyle} onMouseLeave={unhoverStyle}>
                <FontAwesomeIcon icon={faFacebook} size="lg" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={linkStyle} onMouseEnter={hoverStyle} onMouseLeave={unhoverStyle}>
                <FontAwesomeIcon icon={faInstagram} size="lg" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={linkStyle} onMouseEnter={hoverStyle} onMouseLeave={unhoverStyle}>
                <FontAwesomeIcon icon={faTwitter} size="lg" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" style={linkStyle} onMouseEnter={hoverStyle} onMouseLeave={unhoverStyle}>
                <FontAwesomeIcon icon={faYoutube} size="lg" />
              </a>
            </div>
          </Col>

          {/* Quick Links */}
          <Col xs={6} md={3} lg={2} className="mb-4">
            <h6 className="text-uppercase mb-3">Quick Links</h6>
            <ul className="list-unstyled">
              <li><Link to="/" style={linkStyle} onMouseEnter={hoverStyle} onMouseLeave={unhoverStyle}>Home</Link></li>
              <li><Link to="/products" style={linkStyle} onMouseEnter={hoverStyle} onMouseLeave={unhoverStyle}>Shop Furniture</Link></li>
              <li><Link to="/about" style={linkStyle} onMouseEnter={hoverStyle} onMouseLeave={unhoverStyle}>Our Story</Link></li>
              <li><Link to="/blog" style={linkStyle} onMouseEnter={hoverStyle} onMouseLeave={unhoverStyle}>Blog</Link></li>
              <li><Link to="/contact" style={linkStyle} onMouseEnter={hoverStyle} onMouseLeave={unhoverStyle}>Contact Us</Link></li>
            </ul>
          </Col>

          {/* Customer Service */}
          <Col xs={6} md={3} lg={3} className="mb-4">
            <h6 className="text-uppercase mb-3">Customer Service</h6>
            <ul className="list-unstyled">
              <li><Link to="/track-order" style={linkStyle} onMouseEnter={hoverStyle} onMouseLeave={unhoverStyle}>Track Your Order</Link></li>
              <li><Link to="/returns" style={linkStyle} onMouseEnter={hoverStyle} onMouseLeave={unhoverStyle}>Returns & Refunds</Link></li>
              <li><Link to="/shipping" style={linkStyle} onMouseEnter={hoverStyle} onMouseLeave={unhoverStyle}>Shipping Info</Link></li>
              <li><Link to="/privacy" style={linkStyle} onMouseEnter={hoverStyle} onMouseLeave={unhoverStyle}>Privacy Policy</Link></li>
              <li><Link to="/terms" style={linkStyle} onMouseEnter={hoverStyle} onMouseLeave={unhoverStyle}>Terms & Conditions</Link></li>
            </ul>
          </Col>

          {/* Contact */}
          <Col xs={12} md={6} lg={4} className="mb-4">
            <h6 className="text-uppercase mb-3">Get in Touch</h6>
            <ul className="list-unstyled text-white small">
              <li className="d-flex align-items-start mb-2">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="text-warning me-2 mt-1" />
                <span>745 Doki, Cairo, Egypt</span>
              </li>
              <li className="d-flex align-items-center mb-2">
                <FontAwesomeIcon icon={faPhone} className="text-warning me-2" />
                <a href="tel:+2010222100111" style={linkStyle} onMouseEnter={hoverStyle} onMouseLeave={unhoverStyle}>
                  +2010222100111
                </a>
              </li>
              <li className="d-flex align-items-center">
                <FontAwesomeIcon icon={faEnvelope} className="text-warning me-2" />
                <a href="mailto:support@comfyhome.com" style={linkStyle} onMouseEnter={hoverStyle} onMouseLeave={unhoverStyle}>
                  support@dewlla.com
                </a>
              </li>
            </ul>
          </Col>
        </Row>

        
        {/* Copyright */}
        <Row className="mt-4 pt-3 border-top border-secondary text-center">
          <Col>
            <small className="text-white">&copy; {new Date().getFullYear()} ComfyHome Furniture Co. All rights reserved.</small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
