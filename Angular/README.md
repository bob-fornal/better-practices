# Angular Better Practices

## Table of Contents

1. [Organization and Configuration](#organization-and-configuration)
1. [API Services](#api-services)
1. [Filtering Services](#filtering-services)
1. [Token Services](#token-services)
1. [Components](#components)

## Organzation and Configuration

### Use a Consistent Structure
###### [Better Practice [NG001](#best-practice-ng001)]

  - This practice is recommended at the Enterprise Level.

  *Why?* This structure clearly defines what is at each level, providing a clearly understandable organization.

```
  src
   |- app
   |   |- core
   |   |   |- constants
   |   |   |- interfaces
   |   |   |- pipes
   |   |   |- services
   |   |   |- structures
   |   |- features
   |   |- pages
   |   |- shared
```

1. `core` contains several clearly understandable folders.
1. `features` are one-off, non-page components.
1. `pages` are page-level components.
1. `shared` are components or abstractions that are reusable.

### Use a Consistent Pattern for Imports
###### [Better Practice [NG002](#best-practice-ng002)]

  - This practice is recommended at the Enterprise Level.

  *Why?* This pattern provide a clear improvement in readability.

Organize imports at the top of files. Group them, as follows with a blank line between each group. The groups should be individually sorted alphabetically.

```typescript
import { Component, OnInit } from '@angular/core';
import { first, map } from 'rxjs/operators';

import { Category } from '@core/interfaces/category';
import { Skill } from '@core/interfaces/skill';
import { SkillLevel } from '@core/interfaces/skill-level';

import { ManageDataService } from '@core/services/manage-data.service';
import { SkillsService } from '@core/services/skills.service';
import { Skillset } from '@core/interfaces/skillset';
```

### Setup Named Imports
###### [Better Practice [NG003](#best-practice-ng003)]

  - This practice is recommended at the Enterprise Level.
  - This practice provides much cleaner imports.

  *Why?* Code readability.

In the `tsconfig.json` file add ...

```json
{
  "compilerOptions": {
    ...
    "paths": {
      "@core/*": [ "src/app/core/*" ],
      "@features/*": [ "src/app/features/*" ],
      "@pages/*": [ "src/app/pages/*" ],
      "@shared/*": [ "src/app/shared/*" ]
    }
    ...
  }
}
```

### Use JSON for Constants
###### [Better Practice [NG004](#best-practice-ng004)]

  - This practice is recommended at the Enterprise Level.
  - This practice places constant information in a consistent location.

  *Why?* Code readability.

In the `tsconfig.json` file add ...

```json
{
  "compilerOptions": {
    ...
    "resolveJsonModule": true,
    ...
  }
}
```

### Use Synthetic Default Imports
###### [Better Practice [NG005](#best-practice-ng005)]

  - This practice is recommended at the Enterprise Level.
  - This practice provides a cleaner import.

  *Why?* Code readability.

In the `tsconfig.json` file add ...

```json
{
  "compilerOptions": {
    ...
    "allowSyntheticDefaultImports": true,
    ...
  }
}
```

**[Back to top](#table-of-contents)**

## API Services

### Keep Services at the Component Level
###### [Better Practice [NG006](#best-practice-ng006)]

  - This practice is recommended at the Enterprise Level.

  *Why?* This allows multiple developers to be working within a repository without regular merge conflicts.
  *Why?* This simplifies locating code.
  *Why?* This reduces clutter in the `services` folder.
  
```
src
 |- app
 |   |- pages
 |   |   |- categories
 |   |   |   |- categories-api.spec.ts
 |   |   |   |- categories-api.ts
 |   |   |   |- categories.component.html
 |   |   |   |- categories.component.scss
 |   |   |   |- categories.component.spec.ts
 |   |   |   |- categories.component.ts
```

### Use an Abstraction
###### [Better Practice [NG007](#best-practice-ng007)]

  - Use an abstraction to allow for cleaner base patterns.
  - Additionally, this provides a clean method for using offline data easily.

  *Why?* This practice provides a strong level of consistency across API Services.
  
```typescript
import hostnames from '@core/constants/hostnames.json';

export abstract class ApiAbstractionService {
  hostnames: any = hostnames;

  getHostname = (_window: any): string => _window.location.hostname;

  getApiAddress = (key: string): string => {
    const hostname: string = this.getHostname(window);
    const base = hostnames.BASE[hostname];
    
    let address: string = '';
    if (hostnames.online.hasOwnProperty(key) === true) {
      address = base + hostnames.online[key];
    } else {
      address = base + hostnames.offline[key];
    }
    return address;
  };
}
```

`hostnames.json` looks something like this ...

```json
{
  "offline": {
    "categories": "categories.json",
    "TEST-OFFLINE": "TEST-OFFLINE"
  },
  "BASE": {
    "localhost": "/assets/api/mock/",
    "TEST-BASE": "/TEST-BASE/"
  },
  "online": {
    "TEST-ONLINE": "TEST-ONLINE"
  }
}
```

Now, whenever a key is not in `online`, the code will automatically use the offline data.

This abstraction can be implemented like this ...

```typescript
import { Injectable } from '@angular/core';

import { ApiAbstractionService } from './api-abstraction.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService extends ApiAbstractionService {
  constructor() {
    super();
  }
}

```

### Separate Call from Data Management
###### [Better Practice [NG008](#best-practice-ng008)]

  - This separation of concerns allows for a much cleaner implementation.
  - Testing is simplified.

  *Why?* This separates when we request the data from when that data is utilized efficiently.
  
```typescript
export class CategoriesService {
  categories: BehaviorSubject<Array<Category>> = new BehaviorSubject<Array<Category>>([]);
  
  getCategories = async (): Promise<void> => {
    const key: string = 'categories';
    const url: string = this.getApiAddress(key);

    try {
      const categories: Array<Category> = await this.http.get<Array<Category>>(url).toPromise();
      this.categories.next(categories);
    } catch (error) {
      console.log(error);
    }
  };
}
```

Usage of this pattern is as follows ...

```typescript
@Component({
  template: ''
})
export class AddSkillsComponent implements OnInit {
  categories: Array<Category> = [];

  constructor(
    public categoriesService: CategoriesService
  ) {
    this.categoriesService.categories.subscribe(this.handleCategoryData.bind(this));
  }

  ngOnInit() {
    this.skillsService.getCategories();
  };

  handleCategoryData = (data: Array<Category>): void => {
    this.categories = [ ...data ];
  };
}
```

### Use Try/Catch within API Call Request Functions
###### [Better Practice [NG009](#best-practice-ng009)]

  - This provides proper error handling.

  *Why?* This places error handling at the proper level.

```typescript
getCategories = async (): Promise<void> => {
  const key: string = 'categories';
  const url: string = this.getApiAddress(key);

  try {
    const categories: Array<Category> = await this.http.get<Array<Category>>(url).toPromise();
    this.categories.next(categories);
  } catch (error) {
    console.log(error);
  }
};
```

### Maniplate Incoming Data within API Services
###### [Better Practice [NG010](#best-practice-ng010)]

  - Data Manipulation should be in the service where the data is requested.

  *Why?* All relevant data management is in one place.

```typescript
export class CategoriesService {
  categories: BehaviorSubject<Array<Category>> = new BehaviorSubject<Array<Category>>([]);
  
  getCategories = async (): Promise<void> => {
    const key: string = 'categories';
    const url: string = this.getApiAddress(key);

    try {
      const categories: Array<Category> = await this.http.get<Array<Category>>(url).toPromise();
      const adjusted: Array<Category> = this.adjustCategories(categories);
      this.categories.next(adjusted);
    } catch (error) {
      console.log(error);
    }
  };
  
  adjustCategories = (categories: Array<Category>): Array<Category> => {
    return categories.map((category: Category): Category => {
      // DO SOMETHING HERE
    });
  };
}
```

**[Back to top](#table-of-contents)**

## Filtering Services

### Utilize Observables
###### [Better Practice [NG014](#best-practice-ng014)]

  - With Observables, the filters and data can be watched for changes that can then be passed to a single function for processing.

  *Why?* This removes the complexity of watching data for changes.

```typescript
import { BehaviorSubject, combineLatest } from "rxjs";

export class FilterContent {
  categoryFilter$ = new BehaviorSubject('');
  countryFilter$ = new BehaviorSubject('');

  products$ = new BehaviorSubject([
    { title: 'First', category: 'Square', country: 'USA' },
    ...
  ]);
  filtered = [];

  constructor() {
    this.init();
  }

  init = () => {
    combineLatest([ this.products$, this.categoryFilter$, this.countryFilter$ ])
      .subscribe(this.handleFilter.bind(this));
  };

  handleFilter = ([ products, selectedCategory, selectedCountry]) => {
    this.filtered = products.filter((product) => {
      return product.category.includes(selectedCategory) && product.country.includes(selectedCountry);
    });
  };

  onCategoryFilterChange = (category) => {
    this.categoryFilter$.next(category);
  };

  onCountryFilterChange = (country) => {
    this.countryFilter$.next(country);
  };
}
```

**[Back to top](#table-of-contents)**

## Token Services

### Have a JWT Token Service
###### [Better Practice [NG012](#best-practice-ng012)]

  - This is a service that can retrieve the token.
  - Recursion check that the token has been retrieved for components and services making API call.s

  *Why?* Isolate this functionality rather than embedding it into other services.
  *Why?* The recursive function applies minimal wait time for the components needing to make calls.

```typescript
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
```

### Use an Interceptor
###### [Better Practice [NG013](#best-practice-ng013)]

  - Use an interceptor to keep the API calls in other services clean.

  *Why?* This practice provides a clarity in the code.
  
```typescript
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, from } from 'rxjs';

import { JwtTokenService } from './jwt-token.service';
import { LogoutService } from './logout.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  allowedDomains: Array<string> = [ 'api/' ];
  jwtTokenOrigin: Array<string> = [ '/jwtforoktab2e' ];

  constructor(
    public jwtTokenService: JwtTokenService
  ) { }

  intercept = (request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> => {
    return from(this.handleAccess(request, next));
  };

  isAllowedDomain = (url: string): boolean => this.allowedDomains.some(partial => url.includes(partial));
  isNotJwtOrigin = (url: string): boolean => !this.jwtTokenOrigin.some(partial => url.includes(partial));

  needsJwtAdded = (url: string): boolean => this.isAllowedDomain(url) && this.isNotJwtOrigin(url);

  getJwtToken = (): string => (this.jwtTokenService.hasRetrievedToken()) ? this.jwtTokenService.getJwtToken() : '';

  handleAccess = async (request: HttpRequest<any>, next: HttpHandler): Promise<HttpEvent<any>> => {
    if (this.needsJwtAdded(request.urlWithParams)) {
      let jwtToken: string = this.getJwtToken();
  
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${ jwtToken }`
        }
      });
    }
    return next.handle(request).toPromise();
  };
}
```

**[Back to top](#table-of-contents)**

## Components

### Use an Abstraction
###### [Better Practice [NG011](#best-practice-ng011)]

  - Use an abstraction to allow for cleaner base patterns.

  *Why?* This practice provides a strong level of consistency across components, in particular when doing things like getting data from the URL.
  
```typescript
import { ActivatedRoute } from "@angular/router";

export abstract class DetailPageAbstraction {
  eventId: string = '';
  eventTaskId: string = '';
  
  constructor(
    private activatedRoute: ActivatedRoute
  ) {
    this.initialize();
  }
  
  initialize = (): void => {
    this.eventId = this.activatedRoute.snapshot.paramMap.get('eventId');
    this.eventTaskId = this.activatedRoute.snapshot.paramMap.get('eventTaskId');
  };
}
```

This abstraction can be implemented like this ...

```typescript
import { Subject, takeUntil } from 'rxjs';

import { DetailPageAbstraction } from '@shared/detail-page-abstraction/detail-page.abstraction';

@Component({
  template: ''
})
export class CategoriesComponent extends DetailPageAbstraction {
  constructor(
    private activatedRoute: ActivatedRoute
  ) {
    super(activatedRoute);
  }
}
```

### Clean Up Observables
###### [Better Practice [NG015](#best-practice-ng015)]

  - This practice is recommended at the Enterprise Level.

  *Why?* If a subscription is not closed the function callback attached to it will be continuously called, this can cause memory leaks and performance issues.

```typescript
import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

@Component({
  template: ''
})
export class CategoriesComponent {
  private destroy: any = new Subject();

  constructor(
    private categoryService: CategoryService
  ) {
    this.categoryService.data.pipe(
      takeUntil(this.destroy)
    ).subscribe(this.handleCategoryData);
  }

  ngOnDestroy(): void {
    this.destroy.next();
  }
}
```

**[Back to top](#table-of-contents)**
