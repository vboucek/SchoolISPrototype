import React from 'react';
import { Link } from 'react-router-dom';

export interface SubjectPreviewProps {
  id: number;
  code: string;
  title: string;
  credits: number;
  endType: string;
  semesterId: number;
}

const SubjectPreview = ({
  id,
  code,
  title,
  credits,
  endType,
}: SubjectPreviewProps) => {
  return (
    <Link to={`/subject/${id}`}>
      <li className="subject__item">
        <div className="subject__left-container">
          <span className="subject__code">{code}</span>
          <span className="subject__title">{title}</span>
        </div>
        <div className="subject__right-container">
          <span className="subject__credits">{credits}kr.</span>
          <span className="subject__end-type">{endType}</span>
        </div>
      </li>
    </Link>
  );
};

export default SubjectPreview;
