import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BulletinService } from 'src/app/services/bulletin.service';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { faBullhorn } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faPenAlt } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { faEye } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-anuncios',
  templateUrl: './anuncios.component.html',
  styleUrls: ['./anuncios.component.css']
})
export class AnunciosComponent implements OnInit {

  public createAnnouncement: FormGroup;
  public anuncios = [];
  public errors: any;
  public userData: any;
  faTrashAlt = faTrashAlt;
  faEdit = faEdit;
  faEye = faEye;
  faExclamationCircle = faExclamationCircle;
  faBullhorn = faBullhorn;
  faBell = faBell;
  faPenAlt = faPenAlt;
  public show = false;

  constructor(
    private _store: Store<AppState>,
    private _authService: AuthService,
    private _bulletinService: BulletinService) { }

  ngOnInit() {
    this._store.select('auth').subscribe(auth => {
      let authData = auth.authData ? auth.authData : {};
      this.userData = authData.user ? authData.user : {};
    });
    this.createAnnouncement = new FormGroup({
      message: new FormControl('',[]),
      type: new FormControl('',[]),
      expiration: new FormControl('',[])
    })
    this.fetchAnuncios();
  }

  fetchAnuncios() {
    this._bulletinService.showNotices()
      .then(resp => {
        this.anuncios = [];
        this.anuncios = resp['noticeList']
      })
  }

  saveAnnouncement() {
    const noticeData = {
      message: this.createAnnouncement.value.message,
      type: this.createAnnouncement.value.type,
      expiration: this.createAnnouncement.value.expiration,
      UserId: this.userData.id
    }
    this.createAnnouncement.reset()
    this.createAnnouncement.controls['type'].setValue('')
    this.createAnnouncement.controls['expiration'].setValue('')
    this._bulletinService.addNotice(noticeData)
      .then(resp => {
        console.log(resp);
        this.show = false;
      })
      .catch(err => {
        this.errors = err;
      })
  }

  deleteNotice(id) {
    this._bulletinService.deleteNotice(id)
      .then(() => {
        this.fetchAnuncios()
      })
  }

}
