import { UserRole } from "./UserRole";

export interface IUserCreateDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roles: UserRole[];
  facultyId: number;
  semesterId: number;
}