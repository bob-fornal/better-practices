
import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ApiHandlerService } from './api-handler.service.abstract';

import hostnames from '@core/constants/hostnames.json';

class ApiTestService extends ApiHandlerService {
  constructor() {
    super();
  }
}

describe('ApiHandlerServiceAbstract', () => {
  let service: ApiTestService;

  beforeEach(() => {
    service = new ApiTestService();

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        ApiTestService
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    service = TestBed.inject(ApiTestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('expects "getHostName" to return hostname', () => {
    const _window = {
      location: {
        hostname: 'TEST'
      }
    };

    const result = service.getHostName(_window);
    expect(result).toEqual('TEST');
  });

  it('expects "getHostName" to return undefined (no hostname)', () => {
    const _window = {
      location: { }
    };

    const result = service.getHostName(_window);
    expect(result).toBeUndefined();
  });

  it('expects "getHostName" to return undefined (no location)', () => {
    const _window = { };

    const result = service.getHostName(_window);
    expect(result).toBeUndefined();
  });

  it('expects "getHostName" to return undefined (no window)', () => {
    const _window = undefined;

    const result = service.getHostName(_window);
    expect(result).toBeUndefined();
  });

  it('expects "getApiAddress" to return external hostname', () => {
    spyOn(service, 'getHostName').and.returnValue('test');

    const result: string = service.getApiAddress('test');
    expect(result).toEqual('api/TEST/TEST');
  });

});
