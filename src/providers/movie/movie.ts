import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class MovieProvider {

  private key = '46a2af708acd984af52d42e21d923934';
  private baseApiPath = 'https://api.themoviedb.org/3/movie';

  constructor(public http: Http) {
    console.log('Hello MovieProvider Provider');
  }

  getLatestMovie() {
    return this.http.get(`${this.baseApiPath}/popular?api_key=${this.key}`);
  }

}
