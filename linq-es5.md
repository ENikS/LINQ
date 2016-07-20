## Language-Integrated Query (LINQ) 
This library is a set of features that extends powerful query capabilities to [JavaScript](http://www.ecma-international.org/ecma-262/5.1/) language. It is a complete implementation of [LINQ (Language-Integrated Query)](https://en.wikipedia.org/wiki/Language_Integrated_Query) pattern and enable you to express traversal, filter, and projection operations over data in JavaScript or any related programming languages (TypeScript, CoffeeScript, etc). <br/>
The methods in this class provide an implementation of the standard query operators for querying any data source that implements Iterable<T>. Methods that are used in a query that return a sequence of values do not consume the target data until the query object is enumerated. This is known as [deferred execution](https://blogs.msdn.microsoft.com/charlie/2007/12/10/linq-and-deferred-execution/). Methods that are used in a query that returns a singleton value execute and consume the target data immediately.

### Implementation
This library is implemented in TypeScript and transpiled into native JavaScript. It is compatible with [Ecma-262 Edition 5.1](http://www.ecma-international.org/ecma-262/5.1/) and will run on any browser or Node engine. It will even run on Node 0.12. <br/>
This library uses Iterable interface T[System.iterator] natively implemented by most Javascript engines for collection types (Array, Map, Set, String). As result iterations are done much faster compared to IEnumerable implementation. The code is also backwards compatible with IEnumerable implementation. 

All relevant methods are implemented with deferred  execution so no unnecessary iterations are performed. 
### Installation
```
npm install linq-es5
```

### Using
```javascript
var Enumerable = require("linq-es5");

var count =  Enumerable.asEnumerable( [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] )
                       .Where(a => a % 2 == 1)
                       .Count()

```
For example you could play with please follow this [link](https://tonicdev.com/npm/linq-es5)

## Documentation
*  [Library Reference](https://github.com/ENikS/LINQ/wiki)
*  [LINQ (Language-Integrated Query)](https://msdn.microsoft.com/en-us/library/bb397926.aspx)
*  [Original Documentation (C#)](https://msdn.microsoft.com/en-us/library/system.linq.enumerable.aspx)
*  [Example Projects](https://github.com/ENikS/LINQ/tree/examples)

### Naming Convention
Method names follow original C# convention (Name starts with capital letter) for compatibility reasons. It is done so that code could be cut/pasted from C# to JavaScritp with just minor reformatting.

## Using in browser
[Browserified](http://browserify.org/) [standalone](https://github.com/substack/node-browserify#usage) [UMD](https://github.com/umdjs/umd) module is located in ./dist directory and could be accessed through [NPMCDN service](https://npmcdn.com). [See Example](https://jsfiddle.net/ENikS/pyvjcfa0/)
