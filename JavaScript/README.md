# JavaScript Better Practices

## Table of Contents

1. [Block Declarations](#block-declarations)
1. [Classes](#classes)
1. [Comparison](#comparison)
1. [For-Loops](#for-loops)
1. [Functions](#functions)
1. [JSON Methods](#json-methods)
1. [Objects](#objects)
1. [Semicolons](#semicolons)
1. [Shorthand Notation](#shorthand-notation)
1. [Ternaries](#ternaries)

## Block Declarations

### Use `let` and `const`
###### [Better Practice [JS006](#better-practice-js006)]

  * Use `let` and `const` rather than `var`

  *Why?* There are some side-effects to using `var` declaration.

```javascript
var x = 10;
if (true) {
  var x = 15;
  console.log(x); // consoles 15
}
console.log(x); // consoles 15
```

Variables defined with `var` are not block-scoped, redefining them in a narrower scope affects the value of the outer scope. `let` and `const` do not suffer from this drawback.

```javascript
let y = 10;
if (true) {
  let y = 15;
  console.log(y); // consoles 15
}
console.log(y); // consoles 10
```

**[Back to top](#table-of-contents)**

## Classes

### Use Classes instead of Constructor Functions
###### [Better Practice [JS009](#better-practice-js009)]

  * `new` is required.
  * A single, canonical way to emulate classes in JavaScript.

  *Why?* Convenient, self-contained syntax.

  *Why?* Classes are clearer and are more readable.

  *Why?* Classes have a built in constructor.

  *Why?* More familiar when more familiar with class-based languages.

**[Back to top](#table-of-contents)**

## Comparison

### Use `===` instead of `==`
###### [Better Practice [JS004](#better-practice-js004)]

  * Using `===` and `!==` allows for strict equality when comparing values.

  *Why?* When working with `==` and `!=` there can be side-effects related to type coersion (unexpected results).

### Be Explicit when Comparing
###### [Better Practice [JS003](#better-practice-js003)]

  * Using `!` or `!!` can have unusual side-effects.
  * Makes the logic more explicit and easier to reason about.

  *Why?* Make the code less prone to side effects.

  *Why?* Make the code more readable.
  
Side-effects can occur if this function is passed a string which evaluates `!!isReady` to `true`.

```javascript
function handleData(isReady) {
  if (!!isReady) {
    // do something
  }
}
```

Explicitly define the condition to avoid side-effects. The triple-equals (`===`) also helps to ensure it's a binary comparison.

```javascript
function handleData(isReady) {
  if (isReady === true) {
    // do something
  }
}
```

**[Back to top](#table-of-contents)**

## For-Loops

### Pre-Calculate Length
###### [Better Practice [JS002](#better-practice-js002)]

  * Calculate the length outside the iteration of the loop.

  *Why?* Increased efficiency with large datasets.

  *Why?* Increased readability.
 
Instead of ...
 
```javascript
const categories = [ '1', '2', ... ];
for (let i = 0; i < categories.length; i++) {
  // do something
}
```

Calculate the length like this and the array length is only accessed one time.

```javascript
const categories = [ '1', '2', ... ];
for (let i = 0, len = categories.length; i < len; i++) {
  // do something
}
```

**[Back to top](#table-of-contents)**

## Functions

### Declaration Functions within Classes
###### [Better Practice [JS008](#better-practice-js008)]

  * Use function declaration within classes as methods.

  *Why?* This pattern is widely used and accepted.

  *Why?* This pattern does not have scope issues.

```javascript
class Categories {
  constructor() {}

  getData() {
    // do something
  }
}
```

### Arrow Functions within Classes
###### [Better Practice [JS017](#better-practice-js017)]

  * Use arrow functions within classes when the method will be used as a callback.

  *Why?* This pattern takes into account `this` without the need for `.bind(this)`.

In the following code, since the `setTimeout` is used, an arrow function would be a better fit.

```javascript
class Categories {
  constructor() {
    setTimeout(this.init, 1000);
  }

  init = () => {
    // do something
  };
}
```

### Arrow Functions rather than Declaration or Expression
###### [Better Practice [JS018](#better-practice-js018)]

  * Arrow functions should be used outside of Classes.

  *Why?* Avoid *hoisting* issues (this is tied to why arrow funtions, `const`, and `let` were added).

  *Why?* Better handling of scope when the function is used.

  *Why?* Cleaner presentation of implicit return.

* In the following code, the function `first` works even though the actual function follows this line in the code.
* The function `second` logically throws a `ReferenceError`.
* The function `third` also logically throws a `ReferenceError` and takes advantage of scope improvements.

```javascript
first(); // works
second(); // throws a ReferenceError
third(); // throws a ReferenceError

function first() {
  // do something
}

const second = function() {
  // do something
}

const third = () => {
  // do something
};
```

**[Back to top](#table-of-contents)**

## JSON Methods

### Wrap `JSON.parse` in a try/catch
###### [Better Practice [JS015](#better-practice-js015)]

  * Use try/catch with `JSON.parse`

  *Why?* This is a common point of failure that can be managed.

```javascript
const handleInputData = (data) => {
  try {
    const result = JSON.parse(data);
  } catch (error) {
    console.log(error);
  }
};
```

### Wrap `JSON.stringify` in a try/catch
###### [Better Practice [JS014](#better-practice-js014)]

  * Use try/catch with `JSON.stringify`

  *Why?* This is a common point of failure that can be managed.

```javascript
const handleInputStructure = (input) => {
  try {
    const result = JSON.stringify(input);
  } catch (error) {
    console.log(error);
  }
};
```

**[Back to top](#table-of-contents)**


## Objects

### Use Dot Notation for Fixed Properties
###### [Better Practice [JS011](#better-practice-js011)]

  * Use dot notation when working with fixed properties.

  *Why?* This is a simple, readable pattern.

```javascript
const category = {
  title: {
    description: 'JavaScript'
  }
};

console.log(category.title.description);
```

### Use Square-Bracket Notation for Dynamic Properties
###### [Better Practice [JS012](#better-practice-js012)]

  * Use square-bracket notation when working with dynamic properties.
  * This pattern can be used with data that is fetched from an API.

  *Why?* This is a simple, readable pattern.

```javascript
const getData = async (url) => {
  try {
    const category = await fetch(url);
    console.log(category['title']['description']);
  } catch (error) {
    console.log(error);
  }
};
```

### Use Optional Chaining with Null-ish Coalescing to Check Nested Objects
###### [Better Practice [JS007](#better-practice-js007)]

  * Use a pattern like `category?.title?.description`

  *Why?* This is a simpler, more readable pattern.

```javascript
const category = {
  title: {
    description: 'JavaScript'
  }
};
```

Referencing `category.title.weight` returns `TypeError: Cannot read property 'weight' of undefined.` To avoid this error, the following pattern was used.

```javascript
const weight = (category && category.title && category.weight) ? category.title.weight : 0;
```

Optional chaining provides a cleaner pattern ...

```javascript
const weight = (category?.title?.weight !== undefined) ? category.title.weight : 0;
```

With null-ish coalescing and optional chaining, this can be simplified futher, providing a very clean readable set of code ...

```javascript
const weight = category?.title?.weight ?? 0;
```

**[Back to top](#table-of-contents)**

## Semicolons

### Use Semicolons
###### [Better Practice [JS001](#better-practice-js001)]

  * Use semicolons when an assignment occurs.

  *Why?* There are strict Automatic Semicolon Insertion (ASI) rules that behave as expected MOST of the time. Adding them in is not complicated and provide a security that unexpected side-effects will not occur.
  
There is a great article [HERE](https://flaviocopes.com/javascript-automatic-semicolon-insertion/) about ASI and the side effects.
  
**[Back to top](#table-of-contents)**

## Shorthand Notation

### Use Specific Shorthand for If-Comparisons
###### [Better Practice [JS005](#better-practice-js005)]

  * Only omit the brackets for one-line if-comparisons.

  *Why?* Less confusion in the code, making it more readable.

This is a **bad practicce**. While it will work, it could lead to unexpected code in the future.

```javascript
if (isReady === true)
  isReady = false;
```

Someone could try to extend the function and unintentionally cause issues.

```javascript
if (isReady === true)
  isReady = false;
  functionCall();
```

Instead, stick to something clear; a one-line if-comparison.

```javascript
if (isReady === true) isReady = false;
```

**[Back to top](#table-of-contents)**

## Ternaries

### Use Single Ternaries ONLY
###### [Better Practice [JS010](#better-practice-js010)]

  * Nested ternaries are hard to read.
  * Nested ternaries are difficult to maintain.

  *Why?* Single (non-nested) ternaries are easy to read and maintain.

I often see code like this ...

```javascript
const a = 'a';

const checkCase = (a === 'a')
  ? 'A'
  : (a === 'b')
  ? 'B'
  : (a === 'c')
  ? 'C'
  : 'D'
```

This can be simplified with an `if-condition` ...

```javascript
const a = 'a';

let checkCase = '';
if (a === 'a') {
  checkCase = 'A';
} else if (a === 'b') {
  checkCase = 'B'
} else if (a === 'c') {
  checkCase 'C';
} else {
  checkCase = 'D'
}
```

This code could be simplified even further with a `switch-case` ...

```javascript
const a = 'a';

let checkCase = '';
switch (true) {
  case (a === 'a'):
    checkCase = 'A';
    break;
  case (a === 'b'):
    checkCase = 'B';
    break;
  case (a === 'c'):
    checkCase = 'C';
    break;
  default:
    checkCase = 'D';
    break;
}
```

There is another possibility that will sometimes work using a ternary and a JSON object ...

```javascript
const a = 'a';

const conditions = {
  a: 'A',
  b: 'B',
  c: 'C',
  default: 'D'
};

let checkCase = (['a', 'b', 'c'].includes(a)) ? conditions[a] : conditions.default;
```

### DO NOT Make Ternaries More Complex
###### [Better Practice [JS013](#better-practice-js013)]

  * Ternaries are not necessary for every comparison.

  *Why?* If the comparison returns a `true` or `false` a ternary is not necessary.

Starting with this comparison ...

```javascript
if (a === 'a') {
  return true;
} else {
  return false;
}
```

We can see the following ternary being used ...

```javascript
return (a === 'a') ? true : false;
```

This is now the same as ...

```javascript
return (a === 'a');
```

**[Back to top](#table-of-contents)**
