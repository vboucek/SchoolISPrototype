import React, { useEffect, useState } from 'react';
import '../../styles/timetable.css';
import { SubjectPreviewProps } from '../SubjectPreview/SubjectPreview';

export interface TimeTableDayPreviewProps {
  title: string;
  subjects: SubjectPreviewProps[];
}

const TimeTableDayPreview = ({ title, subjects }: TimeTableDayPreviewProps) => {
  const days: { [x: string]: number } = {
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
    Sunday: 0,
  };
  const [hasSubjects, setHasSubjects] = useState<boolean>(false);
  const today = new Date().getDay();
  const isToday = days[title] == today;

  useEffect(() => {
    setHasSubjects(subjects.length > 0);
  }, [subjects]);

  return (
    <div className="day">
      {isToday && <span className="timetable_header">{title}</span>}
      {!isToday && <span className="timetable_header_darker">{title}</span>}
      {!hasSubjects && (
        <div className="info">No lecture or seminar scheduled.</div>
      )}
      {hasSubjects && (
        <ul className="subject__list">
          <li className="timetable__item">
            <div className="subject__left-container">
              <span className="subject__code">PB138</span>
              <span className="subject__title">Markups language</span>
            </div>
            <div className="subject__right-container">
              <span className="subject__time">13:00 – 14:00</span>
              <span className="subject__room">in D1</span>
            </div>
          </li>
        </ul>
      )}
    </div>
  );
};

export default TimeTableDayPreview;
