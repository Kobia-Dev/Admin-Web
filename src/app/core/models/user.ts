import { Role } from "./role";

export class User {
  id: number;
  img: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNo: string;
  role: Role;
  access_token: string;
}