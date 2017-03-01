///////////////////////////////////////////////////////////////////////////////
/** Copyright (c) ENikS.  All rights reserved.                               */
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
import * as Constant from "./utilities";
import {Enumerable, IEnumerable, IEnumerator} from "./enumerable";

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
    return new EnumerableImpl<T>(TSource);
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
    return new EnumerableImpl<T>(null, () => new Iterator.Generator(start, count, true));
}


/**
* Repeat element <start> of type T <count> of times.
* @param start First value in sequence.
* @param count Number of elements to iteratel.
* @example
*     var sum = Repeat("v", 7);
*/
function getRepeat<T>(start: T, count: number): Enumerable<T> {
    return new EnumerableImpl<T>(null, () => new Iterator.Generator(start, count));
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
    getRepeat as Repeat,
    getRepeat as repeat
};





//-----------------------------------------------------------------------------
//  Enumerable Implementation
//-----------------------------------------------------------------------------


class EnumerableImpl<T> implements Enumerable<T>, Iterable<T>, IEnumerable<T> {

    protected _target: Iterable<T> | IEnumerable<T> | string;
    protected _factory: Function;
    protected _factoryArg: any;
    protected _initialize: Function;

    ///////////////////////////////////////////////////////////////////////////

    constructor(target: Iterable<any> | IEnumerable<any> | string, factory?: Function, arg?: any) {
        this._target = target;
        this._factory = factory;
        this._factoryArg = arg;

        // JavaScript naming convention
        (this as any)['aggregate'] = this.Aggregate;
        (this as any)['all'] = this.All;
        (this as any)['any'] = this.Any;
        (this as any)['average'] = this.Average;
        (this as any)['contains'] = this.Contains;
        (this as any)['count'] = this.Count;
        (this as any)['max'] = this.Max;
        (this as any)['min'] = this.Min;
        (this as any)['elementAt'] = this.ElementAt;
        (this as any)['elementAtOrDefault'] = this.ElementAtOrDefault;
        (this as any)['first'] = this.First;
        (this as any)['firstOrDefault'] = this.FirstOrDefault;
        (this as any)['last'] = this.Last;
        (this as any)['lastOrDefault'] = this.LastOrDefault;
        (this as any)['sequenceEqual'] = this.SequenceEqual;
        (this as any)['single'] = this.Single;
        (this as any)['singleOrDefault'] = this.SingleOrDefault;
        (this as any)['sum'] = this.Sum;
        (this as any)['toArray'] = this.ToArray;
        (this as any)['toMap'] = this.ToMap;
        (this as any)['toDictionary'] = this.ToDictionary;
        (this as any)['defaultIfEmpty'] = this.DefaultIfEmpty;
        (this as any)['concat'] = this.Concat;
        (this as any)['distinct'] = this.Distinct;
        (this as any)['except'] = this.Except;
        (this as any)['groupBy'] = this.GroupBy;
        (this as any)['groupJoin'] = this.GroupJoin;
        (this as any)['intersect'] = this.Intersect;
        (this as any)['ofType'] = this.OfType;
        (this as any)['join'] = this.Join;
        (this as any)['orderBy'] = this.OrderBy;
        (this as any)['orderByDescend'] = this.OrderByDescending;
        (this as any)['thenBy'] = this.ThenBy;
        (this as any)['thenByDescendi'] = this.ThenByDescending;
        (this as any)['range'] = this.Range;
        (this as any)['repeat'] = this.Repeat;
        (this as any)['reverse'] = this.Reverse;
        (this as any)['select'] = this.Select;
        (this as any)['selectMany'] = this.SelectMany;
        (this as any)['skip'] = this.Skip;
        (this as any)['skipWhile'] = this.SkipWhile;
        (this as any)['take'] = this.Take;
        (this as any)['takeWhile'] = this.TakeWhile;
        (this as any)['union'] = this.Union;
        (this as any)['where'] = this.Where;
        (this as any)['zip'] = this.Zip;
    }

    ///////////////////////////////////////////////////////////////////////////

    /** Returns JavaScript iterator */
    public [Symbol.iterator](): Iterator<T> {
        return (this._factory) ? this._factory(this._factoryArg)
            : (null != this._target) ? (this._target as any)[Symbol.iterator]()
                : { next: () => { return { done: true, value: undefined }; } };
    }

    /** Returns C# style enumerator */
    public GetEnumerator(): IEnumerator<T> {
        return new Iterator.CSharpEnumerator<T>(this[Symbol.iterator]());
    }



    //-------------------------------------------------------------------------
    //  Immediate execution methods                                                                                            
    //-------------------------------------------------------------------------


    public Aggregate<A, B>(func: (aggr: T, x: T) => A, resultSelector: (aggr: T) => B): B;
    public Aggregate<A, B>(seed: A, func: (aggr: A, x: T) => A = Constant.selfFn, resultSelector: (aggr: A) => B = Constant.selfFn): B {
        let zero: A;
        let method: (aggr: A, x: T) => A;
        let selector: (aggr: A) => B;
        if ("function" === typeof seed) {
            method = seed as any;
            selector = func as any;
        } else {
            zero = seed;
            method = func;
            selector = resultSelector;
        }
        var result: A = zero;
        var res: any, iterator: Iterator<T> = this[Symbol.iterator]();
        while (!(res = iterator.next()).done) {
            if (!result) result = Constant.getDefaultVal(typeof (res.value));
            result = method(result, res.value);
        }
        return selector(result);
    }


    public All(predicate: (x: T) => boolean = Constant.trueFn) {
        var result: any, iterator: Iterator<T> = this[Symbol.iterator]();
        while (!(result = iterator.next()).done) {
            if (!predicate(result.value)) {
                return false;
            }
        }
        return true;
    }


    public Any(predicate?: (x: T) => boolean) {
        var result: any, iterator: Iterator<T> = this[Symbol.iterator]();
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


    public Average(func: (x: T) => number = Constant.selfFn): number {
        var result: any, sum = 0, count = 0;
        var iterator = this[Symbol.iterator]();
        while (!(result = iterator.next()).done) {
            sum += func(result.value);
            count++;
        }
        return sum / count;
    }


    public Contains(value: T, equal: (a: T, b: T) => boolean = (a, b) => a === b): boolean {
        var result: any, iterator: Iterator<T> = this[Symbol.iterator]();
        while (!(result = iterator.next()).done) {
            if (equal(value, result.value)) {
                return true;
            }
        }
        return false;
    }


    public Count(predicate: (x: T) => boolean = Constant.trueFn): number {
        var result: any, count = 0;
        var iterator = this[Symbol.iterator]();
        while (!(result = iterator.next()).done) {
            if (predicate(result.value)) {
                count++;
            }
        }
        return count;
    }


    public Max(transform: (x: T) => number = Constant.selfFn): number {
        var result: any, value: number, max: number, hasValue = false;
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
        if (!hasValue) throw Constant.CONST_NO_ELEMENTS;
        return max;
    }


    public Min(transform: (x: T) => number = Constant.selfFn): number {
        var result: any, value: number, min: number, hasValue = false;
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
        if (!hasValue) throw Constant.CONST_NO_ELEMENTS;
        return min;
    }


    public ElementAt(index: number): T {
        var result: any, count = 0;
        var iterator = this[Symbol.iterator]();
        while (!(result = iterator.next()).done) {
            if (index === count++) {
                return result.value;
            }
        }
        throw "Argument Out Of Range";
    }


    public ElementAtOrDefault(index: number): T {
        var result: any, value: T, count = 0;
        var iterator = this[Symbol.iterator]();
        while (!(result = iterator.next()).done) {
            if (index === count++) {
                return result.value;
            }
            value = result.value;
        }
        return Constant.getDefaultVal(typeof value, value); // Last good value
    }


    public First(predicate: (x: T) => boolean = Constant.trueFn): T {
        var result: any;
        var iterator = this[Symbol.iterator]();
        while (!(result = iterator.next()).done) {
            if (predicate(result.value)) {
                return result.value;
            }
        }
        throw Constant.CONST_NOTHING_FOUND;
    }


    public FirstOrDefault(predicate: (x: T) => boolean = Constant.trueFn): T {
        var result: any, value: T;
        var iterator = this[Symbol.iterator]();
        while (!(result = iterator.next()).done) {
            value = result.value;
            if (predicate(value)) {
                return result.value;
            }
        }
        return Constant.getDefaultVal(typeof value); // Last good value
    }


    public Last(predicate: (x: T) => boolean = Constant.trueFn): T {
        var result: any, value: T, found = false;
        var iterator = this[Symbol.iterator]();
        while (!(result = iterator.next()).done) {
            if (predicate(result.value)) {
                value = result.value;
                found = true;
            }
        }
        if (!found) {
            throw Constant.CONST_NOTHING_FOUND;
        }
        return value;
    }


    public LastOrDefault(predicate: (x: T) => boolean = Constant.trueFn): T {
        var result: any, value: T, lastKnown: T, found = false;
        var iterator = this[Symbol.iterator]();
        while (!(result = iterator.next()).done) {
            if (predicate(result.value)) {
                value = result.value;
                found = true;
            }
            lastKnown = result.value;
        }
        return (found) ? value : Constant.getDefaultVal(typeof lastKnown);
    }


    public SequenceEqual(other: Iterable<T>, equal: (a: T, b: T) => boolean = (a, b) => a === b): boolean {
        var res1: any, res2: any;
        var it1 = this[Symbol.iterator]();
        var it2 = other[Symbol.iterator]();
        do {
            res1 = it1.next(); res2 = it2.next();
            if (res1.done && res2.done) return true;
            if ((res1.done != res2.done) || !equal(res1.value, res2.value)) {
                return false;
            }
        } while (true);
    }


    public Single(predicate: (x: T) => boolean = Constant.trueFn): T {
        var value: T, hasValue = false;
        var result: any, iterator = this[Symbol.iterator]();
        while (!(result = iterator.next()).done) {
            if (predicate(result.value)) {
                if (!hasValue) {
                    value = result.value;
                    hasValue = true;
                }
                else {
                    throw Constant.CONST_TOO_MANY;
                }
            }
        }
        if (hasValue) return value;
        throw Constant.CONST_NOTHING_FOUND;
    }


    public SingleOrDefault<TSource>(predicate: (x: T) => boolean = Constant.trueFn): T {
        var value: T, lastKnown: T, hasValue = false;
        var result: any, iterator = this[Symbol.iterator]();
        while (!(result = iterator.next()).done) {
            if (predicate(result.value)) {
                if (!hasValue) {
                    value = result.value;
                    hasValue = true;
                }
                else {
                    throw Constant.CONST_TOO_MANY;
                }
            }
            lastKnown = result.value;
        }
        return (hasValue) ? value : Constant.getDefaultVal(typeof lastKnown);
    }


    public Sum(transform: (x: T) => number = Constant.selfFn): number {
        var result: any, sum: number = 0;
        var iterator = this[Symbol.iterator]();
        while (!(result = iterator.next()).done) {
            sum += transform(result.value);
        }
        return sum;
    }


    public ToArray(): Array<T> {
        var result: any, array: Array<T> = [];
        var iterator = this[Symbol.iterator]();
        while (!(result = iterator.next()).done) {
            array.push(result.value);
        }
        return array;
    }


    public ToMap<TKey, TElement>(keySelector: (x: T) => TKey,
        elementSelector: (x: T) => TElement = Constant.selfFn): Map<TKey, TElement> {
        var dictionary = new Map<TKey, TElement>();
        var result: any, iterator = this[Symbol.iterator]();
        while (!(result = iterator.next()).done) {
            dictionary.set(keySelector(result.value), elementSelector(result.value));
        }
        return dictionary;
    }


    public ToDictionary<TKey, TElement>(keySelector: (x: T) => TKey,
        elementSelector: (x: T) => TElement = Constant.selfFn): Map<TKey, TElement> {
        var dictionary = new Map<TKey, TElement>();
        var result: any, iterator = this[Symbol.iterator]();
        while (!(result = iterator.next()).done) {
            dictionary.set(keySelector(result.value), elementSelector(result.value));
        }
        return dictionary;
    }



    //-------------------------------------------------------------------------
    //  Deferred execution methods
    //-------------------------------------------------------------------------



    public DefaultIfEmpty(defaultValue: T = undefined): Enumerable<T> {
        return new EnumerableImpl<T>(this, () => new Iterator.DefaultIfEmpty(this[Symbol.iterator](), defaultValue));
    }


    public Cast<V>(): Enumerable<V> {
        return this as any as Enumerable<V>;    // TODO: Remove any once TypeScript 2.0 out
    }


    public Concat<T>(second: Iterable<T>): Enumerable<T> {
        var aggregate = [this._target, second];
        return new EnumerableImpl<T>(this, () => new Iterator.SelectMany(aggregate[Symbol.iterator](), Constant.selfFn));
    }


    public ChunkBy<K, E, V>(keySelect: (x: T, i: number) => K,
        elementSelector: (x: T) => E = Constant.selfFn,
        resultSelector: (a: K, b: Iterable<E>) => V = (a, b) => b as any):
        Enumerable<V> {
        return new EnumerableImpl<V>(this, () => new Iterator.ChunkBy<T, K, E, V>(this[Symbol.iterator](), keySelect, elementSelector, resultSelector));
    }


    public Distinct<V>(keySelector: (x: T) => V = Constant.selfFn): Enumerable<T> {
        return new EnumerableImpl<T>(this, () => new Iterator.Distinct(this[Symbol.iterator](), keySelector));
    }

    public Except<K>(other: Iterable<T>, kesSelector?: (x: T) => K): Enumerable<T> {
        return new EnumerableImpl<T>(this, () => new Iterator.Intersect<T, K>(this[Symbol.iterator](), Constant.getKeys(other, kesSelector), true, kesSelector));
    }


    public GroupBy<K, E, R>(selKey: (x: T) => K, selElement: (x: T) => E = Constant.selfFn,
        selResult: (a: K, b: Iterable<E>) => R = Constant.defGrouping): Enumerable<R> {
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
        var factory = () => new Iterator.GroupBy(_map.keys(), selResult, _map);
        var tst = factory();

        return new EnumerableImpl<R>(this, () => new Iterator.GroupBy(_map.keys(), selResult, _map));
    }


    public GroupJoin<I, K, R>(inner: Iterable<I>, oKeySelect: (x: T) => K,
        iKeySelect: (x: I) => K,
        resultSelector: (a: T, b: Iterable<I>) => R
            = Constant.defGrouping): Enumerable<R> {
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
        return new EnumerableImpl<R>(this, () => new Iterator.GroupJoin(this[Symbol.iterator](),
            oKeySelect, resultSelector, _map));
    }


    public Intersect<K>(other: Iterable<T>, kesSelector?: (x: T) => K): Enumerable<T> {
        return new EnumerableImpl<T>(this, () => new Iterator.Intersect<T, K>(this[Symbol.iterator](), Constant.getKeys(other, kesSelector), false, kesSelector));
    }


    public Join<I, TKey, R>(inner: Iterable<I>, oSelector: (x: T) => TKey,
        iSelector: (i: I) => TKey, transform: (x: T, i: I) => R): Enumerable<R> {
        return new EnumerableImpl<R>(this, () => new Iterator.Join<T, I, TKey, R>(
            this[Symbol.iterator](), inner[Symbol.iterator](),
            oSelector, iSelector, transform));
    }


    public OfType(obj: any): Enumerable<T> {
        let typeName: string;
        switch (obj) {
            case Number:
                return new EnumerableImpl<T>(this,
                    () => new Iterator.OfValueType(this[Symbol.iterator](), 
                                                            obj,
                                                            Constant.CONST_NUMBER));
            case Boolean:
                return new EnumerableImpl<T>(this,
                   () => new Iterator.OfValueType(this[Symbol.iterator](), 
                                                        obj,
                                                        Constant.CONST_BOOLEAN));
            case String:
                return new EnumerableImpl<T>(this,
                   () => new Iterator.OfValueType(this[Symbol.iterator](), 
                                                        obj,
                                                        Constant.CONST_STRING));
            case Symbol:
                return new EnumerableImpl<T>(this,
                   () => new Iterator.OfValueType(this[Symbol.iterator](), 
                                                        obj,
                                                        Constant.CONST_SYMBOL));
        }
            
        return new EnumerableImpl<T>(this,
                   () => new Iterator.OfType(this[Symbol.iterator](), 
                                                    obj));
    }


    public OrderBy<K>(keySelect: (x: T) => K, equal: (a: K, b: K) => number): Enumerable<T> {
        var comparer = equal ? equal : Constant.defCompare;
        var compare = !keySelect && !equal ? undefined
                                           : keySelect ? (a: T, b: T) => comparer(keySelect(a), keySelect(b)) : (a: any, b: any) => comparer(a, b);
        return new OrderedLinq<T>(this,
            (array: Array<T>) => new Iterator.ArrayIterator(array, 0, (i: number) => i >= array.length), compare);
    }

    public OrderByDescending<K>(keySelect: (x: T) => K, equal: (a: K, b: K) => number): Enumerable<T> {
        var comparer = equal ? equal : Constant.defCompare;
        var compare = !keySelect && !equal ? undefined
                                           : keySelect ? (a: T, b: T) => comparer(keySelect(a), keySelect(b)) : (a: any, b: any) => comparer(a, b);
        return new OrderedLinq<T>(this,
            (array: Array<T>) => new Iterator.ArrayIterator(array, array.length - 1, (i: number) => 0 > i, -1), compare);
    }


    public ThenBy<K>(keySelect: (x: T) => K, equal: (a: K, b: K) => number): Enumerable<T> {
        var comparer = equal ? equal : Constant.defCompare;
        var compare = !keySelect && !equal ? undefined
                                           : keySelect ? (a: T, b: T) => comparer(keySelect(a), keySelect(b)) : (a: any, b: any) => comparer(a, b);
        if (this instanceof OrderedLinq) {
            if (!compare) return this;   

            if (!(<OrderedLinq<T>><any>this).equal) {
                (<OrderedLinq<T>><any>this).equal = compare;
            } else {
                let superEqual = (<OrderedLinq<T>><any>this).equal;
                (<OrderedLinq<T>><any>this).equal = (a: T, b: T) => {
                    let result: number = superEqual(a, b);
                    return (0 != result) ? result : compare(a, b);
                }
            }
            return this;
        } else {
            return new OrderedLinq<T>(this,
                (array: Array<T>) => new Iterator.ArrayIterator(array, 0, (i: number) => i >= array.length),
                (a: T, b: T) => equal(keySelect(a), keySelect(b)));
        }
    }


    public ThenByDescending<K>(keySelect: (x: T) => K, equal: (a: K, b: K) => number): Enumerable<T> {
        var comparer = equal ? equal : Constant.defCompare;
        var compare = !keySelect && !equal ? undefined
                                           : keySelect ? (a: T, b: T) => comparer(keySelect(a), keySelect(b)) : (a: any, b: any) => comparer(a, b);
        if (this instanceof OrderedLinq) {
            if (!compare) return this;   

            if (!(<OrderedLinq<T>><any>this).equal) {
                (<OrderedLinq<T>><any>this).equal = compare;
            } else {
                let superEqual = (<OrderedLinq<T>><any>this).equal;
                (<OrderedLinq<T>><any>this).equal = (a: T, b: T) => {
                    let result: number = superEqual(a, b);
                    return (0 != result) ? result : compare(a, b);
                }
            }
            return this;
        } else {
            return new OrderedLinq<T>(this,
                (array: Array<T>) => new Iterator.ArrayIterator(array, array.length - 1, (i: number) => 0 > i, -1),
                (a: T, b: T) => equal(keySelect(a), keySelect(b)));
        }
    }


    public Range(start: number, count: number): Enumerable<number> {
        return new EnumerableImpl<number>(null, () => new Iterator.Generator(start, count, true));
    }


    public Repeat(element: T, count: number): Enumerable<T> {
        return new EnumerableImpl<T>(null, () => new Iterator.Generator(element, count));
    }


    public Reverse(): Enumerable<T> {
        var array: Array<T> = Array.isArray(this._target) ? <Array<T>>this._target : this.ToArray();
        return new EnumerableImpl<T>(null, () => new Iterator.ArrayIterator(array, array.length - 1, (i: number) => 0 > i, -1));
    }


    public Select<V>(transform: (x: T, i?: number) => V): Enumerable<V> {
        return new EnumerableImpl<V>(this, () => new Iterator.Select(this[Symbol.iterator](), transform));
    }


    public SelectMany<S, V>(selector: (x: T, i: number) => Iterable<S> = Constant.selfFn, result: (x: T, s: S) => V = (x, s) => s as any as V): Enumerable<V> {
        return new EnumerableImpl<V>(this, () => new Iterator.SelectMany(this[Symbol.iterator](), selector, result));
    }


    public Skip(skip: number): Enumerable<T> {
        return new EnumerableImpl<T>(this, () => {
            let iterator = this[Symbol.iterator]();
            let i = 0;
            while (i < skip && !(iterator.next().done)) { i++; }
            return new Iterator.Where(iterator, Constant.trueFn);
        });
    }


    public SkipWhile(predicate: (x: T, i: number) => boolean = (a, n) => false): Enumerable<T> {
        return new EnumerableImpl<T>(this, () => new Iterator.Skip(this[Symbol.iterator](), predicate));
    }


    public Take(take: number): Enumerable<T> {
        return new EnumerableImpl<T>(this, () => new Iterator.Take(this[Symbol.iterator](), (a: T, n: number) => take > n));
    }


    public TakeWhile(predicate: (x: T, i: number) => boolean): Enumerable<T> {
        return new EnumerableImpl<T>(this, () => new Iterator.Take(this[Symbol.iterator](), predicate));
    }


    public Union<K>(second: Iterable<T>, keySelector: (x: T) => K = Constant.selfFn): Enumerable<T> {
        var aggregate = [this._target, second];
        return new EnumerableImpl<T>(this, () => new Iterator.Union<T,K>((aggregate as any)[Symbol.iterator](), keySelector));
    }


    public Where(predicate: (x: T, i?: number) => Boolean = Constant.trueFn): Enumerable<T> {
        return new EnumerableImpl<T>(this, () => new Iterator.Where(this[Symbol.iterator](), predicate));
    }


    public Zip<V, Z>(second: Iterable<V>, func: (x: T, y: V) => Z): Enumerable<Z> {
        return new EnumerableImpl<Z>(this, () => new Iterator.Zip(this[Symbol.iterator](), second[Symbol.iterator](), func));
    }
}


class OrderedLinq<T> extends EnumerableImpl<T> {

    constructor(target: Iterable<any> | IEnumerable<any>, factory: Function, public equal: Function) {
        super(target, factory);

    }
    public [Symbol.iterator](): Iterator<T> {
        if ('undefined' === typeof this._factoryArg) {
            this._factoryArg = (<EnumerableImpl<T>>this._target).ToArray();
            if (this.equal) {
                this._factoryArg.sort(this.equal);
            } else {
                this._factoryArg.sort();
            }
        }
        return this._factory(this._factoryArg);
    }

}


