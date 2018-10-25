import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticateService } from './authenticate.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthenticateService, private router: Router) {}

  canActivate() {
    if (!this.auth.isLoggedIn()) {
      alert("Un authorized access. Please login to continue.")
      this.router.navigateByUrl('/');
      return false;
    }
    return true;
  }
}
