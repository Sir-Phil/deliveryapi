import { Request } from 'express';
export interface IUserRequest extends Request {
    user?: any
}


export interface IUser {
    id?: number;
    username: string;
    email: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date
}