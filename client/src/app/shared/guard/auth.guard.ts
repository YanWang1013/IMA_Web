
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router) {}

    canActivate() {
        const session: any = JSON.parse(sessionStorage.getItem('user_context'));
        if (session && session.access_token) {
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }
}
