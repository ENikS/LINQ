[![Build Status](https://travis-ci.org/ENikS/LINQ.svg?branch=master)](https://travis-ci.org/ENikS/LINQ) 
[![Coverage Status](https://coveralls.io/repos/github/ENikS/LINQ/badge.svg?branch=coverage)](https://coveralls.io/github/ENikS/LINQ?branch=coverage)
[![npm version](https://badge.fury.io/js/linq-es2015.svg)](https://badge.fury.io/js/linq-es2015)
[![Downloads](https://img.shields.io/npm/dm/linq-es2015.svg)](https://www.npmjs.com/package/linq-es2015)
## Language-Integrated Query (LINQ) 

LINQ is a set of features that extends powerful query capabilities to any JavaScript based language. This library is a complete implementation of LINQ Enumerable class. 

The methods in this class provide an implementation of the standard query operators for querying data sources that implement Iterable<T>. The standard query operators are general purpose methods that follow the LINQ pattern and enable you to express traversal, filter, and projection operations over data in JavaScript or any related programming languages (TypeScript, CoffeeScript, etc).
Methods that are used in a query that returns a sequence of values do not consume the target data until the query object is enumerated. This is known as deferred execution. Methods that are used in a query that returns a singleton value execute and consume the target data immediately.

### Installation
```
npm install linq-es2015
```

### Using 
```javascript
import {asEnumerable, Range} from "linq-es2015";


var count =  asEnumerable( [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] ).Where(a => a % 2 == 1)
                                                            .Count()

var iterable = asEnumerable(people)
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
For live example you could play with please follow these links to ([Node](https://tonicdev.com/eniks/using-linq)) or ([Browser](https://jsfiddle.net/ENikS/pyvjcfa0)) 

Original information about C# implementation available at https://msdn.microsoft.com/en-us/library/system.linq.enumerable.aspx 

### Implementation
This library is a continuous effort to implement LINQ using latest features of TypeScript and JavaScript languages (For ES5 compatible library look at *linq-es5* branch). The library is implemented in TypeScript and transpiled into JavaScript. It is distributed as a native node module. 
Browserified and minified standalone UMD modules are located in ./dist directory and could be used directly in compatible browsers.
This library uses latest *ECMAScript 2015* language specification and utilizes *Iterables* (**[System.iterator]**), JavaScript generators (**function*** ...), and **for of** loops. All relevant methods are implemented with deferred execution so no unnecessary iterations are performed. 
The code is backwards compatible with **linq-es5** and C# implementations.
 

### Naming Convention
Method names follow original C# convention (Name starts with capital letter) for compatibility reasons. It is done so that code could be cut/pasted from C# to JavaScritp with just minor reformatting.

### Implemented methods
For list of implemented methods and for help on individual methods please follow this link:
https://github.com/ENikS/LINQ/tree/master/man/README.md
