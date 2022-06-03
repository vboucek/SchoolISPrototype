import React from 'react';
import { Link } from 'react-router-dom';

export interface UserPreviewProps {
  id: number;
  firstName: string;
  lastName: string;
}

const UserPreview = ({ id, firstName, lastName }: UserPreviewProps) => {
  return (
    <Link to={`/user/${id}`}>
      <li className="user__item">
        <div className="user__name">
          {firstName} {lastName} | id {id}
        </div>
        <div className="user__controls">
          <Link to={`/user/${id}/edit`}>
            <button className="user__edit">Edit</button>
          </Link>
          <Link to={`/user/${id}/delete`}>
            <button className="user__delete">Delete</button>
          </Link>
        </div>
      </li>
    </Link>
  );
};

export default UserPreview;
