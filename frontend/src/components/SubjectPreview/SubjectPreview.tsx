import React from 'react';

export interface SubjectPreviewProps {
  code: string;
  title: string;
  credits: number;
  endType: string;
}

const SubjectPreview = ({
  code,
  title,
  credits,
  endType,
}: SubjectPreviewProps) => {
  return (
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
  );
};

export default SubjectPreview;
