import { Day } from '@prisma/client';

export type UserTimetableDto = Record<
  Day,
  {
    id: number;
    name: string;
    code: string;
    room: string;
    day: Day;
    startTime: number;
    duration: number;
    groupName?: string;
  }[]
>;
