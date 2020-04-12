import { Document } from 'mongoose';

export interface IUserModel extends Document {
  email: string;
  password: string;
  role: string;
  username: string;
  fullName: string;
  bio: string;
  image: string;
  validatePassword: Function;
}
