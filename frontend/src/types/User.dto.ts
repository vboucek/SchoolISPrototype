import { UserRole } from "./UserRole";

export interface IUserDto {
  id : number;
  firstName: string;
  lastName: string;
  email: string;
  roles: UserRole[];
  facultyId: number;
  semesterId: number;
}
