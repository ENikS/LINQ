# Angular 2 QuickStart Source

This repository holds the TypeScript example of the [angular.io quickstart](https://angular.io/docs/ts/latest/quickstart.html)
extended to use LINQ queries inside the components.

## Prerequisites

Node.js and npm are essential to Angular 2 development. 
    
<a href="https://docs.npmjs.com/getting-started/installing-node" target="_blank" title="Installing Node.js and updating npm">
Get it now</a> if it's not already installed on your machine.
 
**Verify that you are running node `v6.x.x` and npm `3.x.x`**
by running `node -v` and `npm -v` in a terminal/console window.
Older versions produce errors. If you need to run it with older version of node substitute LINQ-ES2015 with LINQ-ES5 package.

## Create a new project based on the QuickStart

Clone [this](https://github.com/angular/quickstart) repo into new project folder (e.g., `my-proj`).
```bash
git clone  https://github.com/angular/quickstart  my-proj
cd my-proj
```

We have no intention of updating the source on `angular/quickstart`.
Discard everything "git-like" by deleting the `.git` folder.
```bash
rm -rf .git  # non-Windows
rd .git /S/Q # windows
```

### Create a new git repo
You could [start writing code](#start-development) now and throw it all away when you're done.
If you'd rather preserve your work under source control, consider taking the following steps.

Initialize this project as a *local git repo* and make the first commit:
```bash
git init
git add .
git commit -m "Initial commit"
```

Create a *remote repository* for this project on the service of your choice.

Grab its address (e.g. *`https://github.com/<my-org>/my-proj.git`*) and push the *local repo* to the *remote*.
```bash
git remote add origin <repo-address>
git push -u origin master
```
## Install npm packages

> See npm and nvm version notes above

Install the npm packages described in the `package.json` and verify that it works:

**Attention Windows Developers:  You must run all of these commands in administrator mode**.

```bash
npm install
npm start
```

> If the `typings` folder doesn't show up after `npm install` please install them manually with:

> `npm run typings -- install`

The `npm start` command first compiles the application, 
then simultaneously re-compiles and runs the `lite-server`.
Both the compiler and the server watch for file changes.

Shut it down manually with Ctrl-C.

You're ready to write your application.

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
