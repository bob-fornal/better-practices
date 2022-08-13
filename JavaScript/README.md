# JavaScript Better Practices

## Table of Contents

1. [Semicolons](#semicolons)
1. [For-Loops](#for-loops)

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
