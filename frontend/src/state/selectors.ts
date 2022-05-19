import { selector } from 'recoil';
import { semestersAtom, currentSemesterIdAtom } from './atoms';

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
