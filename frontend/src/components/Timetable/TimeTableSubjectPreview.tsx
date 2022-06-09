import React from 'react';
import { Link } from 'react-router-dom';

export interface TimeTableSubjectPreviewProps {
  id: number;
  code: string;
  title: string;
  semesterId: number;
  lectureStartTimeMin: number;
  lectureDurationMin: number;
  room: string;
}

const TimeTableSubjectPreview = ({
  id,
  code,
  title,
  lectureStartTimeMin,
  lectureDurationMin,
  room,
}: TimeTableSubjectPreviewProps) => {
  return (
    <Link to={`/subject/${id}`}>
      <li className="subject__item">
        <div className="subject__left-container">
          <span className="subject__code">{code}</span>
          <span className="subject__title">{title}</span>
        </div>
        <div className="subject__right-container">
          <span className="subject__time">{lectureStartTimeMin} – </span>
          <span className="subject__time">
            {lectureStartTimeMin + lectureDurationMin}
          </span>
          <span className="subject__time">in{room}</span>
        </div>
      </li>
    </Link>
  );
};

export default TimeTableSubjectPreview;
