# Angular Better Practices

## Table of Contents

1. [API Service](#api-services)

## Api Services

### Use an Abstraction
###### [Better Practice [NG001](#best-practice-ng001)]

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

This abstaction can be implemented like this ...

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

  
**[Back to top](#table-of-contents)**
  
