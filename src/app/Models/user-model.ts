export class UserModel {
  firstName: string;
  lastName: string;
  role: Role;
}

export enum Role
{
    Employee = 0,
    Manager = 1
}