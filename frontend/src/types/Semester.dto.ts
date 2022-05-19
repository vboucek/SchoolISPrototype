import { SemesterType } from "./SemesterType";

export interface ISemesterDto {
  id: number;
  year: number;
  semesterType: SemesterType;
}
