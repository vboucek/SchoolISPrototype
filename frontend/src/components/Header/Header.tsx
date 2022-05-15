import React, { useEffect, useState } from 'react';
import logoNormal from '/assets/logo.svg';
import logoActive from '/assets/logo-active.svg';
import { Link } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { loggedInUserAtom } from '../../state/atoms';
import "../../styles/tailwindStyles.css"
import axios from 'axios';
import { IUserDto } from '../../types/User.dto';

const Header = () => {
  const userId = useRecoilValue(loggedInUserAtom);
  const [user, setUser] = useState<IUserDto>()
  const [logo, setLogo] = useState(logoNormal);
  
  function changeHover() {
    setLogo(logo === logoNormal ? logoActive : logoNormal);
  }

  useEffect(() => {
    axios.get<IUserDto>(`users/${userId}`)
      .then(response => {
        setUser(response.data);
      })
  }, []);

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
            {userId ? <span>{`${user?.firstName} ${user?.lastName}`}</span> : <span>Unauth</span>}
          </li>
          <li>|</li>
          <li className="auth-navigation__item">
            {userId ? <Link className='text-black' to={"/logout"}>Log out</Link> : <Link className="text-black" to={"/login"}>Sign in</Link>}
            </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
