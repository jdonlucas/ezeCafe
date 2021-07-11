import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from 'src/app/services/api.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
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
  public userData: any;

  constructor(
    private _store: Store<AppState>,
    private _authService: AuthService,
    private _apiService: ApiService,
    private _spinnerService: NgxSpinnerService
    ) { 
      this.signupError = {
        status: false,
        code: ''
      };
    }

  ngOnInit() {
    this._store.select('auth').subscribe(auth => {
      let authData = auth.authData ? auth.authData : {};
      this.userData = authData.user ? authData.user : {};
    });
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
      password2: new FormControl('', [
        Validators.required
      ]),
      role: new FormControl('', [
        Validators.required
      ])
    });
  }

  async signup() {
    this.signupError.code = '';
    let { name, lastname, username, password, role } = this.signupForm.value;
    if (role == 4) {
      this.signupError.code = 777;
    } else if ((this.userData.Role.id < 4) && (role == 3)){
      this.signupError.code = 777;
    } else if (this.signupForm.value.password != this.signupForm.value.password2) {
      this.signupError.code = 666;
    } else if (this.signupForm.value.password.length < 6) {
      this.signupError.code = 667;
    } else {
      this._spinnerService.show();
      let data = {
        "query": "mutation ($username: String!, $password: String!, $name: String!, $lastname: String!, $role: Int!) {" +
            "signup(username: $username, password: $password, name: $name, lastname: $lastname, role: $role) {" +
            "Username Role { name } }" +
        "}",
        "variables": {
          "username": username,
          "password": password,
          "name": name,
          "lastname": lastname,
          "role": parseInt(role)
        }
      }
      await this._apiService.graphql(data).then(res => {
        let userCreated = res["data"].signup;
        this.create = false;
        this.created = true;
        this.userCreated = "Se creo el usuario " + userCreated.Username + " con el rol " + userCreated.Role.name.toLowerCase() + ".";
      })
      this._spinnerService.hide();
    }
  }

  back() {
    this.create = true;
    this.created = false;
    this.signupForm.reset();
    this.signupForm.value.role = '';
  }

}
