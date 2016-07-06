[![Build Status](https://travis-ci.org/ENikS/LINQ.svg?branch=master)](https://travis-ci.org/ENikS/LINQ) 
[![Coverage Status](https://coveralls.io/repos/github/ENikS/LINQ/badge.svg?branch=master)](https://coveralls.io/github/ENikS/LINQ?branch=master)
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
For more information about original implementation please visit MSDN: https://msdn.microsoft.com/en-us/library/system.linq.enumerable.aspx 

### Implementation
This library is a continuous effort to implement **LINQ** using latest features of TypeScript and JavaScript languages (For ES5 compatible library look at **linq-es5 branch**). The library is implemented in TypeScript and transpiled into JavaScript. It is distributed as a native node module. 
Browserified and minified standalone UMD modules are located in ./dist directory and could be used directly in compatible browsers.
This library uses latest **ECMAScript 2015** language specification and utilizes **Iterables** (**[System.iterator]**), JavaScript generators (**function*** ...), and **for of** loops. All relevant methods are implemented with deferred execution so no unnecessary iterations are performed. 
The code is backwards compatible with **linq-es5** and **C#** implementations.
 

### Naming Convention
Method names follow original C# convention (Name starts with capital letter) for compatibility reasons. It is done so that code could be cut/pasted from C# to JavaScritp with just minor reformatting.

### Implemented methods
| Name |	Description |
| --- | --- |
[Aggregate]           (https://github.com/ENikS/LINQ/blob/master/man/aggregate.md)			    | Applies an accumulator function over a sequence.
[All]				          (https://github.com/ENikS/LINQ/blob/master/man/all.md)					      | Determines whether all elements of a sequence satisfy a condition.
[Any]				          (https://github.com/ENikS/LINQ/blob/master/man/any.md)					      | Determines whether a sequence contains any elements.
[AsEnumerable]        (https://github.com/ENikS/LINQ/blob/master/man/asenumerable.md)			  | Returns the input typed as Iterable.
[Average]			        (https://github.com/ENikS/LINQ/blob/master/man/average.md)				    | Computes the average of a sequence of Decimal values.
[Cast]				        (https://github.com/ENikS/LINQ/blob/master/man/cast.md)					      | Casts the elements of an IEnumerable to the specified type.
[Concat]			        (https://github.com/ENikS/LINQ/blob/master/man/concat.md)				      | Concatenates two sequences.
[Contains]			      (https://github.com/ENikS/LINQ/blob/master/man/contains.md)				    | Determines whether a sequence contains a specified element by using the default equality comparer.
[Count]				        (https://github.com/ENikS/LINQ/blob/master/man/count.md)				      | Returns the number of elements in a sequence.
[DefaultIfEmpty]      (https://github.com/ENikS/LINQ/blob/master/man/defaultifempty.md)		  | Returns the elements of the specified sequence or the type parameter's default value in a singleton collection if the sequence is empty.
[Distinct]			      (https://github.com/ENikS/LINQ/blob/master/man/distinct.md)				    | Returns distinct elements from a sequence by using the default equality comparer to compare values.
[ElementAt]			      (https://github.com/ENikS/LINQ/blob/master/man/elementat.md)			    | Returns the element at a specified index in a sequence.
[ElementAtOrDefault]  (https://github.com/ENikS/LINQ/blob/master/man/elementatordefault.md)	| Returns the element at a specified index in a sequence or a default value if the index is out of range.
[Except]			        (https://github.com/ENikS/LINQ/blob/master/man/except.md)				      | Produces the set difference of two sequences by using the default equality comparer to compare values.
[First]				        (https://github.com/ENikS/LINQ/blob/master/man/first.md)				      | Returns the first element of a sequence.
[FirstOrDefault]	    (https://github.com/ENikS/LINQ/blob/master/man/firstordefault.md)		  | Returns the first element of a sequence, or a default value if the sequence contains no elements.
[GroupBy]			        (https://github.com/ENikS/LINQ/blob/master/man/groupby.md)				    | Groups the elements of a sequence according to a specified key selector function.
[GroupJoin]			      (https://github.com/ENikS/LINQ/blob/master/man/groupjoin.md)			    | Correlates the elements of two sequences based on equality of keys and groups the results. The default equality comparer is used to compare keys.
[Intersect]			      (https://github.com/ENikS/LINQ/blob/master/man/intersect.md)			    | Produces the set intersection of two sequences by using the default equality comparer to compare values.
[Join]				        (https://github.com/ENikS/LINQ/blob/master/man/join.md)					      | Correlates the elements of two sequences based on matching keys. The default equality comparer is used to compare keys.
[Last]				        (https://github.com/ENikS/LINQ/blob/master/man/last.md)					      | Returns the last element of a sequence.
[LastOrDefault]		    (https://github.com/ENikS/LINQ/blob/master/man/lastordefault.md)		  | Returns the last element of a sequence, or a default value if the sequence contains no elements.
[Max]				          (https://github.com/ENikS/LINQ/blob/master/man/max.md)					      | Returns the maximum value in a sequence of Decimal values.
[Min]				          (https://github.com/ENikS/LINQ/blob/master/man/min.md)					      | Returns the minimum value in a sequence of Decimal values.
[OfType]			        (https://github.com/ENikS/LINQ/blob/master/man/oftype.md)				      | Filters the elements of an IEnumerable based on a specified type.
[OrderBy]			        (https://github.com/ENikS/LINQ/blob/master/man/orderby.md)				    | Sorts the elements of a sequence in ascending order according to a key.
[Range]				        (https://github.com/ENikS/LINQ/blob/master/man/range.md)				      | Generates a sequence of integral numbers within a specified range.
[Repeat]			        (https://github.com/ENikS/LINQ/blob/master/man/repeat.md)				      | Generates a sequence that contains one repeated value.
[Reverse]			        (https://github.com/ENikS/LINQ/blob/master/man/reverse.md)				    | Inverts the order of the elements in a sequence.
[Select]			        (https://github.com/ENikS/LINQ/blob/master/man/select.md)				      | Projects each element of a sequence into a new form.
[SelectMany]		      (https://github.com/ENikS/LINQ/blob/master/man/selectmany.md)			    | Projects each element of a sequence to an Iterable, flattens the resulting sequences into one sequence, and invokes a result selector function on each element therein. The index of each source element is used in the intermediate projected form of that element.
[SequenceEqual]		    (https://github.com/ENikS/LINQ/blob/master/man/sequenceequal.md)		  | Determines whether two sequences are equal by comparing the elements by using the default equality comparer for their type.
[Single]			        (https://github.com/ENikS/LINQ/blob/master/man/single.md)				      | Returns the only element of a sequence that satisfies a specified condition, and throws an exception if more than one such element exists.
[SingleOrDefault]	    (https://github.com/ENikS/LINQ/blob/master/man/singleordefault.md)	  | Returns the only element of a sequence, or a default value if the sequence is empty; this method throws an exception if there is more than one element in the sequence.
[Skip]				        (https://github.com/ENikS/LINQ/blob/master/man/skip.md)					      | Bypasses a specified number of elements in a sequence and then returns the remaining elements.
[SkipWhile]			      (https://github.com/ENikS/LINQ/blob/master/man/skipwhile.md)			    | Bypasses elements in a sequence as long as a specified condition is true and then returns the remaining elements.
[Sum]				          (https://github.com/ENikS/LINQ/blob/master/man/sum.md)					      | Computes the sum of the sequence of Single values that are obtained by invoking a transform function on each element of the input sequence.
[Take]				        (https://github.com/ENikS/LINQ/blob/master/man/take.md)					      | Returns a specified number of contiguous elements from the start of a sequence.
[TakeWhile]			      (https://github.com/ENikS/LINQ/blob/master/man/takewhile.md)			    | Returns elements from a sequence as long as a specified condition is true.
[ThenBy]			        (https://github.com/ENikS/LINQ/blob/master/man/thenby.md)				      | Performs a subsequent ordering of the elements in a sequence in ascending order by using a specified comparer.
[ThenByDescending]    (https://github.com/ENikS/LINQ/blob/master/man/thenbydescending.md)   | Performs a subsequent ordering of the elements in a sequence in descending order, according to a key.
[ToArray]			        (https://github.com/ENikS/LINQ/blob/master/man/toarray.md)				    | Creates an array from a Iterable.
[ToMap]               (https://github.com/ENikS/LINQ/blob/master/man/todictionary.md)       | Creates a Map<TKey, TValue> from an Iterable according to a specified key selector function, a comparer, and an element selector function.
[Union]				        (https://github.com/ENikS/LINQ/blob/master/man/union.md)				      | Produces the set union of two sequences by using a specified IEqualityComparer<T>.
[Where]				        (https://github.com/ENikS/LINQ/blob/master/man/where.md)				      | Filters a sequence of values based on a predicate. Each element's index is used in the logic of the predicate function.
[Zip]				          (https://github.com/ENikS/LINQ/blob/master/man/zip.md)					      | Applies a specified function to the corresponding elements of two sequences, producing a sequence of the results.

