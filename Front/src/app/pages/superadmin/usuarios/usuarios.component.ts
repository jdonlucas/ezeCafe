import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { AuthService } from 'src/app/services/auth.service';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  public signupForm: FormGroup;
  public signupError: any;
  public create: boolean;
  public created: boolean;
  public userCreated: string;

  constructor(
    private _authService: AuthService,
    private _spinnerService: Ng4LoadingSpinnerService
    ) { 
      this.signupError = {
        status: false,
        code: ''
      };
    }

  ngOnInit() {
    this.create = true;
    this.created = false;
    this.signupForm = new FormGroup ({
      name: new FormControl('', [
        Validators.required
      ]),
      lastname: new FormControl('', [
        Validators.required
      ]),
      username: new FormControl('', [
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required
      ]),
      role: new FormControl('', [
        Validators.required
      ])
    });
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
  async signup() {
    let { name, lastname, username, password, role } = this.signupForm.value;
    console.log(name, lastname, username, password, role);this._spinnerService.show();
    await this._authService.signup(name, lastname, username, password, role).then(response => {
      let decodedToken = this.getDecodedAccessToken(response["token"].toString());
      let userData = decodedToken ? decodedToken : {};
      this.create = false;
      this.created = true;
      this.userCreated = "Se creo el " + userData.user.Role.description.toLowerCase() + ".";
    }).catch(err => {
      this.signupError.status = true;
      const errorCodes = err.error;
      this.signupError.code = errorCodes.Code;
    });
    this._spinnerService.hide();
  }

  back() {
    this.create = true;
    this.created = false;
    this.signupForm.reset();
    this.signupForm.value.role = '';
  }

}
