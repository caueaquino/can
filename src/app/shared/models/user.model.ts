import { ELanguage } from 'src/app/shared/enums/language.enum';

export class User {
    id: number;
    name: string;
    lastName: string;
    userName: string;
    password: string;
    email: string;
    avatarUrl: string;
    language: ELanguage;

    constructor(user: User) {
        if (user) {
            this.id = user.id ?? null;
            this.name = user.name ?? null;
            this.lastName = user.lastName ?? null;
            this.userName = user.userName ?? null;
            this.password = user.password ?? null;
            this.email = user.email ?? null;
            this.avatarUrl = user.avatarUrl ?? null;
            this.language = user.language ?? null;
        }
    }
 }
