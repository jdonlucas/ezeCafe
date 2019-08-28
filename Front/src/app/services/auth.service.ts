import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { SetAuthDataAction } from '../ngrx/auth.actions';
import * as jwt_decode from 'jwt-decode';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private _authData: any;

  constructor(
      private _router: Router,
      private _http: HttpClient,
      private _store: Store<AppState>
  ) {
      this.setAuthData(JSON.parse(localStorage.getItem('authData')));
      this.initializeAuthSuscriber();
  }

  initializeAuthSuscriber() {
      this._store.select('auth').subscribe(auth => {
        this._authData = auth.authData ? auth.authData : {};
      });
  }

  localLogin(Email: string, Password: string ) {
    return this._http.post('http://localhost:3000/api/auth/localLogin', {
      Email,
      Password
    }).toPromise();
  }

  signup(Name: string, Lastname: string, Email: string, Password: string) {
      return this._http.post('http://localhost:3000/api/auth/signup', {
        UserData: {
          Name,
          Lastname,
          Email,
          Password, 
          UserRole: 1
        }
      }).toPromise();
  }

  login(token: string) {
      let decodedToken = this.getDecodedAccessToken(token);
      let userData = decodedToken ? decodedToken : {};
      userData.token = token;
      if (userData.user) {
        this.setAuthData(userData);
        this._router.navigate(['/user/profile']);
      }
  }

  logout() {
    this._router.navigate(['/auth']);
    this.unsetAuthData();
  }

  setAuthData(authData: any) {
      localStorage.setItem('authData', JSON.stringify(authData));
      this._store.dispatch(new SetAuthDataAction(authData));
  }
    
  getAuthData() {
      return this._authData ? this._authData : {};
  }

  getDecodedAccessToken(token: string): any {
      try {
        let jwtDecoded = jwt_decode(token);
        jwtDecoded.exp = new Date(jwtDecoded.exp * 1000);
        jwtDecoded.iat = new Date(jwtDecoded.iat * 1000);
        return jwtDecoded;
      }
      catch (Error) {
        return null;
      }
  }

  setUserData(userData: any) {
    let authData = JSON.parse(localStorage.getItem('authData'));
    authData = authData ? authData : {};
    authData.user = userData;
    localStorage.setItem('authData', JSON.stringify(authData));
    this._store.dispatch(new SetAuthDataAction(authData));
  }

  unsetAuthData() {
    localStorage.removeItem('authData');
    this._store.dispatch(new SetAuthDataAction(null));
  }

  isAuth(noAuth = false) {
    return this._store.select('auth').pipe(
      map(auth => {
        let today = new Date();
        let authData = auth.authData ? auth.authData : {};
        let expDate = authData.exp ? new Date(authData.exp) : new Date();
        let isAuth = authData.token && today < expDate;

        if (noAuth) {
          isAuth = !isAuth;
        }
        if (!isAuth && !noAuth) {
          this.logout();
        } else if (!isAuth && noAuth) {
          this._router.navigate(['/']);
        }
        return isAuth;
      })
    );
  }

  isUser() {
    return this._store.select('auth').pipe(
      map(auth => {
        const authData = auth.authData ? auth.authData : {};
        const userData = authData.user ? authData.user : {};
        const isUser = userData//.roleId == 1; esto se agregará una vez que se tengan roles 
        //if (!isUser) {
        //  this._router.navigate(['/user/student/']);
        //}
        return isUser;
      })
    );
  }
    
}