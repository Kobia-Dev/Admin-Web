import { Role } from "./role";

export class Auth {
  message: string;
  entity: {
    id: number;
    email: string;
    role: string;
    access_token: string;
    tokenType: string;
  };
  statusCode: number
}