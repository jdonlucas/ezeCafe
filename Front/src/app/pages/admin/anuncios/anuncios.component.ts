import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BulletinService } from 'src/app/services/bulletin.service';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { faBullhorn } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faPenAlt } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { DatePipe } from '@angular/common';
import { MomentDateAdapter,MAT_MOMENT_DATE_FORMATS,MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

@Component({
  selector: 'app-anuncios',
  templateUrl: './anuncios.component.html',
  styleUrls: ['./anuncios.component.css'],
  providers: [DatePipe, {
    provide: DateAdapter,
    useClass: MomentDateAdapter,
    deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
  },

  {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},]
})
export class AnunciosComponent implements OnInit {

  public createAnnouncement: FormGroup;
  public anuncios = [];
  public errors: any;
  public userData: any;
  public noticeId = null;
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
    private _bulletinService: BulletinService,
    private _spinnerService: Ng4LoadingSpinnerService,
    private datePipe: DatePipe,
    private _adapter: DateAdapter<any>) { 
      this._adapter.setLocale('es');
    }

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

        this.anuncios.sort((a,b) => 
          a.expiration.localeCompare(b.expiration)
        );
      })
  }

  async saveAnnouncement() {
    let date = new Date();
    date = new Date(date.setDate(date.getDate() + parseInt(this.createAnnouncement.value.expiration)))
    const noticeData = {
      message: this.createAnnouncement.value.message,
      type: this.createAnnouncement.value.type,
      expiration: date,
      UserId: this.userData.id
    }
    this.createAnnouncement.reset()
    this.createAnnouncement.controls['type'].setValue('')
    this.createAnnouncement.controls['expiration'].setValue('')
    this._spinnerService.show();
    await this._bulletinService.addNotice(noticeData)
      .then(resp => {
        this.show = false;
        this.fetchAnuncios()
      })
      .catch(err => {
        this.errors = err;
      })
    this._spinnerService.hide();
  }

  deleteNotice(id) {
    this._bulletinService.deleteNotice(id)
      .then(() => {
        this.fetchAnuncios()
      })
  }
  updateNotice(id) {
    let date = new Date();
    this._bulletinService.showAd(id)
      .then(resp => {
        this.noticeId = resp['newNotice'][0].id;
        let mes = resp['newNotice'][0].message;
        let type = resp['newNotice'][0].type;
        let exp = resp['newNotice'][0].expiration;
        let days = new Date(exp).getDate() - date.getDate();
        let expiration: any;
        if(days < 0) {
          expiration = 30;
        } else if (days > 3) {
          expiration = 7;
        } else if (days == 3) {
          expiration = 3;
        } else if (days == 2) {
          expiration = 2;
        } else if (days == 1) {
          expiration = 1;
        }
        this.createAnnouncement.controls['message'].setValue(mes);
        this.createAnnouncement.controls['type'].setValue(type);
        this.createAnnouncement.controls['expiration'].setValue(expiration);
        this.show = true;
      })
  }

  async update() {
    let date = new Date();
    date = new Date(date.setDate(date.getDate() + parseInt(this.createAnnouncement.value.expiration)))
    const noticeData = {
      message: this.createAnnouncement.value.message,
      type: this.createAnnouncement.value.type,
      expiration: date
    }
    this._spinnerService.show();
    await this._bulletinService.updateNotice(noticeData,this.noticeId)
      .then(() => {
        this.show = false;
        this.createAnnouncement.reset()
        this.createAnnouncement.controls['type'].setValue('')
        this.createAnnouncement.controls['expiration'].setValue('')
        this.fetchAnuncios()
        this.noticeId = null;
      })
    this._spinnerService.hide();
  }

}
