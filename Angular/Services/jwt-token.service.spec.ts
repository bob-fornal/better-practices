
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { of } from 'rxjs';

import { JwtTokenService } from './jwt-token.service';

describe('JwtTokenService', () => {
  let service: JwtTokenService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(JwtTokenService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('expects "retrieveToken" to take an id and token, pass them to jwt and retrieve an access token', () => {
    const tokenId: string = "TOKEN-ID";
    const accessToken: string = 'ACCESS-TOKEN';
    const access_token: string = 'ACCESS_TOKEN';
    spyOn(service.http, 'post').and.returnValue(of({ access_token: access_token }));
    spyOn(service, 'setJwtToken').and.stub();
    service.hasToken = false;

    service.retrieveToken(tokenId, accessToken);
    expect(service.http.post).toHaveBeenCalled();
    expect(service.setJwtToken).toHaveBeenCalledWith(access_token);
  });

  it('expects "setJwtToken" to set the token and indicate it has the token', () => {
    const token: string = 'ACCESS_TOKEN';

    service.setJwtToken(token);
    expect(service.token).toEqual(token);
    expect(service.hasToken).toEqual(true);
  });

  it('expects "getJwtToken" to return the token from the service', () => {
    const storedToken: string = 'STORED-TOKEN';
    service.token = storedToken;

    const result = service.getJwtToken();
    expect(result).toEqual(storedToken);
  });

  it('expects "pollForJwtToken" to store the passed fn and trigger poll', () => {
    const fn = () => undefined;
    spyOn(service, 'poll').and.stub();

    service.pollForJwtToken(fn);
    expect(service.poll).toHaveBeenCalled();
  });

  it('expects "poll" to execute fn when service has a token', () => {
    let result = null;
    service.hasToken = true;
    const fn = () => {
      result = 'DONE';
    };

    service.poll(fn);
    expect(result).toEqual('DONE');
  });

  it('expects "poll" to trigger settimeout if there is no token', () => {
    const fn = () => undefined;
    service.hasToken = false;
    const oldTimeout = window.setTimeout;
    spyOn(window, 'setTimeout').and.stub();

    service.poll(fn);
    expect(window.setTimeout).toHaveBeenCalledWith(jasmine.any(Function), 100);
    window.setTimeout = oldTimeout;
  });

});