// Note: This example require Node 6 or later
const Enumerable = require("linq-es2015");

// Create test array
let fruits = ["apple", "mango", "orange", "passionfruit", "grape"];

// Get enumerable
let enumerable = Enumerable.asEnumerable(fruits);

// Determine whether any string in the array is longer than "banana".
let longestName = enumerable.Aggregate("banana", 
	                                   (longest, next) => next.length > longest.length ? next : longest, 
                                       // Return the final result as an upper case string.
                                       fruit => fruit.toUpperCase());

// This code produces the following output:
// The fruit with the longest name is PASSIONFRUIT. 
console.log(longestName);
