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


//-----------------------------------------------------------------------------
//  LINQ
//-----------------------------------------------------------------------------
interface Enumerable<T> extends Iterable<T>, IEnumerable<T> {

    /**
    * Applies an accumulator function over a sequence.The specified seed value 
    * is used as the initial accumulator value, and the specified function is 
    * used to select the result value. 
    * @param 
    * @example
    *     var e = asEnumerable([0, 1, 2, 3, 4, 5, 6, 7])
    */
    Aggregate<A, B>(seed: A, func?: (A, T) => A, resultSelector?: (A) => B): B;

    /** 
    * Determines whether all elements of a sequence satisfy a condition.
    * @returns True is all elements satisfy criteria. 
    * @param 
    * @example
    *     var e = asEnumerable([0, 1, 2, 3, 4, 5, 6, 7])
    */
    All(predicate?: (T) => Boolean): boolean;
    
    /** 
    * Determines whether a sequence contains any elements or if predicate is 
    * present determines whether any element of a sequence satisfies a 
    * condition.
    * @param 
    * @example
    *     var e = asEnumerable([0, 1, 2, 3, 4, 5, 6, 7])
    */
    Any(predicate?: (T) => Boolean): boolean;
    
    /** 
    * Computes the average of a sequence of Number values that are obtained by 
    * invoking a transform function on each element of the input sequence. 
    * @param 
    * @example
    *     var e = asEnumerable([0, 1, 2, 3, 4, 5, 6, 7])
    */
    Average(func?: (T) => number): number;  	

    /** Concatenates two sequences. 
    * @param 
    * @example
    *     var e = asEnumerable([0, 1, 2, 3, 4, 5, 6, 7])
    */
    Concat<V>(second: Iterable<T>): Enumerable<V>;
    
    /**
    * Determines whether a sequence contains a specified element by using a 
    * specified Comparer. 
    * @param 
    * @example
    *     var e = asEnumerable([0, 1, 2, 3, 4, 5, 6, 7])
    */
    Contains(source: T, equal?: (a: T, b: T) => boolean): boolean;

    /**
    * Returns the number of elements in a sequence.
    * Returns a number that represents how many elements in the 
    * specified sequence satisfy a condition.
    * @param 
    * @example
    *     var e = asEnumerable([0, 1, 2, 3, 4, 5, 6, 7])
    */
    Count(predicate?: (T) => Boolean): number;
    
    /** 
    * Returns the elements of the specified sequence or the specified value in 
    * a singleton collection if the sequence is empty. 
    * @param 
    * @example
    *     var e = asEnumerable([0, 1, 2, 3, 4, 5, 6, 7])
    */
    DefaultIfEmpty(defaultValue?: T): Enumerable<T>;	
    
    /**
    * Returns distinct elements from a sequence by using the default equality
    * comparer to compare values.
    * @param 
    * @example
    *     var e = asEnumerable([0, 1, 2, 3, 4, 5, 6, 7])
    */
    Distinct(): Enumerable<T>;	
    
    /** 
    * Returns the element at a specified index in a sequence. 
    * @param 
    * @example
    *     var e = asEnumerable([0, 1, 2, 3, 4, 5, 6, 7])
    */
    ElementAt(index: number): T;

    /** 
    * Returns the element at a specified index in a sequence or a default 
    * value if the index is out of range. 
    * @param 
    * @example
    *     var e = asEnumerable([0, 1, 2, 3, 4, 5, 6, 7])
    */
    ElementAtOrDefault(index: number): T;
    
    /** 
    * Produces the set difference of two sequences by using the default 
    * equality comparer to compare values. 
    * @param 
    * @example
    *     var e = asEnumerable([0, 1, 2, 3, 4, 5, 6, 7])
    */
    Except(other: Iterable<T>): Enumerable<T>;
    
    /**
    * Returns the first element in a sequence that satisfies a specified
    * condition. 
    * @param 
    * @example
    *     var e = asEnumerable([0, 1, 2, 3, 4, 5, 6, 7])
    */
    First(predicate?: (T) => boolean): T;

    /**
    * Returns the first element of the sequence that satisfies a condition or a
    * default value if no such element is found. 
    * @param 
    * @example
    *     var e = asEnumerable([0, 1, 2, 3, 4, 5, 6, 7])
    */
    FirstOrDefault(predicate?: (T) => boolean): T;
    
    /** 
    * Groups the elements of a sequence according to a specified key selector 
    * function and creates a result value from each group and its key. Elements
    * of each group are projected by using a specified function. 
    * @param 
    * @example
    *     var e = asEnumerable([0, 1, 2, 3, 4, 5, 6, 7])
    */
    GroupBy<K, E, R>(selKey: (T) => K, selElement?: (T) => E, selResult?: (a: K, b: Iterable<E>) => R): Enumerable<R>;
    
    /** 
    * Correlates the elements of two sequences based on equality of keys and 
    * groups the results. The default equality comparer is used to compare keys. 
    * @param 
    * @example
    *     var e = asEnumerable([0, 1, 2, 3, 4, 5, 6, 7])
    */
    GroupJoin<I, K, R>(inner: Iterable<I>, outerKeySelector: (T) => K, innerKeySelector: (I) => K, resultSelector: (a: T, b: Iterable<I>) => R): Enumerable<R>;
    
    /** 
    * Produces the intersection of two sequences. 
    * @param 
    * @example
    *     var e = asEnumerable([0, 1, 2, 3, 4, 5, 6, 7])
    */
    Intersect(other: Iterable<T>): Enumerable<T>;
    
    /** 
    * Correlates the elements of two sequences based on matching keys. A 
    * specified IEqualityComparer<T> is used to compare keys. 
    * @param 
    * @example
    *     var e = asEnumerable([0, 1, 2, 3, 4, 5, 6, 7])
    */
    Join<I, TKey, R>(inner: Iterable<I>, oSelector: (T) => TKey, iSelector: (I) => TKey, transform: (T, I) => R): Enumerable<R>;
    
    /**	
    * Returns the last element of a sequence that satisfies a specified 
    * condition. 
    * @param 
    * @example
    *     var e = asEnumerable([0, 1, 2, 3, 4, 5, 6, 7])
    */
    Last(predicate?: (T) => boolean): T;
    
    /** 
    * Returns the last element of a sequence that satisfies a condition or a 
    * default value if no such element is found. 
    * @param 
    * @example
    *     var e = asEnumerable([0, 1, 2, 3, 4, 5, 6, 7])
    */
    LastOrDefault(predicate?: (T) => boolean): T;
    
    /** 
    * Invokes a transform function on each element of a sequence and returns 
    * the maximum value. 
    * @param 
    * @example
    *     var e = asEnumerable([0, 1, 2, 3, 4, 5, 6, 7])
    */
    Max(transform?: (T) => number): number;
    
    /** 
    * Invokes a transform function on each element of a sequence and returns 
    * the minimum Decimal value. 
    * @param 
    * @example
    *     var e = asEnumerable([0, 1, 2, 3, 4, 5, 6, 7])
    */
    Min(transform?: (T) => number): number;
    
    /** 
    * Sorts the elements of a sequence in ascending order by using a specified 
    * comparer. 
    * @param 
    * @example
    *     var e = asEnumerable([0, 1, 2, 3, 4, 5, 6, 7])
    */
    OrderBy<K>(keySelect?: (T) => K, equal?: (a: K, b: K) => number): Enumerable<T>;

    /** 
    * Sorts the elements of a sequence in descending order by using a specified 
    * comparer. 
    * @param 
    * @example
    *     var e = asEnumerable([0, 1, 2, 3, 4, 5, 6, 7])
    */
    OrderByDescending<K>(keySelect?: (T) => K, equal?: (a: K, b: K) => number): Enumerable<T>;

    /** 
    * Performs a subsequent ordering of the elements in a sequence in ascending
    * order by using a specified comparer. 
    * @param 
    * @example
    *     var e = asEnumerable([0, 1, 2, 3, 4, 5, 6, 7])
    */
    ThenBy<K>(keySelect?: (T) => K, equal?: (a: K, b: K) => number): Enumerable<T>;

    /** 
    * Performs a subsequent ordering of the elements in a sequence in descending
    * order by using a specified comparer. 
    * @param 
    * @example
    *     var e = asEnumerable([0, 1, 2, 3, 4, 5, 6, 7])
    */
    ThenByDescending<K>(keySelect?: (T) => K, equal?: (a: K, b: K) => number): Enumerable<T>;	
    
    /** 
    * Returns count of numbers beginning from start  
    * @param 
    * @example
    *     var e = asEnumerable([0, 1, 2, 3, 4, 5, 6, 7])
    */
    Range(start: T, count: number): Enumerable<T>;
    
    /** 
    * Generates a sequence that contains one repeated value. 
    * @param 
    * @example
    *     var e = asEnumerable([0, 1, 2, 3, 4, 5, 6, 7])
    */
    Repeat(element: T, count: number): Enumerable<T>;
    
    /** 
    * Inverts the order of the elements in a sequence. 
    * @param 
    * @example
    *     var e = asEnumerable([0, 1, 2, 3, 4, 5, 6, 7])
    */
    Reverse(): Enumerable<T>;	
    
    /**	
    *Projects each element of a sequence into a new form by incorporating
    * the element's index. 
    * @param 
    * @example
    *     var e = asEnumerable([0, 1, 2, 3, 4, 5, 6, 7])
    */
    Select<V>(transform: (T, number) => V): Enumerable<V>;

    /** 
    * Projects each element of a sequence to an Iterable<T>, flattens the 
    * resulting sequences into one sequence, and invokes a result selector 
    * function on each element therein. The index of each source element is 
    * used in the intermediate projected form of that element. 
    * @param 
    * @example
    *     var e = asEnumerable([0, 1, 2, 3, 4, 5, 6, 7])
    */
    SelectMany<S, V>(selector: (T, number) => Iterable<S>, result?: (T, S) => any): Enumerable<V>;
    
    /**
    * Determines whether two sequences are equal by comparing their elements
    * by using a specified IEqualityComparer<T>. 
    * @param 
    * @example
    *     var e = asEnumerable([0, 1, 2, 3, 4, 5, 6, 7])
    */
    SequenceEqual(other: Iterable<T>, equal?: (a: T, b: T) => boolean): boolean; 
    
    /**
    * Returns the only element of a sequence that satisfies a specified 
    * condition, and throws an exception if more than one such element exists. 
    * @param 
    * @example
    *     var e = asEnumerable([0, 1, 2, 3, 4, 5, 6, 7])
    */
    Single(predicate?: (T) => boolean): T;
    
    /** 
    * Returns the only element of a sequence that satisfies a specified 
    * condition or a default value if no such element exists; this method 
    * throws an exception if more than one element satisfies the condition. 
    * @param 
    * @example
    *     var e = asEnumerable([0, 1, 2, 3, 4, 5, 6, 7])
    */
    SingleOrDefault<TSource>(predicate?: (T) => boolean): T;	
    
    /** 
    * Bypasses a specified number of elements in a sequence and then returns 
    * the remaining elements. 
    * @param 
    * @example
    *     var e = asEnumerable([0, 1, 2, 3, 4, 5, 6, 7])
    */
    Skip(skip: number): Enumerable<T>;
    
    /** 
    * Bypasses elements in a sequence as long as a specified condition is true 
    * and then returns the remaining elements. The element's index is used in 
    * the logic of the predicate function. 
    * @param 
    * @example
    *     var e = asEnumerable([0, 1, 2, 3, 4, 5, 6, 7])
    */
    SkipWhile(predicate: (T, number) => boolean): Enumerable<T>;
    
    /** 
    * Computes the sum of the sequence of Decimal values that are obtained by 
    * invoking a transform function on each element of the input sequence. 
    * @param 
    * @example
    *     var e = asEnumerable([0, 1, 2, 3, 4, 5, 6, 7])
    */
    Sum(transform?: (T) => number): number;	
    
    /** 
    * Returns a specified number of contiguous elements from the start of a 
    * sequence. 
    * @param 
    * @example
    *     var e = asEnumerable([0, 1, 2, 3, 4, 5, 6, 7])
    */
    Take(take: number): Enumerable<T>;
    
    /**
    * Returns elements from a sequence as long as a specified condition is true.
    * The element's index is used in the logic of the predicate function. 
    * @param 
    * @example
    *     var e = asEnumerable([0, 1, 2, 3, 4, 5, 6, 7])
    */
    TakeWhile(predicate: (T, number) => boolean): Enumerable<T>;
    
    /** 
    * Converts Iterable to Array<T> 
    * @param 
    * @example
    *     var e = asEnumerable([0, 1, 2, 3, 4, 5, 6, 7])
    */
    ToArray(): Array<T>;

    /** 
    * Creates a Map< TKey, TValue > from an IEnumerable< T > according
    * to a specified key selector function, a comparer, and an element selector
    * function. 
    * @param 
    * @example
    *     var e = asEnumerable([0, 1, 2, 3, 4, 5, 6, 7])
    */
    ToMap<TKey, TElement>(keySelector: (T) => TKey, elementSelector?: (T) => TElement): Map<TKey, TElement>;	

    /** 
    * Creates a Map< TKey, TValue > from an IEnumerable< T > according
    * to a specified key selector function, a comparer, and an element selector
    * function. 
    * @param 
    * @example
    *     var e = asEnumerable([0, 1, 2, 3, 4, 5, 6, 7])
    */
    //ToDictionary<TKey, TElement>(keySelector: (T) => TKey, elementSelector?: (T) => TElement): Map<TKey, TElement>;	

    /** 
    * Produces the set union of two sequences. Union returns only unique values. 
    * @param 
    * @example
    *     var e = asEnumerable([0, 1, 2, 3, 4, 5, 6, 7])
    */
    Union(second: Iterable<T>): Enumerable<T>;	

    /**
    * Filters a sequence of values based on a predicate. 
    * @param 
    * @example
    *     var e = asEnumerable([0, 1, 2, 3, 4, 5, 6, 7])
    */
    Where(predicate: (T, number) => Boolean): Enumerable<T>;
        
    /** 
    * Applies a specified function to the corresponding elements of two 
    * sequences, producing a sequence of the results. 
    * @param 
    * @example
    *     var e = asEnumerable([0, 1, 2, 3, 4, 5, 6, 7])
    */
    Zip<V, Z>(second: Iterable<V>, func: (T, V) => Z): Enumerable<Z>;
}

interface IEnumerable<T> {
    GetEnumerator(): IEnumerator<T>;
}

interface IEnumerator<T> {
    Current: T;
    MoveNext(): Boolean;
    Reset(): void;
}


interface Iterator<T> {
    next(value?: any): IteratorResult<T>;
    return?(value?: any): IteratorResult<T>;
    throw?(e?: any): IteratorResult<T>;
}

interface Iterable<T> {
    [Symbol.iterator](): Iterator<T>;
}

interface IterableIterator<T> extends Iterator<T> {
    [Symbol.iterator](): IterableIterator<T>;
}



declare module LINQ {
    /**
    * Converts any Iterable<T> object into LINQ-able object
    *
    * @param TSource An Array, Map, Set, String or other Iterable object.
    * @example
    *     import {asEnumerable} from "linq-ts";
    *
    *     var enumerable = asEnumerable([0, 1, 2, 3, 4, 5, 6, 7]).Take(3);
    *     var sum = enumerable.Sum(); */
    export function asEnumerable<T>(TSource?: Iterable<T> | IEnumerable<T>): Enumerable<T>;


    /**
    * Generates <count> of <T> elements starting with <start>. T is any 
    * type which could be cast to number: number, enum, etc.
    *
    * @param start First value in sequence.
    * @param count Number of elements to iteratel.
    * @example
    *     var sum = Range(0, 7).Sum(); */
    export function Range<T>(start: T, count: number): Enumerable<T>;


    /**
    * Repeat element <start> of type T <count> of times.
    *
    * @param start First value in sequence.
    * @param count Number of elements to iteratel.
    * @example
    *     var sum = Repeat("v", 7); */
    export function Repeat<T>(start: T, count: number): Enumerable<T>;
}


declare module "linq-ts" {
    export = LINQ;
}



