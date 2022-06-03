import React, { useState } from 'react';
import '../../styles/userList.css';
import { Link } from 'react-router-dom';
import add from '../../../public/assets/add.svg';
import hoverAdd from '../../../public/assets/add-hover.svg';
import UserPreview, { UserPreviewProps } from './UserPreview';
import UserFilterTile from './UserFilterTile';

export interface UserPreviewListProps {
  title: string;
  users: UserPreviewProps[];
  selectedLetter: string | undefined;
  setSelectedLetter: React.Dispatch<React.SetStateAction<string | undefined>>;
  foundUsers: boolean;
}

const UserPreviewList = ({
  title,
  users,
  selectedLetter,
  setSelectedLetter,
  foundUsers,
}: UserPreviewListProps) => {
  const [userAddLogo, setUserAddLogo] = useState(add);

  function userAddHover() {
    setUserAddLogo(userAddLogo === add ? hoverAdd : add);
  }

  return (
    <div className="user">
      <span className="user__header">{title}</span>
      <div className="user__filter">
        {'abcdefghijklmnopqrstuvwxyz#'.split('').map((letter, index) => (
          <UserFilterTile
            key={index}
            letter={letter}
            selectedLetter={selectedLetter}
            setSelectedLetter={setSelectedLetter}
          />
        ))}
      </div>
      {!foundUsers && (
        <div className="info">No users beginning with this letter found.</div>
      )}
      {foundUsers && (
        <ul className="user__list">
          {users.map((u) => (
            <UserPreview key={u.id} {...u} />
          ))}
        </ul>
      )}
      <div className="add">
        <Link
          onMouseEnter={userAddHover}
          onMouseLeave={userAddHover}
          className="add__link"
          to="/user/create"
        >
          <img className="add__logo" src={userAddLogo} alt="add" />
          <button type="button" className="add__button">
            Add user
          </button>
        </Link>
      </div>
    </div>
  );
};

export default UserPreviewList;
