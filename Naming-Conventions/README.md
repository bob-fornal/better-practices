# Naming Conventions

This is not being put in with the other categories, simply because it applies to all.

## Table of Contents

1. [Exceptions](#exceptionss)
1. [Naming Variables and Functions](#naming-variables-and-functions)
1. Naming Classes

## Exceptions

### Single-Character Variable on For-Loops
###### [Better Practice [NC001](#best-practice-nc001)]

  - It is fine to use single-character variables on traditional for-loops.

  *Why?* This has been a standard convention for so long that is does not detract from readability.
  
```javascript
for (let i = 0, len = categories.length; i < len; i++) {
  // do something
}
```

**[Back to top](#table-of-contents)**

## Naming Variables and Functions

### Use CamelCase for Names
###### [Better Practice [NC002](#best-practice-nc002)]

  - Using camel-case is an accepted practice.

  *Why?* This is a standard convention.

### Self explanatory
###### [Better Practice [NC003](#best-practice-nc003)]

  - The names of variables and functions should be self-explanatory and describe the stored value..

  *Why?* These names should follow the narrative of the code.

```javascript
let isReady = true;
let categoryData = [ ... ];
```

**[Back to top](#table-of-contents)**
