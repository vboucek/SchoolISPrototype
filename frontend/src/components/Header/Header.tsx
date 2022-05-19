import React, { useState } from 'react';
import logoNormal from '/assets/logo.svg';
import logoActive from '/assets/logo-active.svg';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { loggedInUserAtom } from '../../state/atoms';
import axios from 'axios';

const Header = () => {
  const [user, setUser] = useRecoilState(loggedInUserAtom);
  const [logo, setLogo] = useState(logoNormal);

  function changeHover() {
    setLogo(logo === logoNormal ? logoActive : logoNormal);
  }

  function logOut() {
    axios.post(`http://localhost:4000/auth/logout`).then(() => {
      setUser(null);
    });
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
          <Link className="navigation-link" to={`user/${user?.id}`}>
            <li className="auth-navigation__item">
              {user && (
                <span>
                  {user.firstName} {user.lastName}
                </span>
              )}
            </li>
          </Link>
          <li>|</li>
          <Link className="navigation-link" to={'/'}>
            <li onClick={logOut} className="auth-navigation__item">
              Sign out
            </li>
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
