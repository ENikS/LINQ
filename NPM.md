[![Coverage Status](https://coveralls.io/repos/github/ENikS/LINQ/badge.svg?branch=master)](https://coveralls.io/github/ENikS/LINQ?branch=master)
[![Dependency Status](https://dependencyci.com/github/ENikS/LINQ/badge)](https://dependencyci.com/github/ENikS/LINQ)
[![License](https://img.shields.io/badge/license-apache%202.0-60C060.svg)](https://github.com/ENikS/LINQ/blob/master/LICENSE)
## Language-Integrated Query (LINQ) 

**linq-es2015** is a complete implementation of [LINQ (Language-Integrated Query)](https://en.wikipedia.org/wiki/Language_Integrated_Query) pattern and enables you to express traversal, filter, and projection operations over data in JavaScript or any related programming languages (TypeScript, CoffeeScript, etc). <br/>
It provides an implementation of the standard query operators for querying any data source that implements Iterable<T>. Methods that are used in a query that return a sequence of values do not consume the target data until the query object is enumerated. This is known as [deferred execution](https://blogs.msdn.microsoft.com/charlie/2007/12/10/linq-and-deferred-execution/). Methods that are used in a query that returns a singleton value execute and consume the target data immediately.

The library is a continuous effort to implement LINQ using latest features of TypeScript and JavaScript languages (For [ES5](http://www.ecma-international.org/ecma-262/5.1/) compatible library look at [linq-es5](https://github.com/ENikS/LINQ/tree/linq-es5) branch and corresponding [NPM package](https://www.npmjs.com/package/linq-es5)). The library is implemented in TypeScript and transpiled into JavaScript. It is distributed as a native node module. 
Browserified and minified standalone UMD modules are located in ./dist directory and could be used directly in compatible browsers.
This library uses latest [ECMAScript 2015](http://www.ecma-international.org/ecma-262/6.0/) language specification and utilizes [Iterables](http://www.ecma-international.org/ecma-262/6.0/#sec-iterable-interface): ([ [System.iterator] ](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols)), JavaScript generators ([function*](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*)), and [for of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of) loops. All relevant methods are implemented with [deferred execution](https://blogs.msdn.microsoft.com/charlie/2007/12/10/linq-and-deferred-execution/) so no unnecessary iterations are performed. 
The code is backwards compatible with [linq-es5](https://github.com/ENikS/LINQ/tree/linq-es5) and [C#](https://msdn.microsoft.com/en-us/library/system.linq.enumerable.aspx) implementations.

## Installation
```
npm install linq-es2015
```

## Using 
```javascript
var Enumerable = require("linq-es2015");
 
var count =  Enumerable.asEnumerable( [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] )
                       .Where(a => a % 2 == 1)
                       .Count()
```
For live examples please follow links to ([Node](https://tonicdev.com/eniks/using-linq)) or ([Browser](https://jsfiddle.net/ENikS/pyvjcfa0)).  

## Using in browser
[Browserified](//browserify.org/) [standalone](//github.com/substack/node-browserify#usage) [UMD](//github.com/umdjs/umd) module is located in ./dist directory and could be accessed through [NPM CDN service](//unpkg.com). Both [linq.js](//unpkg.com/linq-es2015/dist/linq.js) and [linq.min.js](//unpkg.com/linq-es2015/dist/linq.min.js) are available. <br/>[[See Example](//jsfiddle.net/ENikS/pyvjcfa0/)]


## Using in Angular
The same package could be used on a server as well as on a client. All you have to do is to install module as usual:
```
npm install linq-es2015 --save
```
In file ```systemjs.config.js``` add following two entries:
```javascript
// map tells the System loader where to look for things
  var map = {
    '@angular':      'node_modules/@angular',
    'linq-es2015':   'node_modules/linq-es2015', // map to module
    . . .
  };
```
and 
```javascript
// packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app':           { main: 'main.js',  defaultExtension: 'js' },
    'linq-es2015':   { main: 'dist/linq.js', defaultExtension: 'js' }, // map to browserified module
    . . .
  };
```
On the server package is available as any normal module, on the cliend use it like this:
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
[[See Example](https://github.com/ENikS/LINQ/tree/examples/Angular)]

## Naming Convention
When library is used in TypeScript method names follow original C# convention (Name starts with capital letter). It is done for compatibility reasons so that code could be cut/pasted from C# with just minor reformatting.
If used directly in JavaScript names follow [camelCase](https://en.wikipedia.org/wiki/CamelCase) notation.

## Documentation
*  [Library Reference](https://github.com/ENikS/LINQ/wiki)
*  [LINQ (Language-Integrated Query)](https://msdn.microsoft.com/en-us/library/bb397926.aspx)
*  [Original Documentation (C#)](https://msdn.microsoft.com/en-us/library/system.linq.enumerable.aspx)

## Example Projects
*  [Browser Example](https://jsfiddle.net/ENikS/pyvjcfa0/)
*  [Node Example](https://tonicdev.com/eniks/using-linq)
*  [Angular 2 Example](https://github.com/ENikS/LINQ/tree/examples/Angular)
*  [Node Console Example](https://github.com/ENikS/LINQ/tree/examples/Node)
*  [TypeScript/JavaScript Web Example](https://github.com/ENikS/LINQ/tree/examples/TypeScript)


