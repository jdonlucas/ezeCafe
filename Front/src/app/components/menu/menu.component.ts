import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';
import { trigger, transition, animate, style } from '@angular/animations';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faInbox } from '@fortawesome/free-solid-svg-icons';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  animations: [
    trigger('slideLeftInOut', [
      transition(':enter', [
        style({transform: 'translateX(-100%)'}),
        animate('200ms ease-in', style({transform: 'translateX(0%)'}))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({transform: 'translateX(-100%)'}))
      ])
    ])
  ]
})
export class MenuComponent implements OnInit {

  public show = false;

  faCoffee = faCoffee;
  faSignOutAlt = faSignOutAlt;
  faBars = faBars;
  faInbox = faInbox;
  faPaperPlane = faPaperPlane;
  faCog = faCog;
  faChartLine = faChartLine;

  public userData: any;

  constructor(
    private _store: Store<AppState>,
    private _authService: AuthService
  ) { }

  ngOnInit() {
    this._store.select('auth').subscribe(auth => {
      let authData = auth.authData ? auth.authData : {};
      this.userData = authData.user ? authData.user : {};
    });
    
  }

  logout() {
    this._authService.logout();
  }

  toggle() {
    if(this.show) {
      this.show = false;
    } else {
      this.show = true;
    }
  }
}
