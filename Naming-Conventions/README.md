# Naming Conventions

This is not being put in with the other categories, simply because it applies to all.

## Table of Contents

1. [Exceptions](#exceptionss)
1. [Naming Variables and Functions](#naming-variables-and-functions)
1. [Naming Classes](#naming-classes)

## Exceptions

### Single-Character Variable on For-Loops
###### [Better Practice [NC001](#better-practice-nc001)]

  - It is fine to use single-character variables on traditional for-loops.

  *Why?* This has been a standard convention for so long that is does not detract from readability.
  
```javascript
for (let i = 0, len = categories.length; i < len; i++) {
  // do something
}
```

**[Back to top](#table-of-contents)**

## Naming Variables and Functions

### Use Camel Case for Names
###### [Better Practice [NC002](#better-practice-nc002)]

  - Using camel-case is an accepted practice.

  *Why?* This is a standard convention.

### Self Explanatory Names
###### [Better Practice [NC003](#better-practice-nc003)]

  - Good variable and function names should be easy to understand and tell what is going on — not more and not less.
  - The names of variables and functions should be self-explanatory and describe the stored value.

  *Why?* These names should follow the narrative of the code.

```javascript
let isReady = true;
let categoryData = [ ... ];
```

### Booleans Prefixed
###### [Better Practice [NC004](#better-practice-nc004)]

  - Boolean variables should be prefixed with `is` or `has`.

  *Why?* This pattern provides clarity in context.

```javascript
let isReady = true;
let hasCategory = false;
```

### Function Names as Verb/Noun
###### [Better Practice [NC005](#better-practice-nc005)]

  - Function naming should be a noun prefixed with a verb.

  *Why?* This pattern provides clarity of use in context.

```javascript
function getCategory(data) {
  // return something
}
```

**[Back to top](#table-of-contents)**

## Naming Classes

### Descriptive Titles
###### [Better Practice [NC006](#better-practice-nc006)]

  - Use descriptive titles that explain the capabilities of the class.
  - Use pascal case for class names.

  *Why?* This pattern provides a clean method of differentiating between the class and its implementation.
  
```javascript
export class CategoryHandlers {
  // functionality
}

const categoryHandler = new CategoryHandlers();
```

**[Back to top](#table-of-contents)**
