import { selector } from 'recoil';
import {
  semestersAtom,
  currentSemesterIdAtom,
  userSubjectsAtom,
} from './atoms';

export const currentSemesterSelector = selector({
  key: 'currentSemester',
  get: ({ get }) => {
    const semesters = get(semestersAtom);
    const id = get(currentSemesterIdAtom);

    if (semesters.length == 0) {
      return null;
    }

    let currentSemester = semesters.find((s) => s.id == id);

    if (currentSemester == undefined) {
      currentSemester = semesters[0];
    }

    return currentSemester;
  },
});

export const subjectsInSemesterSelector = selector({
  key: 'subjectsInSemester',
  get: ({ get }) => {
    const currentSemester = get(currentSemesterSelector);
    const subjects = get(userSubjectsAtom);

    return subjects.filter((s) => s.semesterId == currentSemester?.id);
  },
});
