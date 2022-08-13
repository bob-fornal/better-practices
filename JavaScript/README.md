# JavaScript Better Practices

## Table of Contents

1. [Semicolons](#semicolons)
1. [For-Loops](#for-loops)
1. [Comparison](#comparison)
1. [Shorthand Notation](@shorthand-notation)

## Semicolons

### Use Semicolons
###### [Better Practice [JS001](#best-practice-js001)]

  - Use semicolons when an assignment occurs.

  *Why?* There are strict Automatic Semicolon Insertion (ASI) rules that behave as expected MOST of the time. Adding them in is not complicated and provide a security that unexpected side-effects will not occur.
  
There is a great article [HERE](https://flaviocopes.com/javascript-automatic-semicolon-insertion/) about ASI and the side effects.
  
**[Back to top](#table-of-contents)**

## For-Loops

### Pre-Calculate Length
###### [Better Practice [JS002](#best-practice-js002)]

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

## Comparison

### Use `===` instead of `==`
###### [Better Practice [JS004](#best-practice-js004)]

  - Using `===` and `!==` allows for strict equality when comparing values.

  *Why?* When working with `==` and `!=` there can be side-effects related to type coersion (unexpected results).

### Be Explicit when Comparing
###### [Better Practice [JS003](#best-practice-js003)]

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

## Shorthand Notation

### Use Specific Shorthand for If-Comparisons
###### [Better Practice [JS005](#best-practice-js005)]

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
