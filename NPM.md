
## Language-Integrated Query (LINQ) 
**linq-es5** is a complete implementation of [LINQ (Language-Integrated Query)](https://en.wikipedia.org/wiki/Language_Integrated_Query) pattern and enables you to express traversal, filter, and projection operations over data in JavaScript or any related programming languages (TypeScript, CoffeeScript, etc). <br/>
It provides an implementation of the standard query operators for querying any data source that implements Iterable<T>. Methods that are used in a query that return a sequence of values do not consume the target data until the query object is enumerated. This is known as [deferred execution](https://blogs.msdn.microsoft.com/charlie/2007/12/10/linq-and-deferred-execution/). Methods that are used in a query that returns a singleton value execute and consume the target data immediately.

### Implementation
This library is implemented in TypeScript and transpiled into native [Ecma-262 Edition 5.1](http://www.ecma-international.org/ecma-262/5.1/) JavaScript. It will run on any compatible browser or Node engine. It will even run on Node 0.12. For [ECMAScript 2015](http://www.ecma-international.org/ecma-262/6.0/) compatible library see [linq-es2015 module](https://www.npmjs.com/package/linq-es2015).<br/>
Iterations over data, where available, are done using Iterable interface ([ [System.iterator] ](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols)) natively implemented by most Javascript engines for collection types (Array, Map, Set, String). 

All relevant methods are implemented with [deferred execution](https://blogs.msdn.microsoft.com/charlie/2007/12/10/linq-and-deferred-execution/) so no unnecessary iterations are performed. 
## Installation
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

### Using in browser
[Browserified](//browserify.org/) [standalone](//github.com/substack/node-browserify#usage) [UMD](//github.com/umdjs/umd) module is located in ./dist directory and could be accessed through [NPMCDN service](//npmcdn.com). Both [linq.js](//npmcdn.com/linq-es5/dist/linq.js) and [linq.min.js](//npmcdn.com/linq-es5/dist/linq.min.js) are available. [[See Example](//jsfiddle.net/ENikS/pyvjcfa0/)]

### Naming Convention
When library is used in TypeScript method names follow original C# convention (Name starts with capital letter). It is done for compatibility reasons so that code could be cut/pasted from C# with just minor reformatting.
If used directly in JavaScript names follow [camelCase](https://en.wikipedia.org/wiki/CamelCase) notation.

## Documentation
*  [Library Reference](https://github.com/ENikS/LINQ/wiki)
*  [LINQ (Language-Integrated Query)](https://msdn.microsoft.com/en-us/library/bb397926.aspx)
*  [Original Documentation (C#)](https://msdn.microsoft.com/en-us/library/system.linq.enumerable.aspx)
*  [Example Projects](https://github.com/ENikS/LINQ/tree/examples)
*  [Browser Example](https://jsfiddle.net/ENikS/pyvjcfa0/)
*  [Node Example](https://tonicdev.com/npm/linq-es5)

