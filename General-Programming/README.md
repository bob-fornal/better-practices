# General Programming

## Table of Contents

  1. [Single Responsibility Principle](#single-responsibility-principle)
  1. [LIFT Principle](#lift-principle)

## Single Responsibility Principle

### Rule of 1
###### [Style [Y001](#better-practices-gp001)]

  - Define 1 component per file, recommended to be less than 400 lines of code.

  *Why?*: One component per file promotes easier unit testing and mocking.

  *Why?*: One component per file makes it far easier to read, maintain, and avoid collisions with teams in source control.

  *Why?*: One component per file avoids hidden bugs that often arise when combining components in a file where they may share variables, create unwanted closures, or unwanted coupling with dependencies.

### Small Functions
###### [Style [Y002](#better-practices-gp002)]

  - Define small functions, no more than 75 LOC (less is better).

  *Why?*: Small functions are easier to test, especially when they do one thing and serve one purpose.

  *Why?*: Small functions promote reuse.

  *Why?*: Small functions are easier to read.

  *Why?*: Small functions are easier to maintain.

  *Why?*: Small functions help avoid hidden bugs that come with large functions that share variables with external scope, create unwanted closures, or unwanted coupling with dependencies.

**[Back to top](#table-of-contents)**

## LIFT Principle

### LIFT
###### [Style [Y003](#better-practices-gp003)]

  - Structure your app such that you can `L`ocate your code quickly, `I`dentify the code at a glance, keep the `F`lattest structure you can, and `T`ry to stay DRY. The structure should follow these 4 basic guidelines.

    *Why LIFT?*: Provides a consistent structure that scales well, is modular, and makes it easier to increase developer efficiency by finding code quickly. Another way to check your app structure is to ask yourself: How quickly can you open and work in all of the related files for a feature?

    When I find my structure is not feeling comfortable, I go back and revisit these LIFT guidelines

    1. `L`ocating our code is easy
    2. `I`dentify code at a glance
    3. `F`lat structure as long as we can
    4. `T`ry to stay DRY (Don’t Repeat Yourself) or T-DRY

### Locate
###### [Style [Y004](#better-practices-gp004)]

  - Make locating your code intuitive, simple and fast.

    *Why?*: I find this to be super important for a project. If the team cannot find the files they need to work on quickly, they will not be able to work as efficiently as possible, and the structure needs to change. You may not know the file name or where its related files are, so putting them in the most intuitive locations and near each other saves a ton of time. A descriptive folder structure can help with this.

### Identify
###### [Style [Y005](#better-practices-gp005)]

  - When you look at a file you should instantly know what it contains and represents.

    *Why?*: You spend less time hunting and pecking for code, and become more efficient. If this means you want longer file names, then so be it. Be descriptive with file names and keeping the contents of the file to exactly 1 component. Avoid files with multiple controllers, multiple services, or a mixture. There are deviations of the 1 per file rule when I have a set of very small features that are all related to each other, they are still easily identifiable.

### Flat
###### [Style [Y006](#better-practices-gp006)]

  - Keep a flat folder structure as long as possible. When you get to 7+ files, begin considering separation.

    *Why?*: Nobody wants to search 7 levels of folders to find a file. Think about menus on web sites … anything deeper than 2 should take serious consideration. In a folder structure there is no hard and fast number rule, but when a folder has 7-10 files, that may be time to create subfolders. Base it on your comfort level. Use a flatter structure until there is an obvious value (to help the rest of LIFT) in creating a new folder.

### T-DRY (Try to Stick to DRY)
###### [Style [Y007](#better-practices-gp007)]

  - Be DRY, but don't go nuts and sacrifice readability.

    *Why?*: Being DRY is important, but not crucial if it sacrifices the others in LIFT, which is why I call it T-DRY. I don’t want to type session-view.html for a view because, well, it’s obviously a view. If it is not obvious or by convention, then I name it.

**[Back to top](#table-of-contents)**