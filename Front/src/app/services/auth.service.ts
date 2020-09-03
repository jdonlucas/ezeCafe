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
// change localhost : 3000 to db . ezecafe . com . mx to production
export class AuthService {

  private _authData: any;

  constructor(
      private _router: Router,
      private _http: HttpClient,
      private _store: Store<AppState>,
  ) {
      this.setAuthData(JSON.parse(localStorage.getItem('authData')));
      this.initializeAuthSuscriber();
  }

  initializeAuthSuscriber() {
      this._store.select('auth').subscribe(auth => {
        this._authData = auth.authData ? auth.authData : {};
      });
  }

  getUsers() {
    return this._http.get('http://localhost:3000/api/users/list').toPromise();
  }
  localLogin(Username: string, Password: string ) {
    return this._http.post('http://localhost:3000/api/auth/localLogin', { // prod
      Username,
      Password
    }).toPromise();
  }

  signup(Name: string, Lastname: string, Username: string, Password: string, UserRole: string) {
      return this._http.post('http://localhost:3000/api/auth/signup', { // for production
        UserData: {
          Name,
          Lastname,
          Username,
          Password, 
          UserRole
        }
      }).toPromise();
  }

  login(token: string) {
      let decodedToken = this.getDecodedAccessToken(token);
      let userData = decodedToken ? decodedToken : {};
      userData.token = token;
      if (userData.user) {
        this.setAuthData(userData); // redirige al usuario a su home segun su rol
        localStorage.setItem('dateData', this.formatDate());
        if(userData.user.Role.name == "SuperAdmin") {
          this._router.navigate(['/superadmin']);
        } else if (userData.user.Role.name == "Admin") {
          this._router.navigate(['/admin']);
        } else if (userData.user.Role.name == "Caja") {
          this._router.navigate(['/caja']);
        } else if (userData.user.Role.name == "Caja") {
          this._router.navigate(['/mesero']);
        }
      }
      return userData.user.Active
  }

  logout() {
    this._router.navigate(['/']);
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
        const userData = authData.user ? authData.user.Role.name : {};
        const isActive = authData.user ? authData.user.Active : false;
        let expDate = authData.exp ? new Date(authData.exp) : new Date();
        let isAuth = authData.token && today < expDate && isActive;

        if (noAuth) { // si el usuario no esta autenticado le permite ver la vista del login
          isAuth = !isAuth;
        }
        if (!isAuth && !noAuth) { // si el token expiró cierra la sesion del usuario
          this.logout();
          authData = {}; // y vacia la info del usuario
        } else if (!isAuth && noAuth) { // si el usuario esta autenticado y quiere acceder a login lo manda al home
          this._router.navigate(['/' + userData.toLowerCase()]);
        }
        return isAuth;
      })
    );
  }

  isUser(whichUser) {
    return this._store.select('auth').pipe(
      map(auth => {
        const authData = auth.authData ? auth.authData : {};
        const userData = authData.user ? authData.user.Role.name : {}; // verifica si el usuario puede entrar a la ruta que quiere
        const isUser = (userData == whichUser || userData == 'SuperAdmin' || userData == 'Admin' || whichUser == 'Mesero') ? true : false;  
        if (!isUser) { // si la ruta es distinta al rol del usuario lo redirige a su home
          this._router.navigate(['/' + userData.toLowerCase()]);
        } else if ((userData == 'Admin') && (whichUser == 'SuperAdmin')) {
          this._router.navigate(['/' + userData.toLowerCase()]);
        }
        return isUser; // si la ruta es igual al rol del usuario regresa True
      })
    );
  }

  deleteUser(id: any) {
    return this._http.post('http://localhost:3000/api/users/delete', {
      userId: id
    }).toPromise();
  }
  update(userData: any, userId: any) {
    return this._http.post('http://localhost:3000/api/users/update', {
      userData: userData,
      params: {
        id: userId
      }
    }).toPromise();
  }
    
  formatDate() {
    var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [month, day, year].join('-');
  }
}