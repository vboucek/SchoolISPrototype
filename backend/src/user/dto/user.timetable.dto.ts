import { Day } from '@prisma/client';

export class UserTimetableDto {
  id: number;
  name: string;
  code: string;
  room: string;
  day: Day;
  startTime: number;
  duration: number;
  groupName?: string;
}
