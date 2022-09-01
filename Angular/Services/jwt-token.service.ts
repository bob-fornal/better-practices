
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import authnames from '@core/constants/auth.json';

import { HostnameService } from './hostname.service';

@Injectable({
  providedIn: 'root'
})
export class JwtTokenService {

  hasToken: boolean = false;
  token: string = '';

  timeout: number = 100;

  hostname: string = '';

  constructor(
    public hostnameService: HostnameService,
    public http: HttpClient
  ) {
    this.hasToken = false;
    this.hostname = this.hostnameService.get(window);
  }

  hasRetrievedToken = (): boolean => this.hasToken;

  retrieveToken = (tokenId: string, accessToken: string): void => {
    const jwtUrl: string = authnames[this.hostname].oauthUrl;

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${ tokenId }, Bearer ${ accessToken }`
      })
    };

    this.http.post(jwtUrl, {}, httpOptions).subscribe((data: any) => {
      this.setJwtToken(data.access_token);
    });
  };

  setJwtToken = (token: string): void => {
    this.token = token;
    this.hasToken = true;
  };

  getJwtToken = (): string => this.token;

  pollForJwtToken = (fn: () => any) => {
    this.poll(fn);
  };

  poll = (fn: () => any) => {
    const hasRetrievedToken: boolean = this.hasRetrievedToken();
    if (hasRetrievedToken === true) {
      fn();
    } else {
      setTimeout(this.poll.bind(this, fn), this.timeout);
    }
  };
  
}