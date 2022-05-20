import React from 'react';
import '../../styles/seminarList.css';
import SemGroupPreview, { SemGroupPreviewProps } from './SemGroupPreview';

export interface SemGroupPreviewListProps {
  title: string;
  seminarGroups: SemGroupPreviewProps[];
}

const SemGroupPreviewList = ({
  title,
  seminarGroups,
}: SemGroupPreviewListProps) => (
  <div className="seminar">
    <span className="seminar__header">{title}</span>
    <ul className="seminar__list">
      {seminarGroups.map((s, index) => (
        <SemGroupPreview key={s.id} {...s} index={index} />
      ))}
    </ul>
  </div>
);

export default SemGroupPreviewList;
