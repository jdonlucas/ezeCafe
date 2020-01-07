import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { FormGroup, FormControl } from '@angular/forms';

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
  public editUser = false;
  public user: any;
  public editForm: FormGroup;
  faTrashAlt = faTrashAlt;
  faEdit = faEdit;

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
    this.editForm = new FormGroup ({
      name: new FormControl('',[]),
      lastname: new FormControl('',[]),
      username: new FormControl('',[]),
      role: new FormControl('',[])
    });
  }
  fetchUsers() {
    this._authService.getUsers().then(response => {
      this.users = response["usersList"];
    }).catch(err => {
      this.errorCode = err.error;
    })
  }

  deleteUser(id: any) {
    this._authService.deleteUser(id)
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
  hide() {
    this.editUser = false;
  }
  edit(user: any) {
    this.user = user;
    this.editUser = true;
    this.editForm.controls['name'].setValue(user.Name);
    this.editForm.controls['lastname'].setValue(user.Lastname);
    this.editForm.controls['username'].setValue(user.Username);
    this.editForm.controls['role'].setValue(user.UserRole);
  }
  update() {
    let userData = {
      Name: this.editForm.value.name,
      Lastname: this.editForm.value.lastname,
      UserRole: this.editForm.value.role
    }
    if(this.editForm.value.username != this.user.Username) {
      userData['Username'] = this.editForm.value.username;
    }
    this._authService.update(userData,this.user.id).then(() => {
      this.hide();
      this.users = [];
      this.fetchUsers()
    })
  }
}
