import axios from 'axios';
import { AtomEffect } from 'recoil';
import { ISemesterDto } from '../types/Semester.dto';
import { IFacultyDto } from '../types/Faculty.dto';

export const SemesterDbEffect =
  (): AtomEffect<ISemesterDto[]> =>
  ({ setSelf, onSet, trigger }) => {
    const loadPersisted = async () => {
      const data = await axios.get<ISemesterDto[]>('semesters');

      if (data != null) {
        setSelf(data.data.reverse());
      }
    };

    if (trigger === 'get') {
      loadPersisted();
    }
  };

export const FacultyDbEffect =
  (): AtomEffect<IFacultyDto[]> =>
  ({ setSelf, onSet, trigger }) => {
    const loadPersisted = async () => {
      const data = await axios.get<IFacultyDto[]>('faculties');

      if (data != null) {
        setSelf(data.data);
      }
    };

    if (trigger === 'get') {
      loadPersisted();
    }
  };
