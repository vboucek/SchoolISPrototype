import React from 'react';
import { Link } from 'react-router-dom';
import { TeacherPreviewProps } from '../TeacherPreview/TeacherPreview';

export interface SemGroupPreviewProps {
  id: number;
  index: number;
  seminarGroupDay: string;
  seminarGroupDurationStartTimeMins: number;
  seminarGroupDurationMins: number;
  tutors: TeacherPreviewProps[];
}

const SemGroupPreview = ({
  id,
  index,
  seminarGroupDay,
  seminarGroupDurationStartTimeMins,
  seminarGroupDurationMins,
  tutors,
}: SemGroupPreviewProps) => {
  return (
    <Link to={`/seminar/${id}`}>
      <li className="seminar__item">
        <div className="seminar__title">Group #{index + 1}</div>
        <ul className="seminar__tutors">
          <li className="seminar__tutor">Plakinger</li>
          <li className="seminar__tutor">Sedlácek</li>
        </ul>
        <div className="seminar__room">A218</div>
        <div className="seminar__time">Tuesday 18:00</div>
      </li>
    </Link>
  );
};

export default SemGroupPreview;
