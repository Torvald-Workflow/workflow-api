export interface IResponseUser {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  confirmed: boolean;
  profilePicture: string | null;
  createdAt: string;
  updatedAt: string;
}
