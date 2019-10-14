import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public loginError: any;

  constructor(
    private _authService: AuthService,
    private _spinnerService: Ng4LoadingSpinnerService
  ) {
    this.loginError = {
      status: false,
      code: ''
    };
   }

  ngOnInit() {
    this.loginForm = new FormGroup ({
      username: new FormControl('', [
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required
      ])
    });
  }

  async login() {
    let { username, password } = this.loginForm.value;
    this._spinnerService.show();
    await this._authService.localLogin(username, password).then(response => {
      this._authService.login(response["token"].toString());
    }).catch(err => {
      this.loginError.status = true;
      const errorCodes = err.error;
      this.loginError.code = errorCodes.Code;
    });
    this._spinnerService.hide();
  }
}
