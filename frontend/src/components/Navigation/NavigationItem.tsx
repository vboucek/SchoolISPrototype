import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export interface NavigationItemProps {
  title: string;
}

const NavigationItem = ({ title }: NavigationItemProps) => {
  const titleLowerCase = title.toLowerCase();
  const [icon, setIcon] = useState(`icon-${titleLowerCase}.png`);

  const changeIcon = () => {
    setIcon(
      icon === `icon-${titleLowerCase}.png`
        ? `active-icon-${titleLowerCase}.png`
        : `icon-${titleLowerCase}.png`,
    );
  };

  return (
    <Link to={`/${titleLowerCase}`}>
      <li
        className="nav-item"
        onMouseEnter={changeIcon}
        onMouseLeave={changeIcon}
      >
        <span className="nav-item__title">{title}</span>
        <img
          className="nav-item__logo"
          alt="admin icon"
          src={`/assets/icons/${icon}`}
        />
      </li>
    </Link>
  );
};

export default NavigationItem;
