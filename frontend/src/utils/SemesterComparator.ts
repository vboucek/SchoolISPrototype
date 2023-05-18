import { SemesterType } from '../types/SemesterType';
import { ISemesterDto } from '../types/Semester.dto';

export const semesterComparator = (a: ISemesterDto, b: ISemesterDto) => {
  if (b.year - a.year != 0) {
    return b.year - a.year;
  }
  if (a.semesterType === SemesterType.summer) {
    return 1;
  }
  return -1;
};
