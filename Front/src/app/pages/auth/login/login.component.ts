import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NgxSpinnerService } from 'ngx-spinner';
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
    private _spinnerService: NgxSpinnerService
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
    this.loginError.status = false;
    this._spinnerService.show();
    await this._authService.localLogin(username, password).then(response => {
      let isActive = this._authService.login(response["token"].toString());
      if (!isActive) {
        this.loginError.status = true;
        this.loginError.code = 897;
      }
    }).catch(err => {
      this.loginError.status = true;
      const errorCodes = err.error;
      this.loginError.code = errorCodes.Code;
    });
    this._spinnerService.hide();
  }
}
