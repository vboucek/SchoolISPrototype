import React from 'react';
import '../../styles/subjects.css';
import SubjectPreview, { SubjectPreviewProps } from './SubjectPreview';

export interface SubjectPreviewListProps {
  title: string;
  subjects: SubjectPreviewProps[];
}

const SubjectPreviewList = ({ title, subjects }: SubjectPreviewListProps) => (
  <div className="subject">
    <span className="subject__header">{title}</span>
    <ul className="subject__list">
      {subjects.map((s) => (
        <SubjectPreview key={s.id} {...s} />
      ))}
    </ul>
  </div>
);

export default SubjectPreviewList;
