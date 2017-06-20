[![Build Status](https://travis-ci.org/ENikS/LINQ.svg?branch=master)](https://travis-ci.org/ENikS/LINQ) 
[![Coverage Status](https://coveralls.io/repos/github/ENikS/LINQ/badge.svg?branch=master)](https://coveralls.io/github/ENikS/LINQ?branch=master)
[![Dependency Status](https://dependencyci.com/github/ENikS/LINQ/badge)](https://dependencyci.com/github/ENikS/LINQ)
[![Greenkeeper badge](https://badges.greenkeeper.io/ENikS/LINQ.svg)](https://greenkeeper.io/)
[![npm version](https://badge.fury.io/js/linq-es2015.svg)](https://badge.fury.io/js/linq-es2015)
[![Downloads](https://img.shields.io/npm/dm/linq-es2015.svg)](https://www.npmjs.com/package/linq-es2015)
[![License](https://img.shields.io/badge/license-apache%202.0-60C060.svg)](https://github.com/ENikS/LINQ/blob/master/LICENSE)

The library is a continuous effort to implement LINQ using latest features of TypeScript and JavaScript languages (For [ES5](http://www.ecma-international.org/ecma-262/5.1/) compatible library look at [linq-es5](https://github.com/ENikS/LINQ/tree/linq-es5) branch). The library is implemented in TypeScript and transpiled into JavaScript. It is distributed as a native module. It utilizes latest [ECMAScript 2015](http://www.ecma-international.org/ecma-262/6.0/) language specification:  [Iterables](http://www.ecma-international.org/ecma-262/6.0/#sec-iterable-interface) ([ [System.iterator] ](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols)), generators ([function*](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*)), [for of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of) loops. <br/> All relevant methods are implemented with [deferred execution](https://blogs.msdn.microsoft.com/charlie/2007/12/10/linq-and-deferred-execution/) so no unnecessary iterations are performed. 
The code is backwards compatible with [linq-es5](https://github.com/ENikS/LINQ/tree/linq-es5) and [C#](https://msdn.microsoft.com/en-us/library/system.linq.enumerable.aspx) implementations.

## Using in Node

Install module with this command:
```
npm install linq-es2015 --save
```
Once installed it could be loaded and used like this:
```javascript
import * as Enumerable from "linq-es2015"; 

var count =  Enumerable.asEnumerable( [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] )
                       .Where(a => a % 2 == 1)
                       .Count()

var iterable = Enumerable.asEnumerable(people)
                         .GroupJoin(pets,
                                    person => person, 
                                    pet => pet.Owner,
                                    (person, petCollection) => {
                                        return {
                                            Owner: person.Name,
                                            Pets: asEnumerable(petCollection)
                                                 .Select(pet=> pet.Name)
                                                 .ToArray()
                                        };
                                    });

```
[[See Example](https://tonicdev.com/eniks/using-linq)]  


## Using in browser
[Browserified](//browserify.org/) "[standalone](//github.com/substack/node-browserify#usage)" [UMD](//github.com/umdjs/umd) module is located in ```/dist``` directory and could be accessed through [NPM CDN service](//unpkg.com). Both [linq.js](//unpkg.com/linq-es2015/dist/linq.js) and [linq.min.js](//unpkg.com/linq-es2015/dist/linq.min.js) are available. 
Module is loaded with ```<script>``` element:
```javascript
<script type="text/javascript" src="//unpkg.com/linq-es2015/dist/linq.min.js"></script>
```
Loading this script creates ```Enumerable``` global variable. You can use it to perform LINQ queries:
```javascript
var count =  Enumerable.asEnumerable( [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] )
                       .Where(a => a % 2 == 1)
                       .Count()
```
[[See Example](//jsfiddle.net/ENikS/pyvjcfa0/)]

## Using in Angular 2
The same package could be used on a server as well as on the client. You have to install module as usual:
```
npm install linq-es2015 --save
```
Open ```app.components.html``` file and add element to hold calculated value:
```javascript
<h1>{{title}}</h1>
<div>Count - {{count}}</div>
```
and finally import ```linq-es2015``` in app.component.ts and do some calculations:
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
[[See Example](https://github.com/ENikS/LINQ/tree/examples/Angular)]

## Documentation
*  [Library Reference](https://github.com/ENikS/LINQ/wiki)
*  [LINQ (Language-Integrated Query)](https://msdn.microsoft.com/en-us/library/bb397926.aspx)
*  [Original Documentation (C#)](https://msdn.microsoft.com/en-us/library/system.linq.enumerable.aspx)

## [Example Projects](https://github.com/ENikS/LINQ/tree/examples)
*  [Browser Example](https://jsfiddle.net/ENikS/pyvjcfa0/)
*  [Node Example](https://tonicdev.com/eniks/using-linq)
*  [Angular 2 Example](https://github.com/ENikS/LINQ/tree/examples/Angular)
*  [Node Console Example](https://github.com/ENikS/LINQ/tree/examples/Node)
*  [TypeScript/JavaScript Web Example](https://github.com/ENikS/LINQ/tree/examples/TypeScript)


