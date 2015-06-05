/// <reference path="../typings/linq-ts.d.ts" />
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
* Converts any Iterable<T> object into LINQ-able object
* @param TSource An Array, Map, Set, String or other Iterable object.
* @example
*     import {asEnumerable} from "linq-ts";
*
*     var enumerable = asEnumerable([0, 1, 2, 3, 4, 5, 6, 7]).Take(3);
*     var sum = enumerable.Sum();
*
*/
export function asEnumerable<T>(TSource: Iterable<T>|IEnumerable<T> = null): Enumerable<T> {
    return new Linq<T>(TSource);
}


/**
* Generates <count> of <T> elements starting with <start>. T is any 
* type which could be cast to number: number, enum, etc.
* @param start First value in sequence.
* @param count Number of elements to iteratel.
* @example
*     var sum = Range(0, 7).Sum();
*/
export function Range<T>(start: T, count: number): Enumerable<T> {
    return new Linq<T>(null, () => new GeneratorIterator(start, count, true));
}


/**
* Repeat element <start> of type T <count> of times.
* @param start First value in sequence.
* @param count Number of elements to iteratel.
* @example
*     var sum = Repeat("v", 7);
*/
export function Repeat<T>(start: T, count: number): Enumerable<T> {
    return new Linq<T>(null, () => new GeneratorIterator(start, count));
}



//-----------------------------------------------------------------------------
//  LINQ Implementation
//-----------------------------------------------------------------------------



class Linq<T> implements Enumerable<T>, Iterable<T>, IEnumerable<T> {

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


    Contains(value: T, equal: (a: T, b: T) => boolean = (a, b) => a === b): boolean {
        var result, iterator: Iterator<T> = this[Symbol.iterator]();
        while (!(result = iterator.next()).done) {
            if (equal(value, result.value)) {
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



    DefaultIfEmpty(defaultValue: T = undefined): Enumerable<T> {
        return new Linq<T>(this, () => new DefaultIfEmptyIteratror(this._target[Symbol.iterator](), defaultValue));
    }

    
    Cast<V>(): Enumerable<V> {
        return new Linq<V>(this, () => new SelectIteratror(this._target[Symbol.iterator](), (a) => <V>a));
    }


    Concat(second: Iterable<T>): Enumerable<T> {
        var aggregate = [this._target, second];
        return new Linq<T>(this, () => new SelectManyIteratror(aggregate[Symbol.iterator](), selfFn, selfFn));
    }	


    Distinct(): Enumerable<T> {
        return new Linq<T>(this, () => new DistinctIteratror(this._target[Symbol.iterator]()));
    }

    Except(other: Iterable<T>): Enumerable<T> {
        var _set: Set<T> = new Set<T>();
        var result, otherIterator = other[Symbol.iterator]();
        while (!(result = otherIterator.next()).done) {
            _set.add(result.value);
        }
        return new Linq<T>(this, () => new IntersectIteratror(this._target[Symbol.iterator](), _set, true));
    }


    GroupBy<K, E, R>(selKey: (T) => K, selElement: (T) => E,
                                       selResult: (a: K, b: Iterable<E>) => R 
                                       = defGrouping): Enumerable<R> {
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
                                              = defGrouping): Enumerable<R> {
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


    Intersect(other: Iterable<T>): Enumerable<T> {
        var _set: Set <T> = new Set<T>();
        var result, otherIterator = other[Symbol.iterator]();
        while (!(result = otherIterator.next()).done) {
            _set.add(result.value);
        }
        return new Linq<T>(this, () => new IntersectIteratror(this._target[Symbol.iterator](), _set));
    }


    Join<I, TKey, R>(inner: Iterable<I>, oSelector: (T) => TKey,
        iSelector: (I) => TKey, transform: (T, I) => R): Enumerable<R> {
        return new Linq<R>(this, () => new JoinIteratror<T, I, TKey, R>(
            this._target[Symbol.iterator](), inner[Symbol.iterator](),
            oSelector, iSelector, transform));
    }


    OrderBy<K>(keySelect: (T) => K = selfFn, equal: (a: K, b: K) => number = (a, b) => <any>a - <any>b): Enumerable<T> {
        return new OrderedLinq<T>(this,
            (array) => new ArrayIterator(array, 0, (i) => i >= array.length),
            (a: T, b: T) => equal(keySelect(a), keySelect(b)));
    }

    OrderByDescending<K>(keySelect: (T) => K = selfFn, equal: (a: K, b: K) => number = (a, b) => <any>a - <any>b): Enumerable<T> {
        return new OrderedLinq<T>(this,
            (array) => new ArrayIterator(array, array.length - 1, (i) => 0 > i, -1),
            (a: T, b: T) => equal(keySelect(a), keySelect(b)));
    }


    ThenBy<K>(keySelect: (T) => K = selfFn, equal: (a: K, b: K) => number = (a, b) => <any>a - <any>b): Enumerable<T> {
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


    ThenByDescending<K>(keySelect: (T) => K = selfFn, equal: (a: K, b: K) => number = (a, b) => <any>a - <any>b): Enumerable<T> {
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


    Range<T>(start: T, count: number): Enumerable<T> {
        return new Linq<T>(null, () => new GeneratorIterator(start, count, true));
    }


    Repeat(element: T, count: number): Enumerable<T> {
        return new Linq<T>(null, () => new GeneratorIterator(element, count));
    }


    Reverse(): Enumerable<T> {
        var array: Array<T> = Array.isArray(this._target) ? <Array<T>>this._target : this.ToArray();
        return new Linq<T>(null, () => new ArrayIterator(array, array.length - 1,  (i) => 0 > i, -1));
    }


    Select<V>(transform: (T, number?) => V): Enumerable<V> {
        return new Linq<V>(this, () => new SelectIteratror(this._target[Symbol.iterator](), transform));
    }


    SelectMany<S, V>(selector: (T, number) => Iterable<S> = selfFn, result: (T, S) => V = selfFn): Enumerable<V> {
        return new Linq<V>(this, () => new SelectManyIteratror(this._target[Symbol.iterator](), selector, result));
    }


    Skip(skip: number): Enumerable<T> {
        var iterator = this._target[Symbol.iterator]();
        for (var i = 0; i < skip; i++) iterator.next();
        return new Linq<T>(this, () => new WhereIteratror(iterator, trueFn));
    }
    

    SkipWhile(predicate: (T, number) => boolean = (a, n) => false): Enumerable<T> {
        return new Linq<T>(this, () => new SkipIterator(this._target[Symbol.iterator](), predicate));
    }


    Take(take: number): Enumerable<T> {
        return new Linq<T>(this, () => new TakeIterator(this._target[Symbol.iterator](), (a, n) => take > n));
    }
    

    TakeWhile(predicate: (T, number) => boolean): Enumerable<T> {
        return new Linq<T>(this, () => new TakeIterator(this._target[Symbol.iterator](), predicate));
    }
    

    Union(second: Iterable<T>): Enumerable<T> {
        var aggregate = [this._target, second];
        return new Linq<T>(this, () => new UnionIteratror(aggregate[Symbol.iterator]()));
    }


    public Where(predicate: (T, number?) => Boolean = trueFn): Enumerable<T> {
        return new Linq<T>(this, () => new WhereIteratror(this._target[Symbol.iterator](), predicate));
    }


    Zip<V, Z>(second: Iterable<V>, func: (T, V) => Z): Enumerable<Z> {
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



