export interface IUserDto {
  id : number;
  firstName: string;
  lastName: string;
  email: string;
  roles: UserRole[];
  facultyId: number;
  semesterId: number;
}

export const enum UserRole {
  user = 'user',
  admin = 'admin',
  teacher = 'teacher'
}
