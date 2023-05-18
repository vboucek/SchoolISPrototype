import React, { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  currentSemesterIdAtom,
  loggedInUserAtom,
  semestersAtom,
} from '../../state/atoms';
import NavigationItem from './NavigationItem';
import { UserRole } from '../../types/UserRole';
import { ISemesterDto } from '../../types/Semester.dto';
import { semesterComparator } from '../../utils/SemesterComparator';

const Navigation = () => {
  const user = useRecoilValue(loggedInUserAtom);
  const semesters = useRecoilValue(semestersAtom);
  const [sortedSemesters, setSortedSemesters] = useState<ISemesterDto[]>([]);

  useEffect(() => {
    const sortedSemesters = [...semesters].sort(semesterComparator);
    setSortedSemesters(sortedSemesters);

    if (sortedSemesters.length > 0) {
      setSelectedSemesterId(sortedSemesters[0].id);
    }
  }, [semesters]);

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
            {sortedSemesters.map((s) => (
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
