import { User } from './User';

export type UserBody = Omit<User, '_id'>
