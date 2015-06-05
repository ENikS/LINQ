# Typescript LINQ

This library is a complete implementation of LINQ methods available on Enumerable class. 

### Implemented methods
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

### Installation

npm install linq-ts


### Using

import {LINQ, Range} from "linq";

var count =  LINQ( [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] ).Where(a => a % 2 == 1).Count()
var iterable = LINQ(people)
            .GroupJoin(pets,
                       person => person, 
                       pet => pet.Owner,
                       (person, petCollection) => {
                           return {
                               Owner: person.Name,
                               Pets: LINQ(petCollection)
                                    .Select(pet=> pet.Name)
                                    .ToArray()
                           };
                       });
                       
                       


### Implementation details
This library uses native Javascript iterface Iterable<T> as a base for all its iterators. It is also backwards compatible with IEnumerable<T> interface. All relevant methods are implemented with deffered execution so no unnecessary iterations are performed. 
