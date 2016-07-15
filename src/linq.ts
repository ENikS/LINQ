///////////////////////////////////////////////////////////////////////////////
// Copyright (c) ENikS.  All rights reserved.
//
// Licensed under the Apache License, Version 2.0  ( the  "License" );  you may 
// not use this file except in compliance with the License.  You may  obtain  a 
// copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required  by  applicable  law  or  agreed  to  in  writing,  software 
// distributed under the License is distributed on an "AS  IS"  BASIS,  WITHOUT
// WARRANTIES OR CONDITIONS  OF  ANY  KIND, either express or implied.  See the 
// License for the specific  language  governing  permissions  and  limitations 
// under the License.


import "es6-shim";
import * as Iterator from "./iterators";
import * as Implementaion from "./enumerable";


/**
* Converts any Iterable<T> object into LINQ-able object
* @param TSource An Array, Map, Set, String or other Iterable object.
* @example
*     import {asEnumerable} from "linq-ts";
*
*     var enumerable = asEnumerable([0, 1, 2, 3, 4, 5, 6, 7]).Take(3);
*     var sum = enumerable.Sum();
*
*/
function getEnumerable<T>(TSource: Iterable<T> | IEnumerable<T> | string = null): Enumerable<T> {
    return new Implementaion.EnumerableImpl<T>(TSource);
}


/**
* Generates <count> of <T> elements starting with <start>. T is any 
* type which could be cast to number: number, enum, etc.
* @param start First value in sequence.
* @param count Number of elements to iteratel.
* @example
*     var sum = Range(0, 7).Sum();
*/
function getRange<T>(start: T, count: number): Enumerable<T> {
    return new Implementaion.EnumerableImpl<T>(null, () => new Iterator.GeneratorIterator(start, count, true));
}


/**
* Repeat element <start> of type T <count> of times.
* @param start First value in sequence.
* @param count Number of elements to iteratel.
* @example
*     var sum = Repeat("v", 7);
*/
function getRepeat<T>(start: T, count: number): Enumerable<T> {
    return new Implementaion.EnumerableImpl<T>(null, () => new Iterator.GeneratorIterator(start, count));
}


//-----------------------------------------------------------------------------
//  Exoprts
//-----------------------------------------------------------------------------


export {
    getEnumerable as default,
    getEnumerable as AsEnumerable,
    getEnumerable as asEnumerable,
    getEnumerable as From,
    getEnumerable as from,
    getRange as Range,
    getRange as range,
    getRepeat as Repeat
    getRepeat as repeat
};



