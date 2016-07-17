import * as Enumerable from "linq-es2015";

var fruits = ["apple", "mango", "orange", "passionfruit", "grape"];

var enumerable = Enumerable.asEnumerable(fruits);

// Determine whether any string in the array is longer than "banana".
var longestName = enumerable.Aggregate("banana", (longest, next) => next.length > longest.length ? next : longest,
                                      // Return the final result as an upper case string.
                                      fruit => fruit.toUpperCase());

// This code produces the following output:
// The fruit with the longest name is PASSIONFRUIT. 

console.log(longestName);