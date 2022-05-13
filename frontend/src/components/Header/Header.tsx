import React, { useState } from 'react';
import logoNormal from '/assets/logo.svg';
import logoActive from '/assets/logo-active.svg';
import { Link } from 'react-router-dom';

const Header = () => {
  const [logo, setLogo] = useState(logoNormal);

  function changeHover() {
    setLogo(logo === logoNormal ? logoActive : logoNormal);
  }

  return (
    <header className="header">
      <div className="header-container">
        <Link to={'/'}>
          <img
            onMouseEnter={changeHover}
            onMouseLeave={changeHover}
            className="logo"
            src={logo}
            alt="logo"
          />
        </Link>
        <ul className="auth-navigation">
          <li className="auth-navigation__item">Username</li>
          <li>|</li>
          <li className="auth-navigation__item">Sign out</li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
