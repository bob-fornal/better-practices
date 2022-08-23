# GitHub Pages Better Practices

## Table of Contents

1. [gh-pages Action](#gh-pages-action)
1. [Angular](#angular)
1. [React](#react)

## gh-pages Action

### Build and Deploy
###### [Better Practice [GHP001](#better-practice-ghp001)]

  - Check the `master` or `main` branch at the beginning.
  - Check the `publish_dir` at the end.

  *Why?* This file ensures a proper build and deploy to a `gh-pages` branch that can be used in the settings as the hosted page files.

```yml
name: Build and Deploy

on:
  push:
    branches:
      - master
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: write
    concurrency:
      group: ${{ github.workflow }}-${{ github.ref }}
    steps:
    - name: Checkout
      uses: actions/checkout@v3
    - uses: actions/setup-node@v2
      with:
        node-version: '18.x'
    - uses: actions/cache@v2
      with:
        path: ~/.npm
        key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
        restore-keys: |
          ${{ runner.os }}-node-

    - name: Build
      run: |
        npm install
        npm run-script deploy
        
    - name: Deploy
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist/edje-buzzer
```

## Angular

### Adjust for GitHub Pages
###### [Better Practice [GHP002](#better-practice-ghp002)]

  - Set `<base href="/">` in index.html file.
  - Set `"deploy": "ng build --base-href /edje-buzzer/"` in package.json scripts.
  - Set `RouterModule.forRoot(routes, { useHash: true })` in app-routing.module.ts

  *Why?* These allow the application to correctly set the path using hashing based on the GitHub pages pattern.
  *Why?* This pattern doesn't need a local build and deploy process.

**[Back to top](#table-of-contents)**

## React

### React for GitHub Pages
###### [Better Practice [GHP003](#better-practice-ghp003)]

  - Set `"homepage": "https://{username}.github.io/{project name}"` in package.json, replacing username and project name.
  - Use `HashRouter` as the application Router.
  - Set paths correctly in public/index.html for the project favicon and images.

  *Why?* These allow the application to correctly set the path using hashing based on the GitHub pages pattern.
  *Why?* This pattern doesn't need a local build and deploy process.

**[Back to top](#table-of-contents)**