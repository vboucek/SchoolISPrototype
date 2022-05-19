import React from 'react';
import { useRecoilValue } from 'recoil';
import { loggedInUserAtom } from '../../state/atoms';
import NavigationItem from './NavigationItem';

const Navigation = () => {
  const user = useRecoilValue(loggedInUserAtom);

  return (
    <nav className="navigation">
      <div className="nav-container">
        <ul className="main-nav">
          <NavigationItem title={'Admin'} path={'admin'} />
          <NavigationItem title={'Teacher'} path={'teacher'} />
          <NavigationItem title={'Timetable'} path={'timetable'} />
          <NavigationItem title={'Subjects'} path={'subjects'} />
          <NavigationItem title={'User'} path={`user/${user?.id}`} />
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
