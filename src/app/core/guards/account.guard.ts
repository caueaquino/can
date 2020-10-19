import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { AuthService } from 'src/app/core/services/auth.service';


@Injectable({ providedIn: 'root' })
export class AccountGuard implements CanActivate {

    constructor(
        private router: Router,
        private authservice: AuthService,
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const accessToken = this.authservice.accessToken;
        if (accessToken) {
            this.router.navigate(['/can/home']);
            return false;
        }
        return true;
    }
}