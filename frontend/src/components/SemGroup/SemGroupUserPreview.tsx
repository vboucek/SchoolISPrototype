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
    <li className="tutor__item">
      <div className="tutor__name">
        {firstName} {lastName}
      </div>

      <div className="tutor__form">
        <button className="tutor__add-button" onClick={() => addUser(id)}>
          <img
            onMouseEnter={() => setAddUserIcon(hoverAdd)}
            onMouseLeave={() => setAddUserIcon(add)}
            src={addUserIcon}
            alt="add"
            className="tutor__add-icon"
          />
        </button>
      </div>
    </li>
  );
};

export default UserPreview;
