# Angular Better Practices

## Table of Contents

1. [Organization and Configuration](#organization-and-configuration)
1. [API Services](#api-services)
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

### Setup Named Imports
###### [Better Practice [NG002](#best-practice-ng002)]

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
###### [Better Practice [NG003](#best-practice-ng003)]

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
###### [Better Practice [NG004](#best-practice-ng004)]

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
###### [Better Practice [NG005](#best-practice-ng005)]

  - This practice is recommended at the Enterprise Level.

  *Why?* This allows multiple developers to be working within a repository without regular merge conflicts.
  *Why?* This simplifies locating code.
  *Why?* This reduces clutter in the `services` folder.

### Use an Abstraction
###### [Better Practice [NG006](#best-practice-ng006)]

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
###### [Better Practice [NG007](#best-practice-ng007)]

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
###### [Better Practice [NG008](#best-practice-ng008)]

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
###### [Better Practice [NG009](#best-practice-ng009)]

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


## Components

### Use an Abstraction
###### [Better Practice [NG010](#best-practice-ng010)]

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
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { DetailPageAbstraction } from '@shared/detail-page-abstraction/detail-page.abstraction';

@Component({
  template: ''
})
export class CategoriesComponent extends DetailPageAbstraction {
  constructor(
    activatedRoute: ActivatedRoute
  ) {
    super(activatedRoute);
  }
}
```
  
**[Back to top](#table-of-contents)**
  
