import React from 'react';
import '../../styles/teacherList.css';
import TeacherPreview, { TeacherPreviewProps } from './TeacherPreview';

export interface TeacherPreviewListProps {
  title: string;
  teachers: TeacherPreviewProps[];
}

const TeacherPreviewList = ({ title, teachers }: TeacherPreviewListProps) => (
  <div className="teacher">
    <span className="teacher__header">{title}</span>
    <ul className="teacher__list">
      {teachers.map((t) => (
        <TeacherPreview key={t.id} {...t} />
      ))}
    </ul>
  </div>
);

export default TeacherPreviewList;
