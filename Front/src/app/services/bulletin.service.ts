import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
// change localhost : 3000 to db . ezecafe . com . mx to production
export class BulletinService {

  constructor(
      private _http: HttpClient,
  ) {
  }

  addNotice(noticeData: any) {
    return this._http.post('http://localhost:3000/api/ads/newAd', {
      noticeData: noticeData
    }).toPromise();
  }
  updateNotice(noticeData: any, noticeId: any) {
      return this._http.post('http://localhost:3000/api/ads/updateAd',{
        noticeData: noticeData,
        params: {
          id: noticeId
        }
    }).toPromise()
  }
  showNotices() {
      return this._http.get('http://localhost:3000/api/ads/listAllAd').toPromise()
  }

  deleteNotice(noticeId: any) {
      return this._http.post('http://localhost:3000/api/ads/deleteAd',{
        noticeId: noticeId
    }).toPromise()
  }
}