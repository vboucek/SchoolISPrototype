import React from 'react';
import '../../styles/subjects.css';

const SubjectPreviewList = () => (
  <div className="subject">
    <span className="subject__header">My subjects overview:</span>
    <ul className="subject__list">
      <li className="subject__item">
        <div className="subject__left-container">
          <span className="subject__code">PB138</span>
          <span className="subject__title">Modern markup languages</span>
        </div>
        <div className="subject__right-container">
          <span className="subject__credits">5kr.</span>
          <span className="subject__end-type">zk</span>
        </div>
      </li>
      <li className="subject__item">
        <div className="subject__left-container">
          <span className="subject__code">IB002</span>
          <span className="subject__title">
            Algorithms and data structures I
          </span>
        </div>
        <div className="subject__right-container">
          <span className="subject__credits">6kr.</span>
          <span className="subject__end-type">zk</span>
        </div>
      </li>
      <li className="subject__item">
        <div className="subject__left-container">
          <span className="subject__code">PV178</span>
          <span className="subject__title">C# introduction</span>
        </div>
        <div className="subject__right-container">
          <span className="subject__credits">4kr.</span>
          <span className="subject__end-type">k</span>
        </div>
      </li>
    </ul>
  </div>
);

export default SubjectPreviewList;
