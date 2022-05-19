import React, { useEffect, useState } from 'react';
import logoNormal from '/assets/logo.svg';
import logoActive from '/assets/logo-active.svg';
import { Link } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { loggedInUserAtom } from '../../state/atoms';
import "../../styles/tailwindStyles.css"

const Header = () => {
  const userVal = useRecoilValue(loggedInUserAtom);
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
          <li className="auth-navigation__item">
            {(userVal) ? <span>{`${userVal.firstName} ${userVal.lastName}`}</span> : <span>Unauth</span>}
          </li>
          <li>|</li>
          <li className="auth-navigation__item">
            {(userVal) ? <Link className='text-black' to={"/logout"}>Log out</Link> : <Link className="text-black" to={"/login"}>Sign in</Link>}
            </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
