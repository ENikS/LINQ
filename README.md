[![Build Status](https://travis-ci.org/ENikS/LINQ.svg?branch=master)](https://travis-ci.org/ENikS/LINQ) 
[![Coverage Status](https://coveralls.io/repos/github/ENikS/LINQ/badge.svg?branch=master)](https://coveralls.io/github/ENikS/LINQ?branch=master)
[![npm version](https://badge.fury.io/js/linq-es5.svg)](https://badge.fury.io/js/linq-es5)
[![Downloads](https://img.shields.io/npm/dm/linq-es5.svg)](https://www.npmjs.com/package/linq-es5)
## Language-Integrated Query (LINQ) 

LINQ is a set of features that extends powerful query capabilities to any JavaScript based language. This library is a complete implementation of LINQ Enumerable class. 

The methods in this class provide an implementation of the standard query operators for querying data sources that implement Iterable<T>. The standard query operators are general purpose methods that follow the LINQ pattern and enable you to express traversal, filter, and projection operations over data in JavaScript or any related programming languages (TypeScript, CoffeeScript, etc).
Methods that are used in a query that returns a sequence of values do not consume the target data until the query object is enumerated. This is known as deferred execution. Methods that are used in a query that returns a singleton value execute and consume the target data immediately.

### Installation
```
npm install linq-es5
```

### Using
```javascript
import {asEnumerable, Range} from "linq-es2015";


var count =  asEnumerable( [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] ).Where(a => a % 2 == 1).Count()

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
For more information about original implementation please visit MSDN: https://msdn.microsoft.com/en-us/library/system.linq.enumerable.aspx 

### Implementation details
This library is implemented in TypeScript language. It is transpiled into JavaScript and distributed as native node module. The source is Browserified and distributed as standalone UMD module. Browser compatible file located in ./dist directory and could be used directly via Enumerable global variable.

This library uses Iterable interface T[System.iterator] natively implemented by most Javascript engines for collection types (Array, Map, Set, String). As result iterations are done much faster compared to IEnumerable implementation. The code is also backwards compatible with IEnumerable implementation. 

All relevant methods are implemented with deferred  execution so no unnecessary iterations are performed. 

### Naming Convention
Method names follow original C# convention (Name starts with capital letter) for compatibility reasons. It is done so that code could be cut/pasted from C# to JavaScritp with just minor reformatting.

### Implemented methods
```
Aggregate 
All
Any 
Average
Concat 
Contains
Count 
DefaultIfEmpty
Distinct 
ElementAt
ElementAtOrDefault 
Except
First 
FirstOrDefault
GroupBy
GroupJoin
Intersect
Join
Last
LastOrDefault
Max
Min
OrderBy
OrderByDescending
ThenBy
ThenByDescending
Range
Repeat
Reverse
Select
SelectMany
SequenceEqual
Single
SingleOrDefault
Skip
SkipWhile
Sum
Take
TakeWhile
ToArray
ToMap
Union
Where
Zip
```
