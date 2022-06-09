import React from 'react';
import { Link } from 'react-router-dom';
import { convertTime } from '../../utils/TimeUtils';

export interface TimeTableEntryProps {
  id: number;
  name: string;
  code: string;
  room: string;
  day: string;
  startTime: number;
  duration: number;
  groupName?: string;
}

const TimeTableSubjectPreview = ({
  id,
  name,
  code,
  room,
  startTime,
  duration,
  groupName,
}: TimeTableEntryProps) => {
  return (
    <Link to={groupName ? `/seminar/${id}` : `/subject/${id}`}>
      <li className="subject__item">
        <div className="subject__left-container">
          <span className="subject__code">{code}</span>
          <span className="subject__title">
            {groupName ? `${name} - ${groupName}` : `${name} - Lecture`}
          </span>
        </div>
        <div className="subject__right-container">
          <span className="subject__time">
            {convertTime(startTime)}–{convertTime(startTime + duration)} in{' '}
            {room}
          </span>
        </div>
      </li>
    </Link>
  );
};

export default TimeTableSubjectPreview;
