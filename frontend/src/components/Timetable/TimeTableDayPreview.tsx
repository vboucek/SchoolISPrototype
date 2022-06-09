import React, { useEffect, useState } from 'react';
import '../../styles/timetable.css';
import TimeTableSubjectPreview, {
  TimeTableEntryProps,
} from './TimeTableSubjectPreview';

export interface TimeTableDayPreviewProps {
  title: string;
  entries: TimeTableEntryProps[];
}

const TimeTableDayPreview = ({ title, entries }: TimeTableDayPreviewProps) => {
  const days: { [x: string]: number } = {
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
    sunday: 0,
  };
  const [hasSubjects, setHasSubjects] = useState<boolean>(false);
  const today = new Date().getDay();
  const isToday = days[title] === today;

  useEffect(() => {
    setHasSubjects(entries.length > 0);
  }, [entries]);

  return (
    <div className="day">
      {isToday && (
        <span className="timetable_header timetable_header--today">
          {title}
        </span>
      )}
      {!isToday && <span className="timetable_header">{title}</span>}
      {!hasSubjects && (
        <div className="info">No lecture or seminar scheduled.</div>
      )}
      {hasSubjects && (
        <ul className="subject__list">
          {entries.map((entry) => (
            <TimeTableSubjectPreview key={entry.id} {...entry} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TimeTableDayPreview;
