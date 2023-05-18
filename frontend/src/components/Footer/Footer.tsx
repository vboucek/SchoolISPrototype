import React from 'react';
import logo from '/assets/logo.svg';

const Footer = () => (
  <footer className="footer">
    <div className="footer-container">
      <img className="logo-small" src={logo} alt="logo" />
      <span className="copyright">© copyright {new Date().getFullYear()}</span>
    </div>
  </footer>
);

export default Footer;
