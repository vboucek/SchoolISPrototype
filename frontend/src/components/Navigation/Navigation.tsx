import React from 'react';
import NavigationItem from './NavigationItem';

const Navigation = () => {
  return (
    <nav className="navigation">
      <div className="nav-container">
        <ul className="main-nav">
          <NavigationItem title={'Admin'} />
          <NavigationItem title={'Teacher'} />
          <NavigationItem title={'Timetable'} />
          <NavigationItem title={'Subjects'} />
          <NavigationItem title={'User'} />
        </ul>
        <div className="semester-nav">
          <label htmlFor="semester">Semester:</label>
          <select className="semester-select" name="semester" id="semester">
            <option value="1">Spring 2022</option>
            <option value="2">Autumn 2022</option>
          </select>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
