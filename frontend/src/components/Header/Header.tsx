import React, { useState } from 'react';
import logoNormal from '/assets/logo.svg';
import logoActive from '/assets/logo-active.svg';
import { Link } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { loggedInUserAtom } from '../../state/atoms';

const Header = () => {
  const user = useRecoilValue(loggedInUserAtom);
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
          <li className="auth-navigation__item">{user && <span>{user.firstName}</span>}</li>
          <li>|</li>
          <li className="auth-navigation__item">Sign out</li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
