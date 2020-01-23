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
  showAd(noticeId: any) {
    return this._http.post('http://db.ezecafe.com.mx/api/ads/showAd', {
      noticeId: noticeId
    }).toPromise()
  }

  addNotice(noticeData: any) {
    return this._http.post('http://db.ezecafe.com.mx/api/ads/newAd', {
      noticeData: noticeData
    }).toPromise();
  }
  updateNotice(noticeData: any, noticeId: any) {
      return this._http.post('http://db.ezecafe.com.mx/api/ads/updateAd',{
        noticeData: noticeData,
        params: {
          id: noticeId
        }
    }).toPromise()
  }
  showNotices() {
      return this._http.get('http://db.ezecafe.com.mx/api/ads/listAllAd').toPromise()
  }

  deleteNotice(noticeId: any) {
      return this._http.post('http://db.ezecafe.com.mx/api/ads/deleteAd',{
        noticeId: noticeId
    }).toPromise()
  }
}