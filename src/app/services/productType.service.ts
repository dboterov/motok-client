import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';

@Injectable()
export class ProductTypeService {
  public url: string;
  public token;
  public identity;

  constructor(private _http: Http) {
    this.url = GLOBAL.url;
  }

  getItentity() {
    this.identity = null;
    const identity = JSON.parse(localStorage.getItem('motokob.identity'));
    if (typeof identity !== 'undefined') {
      this.identity = identity;
    }
    return this.identity;
  }

  getToken() {
    this.token = null;
    const token = JSON.parse(localStorage.getItem('motokob.token'));
    if (typeof token !== 'undefined') {
      this.token = token;
    }
    return this.token;
  }

  list() {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    });
    return this._http.get(this.url + 'productType/list', { headers: headers })
      .map(res => res.json());
  }

  save(productTypeToSave) {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    });
    return this._http.post(this.url + 'productType/save', JSON.stringify(productTypeToSave), { headers: headers })
      .map(res => res.json());
  }
}
