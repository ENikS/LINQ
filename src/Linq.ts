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



//-----------------------------------------------------------------------------
//  Functions to convert any iterable into LINQ enumerable
//-----------------------------------------------------------------------------



/**
* Creates a new Linq enumerable.
* @param TSource An Iterable object such as Array, Map or string. */
export function LINQ<T>(TSource: Iterable<T>|IEnumerable<T> = null): Linqable<T> {
    return new Linq<T>(TSource);
}


/** Returns range of numbers from strart to start + count */
export function Range<T>(start: T, count: number): Linqable<T> {
    return new Linq<T>(null, () => new GeneratorIterator(start, count, true));
}


/** Returns range of numbers from strart to start + count */
export function Repeat<T>(start: T, count: number): Linqable<T> {
    return new Linq<T>(null, () => new GeneratorIterator(start, count));
}



//-----------------------------------------------------------------------------
//  LINQ
//-----------------------------------------------------------------------------




export interface Linqable<T> extends Iterable<T>, IEnumerable<T> {

    /**
    * Applies an accumulator function over a sequence.The specified seed value 
    * is used as the initial accumulator value, and the specified function is 
    * used to select the result value. */
    Aggregate<A, B>(seed: A, func?: (A, T) => A, resultSelector?: (A) => B): B;

    /** 
    * Determines whether all elements of a sequence satisfy a condition.
    * @returns True is all elements satisfy criteria. */
    All(predicate?: (T) => Boolean): boolean;
    
    /** 
    * Determines whether a sequence contains any elements or if predicate is 
    * present determines whether any element of a sequence satisfies a 
    * condition.*/
    Any(predicate?: (T) => Boolean): boolean;
    
    /** 
    * Computes the average of a sequence of Number values that are obtained by 
    * invoking a transform function on each element of the input sequence. */
    Average(func?: (T) => number): number;  	

    /** Concatenates two sequences. */
    Concat<V>(second: Iterable<T>): Linqable<V>;
    
    /**
    * Determines whether a sequence contains a specified element by using a 
    * specified Comparer. */
    Contains(source: T, equal?: (a: T, b: T) => boolean): boolean;

    /**
    * Returns the number of elements in a sequence.
    * Returns a number that represents how many elements in the 
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
    
    /** 
    * Produces the set difference of two sequences by using the default 
    * equality comparer to compare values. */
    Except(other: Iterable<T>): Linqable<T>;
    
    /**
    * Returns the first element in a sequence that satisfies a specified
    * condition. */
    First(predicate?: (T) => boolean): T;

    /**
    * Returns the first element of the sequence that satisfies a condition or a
    * default value if no such element is found. */
    FirstOrDefault(predicate?: (T) => boolean): T;
    
    /** 
    * Groups the elements of a sequence according to a specified key selector 
    * function and creates a result value from each group and its key. Elements
    * of each group are projected by using a specified function. */
    GroupBy<K, E, R>(selKey: (T) => K, selElement?: (T) => E, selResult?: (a: K, b: Iterable<E>) => R): Linqable<R>;
    
    /** 
    * Correlates the elements of two sequences based on equality of keys and 
    * groups the results. The default equality comparer is used to compare keys. */
    GroupJoin<I, K, R>(inner: Iterable<I>, outerKeySelector: (T) => K, innerKeySelector: (I) => K, resultSelector: (a: T, b: Iterable<I>) => R): Linqable<R>;
    
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
    
    /** 
    * Sorts the elements of a sequence in ascending order by using a specified 
    * comparer. */
    OrderBy<K>(keySelect?: (T) => K, equal?: (a: K, b: K) => number): Linqable<T>;

    /** 
    * Sorts the elements of a sequence in descending order by using a specified 
    * comparer. */
    OrderByDescending<K>(keySelect?: (T) => K, equal?: (a: K, b: K) => number): Linqable<T>;

    /** 
    * Performs a subsequent ordering of the elements in a sequence in ascending
    * order by using a specified comparer. */
    ThenBy<K>(keySelect?: (T) => K, equal?: (a: K, b: K) => number): Linqable<T>;

    /** 
    * Performs a subsequent ordering of the elements in a sequence in descending
    * order by using a specified comparer. */
    ThenByDescending<K>(keySelect?: (T) => K, equal?: (a: K, b: K) => number): Linqable<T>;	
    
    /** Returns count of numbers beginning from start  */
    Range(start: T, count: number): Linqable<T>;
    
    /** Generates a sequence that contains one repeated value. */
    Repeat(element: T, count: number): Linqable<T>;
    
    /** Inverts the order of the elements in a sequence. */
    Reverse(): Linqable<T>;	
    
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
    SequenceEqual(other: Iterable<T>, equal?: (a: T, b: T) => boolean): boolean; 
    
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
    //ToDictionary<TKey, TElement>(keySelector: (T) => TKey, elementSelector?: (T) => TElement): Map<TKey, TElement>;	

    /** 
    * Produces the set union of two sequences. Union returns only unique values. */
    Union(second: Iterable<T>): Linqable<T>;	

    /**
    * Filters a sequence of values based on a predicate. */
    Where(predicate: (T, number) => Boolean): Linqable<T>;
        
    /** 
    * Applies a specified function to the corresponding elements of two 
    * sequences, producing a sequence of the results. */
    Zip<V, Z>(second: Iterable<V>, func: (T, V) => Z): Linqable<Z>;
}



//-----------------------------------------------------------------------------
//  LINQ Implementation
//-----------------------------------------------------------------------------



class Linq<T> implements Linqable<T>, Iterable<T>, IEnumerable<T> {

    protected _target: Iterable<T>|IEnumerable<T>;
    protected _factory: Function;
    protected _factoryArg: any;
    protected _initialize: Function;

    ///////////////////////////////////////////////////////////////////////////

    constructor(target: Iterable<any>|IEnumerable<any>, factory?: Function, arg?: any) {
        this._target = target;
        this._factory = factory;
        this._factoryArg = arg;
    }

    ///////////////////////////////////////////////////////////////////////////

    /** Returns JavaScript iterator */
    public [Symbol.iterator](): Iterator<T> {
        return (null != this._factory) ? this._factory(this._factoryArg)
             : (null != this._target)  ? this._target[Symbol.iterator]()
                : { next: () => { return {done: true, value: undefined}; }};
    }

    /** Returns C# style enumerator */
    public GetEnumerator(): IEnumerator<T> {
        return new Enumerator<T>(this[Symbol.iterator]());
    }

    

    //-------------------------------------------------------------------------
    //  Immediate execution methods                                                                                            
    //-------------------------------------------------------------------------



    Aggregate<A, B>(seed: A, func: (A, T) => A, resultSelector: (A) => B = selfFn): B {
        var result: A = seed;
        var res, iterator: Iterator<T> = this[Symbol.iterator]();
        while (!(res = iterator.next()).done) {
            result = func(result, res.value);
        }
        return resultSelector(result);
    }


    public All(predicate: (T) => boolean = trueFn) {
        var result, iterator: Iterator<T> = this[Symbol.iterator]();
        while (!(result = iterator.next()).done) {
            if (!predicate(result.value)) {
                return false;
            }
        }
        return true;
    }


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


    Average(func: (T) => number = selfFn): number {
        var result, sum = 0, count = 0;
        var iterator = this[Symbol.iterator]();
        while (!(result = iterator.next()).done) {
            sum += result.value;
            count++;
        }
        return sum / count;
    }


    Contains(source: T, equal: (a: T, b: T) => boolean = (a, b) => a === b): boolean {
        var result, iterator: Iterator<T> = this[Symbol.iterator]();
        while (!(result = iterator.next()).done) {
            if (equal(source, result.value)) {
                return true;
            }
        }
        return false;
    }


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
    

    SequenceEqual(other: Iterable<T>, equal: (a: T, b: T) => boolean = (a, b) => a === b): boolean {
        var res1, res2;
        var it1 = this[Symbol.iterator]();
        var it2 = other[Symbol.iterator]();
        do {
            res1 = it1.next(); res2 = it2.next();
            if ((res1.done != res2.done) || !equal(res1.value, res2.value)) {
                return false;
            }
        } while (!(res1.done) && !(res2.done));
        return true;
    }


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
    

    Sum(transform: (T) => number = selfFn): number {
        var result, sum: number = 0;
        var iterator = this[Symbol.iterator]();
        while (!(result = iterator.next()).done) {
            sum += result.value;
        }
        return sum;
    }	


    public ToArray(): Array<T> {
        var result, array = [];
        var iterator = this[Symbol.iterator]();
        while (!(result = iterator.next()).done) {
            array.push(result.value);
        }
        return array;
    }


    ToMap<TKey, TElement>(keySelector: (T) => TKey,
        elementSelector: (T) => TElement = selfFn): Map<TKey, TElement> {
        var dictionary = new Map<TKey, TElement>();
        var result, iterator = this[Symbol.iterator]();
        while (!(result = iterator.next()).done) {
            dictionary.set(keySelector(result.value), elementSelector(result.value));
        }
        return dictionary;
    }


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



    DefaultIfEmpty(defaultValue: T = undefined): Linqable<T> {
        return new Linq<T>(this, () => new DefaultIfEmptyIteratror(this._target[Symbol.iterator](), defaultValue));
    }

    
    Cast<V>(): Linqable<V> {
        return new Linq<V>(this, () => new SelectIteratror(this._target[Symbol.iterator](), (a) => <V>a));
    }


    Concat(second: Iterable<T>): Linqable<T> {
        var aggregate = [this._target, second];
        return new Linq<T>(this, () => new SelectManyIteratror(aggregate[Symbol.iterator](), selfFn, selfFn));
    }	


    Distinct(): Linqable<T> {
        return new Linq<T>(this, () => new DistinctIteratror(this._target[Symbol.iterator]()));
    }

    Except(other: Iterable<T>): Linqable<T> {
        var _set: Set<T> = new Set<T>();
        var result, otherIterator = other[Symbol.iterator]();
        while (!(result = otherIterator.next()).done) {
            _set.add(result.value);
        }
        return new Linq<T>(this, () => new IntersectIteratror(this._target[Symbol.iterator](), _set, true));
    }


    GroupBy<K, E, R>(selKey: (T) => K, selElement: (T) => E,
                                       selResult: (a: K, b: Iterable<E>) => R 
                                       = defGrouping): Linqable<R> {
        var result: IteratorResult<T>;
        var iterator: Iterator<T> = this[Symbol.iterator]();
        var _map = new Map<K, Array<E>>();
        while (!(result = iterator.next()).done) {
            var key = selKey(result.value);
            var group: Array<E> = _map.get(key);
            if ('undefined' === typeof group) {
                group = [];
                _map.set(key, group);
            }
            group.push(selElement(result.value));
        }
        var factory = () => new GroupByIteratror(_map.keys(), selResult, _map);
        var tst = factory();

        return new Linq<R>(this, () => new GroupByIteratror(_map.keys(), selResult, _map)); 
    }


    GroupJoin<I, K, R>(inner: Iterable<I>, oKeySelect: (T) => K,
                                              iKeySelect: (I) => K, 
                                              resultSelector: (a: T, b: Iterable<I>) => R
                                              = defGrouping): Linqable<R> {
        var _map = new Map<K, Array<I>>();
        var _inner = inner[Symbol.iterator]();
        var result: IteratorResult<I>;
        while (!(result = _inner.next()).done) {
            var key = iKeySelect(result.value);
            if ('undefined' === typeof key) throw "Inner Key selector returned undefined Key";
            var group: Array<I> = _map.get(key);
            if ('undefined' === typeof group) {
                group = [];
                _map.set(key, group);
            }
            group.push(result.value);
        }
        return new Linq<R>(this, () => new GroupJoinIteratror(this._target[Symbol.iterator](),
                                                              oKeySelect, resultSelector, _map)); 
    }


    Intersect(other: Iterable<T>): Linqable<T> {
        var _set: Set <T> = new Set<T>();
        var result, otherIterator = other[Symbol.iterator]();
        while (!(result = otherIterator.next()).done) {
            _set.add(result.value);
        }
        return new Linq<T>(this, () => new IntersectIteratror(this._target[Symbol.iterator](), _set));
    }


    Join<I, TKey, R>(inner: Iterable<I>, oSelector: (T) => TKey,
        iSelector: (I) => TKey, transform: (T, I) => R): Linqable<R> {
        return new Linq<R>(this, () => new JoinIteratror<T, I, TKey, R>(
            this._target[Symbol.iterator](), inner[Symbol.iterator](),
            oSelector, iSelector, transform));
    }


    OrderBy<K>(keySelect: (T) => K = selfFn, equal: (a: K, b: K) => number = (a, b) => <any>a - <any>b): Linqable<T> {
        return new OrderedLinq<T>(this,
            (array) => new ArrayIterator(array, 0, (i) => i >= array.length),
            (a: T, b: T) => equal(keySelect(a), keySelect(b)));
    }

    OrderByDescending<K>(keySelect: (T) => K = selfFn, equal: (a: K, b: K) => number = (a, b) => <any>a - <any>b): Linqable<T> {
        return new OrderedLinq<T>(this,
            (array) => new ArrayIterator(array, array.length - 1, (i) => 0 > i, -1),
            (a: T, b: T) => equal(keySelect(a), keySelect(b)));
    }


    ThenBy<K>(keySelect: (T) => K = selfFn, equal: (a: K, b: K) => number = (a, b) => <any>a - <any>b): Linqable<T> {
        if (this instanceof OrderedLinq) {
            var superEqual = (<OrderedLinq<T>>this).equal;
            (<OrderedLinq<T>>this).equal = (a: T, b: T) => {
                var result: number = superEqual(a, b);
                return (0 != result) ? result : equal(keySelect(a), keySelect(b));
            }
            return this;
        } else {
            return new OrderedLinq<T>(this,
                (array) => new ArrayIterator(array, 0, (i) => i >= array.length),
                (a: T, b: T) => equal(keySelect(a), keySelect(b)));
        }
    }


    ThenByDescending<K>(keySelect: (T) => K = selfFn, equal: (a: K, b: K) => number = (a, b) => <any>a - <any>b): Linqable<T> {
        if (this instanceof OrderedLinq) {
            var superEqual = (<OrderedLinq<T>>this).equal;
            (<OrderedLinq<T>>this).equal = (a: T, b: T) => {
                var result: number = superEqual(a, b);
                return (0 != result) ? result : equal(keySelect(a), keySelect(b));
            }
            return this;
        } else {
            return new OrderedLinq<T>(this,
                (array) => new ArrayIterator(array, array.length - 1, (i) => 0 > i, -1),
                (a: T, b: T) => equal(keySelect(a), keySelect(b)));
        }
    }


    Range<T>(start: T, count: number): Linqable<T> {
        return new Linq<T>(null, () => new GeneratorIterator(start, count, true));
    }


    Repeat(element: T, count: number): Linqable<T> {
        return new Linq<T>(null, () => new GeneratorIterator(element, count));
    }


    Reverse(): Linqable<T> {
        var array: Array<T> = Array.isArray(this._target) ? <Array<T>>this._target : this.ToArray();
        return new Linq<T>(null, () => new ArrayIterator(array, array.length - 1,  (i) => 0 > i, -1));
    }


    Select<V>(transform: (T, number?) => V): Linqable<V> {
        return new Linq<V>(this, () => new SelectIteratror(this._target[Symbol.iterator](), transform));
    }


    SelectMany<S, V>(selector: (T, number) => Iterable<S> = selfFn, result: (T, S) => V = selfFn): Linqable<V> {
        return new Linq<V>(this, () => new SelectManyIteratror(this._target[Symbol.iterator](), selector, result));
    }


    Skip(skip: number): Linqable<T> {
        var iterator = this._target[Symbol.iterator]();
        for (var i = 0; i < skip; i++) iterator.next();
        return new Linq<T>(this, () => new WhereIteratror(iterator, trueFn));
    }
    

    SkipWhile(predicate: (T, number) => boolean = (a, n) => false): Linqable<T> {
        return new Linq<T>(this, () => new SkipIterator(this._target[Symbol.iterator](), predicate));
    }


    Take(take: number): Linqable<T> {
        return new Linq<T>(this, () => new TakeIterator(this._target[Symbol.iterator](), (a, n) => take > n));
    }
    

    TakeWhile(predicate: (T, number) => boolean): Linqable<T> {
        return new Linq<T>(this, () => new TakeIterator(this._target[Symbol.iterator](), predicate));
    }
    

    Union(second: Iterable<T>): Linqable<T> {
        var aggregate = [this._target, second];
        return new Linq<T>(this, () => new UnionIteratror(aggregate[Symbol.iterator]()));
    }


    public Where(predicate: (T, number?) => Boolean = trueFn): Linqable<T> {
        return new Linq<T>(this, () => new WhereIteratror(this._target[Symbol.iterator](), predicate));
    }


    Zip<V, Z>(second: Iterable<V>, func: (T, V) => Z): Linqable<Z> {
        return new Linq<Z>(this, () => new ZipIteratror(this._target[Symbol.iterator](), second[Symbol.iterator](), func));
    }
}


class OrderedLinq<T> extends Linq <T> {

    constructor(target: Iterable<any>|IEnumerable<any>, factory: Function, public equal: Function) {
        super(target, factory);

    }
    public [Symbol.iterator](): Iterator<T> {
        if ('undefined' === typeof this._factoryArg) {
            this._factoryArg = (<Linq<T>>this._target).ToArray();
            this._factoryArg.sort(this.equal);
        }
        return this._factory(this._factoryArg);
    }

}



//-----------------------------------------------------------------------------
//  Enumerator implementation
//-----------------------------------------------------------------------------



//  Gets Iterator and turns it into Enumerator 
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



class ArrayIterator<T> implements Iterator<T> {

    constructor(private _source: Array<T>, private _current: number, private _done: Function,
                private _increment = 1) {
    }

    public next(value?: any): IteratorResult<T> {
        var result = { value: this._source[this._current], done: this._done(this._current) };
        this._current += this._increment;
        return result;
    }
}


class IteratorBase<T> {

    protected _done: any = { value: undefined, done: true };

    constructor(protected _iterator: Iterator<T>) { }
}


class DistinctIteratror<T> extends IteratorBase<T> {

    private _set: Set<T> = new Set<T>();

    public next(value?: any): IteratorResult<T> {
        var result;
        while (!(result = this._iterator.next()).done && this._set.has(result.value)) { }
        this._set.add(result.value);
        return result;
    }
}


class IntersectIteratror<T> extends IteratorBase<T> {

    constructor(iterator: Iterator<T>, private _set: Set<T>, private _switch: boolean = false) {
        super(iterator);
    }

    public next(value?: any): IteratorResult<T> {
        var result;
        while (!(result = this._iterator.next()).done && (this._switch == this._set.has(result.value))) { }
        if (!this._switch) this._set.add(result.value);
        return result;
    }
}


class GeneratorIterator<T> extends IteratorBase<T> implements Iterator<T> {

    constructor(private _current: any, private _count: number, private _increment: boolean = false) {
        super(null);
    }

    public next<T>(value?: any): IteratorResult<T> {
        var result = (0 < this._count) ? { value: this._current, done: 0 >= this._count-- } : this._done;
        if (this._increment) this._current++;
        return result;
    }
}


class DefaultIfEmptyIteratror<T> extends IteratorBase<T> {

    constructor(sourceIterator: Iterator<T>, private _default: T) {
        super(sourceIterator);
    }

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


class MethodIteratror<T> extends IteratorBase<T> {

    constructor(iterator: Iterator<T>, protected _method: Function = null, protected _index = 0) {
        super(iterator);
    }
}


class WhereIteratror<T> extends MethodIteratror<T> implements Iterator<T> {

    public next(value?: any): IteratorResult<T> {
        var result;
        do {
            result = this._iterator.next();
        } while (!result.done && !this._method(result.value, this._index++));
        return result;
    }
}


class SkipIterator<T> extends MethodIteratror<T> implements Iterator<T> {

    private _hasSkipped = false;

    public next(value?: any): IteratorResult<T> {
        var result;
        if (this._hasSkipped) return this._iterator.next();
        while (!(result = this._iterator.next()).done && this._method(result.value, this._index++)) { }
        this._hasSkipped = true;
        return result;
    }
}


class TakeIterator<T> extends MethodIteratror<T> implements Iterator<T> {

    public next(value?: any): IteratorResult<T> {
        var result = this._iterator.next();
        if (result.done || !this._method(result.value, this._index++)) {
            return this._done;
        }
        return result;
    }
}


class ZipIteratror<T, V, Z> extends MethodIteratror<T> implements Iterator<Z> {

    constructor(first: Iterator<T>, private _second: Iterator<V>, func: (T,V)=>Z) {
        super(first, func);
    }

    public next(value ?: any): IteratorResult <Z> {
        var first = this._iterator.next();
        var second = this._second.next();
        if (first.done || second.done) {
            return this._done;
        }
        return {done: false, value: this._method(first.value, second.value) };
    }
}


class SelectIteratror<T, V> extends MethodIteratror<T> implements Iterator<V> {

    public next(value?: any): IteratorResult<V> {
        var result: any = this._iterator.next();
        if (result.done) return result;
        result.value = this._method(result.value, this._index++);
        return result;
    }
}


class SelectManyIteratror<T, V, Z> extends MethodIteratror<T> implements Iterator<Z> {

    protected _resultSelector;
    protected _collection: Iterator<V>;
    protected _collectionState: IteratorResult<T> = this._done;
    protected _resultState: IteratorResult<any> = this._done;

    constructor(sourceIterator: Iterator<T>, selector: (T, number) => Iterable<V>, transform: (T, V) => Z = selfFn) {
        super(sourceIterator, selector);
        this._resultSelector = transform;
    }

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


class JoinIteratror<T, I, K, R> extends SelectManyIteratror<T, I, R> {

    private _map: Map<K, Array<I>>;

    constructor(outer: Iterator<T>, inner: Iterator<I>, oKeySelect: (T) => K, iKeySelect: (I) => K, transform: (T, any) => R) {
        super(outer, null);
        this._method = oKeySelect;

        var result: IteratorResult<I>;
        this._map = new Map<K, Array<I>>();
        while (!(result = inner.next()).done) {
            var key = iKeySelect(result.value);
            var group: Array<I> = this._map.get(key);
            if ('undefined' === typeof group) {
                group = [];
                this._map.set(key, group);
            }
            group.push(result.value);
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


class UnionIteratror<T> extends SelectManyIteratror<T, T, T> implements Iterator<T> {

    private _set = new Set<T>();

    constructor(sourceIterator: Iterator<T>) {
        super(sourceIterator, selfFn);
    }

    public next(value?: any): IteratorResult<T> {
        var result;
        while (!(result = super.next()).done && this._set.has(result.value)) { }
        this._set.add(result.value);
        return result;
    }
}


class GroupByIteratror<K, E, R> extends MethodIteratror<K> implements Iterator<R> {

    constructor(iterator: Iterator<K>, resultSelect: (a: K, b: Iterable<E>) => R,
                private _map: Map<K, Array<E>>) {
        super(iterator, resultSelect);
    }
                                                                                 
    public next(value?: any): IteratorResult<R> {
        var result: IteratorResult<K> = this._iterator.next();
        if (result.done) return this._done;
        var iterable = this._map.get(result.value);
        return { value: this._method(result.value, iterable), done: false};
    }
}


class GroupJoinIteratror<T, I, K, R> extends MethodIteratror<T> implements Iterator<R> {

    constructor(iterator: Iterator<T>, oKeySelect: (T) => K,
                private _transform: (a: T, b: Iterable<I>) => R, 
                private _map: Map<K, Array<I>>) {
        super(iterator, oKeySelect);
    }

    public next(value?: any): IteratorResult<R> {
        var innerSet: Iterable<I>;
        var result: IteratorResult<T>;
        do {
            result = this._iterator.next();
            if (result.done) return this._done;
            var key = this._method(result.value);
            innerSet = this._map.get(key);
        } while ('undefined' === typeof innerSet);

        return { value: this._transform(result.value, innerSet), done: false };
    }
}



//-----------------------------------------------------------------------------
// Unility Functions
//-----------------------------------------------------------------------------



/** Default predicate, always true */
var trueFn = () => true;

/** Default transformer, returns self */
var selfFn = o => o;

/** Default Grouping */
var defGrouping = (a, b) => {
    if ('undefined' != typeof b['key']) throw "Object already has property [key]";
    b['key'] = a;
    return b;
};

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



//-----------------------------------------------------------------------------
//  Iterable APIs
//-----------------------------------------------------------------------------



export interface IteratorResult<T> {
    done: boolean;
    value?: T;
}

export interface Iterator<T> {
    next(value?: any): IteratorResult<T>;
    return?(value?: any): IteratorResult<T>;
    throw?(e?: any): IteratorResult<T>;
}

export interface Iterable<T> {
    [Symbol.iterator](): Iterator<T>;
}

export interface IterableIterator<T> extends Iterator<T> {
    [Symbol.iterator](): IterableIterator<T>;
}



