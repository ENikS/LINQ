# Angular 2 QuickStart Example

This repository holds the TypeScript example of the [angular.io quickstart](https://angular.io/docs/ts/latest/quickstart.html)
extended to use LINQ queries.

## Prerequisites

Node.js and npm are essential to Angular 2 development. 
    
<a href="https://docs.npmjs.com/getting-started/installing-node" target="_blank" title="Installing Node.js and updating npm">
Get it now</a> if it's not already installed on your machine.
 
**Verify that you are running node `v6.x.x` and npm `3.x.x`**
by running `node -v` and `npm -v` in a terminal/console window.
Older versions produce errors. If you need to run it with older version of node substitute LINQ-ES2015 with LINQ-ES5 package.

## Steps to extend original QuickStart project with LINQ


### Install npm packages

> See npm and nvm version notes above

Install the npm packages described in the `package.json` and verify that it works:

**Attention Windows Developers:  You must run all of these commands in administrator mode**.

```bash
npm install
```

> If the `typings` folder doesn't show up after `npm install` please install them manually with:

> `npm run typings -- install`

### Add support for the LINQ

First we need to install package with npm manager
```bash
npm install linq-es2015 --save
```
This command installs the package and adds it to the dependencies list.

Second step is to tell system where to look when asked for the package. Locate ```systemjs.config.js``` file and open in with editor. Add entries to **map** and **packages** sections like so:
```javascript
  // map tells the System loader where to look for things
  var map = {
    'app':                        'app', // 'dist',

    '@angular':                   'node_modules/@angular',
    'angular2-in-memory-web-api': 'node_modules/angular2-in-memory-web-api',
    'linq-es2015':                'node_modules/linq-es2015',
    'rxjs':                       'node_modules/rxjs'
  };

  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app':                        { main: 'main.js',  defaultExtension: 'js' },
    'rxjs':                       { defaultExtension: 'js' },
    'linq-es2015':                { main: 'dist/linq.js', defaultExtension: 'js' },
    'angular2-in-memory-web-api': { main: 'index.js', defaultExtension: 'js' },
  };
  ```

Finally, add import within a component and use LINQ to perform queries:
```javascript
import { Component } from '@angular/core';
import { asEnumerable } from 'linq-es2015';

@Component({
    selector: 'my-app',
    template: '<h1>My First Angular 2 App with LINQ</h1><div>Count - {{Count}}</div>'
})
export class AppComponent { 
    Count: number;

    constructor(){
        this.Count = asEnumerable([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).Where(a => a % 2 == 1)
			                                                      .Count();        
    }
}
```

If you want to see all required changes all at once look at [this](https://github.com/ENikS/LINQ/commit/abbf0411665fdfd828748636196bff86b304b7ad) commit.

For more information about quickstart splease reference the [original source](https://angular.io/docs/ts/latest/quickstart.html).

## Running sample

1. Clone repository to your locak disk
2. Install dependencies by running ```npm install```
3. Run example by executin command ```npm run start```. **On Windows it has to be Run as Administrator**
