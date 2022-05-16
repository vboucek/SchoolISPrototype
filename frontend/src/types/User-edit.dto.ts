import { UserRole } from "./UserRole";

export interface IUserEditDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isAdmin: boolean;
  isTeacher: boolean;
  facultyId: number;
  semesterId: number;
}