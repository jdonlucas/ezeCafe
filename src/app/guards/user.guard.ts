import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(private _authService: AuthService) { 
  }

  canActivate(route: ActivatedRouteSnapshot) {    
    let whichUser = route.data.whichUser;
    return this._authService.isUser(whichUser);
  }
}
