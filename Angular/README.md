# Angular 2 Example

This repository holds the basic example of the [angular.io quickstart](https://cli.angular.io/) extended to use LINQ queries.

## Prerequisites

**Verify that you are running node `v6.x.x`** or later by running `node -v` in a terminal/console window. Older versions are not compatible with LINQ-ES2015 package and will produce errors. 
If you need to run it with older browsers or node substitute [LINQ-ES2015](https://www.npmjs.com/package/linq-es2015) with [LINQ-ES5](https://www.npmjs.com/package/linq-es5) package.

## Install latest Angular CLI

This method will work with CLI 1.0.3 or later. For previous versions please see this [link]().

## Generate new project
```bash
ng new PROJECT-NAME
cd PROJECT-NAME
```
Do not execute ```ng serve``` just yet.

### Add support for the LINQ

Install package with npm manager
```bash
npm install linq-es2015 --save
```
This command installs the package and adds it to the dependencies list. We are ready to do some development!

Open app.components.html file and add element to hold calculated value:
```html
<h1>
  {{title}}
</h1>
<div>Count - {{count}}</div>
```

In app.component.ts import linq-es2015 and do some calculations:
```javascript
import { Component } from '@angular/core';
import { asEnumerable } from 'linq-es2015';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app works!';
  count: number;

    constructor(){
      this.count = asEnumerable([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).Where(a => a % 2 == 1)
                                                                .Count();        
    }
}

```

## Running sample

```ng serve```
