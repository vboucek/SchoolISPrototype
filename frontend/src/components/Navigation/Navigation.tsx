import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  currentSemesterIdAtom,
  loggedInUserAtom,
  semestersAtom,
} from '../../state/atoms';
import NavigationItem from './NavigationItem';
import { UserRole } from '../../types/UserRole';

const Navigation = () => {
  const user = useRecoilValue(loggedInUserAtom);
  const semesters = useRecoilValue(semestersAtom);
  const setSelectedSemesterId = useSetRecoilState(currentSemesterIdAtom);

  const onChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    setSelectedSemesterId(Number(event.target.value));
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        <ul className="main-nav">
          {user?.roles.includes(UserRole.admin) && (
            <NavigationItem title={'Admin'} path={'admin'} />
          )}
          {user?.roles.includes(UserRole.teacher) && (
            <NavigationItem title={'Teacher'} path={'teacher'} />
          )}
          <NavigationItem title={'Timetable'} path={'timetable'} />
          <NavigationItem title={'Subjects'} path={'subject'} />
          <NavigationItem title={'User'} path={`user/${user?.id}`} />
        </ul>
        <div className="semester-nav">
          <label htmlFor="semester">Semester: </label>
          <select
            onChange={onChange}
            className="semester-select"
            name="semester"
            id="semester"
          >
            {semesters.map((s) => (
              <option key={s.id} value={s.id}>
                {s.semesterType} {s.year}
              </option>
            ))}
          </select>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
