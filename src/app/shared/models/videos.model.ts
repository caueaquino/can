import { User } from './user.model';

export class Videos {
    id: number;
    title: string;
    artist: string;
    videoUrl: string;
    uploadDate: Date;
    user: User;
    comments: Array<string>;

    constructor() {
        this.uploadDate = new Date();
        this.user = new User();
        this.comments = new Array<string>();
    }
}
