import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';

declare var $: any;

@Component({
  selector: 'app-baja',
  templateUrl: './baja.component.html',
  styleUrls: ['./baja.component.css']
})
export class BajaComponent implements OnInit {

  public userData: any;
  public users: any;
  public errorCode: any;
  faTrashAlt = faTrashAlt;

  constructor(
    private _store: Store<AppState>,
    private _authService: AuthService
  ) { }

  ngOnInit() {
    this._store.select('auth').subscribe(auth => {
      let authData = auth.authData ? auth.authData : {};
      this.userData = authData.user ? authData.user : {};
      this.fetchUsers();
    });
  }

  fetchUsers() {
    this.users = [];
    this._authService.getUsers().then(response => {
      this.users = response["usersList"];
    }).catch(err => {
      this.errorCode = err.error;
    })
  }

  deleteUser(id: any) {
    const userData = {
      Active: false
    }
    this._authService.update(userData,id)
      .then(response => {
        $('#alertM p').html('Se eliminó el usuario.');
        this.fetchUsers();
        $('#alertM').show();
        $('#alertM').fadeOut(4000);
      })
      .catch(err => {
        this.errorCode = err.error;
      })
  }
}
