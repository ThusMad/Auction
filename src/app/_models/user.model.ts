import { Bage } from './bage.model';

export class User {
    id: string;
    username: string;
    about: string;
    email: string;
    password?: string;
    firstName: string;
    lastName: string;
    registrationDate?: number;
    role: string;
    token: string;
    bages?: Bage[];
    profilePicture?: string;
}