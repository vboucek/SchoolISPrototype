import { Day } from './Day';

export interface SeminarGroupDto {
  name: string;
  room: string;
  capacity: number;
  seminarGroupDay: Day;
  seminarGroupDurationStartTimeMins: number;
  seminarGroupDurationMins: number;
  courseId: number;
}
