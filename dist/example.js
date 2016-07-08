// This example requires latest node version 6.2

var Enumerable = require("linq-es2015");
 
var count =  Enumerable.asEnumerable( [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] )
                       .Where(a => a % 2 == 1)
                       .Count()
