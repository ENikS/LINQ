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

import {RangeGenerator} from "./Range"
import "es6-shim";


//-----------------------------------------------------------------------------
//  LINQ
//-----------------------------------------------------------------------------

export interface Linqable<T> extends Iterable<T>, IEnumerable<T> {

    /*
    * Applies an accumulator function over a sequence.The specified seed value 
    * is used as the initial accumulator value, and the specified function is 
    * used to select the result value. */
    Aggregate<A, B>(seed: A, func?: (A, T) => A, resultSelector?: (A) => B): B;

    /** 
    * Determines whether all elements of a sequence satisfy a condition.
    * @returns True is all elements satisfy criteris. */
    All(predicate?: (T) => Boolean): boolean;
    
    /** 
    * Determines whether a sequence contains any elements or if predicate is 
    * present determines whether any element of a sequence satisfies a 
    * condition.
    * @param Predicate. */
    Any(predicate?: (T) => Boolean): boolean;
    
    /** 
    * Computes the average of a sequence of Number values that are obtained by 
    * invoking a transform function on each element of the input sequence. */
    Average(func?: (T) => number): number;  	

    /** Casts the elements of an IEnumerable to the specified type. */
    // At the moment Javascript does not have runtime type info
    //Cast<V>(): Linqable<V>;

    /** Concatenates two sequences. */
    Concat<V>(second: Iterable<T>): Linqable<V>;
    
    /**
    * Determines whether a sequence contains a specified element by using a 
    * specified Comparer. */
    Contains(source: T, equil?: (a: T, b: T) => boolean): boolean;

    /**
    * Returns the number of elements in a sequence.
    * @param Predicate. 
    * @returns Returns a number that represents how many elements in the 
    * specified sequence satisfy a condition.*/
    Count(predicate?: (T) => Boolean): number;
    
    /** 
    * Returns the elements of the specified sequence or the specified value in 
    * a singleton collection if the sequence is empty. */
    DefaultIfEmpty(defaultValue?: T): Linqable<T>;	
    
    /**
    * Returns distinct elements from a sequence by using the default equality
    * comparer to compare values.*/
    Distinct(): Linqable<T>;	
    
    /** Returns the element at a specified index in a sequence. */
    ElementAt(index: number): T;

    /** 
    * Returns the element at a specified index in a sequence or a default 
    * value if the index is out of range. */
    ElementAtOrDefault(index: number): T;
    
    //Empty - Returns an empty IEnumerable<T> that has the specified type argument.
    // Use asIterable([])
    
//Except<TSource>(IEnumerable<TSource>, IEnumerable<TSource>)	Produces the set difference of two sequences by using the default equality comparer to compare values.
//Except<TSource>(IEnumerable<TSource>, IEnumerable<TSource>, IEqualityComparer<TSource>)	Produces the set difference of two sequences by using the specified IEqualityComparer<T> to compare values.
    
    /**
    * Returns the first element in a sequence that satisfies a specified
    * condition. */
    First(predicate?: (T) => boolean): T;

    /**
    * Returns the first element of the sequence that satisfies a condition or a
    * default value if no such element is found. */
    FirstOrDefault(predicate?: (T) => boolean): T;
    
//GroupBy<TSource, TKey>(IEnumerable<TSource>, Func<TSource, TKey>)	Groups the elements of a sequence according to a specified key selector function.
//GroupBy<TSource, TKey>(IEnumerable<TSource>, Func<TSource, TKey>, IEqualityComparer<TKey>)	Groups the elements of a sequence according to a specified key selector function and compares the keys by using a specified comparer.
//GroupBy<TSource, TKey, TElement>(IEnumerable<TSource>, Func<TSource, TKey>, Func<TSource, TElement>)	Groups the elements of a sequence according to a specified key selector function and projects the elements for each group by using a specified function.
//GroupBy<TSource, TKey, TResult>(IEnumerable<TSource>, Func<TSource, TKey>, Func<TKey, IEnumerable<TSource>, TResult>)	Groups the elements of a sequence according to a specified key selector function and creates a result value from each group and its key.
//GroupBy<TSource, TKey, TElement>(IEnumerable<TSource>, Func<TSource, TKey>, Func<TSource, TElement>, IEqualityComparer<TKey>)	Groups the elements of a sequence according to a key selector function. The keys are compared by using a comparer and each group's elements are projected by using a specified function.
//GroupBy<TSource, TKey, TResult>(IEnumerable<TSource>, Func<TSource, TKey>, Func<TKey, IEnumerable<TSource>, TResult>, IEqualityComparer<TKey>)	Groups the elements of a sequence according to a specified key selector function and creates a result value from each group and its key. The keys are compared by using a specified comparer.
//GroupBy<TSource, TKey, TElement, TResult>(IEnumerable<TSource>, Func<TSource, TKey>, Func<TSource, TElement>, Func<TKey, IEnumerable<TElement>, TResult>)	Groups the elements of a sequence according to a specified key selector function and creates a result value from each group and its key. The elements of each group are projected by using a specified function.
//GroupBy<TSource, TKey, TElement, TResult>(IEnumerable<TSource>, Func<TSource, TKey>, Func<TSource, TElement>, Func<TKey, IEnumerable<TElement>, TResult>, IEqualityComparer<TKey>)	Groups the elements of a sequence according to a specified key selector function and creates a result value from each group and its key. Key values are compared by using a specified comparer, and the elements of each group are projected by using a specified function.
    
//GroupJoin<TOuter, TInner, TKey, TResult>(IEnumerable<TOuter>, IEnumerable<TInner>, Func<TOuter, TKey>, Func<TInner, TKey>, Func<TOuter, IEnumerable<TInner>, TResult>)	Correlates the elements of two sequences based on equality of keys and groups the results. The default equality comparer is used to compare keys.
//GroupJoin<TOuter, TInner, TKey, TResult>(IEnumerable<TOuter>, IEnumerable<TInner>, Func<TOuter, TKey>, Func<TInner, TKey>, Func<TOuter, IEnumerable<TInner>, TResult>, IEqualityComparer<TKey>)	Correlates the elements of two sequences based on key equality and groups the results. A specified IEqualityComparer<T> is used to compare keys.
    
    /** 
    * Produces the intersection of two sequences. */
    Intersect(other: Iterable<T>): Linqable<T>;
    
    /** 
    * Correlates the elements of two sequences based on matching keys. A 
    * specified IEqualityComparer<T> is used to compare keys. */
    Join<I, TKey, R>(inner: Iterable<I>, oSelector: (T) => TKey, iSelector: (I) => TKey, transform: (T, I) => R): Linqable<R>;
    
    /**	
    * Returns the last element of a sequence that satisfies a specified 
    * condition. */
    Last(predicate?: (T) => boolean): T;
    
    /** 
    * Returns the last element of a sequence that satisfies a condition or a 
    * default value if no such element is found. */
    LastOrDefault(predicate?: (T) => boolean): T;
    
    /** 
    * Invokes a transform function on each element of a sequence and returns 
    * the maximum value. */
    Max(transform?: (T) => number): number;
    
    /** 
    * Invokes a transform function on each element of a sequence and returns 
    * the minimum Decimal value. */
    Min(transform?: (T) => number): number;
    
//OfType<TResult>	Filters the elements of an IEnumerable based on a specified type.
    
//OrderBy<TSource, TKey>(IEnumerable<TSource>, Func<TSource, TKey>)	Sorts the elements of a sequence in ascending order according to a key.
//OrderBy<TSource, TKey>(IEnumerable<TSource>, Func<TSource, TKey>, IComparer<TKey>)	Sorts the elements of a sequence in ascending order by using a specified comparer.
//OrderByDescending<TSource, TKey>(IEnumerable<TSource>, Func<TSource, TKey>)	Sorts the elements of a sequence in descending order according to a key.
//OrderByDescending<TSource, TKey>(IEnumerable<TSource>, Func<TSource, TKey>, IComparer<TKey>)	Sorts the elements of a sequence in descending order by using a specified comparer.

//ThenBy<TSource, TKey>(IOrderedEnumerable<TSource>, Func<TSource, TKey>)	Performs a subsequent ordering of the elements in a sequence in ascending order according to a key.
//ThenBy<TSource, TKey>(IOrderedEnumerable<TSource>, Func<TSource, TKey>, IComparer<TKey>)	Performs a subsequent ordering of the elements in a sequence in ascending order by using a specified comparer.
//ThenByDescending<TSource, TKey>(IOrderedEnumerable<TSource>, Func<TSource, TKey>)	Performs a subsequent ordering of the elements in a sequence in descending order, according to a key.
//ThenByDescending<TSource, TKey>(IOrderedEnumerable<TSource>, Func<TSource, TKey>, IComparer<TKey>)	Performs a subsequent ordering of the elements in a sequence in descending order by using a specified comparer.
    

//Range(start: Number, count: Number): ILinq<T>;
    
//Repeat<TResult>	Generates a sequence that contains one repeated value.
    
//Reverse<TSource>	Inverts the order of the elements in a sequence.
    
    /**	
    *Projects each element of a sequence into a new form by incorporating
    * the element's index. */
    Select<V>(transform: (T, number) => V): Linqable<V>;

    /** 
    * Projects each element of a sequence to an Iterable<T>, flattens the 
    * resulting sequences into one sequence, and invokes a result selector 
    * function on each element therein. The index of each source element is 
    * used in the intermediate projected form of that element. */
    SelectMany<S, V>(selector: (T, number) => Iterable<S>, result?: (T, S) => any): Linqable<V>;
    
    /**
    * Determines whether two sequences are equal by comparing their elements
    * by using a specified IEqualityComparer<T>. */
    SequenceEqual(other: Iterable<T>, equil?: (a: T, b: T) => boolean): boolean; 
    
    /**
    * Returns the only element of a sequence that satisfies a specified 
    * condition, and throws an exception if more than one such element exists. */
    Single(predicate?: (T) => boolean): T;
    
    /** 
    * Returns the only element of a sequence that satisfies a specified 
    * condition or a default value if no such element exists; this method 
    * throws an exception if more than one element satisfies the condition. */
    SingleOrDefault<TSource>(predicate?: (T) => boolean): T;	
    
    /** 
    * Bypasses a specified number of elements in a sequence and then returns 
    * the remaining elements. */
    Skip(skip: number): Linqable<T>;
    
    /** 
    * Bypasses elements in a sequence as long as a specified condition is true 
    * and then returns the remaining elements. The element's index is used in 
    * the logic of the predicate function. */
    SkipWhile(predicate: (T, number) => boolean): Linqable<T>;
    
    /** 
    * Computes the sum of the sequence of Decimal values that are obtained by 
    * invoking a transform function on each element of the input sequence. */
    Sum(transform?: (T) => number): number;	
    
    /** 
    * Returns a specified number of contiguous elements from the start of a 
    / sequence. */
    Take(take: number): Linqable<T>;
    
    /**
    * Returns elements from a sequence as long as a specified condition is true.
    * The element's index is used in the logic of the predicate function. */
    TakeWhile(predicate: (T, number) => boolean): Linqable<T>;
    
    /** Converts Iterable to Array<T> */
    ToArray(): Array<T>;

    /** 
    * Creates a Map< TKey, TValue > from an IEnumerable< T > according
    * to a specified key selector function, a comparer, and an element selector
    * function. */
    ToMap<TKey, TElement>(keySelector: (T) => TKey, elementSelector?: (T) => TElement): Map<TKey, TElement>;	

    /** 
    * Creates a Map< TKey, TValue > from an IEnumerable< T > according
    * to a specified key selector function, a comparer, and an element selector
    * function. */
    ToDictionary<TKey, TElement>(keySelector: (T) => TKey, elementSelector?: (T) => TElement): Map<TKey, TElement>;	

    //ToLookup<TSource, TKey, TElement>(IEnumerable<TSource>, Func<TSource, TKey>, Func<TSource, TElement>, IEqualityComparer<TKey>)	Creates a Lookup<TKey, TElement> from an IEnumerable<T> according to a specified key selector function, a comparer and an element selector function.
    // Does not have an analog in JavaScript

    /** 
    * Produces the set union of two sequences. Union returns only unique values. */
    Union(second: Iterable<T>): Linqable<T>;	

    /**
    * Filters a sequence of values based on a predicate.
    * @param predicate Each element's index is used in the logic of the 
    * predicate function.  */
    Where(predicate: (T, number) => Boolean): Linqable<T>;
    //
        
    /** 
    * Applies a specified function to the corresponding elements of two 
    * sequences, producing a sequence of the results. */
    Zip<V, Z>(second: Iterable<V>, func: (T, V) => Z): Linqable<Z>;
}


//-----------------------------------------------------------------------------
//  Functions to convert any iterable into LINQ enumerable
//-----------------------------------------------------------------------------

/**
* Creates a new Linq iterable.
* @param TSource An Iterable object such as Array, Map or string. */
export function asIterable<T>(TSource: Iterable<T>|IEnumerable<T>|Array<T>|Map<any, any>|Set<T>): Linqable<T> {
    return new Linq<T>(<Iterable<T>>TSource);
}


/**
* Creates a new Linq enumerable.
* @param TSource An Iterable object such as Array, Map or string. */
export function asEnumerable<T>(TSource: Iterable<T>|IEnumerable<T>): Linqable<T> {
    return new Linq<T>(TSource);
}


/** Returns range of numbers from strart to start + count */
export function Range<T>(start: T, count: number): Linqable<T> {
    return new Linq<T>(new RangeGenerator(start, count));
}


//-----------------------------------------------------------------------------
//  LINQ Implementation
//-----------------------------------------------------------------------------

class Linq<T> implements Linqable<T>, Iterable<T>, IEnumerable<T> {

    _target: Iterable<T>|IEnumerable<T>;
    _factory: Function;

    ///////////////////////////////////////////////////////////////////////////

    constructor(target: Iterable<any>|IEnumerable<any>, factory?) {
        this._target = target;
        this._factory = factory;
    }

    ///////////////////////////////////////////////////////////////////////////

    /** Returns JavaScript iterator */
    public [Symbol.iterator](): Iterator<T> {
        return (null == this._factory) ? this._target[Symbol.iterator]() : this._factory();
    }

    ///////////////////////////////////////////////////////////////////////////

    /** Returns C# style enumerator */
    public GetEnumerator(): IEnumerator<T> {
        return new Enumerator<T>(this[Symbol.iterator]());
    }

    
    //-------------------------------------------------------------------------
    //  Immediate execution methods                                                                                            
    //-------------------------------------------------------------------------

    /*
    * Applies an accumulator function over a sequence.The specified seed value 
    * is used as the initial accumulator value, and the specified function is 
    * used to select the result value. */
    Aggregate<A, B>(seed: A, func: (A, T) => A, resultSelector: (A) => B = selfFn): B {
        var result: A = seed;
        var res, iterator: Iterator<T> = this[Symbol.iterator]();
        while (!(res = iterator.next()).done) {
            result = func(result, res.value);
        }
        return resultSelector(result);
    }


    /** 
    * Determines whether all elements of a sequence satisfy a condition.
    * @returns True is all elements satisfy criteris. */
    public All(predicate: (T) => boolean = trueFn) {
        var result, iterator: Iterator<T> = this[Symbol.iterator]();
        while (!(result = iterator.next()).done) {
            if (!predicate(result.value)) {
                return false;
            }
        }
        return true;
    }


    /** 
    * Determines whether a sequence contains any elements or if predicate is 
    * present determines whether any element of a sequence satisfies a 
    * condition.
    * @param Predicate. */
    public Any(predicate?: (T) => boolean) {
        var result, iterator: Iterator<T> = this[Symbol.iterator]();
        // Check if at least one exist
        if (null == predicate) {
            return !iterator.next().done;
        }
        // Check if any satisfy the criteria
        while (!(result = iterator.next()).done) {
            if (predicate(result.value)) {
                return true;
            }
        }
        return false;
    }

    /** 
    * Computes the average of a sequence of Number values that are obtained by 
    * invoking a transform function on each element of the input sequence. */
    Average(func: (T) => number = selfFn): number {
        var result, sum = 0, count = 0;
        var iterator = this[Symbol.iterator]();
        while (!(result = iterator.next()).done) {
            sum += result.value;
            count++;
        }
        return sum / count;
    }


    /**
    * Determines whether a sequence contains a specified element by using a 
    * specified Comparer. */
    Contains(source: T, equil: (a: T, b: T) => boolean = (a, b) => a === b): boolean {
        var result, iterator: Iterator<T> = this[Symbol.iterator]();
        while (!(result = iterator.next()).done) {
            if (equil(source, result.value)) {
                return true;
            }
        }
        return false;
    }


    /**
    * Returns the number of elements in a sequence.
    * @param Predicate. 
    * @returns Returns a number that represents how many elements in the 
    * specified sequence satisfy a condition.*/
    public Count(predicate: (T) => boolean = trueFn): number {
        var result, count = 0;
        var iterator = this[Symbol.iterator]();
        while (!(result = iterator.next()).done) {
            if (predicate(result.value)) {
                count++;
            }
        }
        return count;
    }


    /** 
    * Invokes a transform function on each element of a sequence and returns 
    * the maximum value. */
    Max(transform: (T) => number = selfFn): number {
        var result, value, max, hasValue = false;
        var iterator = this[Symbol.iterator]();
        while (!(result = iterator.next()).done) {
            value = transform(result.value);
            if (hasValue) {
                if (max < value) max = value;
            }
            else {
                max = value;
                hasValue = true;
            }
        }
        if (!hasValue) throw noElements;
        return max;
    }
    
    
    /** 
    * Invokes a transform function on each element of a sequence and returns 
    * the minimum Decimal value. */
    Min(transform: (T) => number = selfFn): number {
        var result, value, min, hasValue = false;
        var iterator = this[Symbol.iterator]();
        while (!(result = iterator.next()).done) {
            value = transform(result.value);
            if (hasValue) {
                if (min > value) min = value;
            }
            else {
                min = value;
                hasValue = true;
            }
        }
        if (!hasValue) throw noElements;
        return min;
    }


    /** Returns the element at a specified index in a sequence. */
    ElementAt(index: number): T {
        var result, count = 0;
        var iterator = this[Symbol.iterator]();
        while (!(result = iterator.next()).done) {
            if (index === count++) {
                return result.value;
            }
        }
        throw "Argument Out Of Range";
    }
    
    
    /** 
    * Returns the element at a specified index in a sequence or a default 
    * value if the index is out of range. */
    ElementAtOrDefault(index: number): T {
        var result, value, count = 0;
        var iterator = this[Symbol.iterator]();
        while (!(result = iterator.next()).done) {
            if (index === count++) {
                return result.value;
            }
            value = result.value;
        }
        return getDefaultVal(typeof value); // Last good value
    }


    /**
    * Returns the first element in a sequence that satisfies a specified
    * condition. */
    First(predicate: (T) => boolean = trueFn): T {
        var result;
        var iterator = this[Symbol.iterator]();
        while (!(result = iterator.next()).done) {
            if (predicate(result.value)) {
                return result.value;
            }
        }
        throw nothingFound;
    }


    /**
    * Returns the first element of the sequence that satisfies a condition or a
    * default value if no such element is found. */
    FirstOrDefault(predicate: (T) => boolean = trueFn): T {
        var result, value;
        var iterator = this[Symbol.iterator]();
        while (!(result = iterator.next()).done) {
            value = result.value;
            if (predicate(value)) {
                return result.value;
            }
        }
        return getDefaultVal(typeof value); // Last good value
    }


    /** 
    * Produces the intersection of two sequences. */
    Intersect(other: Iterable<T>): Linqable<T> {
        return new Linq<T>(this, () => new IntersectIteratror(this._target[Symbol.iterator](), other));
    }


    /**	
    * Returns the last element of a sequence that satisfies a specified 
    * condition. */
    Last(predicate: (T) => boolean = trueFn): T {
        var result, value, found = false;
        var iterator = this[Symbol.iterator]();
        while (!(result = iterator.next()).done) {
            if (predicate(result.value)) {
                value = result.value;
                found = true;
            }
        }
        if (!found) {
            throw nothingFound;
        }
        return value;
    }

    /** 
    * Returns the last element of a sequence that satisfies a condition or a 
    * default value if no such element is found. */
    LastOrDefault(predicate: (T) => boolean = trueFn): T {
        var result, value, lastKnown, found = false;
        var iterator = this[Symbol.iterator]();
        while (!(result = iterator.next()).done) {
            if (predicate(result.value)) {
                value = result.value;
                found = true;
            }
            lastKnown = result.value;
        }
        return (found) ? value : getDefaultVal(typeof lastKnown);
    }
    

    /**
    * Determines whether two sequences are equal by comparing their elements
    * by using a specified IEqualityComparer<T>. */
    SequenceEqual(other: Iterable<T>, equil: (a: T, b: T) => boolean = (a, b) => a === b): boolean {
        var res1, res2;
        var it1 = this[Symbol.iterator]();
        var it2 = other[Symbol.iterator]();
        do {
            res1 = it1.next(); res2 = it2.next();
            if ((res1.done != res2.done) || !equil(res1.value, res2.value)) {
                return false;
            }
        } while (!(res1.done) && !(res2.done));
        return true;
    }


    /**
    * Returns the only element of a sequence that satisfies a specified 
    * condition, and throws an exception if more than one such element exists. */
    Single(predicate: (T) => boolean = trueFn): T {
        var value, hasValue = false;
        var result, iterator = this[Symbol.iterator]();
        while (!(result = iterator.next()).done) {
            if (predicate(result.value)) {
                if (!hasValue) {
                    value = result.value;
                    hasValue = true;
                }
                else {
                    throw tooMany;
                }
            }
        }
        if (hasValue) return value;
        throw nothingFound;
    }
    
    /** 
    * Returns the only element of a sequence that satisfies a specified 
    * condition or a default value if no such element exists; this method 
    * throws an exception if more than one element satisfies the condition. */
    SingleOrDefault<TSource>(predicate: (T) => boolean = trueFn): T {
        var value, lastKnown, hasValue = false;
        var result, iterator = this[Symbol.iterator]();
        while (!(result = iterator.next()).done) {
            if (predicate(result.value)) {
                if (!hasValue) {
                    value = result.value;
                    hasValue = true;
                }
                else {
                    throw tooMany; 
                }
            }
            lastKnown = result.value;
        }
        return (hasValue) ? value : getDefaultVal(typeof lastKnown);
    }
    

    /** 
    * Computes the sum of the sequence of Decimal values that are obtained by 
    * invoking a transform function on each element of the input sequence. */
    Sum(transform: (T) => number = selfFn): number {
        var result, sum: number = 0;
        var iterator = this[Symbol.iterator]();
        while (!(result = iterator.next()).done) {
            sum += result.value;
        }
        return sum;
    }	


    /** Converts Iterable to Array<T> */
    public ToArray(): Array<T> {
        var result, array = [];
        var iterator = this[Symbol.iterator]();
        while (!(result = iterator.next()).done) {
            array.push(result.value);
        }
        return array;
    }


    /** 
    * Creates a Map< TKey, TValue > from an IEnumerable< T > according
    * to a specified key selector function, a comparer, and an element selector
    * function. */
    ToMap<TKey, TElement>(keySelector: (T) => TKey,
        elementSelector: (T) => TElement = selfFn): Map<TKey, TElement> {
        var dictionary = new Map<TKey, TElement>();
        var result, iterator = this[Symbol.iterator]();
        while (!(result = iterator.next()).done) {
            dictionary.set(keySelector(result.value), elementSelector(result.value));
        }
        return dictionary;
    }


    /** 
    * Creates a Map< TKey, TValue > from an IEnumerable< T > according
    * to a specified key selector function, a comparer, and an element selector
    * function. */
    ToDictionary<TKey, TElement>(keySelector: (T) => TKey,
        elementSelector: (T) => TElement = selfFn): Map<TKey, TElement> {
        var dictionary = new Map<TKey, TElement>();
        var result, iterator = this[Symbol.iterator]();
        while (!(result = iterator.next()).done) {
            dictionary.set(keySelector(result.value), elementSelector(result.value));
        }
        return dictionary;
    }


    //-------------------------------------------------------------------------
    //  Deferred execution methods
    //-------------------------------------------------------------------------


    /** 
    * Returns the elements of the specified sequence or the specified value in 
    * a singleton collection if the sequence is empty. */
    DefaultIfEmpty(defaultValue: T = undefined): Linqable<T> {
        return new Linq<T>(this, () => new DefaultIfEmptyIteratror(this._target[Symbol.iterator](), defaultValue));
    }

    
    /** Casts the elements of an IEnumerable to the specified type. */
    Cast<V>(): Linqable<V> {
        return new Linq<V>(this, () => new SelectIteratror(this._target[Symbol.iterator](), (a) => <V>a));
    }


    /** Concatenates two sequences. */
    Concat(second: Iterable<T>): Linqable<T> {
        var aggregate = [this._target, second];
        return new Linq<T>(this, () => new SelectManyIteratror(aggregate[Symbol.iterator](), selfFn, selfFn));
    }	


    /**
    * Returns distinct elements from a sequence by using the default equality
    * comparer to compare values.*/
    Distinct(): Linqable<T> {
        return new Linq<T>(this, () => new DistinctIteratror(this._target[Symbol.iterator]()));
    }


    /** 
    * Correlates the elements of two sequences based on matching keys. A 
    * specified IEqualityComparer<T> is used to compare keys. */
    Join<I, TKey, R>(inner: Iterable<I>, oSelector: (T) => TKey,
        iSelector: (I) => TKey, transform: (T, I) => R): Linqable<R> {
        return new Linq<R>(this, () => new JoinIteratror<T, I, TKey, R>(
            this._target[Symbol.iterator](), inner[Symbol.iterator](),
            oSelector, iSelector, transform));
    }


    /**	
    *Projects each element of a sequence into a new form by incorporating
    * the element's index. */
    Select<V>(transform: (T, number?) => V): Linqable<V> {
        return new Linq<V>(this, () => new SelectIteratror(this._target[Symbol.iterator](), transform));
    }


    /** 
    * Projects each element of a sequence to an Iterable<T>, flattens the 
    * resulting sequences into one sequence, and invokes a result selector 
    * function on each element therein. The index of each source element is 
    * used in the intermediate projected form of that element. */
    SelectMany<S, V>(selector: (T, number) => Iterable<S> = selfFn, result: (T, S) => V = selfFn): Linqable<V> {
        return new Linq<V>(this, () => new SelectManyIteratror(this._target[Symbol.iterator](), selector, result));
    }


    /** 
    * Bypasses a specified number of elements in a sequence and then returns 
    * the remaining elements. */
    Skip(skip: number): Linqable<T> {
        var iterator = this._target[Symbol.iterator]();
        for (var i = 0; i < skip; i++) iterator.next();
        return new Linq<T>(this, () => new WhereIteratror(iterator, trueFn));
    }
    

    /** 
    * Bypasses elements in a sequence as long as a specified condition is true 
    * and then returns the remaining elements. The element's index is used in 
    * the logic of the predicate function. */
    SkipWhile(predicate: (T, number) => boolean = (a, n) => false): Linqable<T> {
        return new Linq<T>(this, () => new SkipIterator(this._target[Symbol.iterator](), predicate));
    }


    /** 
    * Returns a specified number of contiguous elements from the start of a 
    / sequence. */
    Take(take: number): Linqable<T> {
        return new Linq<T>(this, () => new TakeIterator(this._target[Symbol.iterator](), (a, n) => take > n));
    }
    

    /**
    * Returns elements from a sequence as long as a specified condition is true.
    * The element's index is used in the logic of the predicate function. */
    TakeWhile(predicate: (T, number) => boolean): Linqable<T> {
        return new Linq<T>(this, () => new TakeIterator(this._target[Symbol.iterator](), predicate));
    }
    
    /** 
    * Produces the set union of two sequences. Union returns only unique values. */
    Union(second: Iterable<T>): Linqable<T> {
        var aggregate = [this._target, second];
        return new Linq<T>(this, () => new UnionIteratror(aggregate[Symbol.iterator]()));
    }

    /**
    * Filters a sequence of values based on a predicate.
    * @param predicate Each element's index is used in the logic of the 
    * predicate function.  */
    public Where(predicate: (T, number?) => Boolean = trueFn): Linqable<T> {
        return new Linq<T>(this, () => new WhereIteratror(this._target[Symbol.iterator](), predicate));
    }


    /** 
    * Applies a specified function to the corresponding elements of two 
    * sequences, producing a sequence of the results. */
    Zip<V, Z>(second: Iterable<V>, func: (T, V) => Z): Linqable<Z> {
        return new Linq<Z>(this, () => new ZipIteratror(this._target[Symbol.iterator](), second[Symbol.iterator](), func));
    }
}


//-----------------------------------------------------------------------------
//  Enumerator implementation
//-----------------------------------------------------------------------------

/** Gets Iterator and turns it into Enumerator */
class Enumerator<T> implements IEnumerator<T> {

    _result: any;
    _iterator: Iterator<T>;

    constructor(sourceIterator: Iterator<T>) {
        this._iterator = sourceIterator;
    }

    /** Gets the current element in the collection. */
    public get Current(): T {
        return this._result.value;
    }

    /** Advances the enumerator to the next element of the collection.*/
    public MoveNext(): Boolean {
        this._result = this._iterator.next();
        return !this._result.done;
    }

    /** Sets the enumerator to its initial position, which is before the first 
    * element in the collection. */
    public Reset(): void {
        throw "JavaScript iterators could not be Reset";
    }
}


//-----------------------------------------------------------------------------
//  Iterators implementation
//-----------------------------------------------------------------------------


/** Base Iterator class */
class IteratorBase<T> {
    _done: any = { value: undefined, done: true };
    _iterator: Iterator<T>;

    constructor(iterator: Iterator<T>) {
        if (('null' || 'undefined') == typeof iterator) {
            throw "Invalid Iterator";
        }
        this._iterator = iterator;
    }
}


/** Distinct Iterator class */
class DistinctIteratror<T> extends IteratorBase<T> {
    _set: Set<T> = new Set<T>();

    /** Gets the next element in the collection. */
    public next(value?: any): IteratorResult<T> {
        var result;
        while (!(result = this._iterator.next()).done && this._set.has(result.value));
        this._set.add(result.value);
        return result;
    }
}

/** Itersect Iterator class */
class IntersectIteratror<T> extends IteratorBase<T> {
    _set: Set<T> = new Set<T>();

    constructor(iterator: Iterator<T>, other: Iterable<T>) {
        super(iterator);
        var result, otherIterator = other[Symbol.iterator]();
        while (!(result = otherIterator.next()).done) {
            this._set.add(result.value);
        }
    }

    /** Gets the next element in the collection. */
    public next(value?: any): IteratorResult<T> {
        var result;
        while (!(result = this._iterator.next()).done && !this._set.has(result.value));
        this._set.add(result.value);
        return result;
    }
}

/** Base for all predicate based iterators */
class MethodIteratror<T> extends IteratorBase<T> {

    _index = 0;
    _method: Function;

    constructor(iterator: Iterator<T>, method: Function) {
        super(iterator);
        if ("undefined" === typeof method) throw "Iterator can not be used without predicate";
        this._method = method;
    }
}

/** Implements Where Iterator */
class WhereIteratror<T> extends MethodIteratror<T> implements Iterator<T> {
    /** Gets the next element in the collection. */
    public next(value?: any): IteratorResult<T> {
        var result;
        do {
            result = this._iterator.next();
        } while (!result.done && !this._method(result.value, this._index++));
        return result;
    }
}


class SkipIterator<T> extends MethodIteratror<T> implements Iterator<T> {
    _hasSkipped = false;

    /** Gets the next element in the collection. */
    public next(value?: any): IteratorResult<T> {
        var result;
        if (this._hasSkipped) return this._iterator.next();
        while (!(result = this._iterator.next()).done && this._method(result.value, this._index++)); 
        this._hasSkipped = true;
        return result;
    }
}

class TakeIterator<T> extends MethodIteratror<T> implements Iterator<T> {

    /** Gets the next element in the collection. */
    public next(value?: any): IteratorResult<T> {
        var result = this._iterator.next();
        if (result.done || !this._method(result.value, this._index++))
            return this._done;

        return result;
    }
}

class ZipIteratror<T, V, Z> extends MethodIteratror<T> implements Iterator<Z> {
    _second: Iterator<V>;

    constructor(first: Iterator<T>, second: Iterator<V>, func: (T,V)=>Z) {
        super(first, func);
        this._second = second;
    }

    /** Gets the next element in the collection. */
    public next(value ?: any): IteratorResult <Z> {
        var first = this._iterator.next();
        var second = this._second.next();
        if (first.done || second.done) {
            return this._done;
        }

        return {done: false, value: this._method(first.value, second.value) };
    }
}

/** Implements Select Iterator */
class SelectIteratror<T, V> extends MethodIteratror<T> implements Iterator<V> {
    /** Gets the next element in the collection. */
    public next(value?: any): IteratorResult<V> {
        var result: any = this._iterator.next();
        if (result.done) return result;
        result.value = this._method(result.value, this._index++);
        return result;
    }
}

/** Implements SelectMany Iterator */
class SelectManyIteratror<T, V, Z> extends MethodIteratror<T> implements Iterator<Z> {
    _resultSelector;
    _collection: Iterator<V>;
    _collectionState: IteratorResult<T> = this._done;
    _resultState: IteratorResult<any> = this._done;

    constructor(sourceIterator: Iterator<T>, selector: (T, number) => Iterable<V>, transform: (T, V) => Z = selfFn) {
        super(sourceIterator, selector);
        this._resultSelector = transform;
    }

    /** Gets the next element in the collection. */
    public next(value?: any): IteratorResult<Z> {
        do {
            if (this._resultState.done) {
                this._collectionState = this._iterator.next();
                if (this._collectionState.done) return this._done;
                this._collection = this._method(this._collectionState.value)[Symbol.iterator]();
            }

            this._resultState = this._collection.next();
            if (!this._resultState.done) {
                this._resultState.value = this._resultSelector(this._resultState.value);
            }
        } while (this._resultState.done);
        return this._resultState;
    }
}

class JoinIteratror<T, I, TKey, R> extends SelectManyIteratror<T, I, R> {
    _map: Map<TKey, Set<I>>;

    constructor(outer: Iterator<T>, inner: Iterator<I>, oSelect: (T) => TKey, iSelect: (I) => TKey, transform: (T, I) => R) {
        super(outer, null);
        this._method = oSelect;

        var result: IteratorResult<I>;
        this._map = new Map<TKey, Set<I>>();
        while (!(result = inner.next()).done) {
            var key = iSelect(result.value);
            var group: Set<I> = this._map.get(key);
            if ('undefined' === typeof group) {
                group = new Set<I>();
                this._map.set(key, group);
            }
            group.add(result.value);
        }
        this._resultSelector = transform;
    }

    /** Gets the next element in the collection. */
    public next(value?: any): IteratorResult<R> {
        do {
            if (this._resultState.done) {
                this._collectionState = this._iterator.next();
                if (this._collectionState.done) return this._done;

                var key = this._method(this._collectionState.value);
                var innerSet = this._map.get(key);
                if ('undefined' === typeof innerSet) continue; 
                this._collection = innerSet[Symbol.iterator]();
            }
            this._resultState = this._collection.next();
            if (!this._resultState.done) {
                this._resultState.value = this._resultSelector(this._collectionState.value, this._resultState.value);
            }
        } while (this._resultState.done);

        return this._resultState;
    }
}



/** Implements Union Iterator */
class UnionIteratror<T> extends SelectManyIteratror<T, T, T> implements Iterator<T> {
    _set = new Set<T>();

    constructor(sourceIterator: Iterator<T>) {
        super(sourceIterator, selfFn);
    }

    /** Gets the next element in the collection. */
    public next(value?: any): IteratorResult<T> {
        var result;
        while (!(result = super.next()).done && this._set.has(result.value));
        this._set.add(result.value);
        return result;
    }
}


/** DefaultIfEmpty Iterator class */
class DefaultIfEmptyIteratror<T> extends IteratorBase<T> {
    _default: T;

    constructor(sourceIterator: Iterator<T>, defaultValue: T) {
        super(sourceIterator);
        this._default = defaultValue;
    }

    /** Gets the next element in the collection. */
    public next(value?: any): IteratorResult<T> {
        return this.check(this._iterator.next());
    }

    private check(result: IteratorResult<T>) {
        if (result.done) {
            result.value = this._default;
        } else {
            this.check = (a) => a;
        }
        return result;
    }
}


//-----------------------------------------------------------------------------
// Unility Functions
//-----------------------------------------------------------------------------


/** Default predicate, always true */
var trueFn = () => true;

/** Default transformer, returns self */
var selfFn = o => o;

/** Returns default value for the type */
function getDefaultVal(type) {
    if (typeof type !== 'string') throw new TypeError('Type must be a string.');

    // Handle simple types (primitives and plain function/object)
    switch (type) {
        case 'boolean': return false;
        case 'function': return function () { };
        case 'null': return null;
        case 'number': return 0;
        case 'object': return {};
        case 'string': return "";
        case 'symbol': return Symbol();
        case 'undefined': return void 0;
    }

    try {
        // Look for constructor in this or current scope
        var ctor = typeof this[type] === 'function'
            ? this[type]
            : eval(type);

        return new ctor;

        // Constructor not found, return new object
    } catch (e) { return {}; }
}


//-----------------------------------------------------------------------------
//  Constants
//-----------------------------------------------------------------------------

var nothingFound = "No element satisfies the condition in predicate";
var noElements = "The source sequence is empty.";
var tooMany = "More than one element satisfies the condition in predicate.";


//-----------------------------------------------------------------------------
//  Enumerable APIs
//-----------------------------------------------------------------------------

/** 
* Exposes the enumerator, which supports a simple iteration over a collection
* of a specified type */
export interface IEnumerable<T> {
    
    /** Returns an enumerator that iterates through the collection. */
    GetEnumerator(): IEnumerator<T>;
}

/** 
* Exposes an enumerator, which supports a simple iteration over a generic 
* collection */
export interface IEnumerator<T> {
    /** Gets the current element in the collection. */
    Current: T;

    /** Advances the enumerator to the next element of the collection.*/
    MoveNext(): Boolean;

    /** Sets the enumerator to its initial position, which is before the first 
    * element in the collection. */
    Reset(): void;
}


