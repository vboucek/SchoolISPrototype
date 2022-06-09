import React from 'react';
import { Link } from 'react-router-dom';
import { convertTime } from '../../utils/TimeUtils';

export interface SemGroupPreviewProps {
  id: number;
  name: string;
  seminarGroupDay: Day;
  seminarGroupDurationStartTimeMins: number;
  seminarGroupDurationMins: number;
  room: string;
  tutors: string[];
}

const SemGroupPreview = ({
  id,
  name,
  seminarGroupDay,
  seminarGroupDurationStartTimeMins,
  seminarGroupDurationMins,
  room,
  tutors,
}: SemGroupPreviewProps) => {
  return (
    <Link to={`/seminar/${id}`}>
      <li className="seminar__item">
        <div className="seminar__title">{name}</div>
        <ul className="seminar__tutors">
          {tutors.map((tutor) => (
            <li className="seminar__tutor">{tutor}</li>
          ))}
        </ul>
        <div className="seminar__room">{room}</div>
        <div className="seminar__time">
          {seminarGroupDay} {convertTime(seminarGroupDurationStartTimeMins)}-
          {convertTime(
            seminarGroupDurationStartTimeMins + seminarGroupDurationMins,
          )}
        </div>
      </li>
    </Link>
  );
};

export default SemGroupPreview;
