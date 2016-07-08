// NOTE: This example requires node version 6 or later
var Enumerable = require("linq-es2015");
 
var count =  Enumerable.asEnumerable( [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] )
                       .Where(a => a % 2 == 1)
                       .Count()
