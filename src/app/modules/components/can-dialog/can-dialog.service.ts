import { Injectable } from '@angular/core';

import { Ngxalert } from 'ngx-dialogs';


@Injectable({ providedIn: 'root' })
export class CanDialogService {

    private canDialog: Ngxalert = new Ngxalert();

    constructor() { }

    public openDialog(title: string, message: string): void {
        this.canDialog.create({
            title,
            message,
        });
    }

}
