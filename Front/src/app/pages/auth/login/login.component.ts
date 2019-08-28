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

  constructor(
    private _authService: AuthService,
    private _spinnerService: Ng4LoadingSpinnerService
  ) { }

  ngOnInit() {
    this.loginForm = new FormGroup ({
      email: new FormControl('', []),
      password: new FormControl('', [])
    });
  }

  async login() {
    let { email, password } = this.loginForm.value;
    this._spinnerService.show();
    await this._authService.localLogin(email, password).then(response => {
      this._authService.login(response["token"].toString());
    }).catch(err => {
      const errorCodes = err.error;
      console.log(errorCodes);
    });
    this._spinnerService.hide();
  }
}
