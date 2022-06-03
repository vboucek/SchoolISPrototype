import React from 'react';
import { Link } from 'react-router-dom';

export interface FacultyPreviewProps {
  id: number;
  name: string;
}

const FacultyPreview = ({ id, name }: FacultyPreviewProps) => {
  return (
    <li className="faculty__item">
      <div className="faculty__name">{name}</div>
      <div className="faculty__controls">
        <Link to={`/faculty/${id}/edit`}>
          <button className="faculty__edit">Edit</button>
        </Link>
        <Link to={`/faculty/${id}/delete`}>
          <button className="faculty__delete">Delete</button>
        </Link>
      </div>
    </li>
  );
};

export default FacultyPreview;
