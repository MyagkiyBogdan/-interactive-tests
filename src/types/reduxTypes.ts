export enum UserRole {
  Student = 1,
  Teacher = 2,
}

export interface UserInfo {
  email: string;
  isTeacher: boolean;
  name: string;
  password: string;
  role: UserRole;
  surname: string;
}
