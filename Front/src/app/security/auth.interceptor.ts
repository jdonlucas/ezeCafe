import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {


    constructor(private _authService: AuthService) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authData = this._authService.getAuthData();
        let token = authData.token ? authData.token : "";
        const clonedRequest = req.clone({ headers: req.headers.set('Authorization', `Bearer ${token}`) });
        return next.handle(clonedRequest);
    }

}