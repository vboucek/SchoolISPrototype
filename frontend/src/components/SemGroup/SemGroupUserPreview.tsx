import React, { useState } from 'react';
import add from '../../../public/assets/add.svg';
import hoverAdd from '../../../public/assets/add-hover.svg';

export interface SemGroupUserPreviewProps {
  id: number;
  firstName: string;
  lastName: string;
  addUser: (userId: number) => void;
}

const UserPreview = ({
  id,
  firstName,
  lastName,
  addUser,
}: SemGroupUserPreviewProps) => {
  const [addUserIcon, setAddUserIcon] = useState<string>(add);

  return (
    <li className="user__item">
      <div className="user__name">
        {firstName} {lastName}
      </div>

      <div className="user__form">
        <button className="user__add-button" onClick={() => addUser(id)}>
          <img
            onMouseEnter={() => setAddUserIcon(hoverAdd)}
            onMouseLeave={() => setAddUserIcon(add)}
            src={addUserIcon}
            alt="add"
            className="user__add-icon"
          />
        </button>
      </div>
    </li>
  );
};

export default UserPreview;
