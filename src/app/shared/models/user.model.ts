import { ELanguage } from 'src/app/shared/enums/language.enum';

export class User {
    id: number;
    name: string;
    lastName: string;
    userName: string;
    password: string;
    email: string;
    linkedin: string;
    github: string;
    language: ELanguage;

    constructor() { }
}
