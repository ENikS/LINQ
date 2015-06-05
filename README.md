## Typescript LINQ

This library is a complete implementation of LINQ methods available on Enumerable class. 

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

### Installation
```
npm install linq-ts
```

### Using
```javascript
import {asEnumerable, Range} from "linq-ts";


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
