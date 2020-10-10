import { Injectable } from '@angular/core';

import { finalize } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class CanloadingService {

    public loading = false;

    constructor() { }

    public handleLoad(obs: Observable<any>): Observable<any> {
        this.loading = true;
        return obs.pipe(finalize(() => {
            this.loading = false;
        }));
    }

}
