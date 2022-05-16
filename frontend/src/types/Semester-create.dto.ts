import { SemesterType } from "./SemesterType";

export interface ISemesterCreateDto {
  year: number;
  semesterType: SemesterType;
}
