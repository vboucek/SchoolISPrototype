import '../../styles/timetable.css';
import TimeTableDayPreview from './TimeTableDayPreview';
import React from 'react';

export const TimeTablePage = () => {
  return (
    <div className="main-content">
      <div className="main-content-container">
        <TimeTableDayPreview title={'Monday'} subjects={[]} />
        <TimeTableDayPreview title={'Tuesday'} subjects={[]} />
        <TimeTableDayPreview title={'Wednesday'} subjects={[]} />
        <TimeTableDayPreview title={'Thursday'} subjects={[]} />
        <TimeTableDayPreview title={'Friday'} subjects={[]} />

        <TimeTableDayPreview title={'Saturday'} subjects={[]} />
        <TimeTableDayPreview title={'Sunday'} subjects={[]} />

        <div className="day">
          <span className="timetable_header">Preview Day</span>
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
        </div>
      </div>
    </div>
  );
};
