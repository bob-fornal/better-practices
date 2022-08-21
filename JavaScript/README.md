# JavaScript Better Practices

## Table of Contents

1. [Block Declarations](#block-declarations)
1. [Classes](#classes)
1. [Comparison](#comparison)
1. [For-Loops](#for-loops)
1. [Functions](#functions)
1. [Objects](#objects)
1. [Semicolons](#semicolons)
1. [Shorthand Notation](#shorthand-notation)

## Block Declarations

### Use `let` and `const`
###### [Better Practice [JS006](#better-practice-js006)]

  - Use `let` and `const` rather than `var`

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

  - `new` is required.
  - A single, canonical way to emulate classes in JavaScript.

  *Why?* Convenient, self-contained syntax.
  *Why?* Classes are clearer and are more readable.
  *Why?* Classes have a built in constructor.
  *Why?* More familiar when more familiar with class-based languages.

**[Back to top](#table-of-contents)**

## Comparison

### Use `===` instead of `==`
###### [Better Practice [JS004](#better-practice-js004)]

  - Using `===` and `!==` allows for strict equality when comparing values.

  *Why?* When working with `==` and `!=` there can be side-effects related to type coersion (unexpected results).

### Be Explicit when Comparing
###### [Better Practice [JS003](#better-practice-js003)]

  - Using `!` or `!!` can have unusual side-effects.
  - Makes the logic more explicit and easier to reason about.

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

  - Calculate the length outside the iteration of the loop.

  *Why?* Increased efficiency with large datasets.
  *Why?* Increated readability.
 
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

### Arrow Function Expression rather than Declaration
###### [Better Practice [JS008](#better-practice-js008)]

  - Use function expressions rather than function declaration.

  *Why?* Take advantage of the scope improvements that function expressions provide.
  *Why?* Avoid the hoisting behavior of function declaration.

* In the following code, the function `first` works even though the actual function follows this line in the code.
* The function `second` logically throws a `ReferenceError`.
* The function `third` also logicall throws a `ReferenceError` and takes advantage of scope improvements.

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

## Objects

### Use Dot Notation for Fixed Properties
###### [Better Practice [JS011](#better-practice-js011)]

  - Use dot notation when working with fixed properties.

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
###### [Better Practice [JS011](#better-practice-js011)]

  - Use square-bracket notation when working with dynamic properties.
  - This pattern can be used with data that is fetched from an API.

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

  - Use a pattern like `category?.title?.description`

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

  - Use semicolons when an assignment occurs.

  *Why?* There are strict Automatic Semicolon Insertion (ASI) rules that behave as expected MOST of the time. Adding them in is not complicated and provide a security that unexpected side-effects will not occur.
  
There is a great article [HERE](https://flaviocopes.com/javascript-automatic-semicolon-insertion/) about ASI and the side effects.
  
**[Back to top](#table-of-contents)**

## Shorthand Notation

### Use Specific Shorthand for If-Comparisons
###### [Better Practice [JS005](#better-practice-js005)]

  - Only omit the brackets for one-line if-comparisons.

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

  - Nested ternaries are hard to read.
  - Nested ternaries are difficult to maintain.

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

**[Back to top](#table-of-contents)**
