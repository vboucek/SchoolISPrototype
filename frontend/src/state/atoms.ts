import { IUserDto } from '../types/User.dto';
import { atom } from 'recoil';
import { ISemesterDto } from '../types/Semester.dto';
import { IFacultyDto } from '../types/Faculty.dto';
import { FacultyDbEffect, SemesterDbEffect } from './effects';
import { SubjectPreviewProps } from '../components/SubjectPreview/SubjectPreview';

export const loggedInUserAtom = atom<IUserDto | null>({
  key: 'loggedInUser',
  default: null,
});

export const userSubjectsAtom = atom<SubjectPreviewProps[]>({
  key: 'subjects',
  default: [],
});

export const semestersAtom = atom<ISemesterDto[]>({
  key: 'semesters',
  default: [],
  effects: [SemesterDbEffect()],
});

export const facultiesAtom = atom<IFacultyDto[]>({
  key: 'faculties',
  default: [],
  effects: [FacultyDbEffect()],
});

export const currentSemesterIdAtom = atom<number>({
  key: 'currentSemesterId',
  default: -1,
});
