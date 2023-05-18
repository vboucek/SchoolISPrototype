import { EndType } from './EndType';
import { Day } from './Day';

export interface SubjectDto {
  title: string;
  description: string;
  code: string;
  endType: EndType;
  room: string;
  capacity: number;
  credits: number;
  startSign: Date;
  endSign: Date;
  lectureDay: Day;
  lectureStartTimeMin: number;
  lectureDurationMin: number;
  semesterId: number;
  creatorId: number;
  facultyId: number;
}
