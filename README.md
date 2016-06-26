## Language-Integrated Query (LINQ) [![Build Status](https://travis-ci.org/ENikS/LINQ.svg?branch=master)](https://travis-ci.org/ENikS/LINQ) [![Coverage Status](https://coveralls.io/repos/github/ENikS/LINQ/badge.svg?branch=master)](https://coveralls.io/github/ENikS/LINQ?branch=master)

This library is a complete implementation of LINQ methods available on Enumerable class. 

The methods in this class provide an implementation of the standard query operators for querying data sources that implement IEnumerable<T>. The standard query operators are general purpose methods that follow the LINQ pattern and enable you to express traversal, filter, and projection operations over data in JavaScript or any related programming languages (TypeScript, CoffeeScript, etc).
Methods that are used in a query that returns a sequence of values do not consume the target data until the query object is enumerated. This is known as deferred execution. Methods that are used in a query that returns a singleton value execute and consume the target data immediately.

### Implemented methods
[Aggregate](https://jsfiddle.net/ENikS/wx3sehr5/) 
```
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

### Installation
```
npm install linq-es5
```

### Using
```javascript
import {asEnumerable, Range} from "linq-es5";


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
For more information visit MSDN: https://msdn.microsoft.com/en-us/library/system.linq.enumerable.aspx 

### Implementation details
This library uses Iterable iterface T[System.iterator] natively implemented in Javascript by most of collection types (Array, Map, Set, String). As result iterations are done much faster compared to IEnumerable implementation. The code is also backwards compatible with IEnumerable implementation. 

All relevant methods are implemented with deffered execution so no unnecessary iterations are performed. 
