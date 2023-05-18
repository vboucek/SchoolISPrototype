import React from 'react';
import { Link } from 'react-router-dom';
import { SemesterType } from '../../types/SemesterType';

export interface SemesterPreviewProps {
  id: number;
  year: number;
  semesterType: SemesterType;
}

const SemesterPreview = ({ id, year, semesterType }: SemesterPreviewProps) => {
  return (
    <li className="semester__item">
      <div className="semester__name">
        {semesterType} {year}
      </div>
      <div className="semester__controls">
        <Link to={`/semester/${id}/edit`}>
          <button className="faculty__edit">Edit</button>
        </Link>
        <Link to={`/semester/${id}/delete`}>
          <button className="faculty__delete">Delete</button>
        </Link>
      </div>
    </li>
  );
};

export default SemesterPreview;
