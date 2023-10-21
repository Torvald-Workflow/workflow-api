import { ICredentials } from './credentials.interface';

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmed: boolean;
  createdAt: Date;
  updatedAt: Date;
  credentials: ICredentials;
}
