[![Build Status](https://travis-ci.org/ENikS/LINQ.svg?branch=linq-es5)](https://travis-ci.org/ENikS/LINQ) 
[![npm version](https://badge.fury.io/js/linq-es5.svg)](https://badge.fury.io/js/linq-es5)
[![Downloads](https://img.shields.io/npm/dm/linq-es5.svg)](https://www.npmjs.com/package/linq-es5)

## LINQ-ES5

This branch is a home to [Ecma-262 Edition 5.1](http://www.ecma-international.org/ecma-262/5.1/) compatible implementation of LINQ. 
The methods in this module provide an implementation of the standard query operators for querying data sources that implement Iterable<T>. The standard query operators are general purpose methods that follow the LINQ pattern and enable you to express traversal, filter, and projection operations over data in JavaScript or any related programming languages (TypeScript, CoffeeScript, etc).
Methods that are used in a query that returns a sequence of values do not consume the target data until the query object is enumerated. This is known as deferred execution. Methods that are used in a query that returns a singleton value execute and consume the target data immediately.
All relevant methods are implemented with [deferred execution](https://blogs.msdn.microsoft.com/charlie/2007/12/10/linq-and-deferred-execution/) so no unnecessary iterations are performed. 

## Compatibility
**LINQ-ES5** is compatible with [Ecma-262 Edition 5.1](http://www.ecma-international.org/ecma-262/5.1/) specification and will run on any browser or Node engine down to Node 0.12. 

## Documentation
*  [Library Reference](https://github.com/ENikS/LINQ/wiki)
*  [LINQ (Language-Integrated Query)](https://msdn.microsoft.com/en-us/library/bb397926.aspx)
*  [Original Documentation (C#)](https://msdn.microsoft.com/en-us/library/system.linq.enumerable.aspx)
*  [Example Projects](https://github.com/ENikS/LINQ/tree/examples)
*  [Browser Example](https://jsfiddle.net/ENikS/pyvjcfa0/)
*  [Node Example](https://tonicdev.com/npm/linq-es5)

