(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "linq-es2015"], factory);
    }
})(function (require, exports) {
    "use strict";
    const Enumerable = require("linq-es2015");
    var fruits = ["apple", "mango", "orange", "passionfruit", "grape"];
    var enumerable = Enumerable.asEnumerable(fruits);
    // Determine whether any string in the array is longer than "banana".
    var longestName = enumerable.Aggregate("banana", (longest, next) => next.length > longest.length ? next : longest, 
    // Return the final result as an upper case string.
    fruit => fruit.toUpperCase());
    // This code produces the following output:
    // The fruit with the longest name is PASSIONFRUIT. 
    console.log(longestName);
});
//# sourceMappingURL=app.js.map