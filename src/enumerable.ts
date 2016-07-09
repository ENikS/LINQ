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


import * as Constant from "./utilities";
import * as Iterator from "./iterators";


//-----------------------------------------------------------------------------
//  Enumerable Implementation
//-----------------------------------------------------------------------------


export class EnumerableImpl<T> implements Enumerable<T>, Iterable<T>, IEnumerable<T> {

    protected _target: Iterable<T> | IEnumerable<T> | string;
    protected _factory: Function;
    protected _factoryArg: any;
    protected _initialize: Function;

    ///////////////////////////////////////////////////////////////////////////

    constructor(target: Iterable<any> | IEnumerable<any> | string, factory?: Function, arg?: any) {
        this._target = target;
        this._factory = factory;
        this._factoryArg = arg;
    }

    ///////////////////////////////////////////////////////////////////////////

    /** Returns JavaScript iterator */
    public [Symbol.iterator](): Iterator<T> {
        return (this._factory) ? this._factory(this._factoryArg)
            : (null != this._target) ? this._target[Symbol.iterator]()
                : { next: () => { return { done: true, value: undefined }; } };
    }

    /** Returns C# style enumerator */
    public GetEnumerator(): IEnumerator<T> {
        return new Iterator.CSharpEnumerator<T>(this[Symbol.iterator]());
    }



    //-------------------------------------------------------------------------
    //  Immediate execution methods                                                                                            
    //-------------------------------------------------------------------------


    public Aggregate<A, B>(func: (A, T) => A, resultSelector: (A) => B): B;
    public Aggregate<A, B>(seed: A, func: (A, T) => A = Constant.selfFn, resultSelector: (A) => B = Constant.selfFn): B {
        let zero, method, selector;
        if ("function" === typeof seed) {
            method = seed;
            selector = func;
        } else {
            zero = seed;
            method = func;
            selector = resultSelector;
        }
        var result: A = zero;
        var res, iterator: Iterator<T> = this[Symbol.iterator]();
        while (!(res = iterator.next()).done) {
            if (!result) result = Constant.getDefaultVal(typeof (res.value));
            result = method(result, res.value);
        }
        return selector(result);
    }


    public All(predicate: (T) => boolean = Constant.trueFn) {
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


    public Average(func: (T) => number = Constant.selfFn): number {
        var result, sum = 0, count = 0;
        var iterator = this[Symbol.iterator]();
        while (!(result = iterator.next()).done) {
            sum += func(result.value);
            count++;
        }
        return sum / count;
    }


    public Contains(value: T, equal: (a: T, b: T) => boolean = (a, b) => a === b): boolean {
        var result, iterator: Iterator<T> = this[Symbol.iterator]();
        while (!(result = iterator.next()).done) {
            if (equal(value, result.value)) {
                return true;
            }
        }
        return false;
    }


    public Count(predicate: (T) => boolean = Constant.trueFn): number {
        var result, count = 0;
        var iterator = this[Symbol.iterator]();
        while (!(result = iterator.next()).done) {
            if (predicate(result.value)) {
                count++;
            }
        }
        return count;
    }


    public Max(transform: (T) => number = Constant.selfFn): number {
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
        if (!hasValue) throw Constant.noElements;
        return max;
    }


    public Min(transform: (T) => number = Constant.selfFn): number {
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
        if (!hasValue) throw Constant.noElements;
        return min;
    }


    public ElementAt(index: number): T {
        var result, count = 0;
        var iterator = this[Symbol.iterator]();
        while (!(result = iterator.next()).done) {
            if (index === count++) {
                return result.value;
            }
        }
        throw "Argument Out Of Range";
    }


    public ElementAtOrDefault(index: number): T {
        var result, value, count = 0;
        var iterator = this[Symbol.iterator]();
        while (!(result = iterator.next()).done) {
            if (index === count++) {
                return result.value;
            }
            value = result.value;
        }
        return Constant.getDefaultVal(typeof value, value); // Last good value
    }


    public First(predicate: (T) => boolean = Constant.trueFn): T {
        var result;
        var iterator = this[Symbol.iterator]();
        while (!(result = iterator.next()).done) {
            if (predicate(result.value)) {
                return result.value;
            }
        }
        throw Constant.nothingFound;
    }


    public FirstOrDefault(predicate: (T) => boolean = Constant.trueFn): T {
        var result, value;
        var iterator = this[Symbol.iterator]();
        while (!(result = iterator.next()).done) {
            value = result.value;
            if (predicate(value)) {
                return result.value;
            }
        }
        return Constant.getDefaultVal(typeof value); // Last good value
    }


    public Last(predicate: (T) => boolean = Constant.trueFn): T {
        var result, value, found = false;
        var iterator = this[Symbol.iterator]();
        while (!(result = iterator.next()).done) {
            if (predicate(result.value)) {
                value = result.value;
                found = true;
            }
        }
        if (!found) {
            throw Constant.nothingFound;
        }
        return value;
    }


    public LastOrDefault(predicate: (T) => boolean = Constant.trueFn): T {
        var result, value, lastKnown, found = false;
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


    public Single(predicate: (T) => boolean = Constant.trueFn): T {
        var value, hasValue = false;
        var result, iterator = this[Symbol.iterator]();
        while (!(result = iterator.next()).done) {
            if (predicate(result.value)) {
                if (!hasValue) {
                    value = result.value;
                    hasValue = true;
                }
                else {
                    throw Constant.tooMany;
                }
            }
        }
        if (hasValue) return value;
        throw Constant.nothingFound;
    }


    public SingleOrDefault<TSource>(predicate: (T) => boolean = Constant.trueFn): T {
        var value, lastKnown, hasValue = false;
        var result, iterator = this[Symbol.iterator]();
        while (!(result = iterator.next()).done) {
            if (predicate(result.value)) {
                if (!hasValue) {
                    value = result.value;
                    hasValue = true;
                }
                else {
                    throw Constant.tooMany;
                }
            }
            lastKnown = result.value;
        }
        return (hasValue) ? value : Constant.getDefaultVal(typeof lastKnown);
    }


    public Sum(transform: (T) => number = Constant.selfFn): number {
        var result, sum: number = 0;
        var iterator = this[Symbol.iterator]();
        while (!(result = iterator.next()).done) {
            sum += transform(result.value);
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


    public ToMap<TKey, TElement>(keySelector: (T) => TKey,
        elementSelector: (T) => TElement = Constant.selfFn): Map<TKey, TElement> {
        var dictionary = new Map<TKey, TElement>();
        var result, iterator = this[Symbol.iterator]();
        while (!(result = iterator.next()).done) {
            dictionary.set(keySelector(result.value), elementSelector(result.value));
        }
        return dictionary;
    }


    public ToDictionary<TKey, TElement>(keySelector: (T) => TKey,
        elementSelector: (T) => TElement = Constant.selfFn): Map<TKey, TElement> {
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



    public DefaultIfEmpty(defaultValue: T = undefined): Enumerable<T> {
        return new EnumerableImpl<T>(this, () => new Iterator.DefaultIfEmptyIteratror(this[Symbol.iterator](), defaultValue));
    }


    public Cast<V>(): Enumerable<V> {
        return this as any as Enumerable<V>;    // TODO: Remove any once TypeScript 2.0 out
    }


    public Concat(second: Iterable<T>): Enumerable<T> {
        var aggregate = [this._target, second];
        return new EnumerableImpl<T>(this, () => new Iterator.SelectManyIteratror(aggregate[Symbol.iterator](), Constant.selfFn));
    }


    public Distinct<V>(keySelector: (T) => V = Constant.selfFn): Enumerable<T> {
        return new EnumerableImpl<T>(this, () => new Iterator.DistinctIteratror(this[Symbol.iterator](), keySelector));
    }

    public Except(other: Iterable<T>): Enumerable<T> {
        var _set: Set<T> = new Set<T>();
        var result, otherIterator = other[Symbol.iterator]();
        while (!(result = otherIterator.next()).done) {
            _set.add(result.value);
        }
        return new EnumerableImpl<T>(this, () => new Iterator.IntersectIteratror(this[Symbol.iterator](), _set, true));
    }


    public GroupBy<K, E, R>(selKey: (T) => K, selElement: (T) => E = Constant.selfFn,
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
        var factory = () => new Iterator.GroupByIteratror(_map.keys(), selResult, _map);
        var tst = factory();

        return new EnumerableImpl<R>(this, () => new Iterator.GroupByIteratror(_map.keys(), selResult, _map));
    }


    public GroupJoin<I, K, R>(inner: Iterable<I>, oKeySelect: (T) => K,
        iKeySelect: (I) => K,
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
        return new EnumerableImpl<R>(this, () => new Iterator.GroupJoinIteratror(this[Symbol.iterator](),
            oKeySelect, resultSelector, _map));
    }


    public Intersect(other: Iterable<T>): Enumerable<T> {
        var _set: Set<T> = new Set<T>();
        var result, otherIterator = other[Symbol.iterator]();
        while (!(result = otherIterator.next()).done) {
            _set.add(result.value);
        }
        return new EnumerableImpl<T>(this, () => new Iterator.IntersectIteratror(this[Symbol.iterator](), _set));
    }


    public Join<I, TKey, R>(inner: Iterable<I>, oSelector: (T) => TKey,
        iSelector: (I) => TKey, transform: (T, I) => R): Enumerable<R> {
        return new EnumerableImpl<R>(this, () => new Iterator.JoinIteratror<T, I, TKey, R>(
            this[Symbol.iterator](), inner[Symbol.iterator](),
            oSelector, iSelector, transform));
    }


    public OrderBy<K>(keySelect: (T) => K = Constant.selfFn, equal: (a: K, b: K) => number = (a, b) => <any>a - <any>b): Enumerable<T> {
        return new OrderedLinq<T>(this,
            (array) => new Iterator.ArrayIterator(array, 0, (i) => i >= array.length),
            (a: T, b: T) => equal(keySelect(a), keySelect(b)));
    }

    public OrderByDescending<K>(keySelect: (T) => K = Constant.selfFn, equal: (a: K, b: K) => number = (a, b) => <any>a - <any>b): Enumerable<T> {
        return new OrderedLinq<T>(this,
            (array) => new Iterator.ArrayIterator(array, array.length - 1, (i) => 0 > i, -1),
            (a: T, b: T) => equal(keySelect(a), keySelect(b)));
    }


    public ThenBy<K>(keySelect: (T) => K = Constant.selfFn, equal: (a: K, b: K) => number = (a, b) => <any>a - <any>b): Enumerable<T> {
        if (this instanceof OrderedLinq) {
            var superEqual = (<OrderedLinq<T>><any>this).equal;
            (<OrderedLinq<T>><any>this).equal = (a: T, b: T) => {
                var result: number = superEqual(a, b);
                return (0 != result) ? result : equal(keySelect(a), keySelect(b));
            }
            return this;
        } else {
            return new OrderedLinq<T>(this,
                (array) => new Iterator.ArrayIterator(array, 0, (i) => i >= array.length),
                (a: T, b: T) => equal(keySelect(a), keySelect(b)));
        }
    }


    public ThenByDescending<K>(keySelect: (T) => K = Constant.selfFn, equal: (a: K, b: K) => number = (a, b) => <any>a - <any>b): Enumerable<T> {
        if (this instanceof OrderedLinq) {
            var superEqual = (<OrderedLinq<T>><any>this).equal;
            (<OrderedLinq<T>><any>this).equal = (a: T, b: T) => {
                var result: number = superEqual(a, b);
                return (0 != result) ? result : equal(keySelect(a), keySelect(b));
            }
            return this;
        } else {
            return new OrderedLinq<T>(this,
                (array) => new Iterator.ArrayIterator(array, array.length - 1, (i) => 0 > i, -1),
                (a: T, b: T) => equal(keySelect(a), keySelect(b)));
        }
    }


    public Range(start: number, count: number): Enumerable<number> {
        return new EnumerableImpl<number>(null, () => new Iterator.GeneratorIterator(start, count, true));
    }


    public Repeat(element: T, count: number): Enumerable<T> {
        return new EnumerableImpl<T>(null, () => new Iterator.GeneratorIterator(element, count));
    }


    public Reverse(): Enumerable<T> {
        var array: Array<T> = Array.isArray(this._target) ? <Array<T>>this._target : this.ToArray();
        return new EnumerableImpl<T>(null, () => new Iterator.ArrayIterator(array, array.length - 1, (i) => 0 > i, -1));
    }


    public Select<V>(transform: (T, number?) => V): Enumerable<V> {
        return new EnumerableImpl<V>(this, () => new Iterator.SelectIteratror(this[Symbol.iterator](), transform));
    }


    public SelectMany<S, V>(selector: (T, number) => Iterable<S> = Constant.selfFn, result: (T, S) => V = (t, s) => s): Enumerable<V> {
        return new EnumerableImpl<V>(this, () => new Iterator.SelectManyIteratror(this[Symbol.iterator](), selector, result));
    }


    public Skip(skip: number): Enumerable<T> {
        var iterator = this[Symbol.iterator]();
        for (var i = 0; i < skip; i++) iterator.next();
        return new EnumerableImpl<T>(this, () => new Iterator.WhereIteratror(iterator, Constant.trueFn));
    }


    public SkipWhile(predicate: (T, number) => boolean = (a, n) => false): Enumerable<T> {
        return new EnumerableImpl<T>(this, () => new Iterator.SkipIterator(this[Symbol.iterator](), predicate));
    }


    public Take(take: number): Enumerable<T> {
        return new EnumerableImpl<T>(this, () => new Iterator.TakeIterator(this[Symbol.iterator](), (a, n) => take > n));
    }


    public TakeWhile(predicate: (T, number) => boolean): Enumerable<T> {
        return new EnumerableImpl<T>(this, () => new Iterator.TakeIterator(this[Symbol.iterator](), predicate));
    }


    public Union<K>(second: Iterable<T>, keySelector: (T) => K = Constant.selfFn): Enumerable<T> {
        var aggregate = [this._target, second];
        return new EnumerableImpl<T>(this, () => new Iterator.UnionIteratror(aggregate[Symbol.iterator](), keySelector));
    }


    public Where(predicate: (T, number?) => Boolean = Constant.trueFn): Enumerable<T> {
        return new EnumerableImpl<T>(this, () => new Iterator.WhereIteratror(this[Symbol.iterator](), predicate));
    }


    public Zip<V, Z>(second: Iterable<V>, func: (T, V) => Z): Enumerable<Z> {
        return new EnumerableImpl<Z>(this, () => new Iterator.ZipIteratror(this[Symbol.iterator](), second[Symbol.iterator](), func));
    }
}


class OrderedLinq<T> extends EnumerableImpl<T> {

    constructor(target: Iterable<any> | IEnumerable<any>, factory: Function, public equal: Function) {
        super(target, factory);

    }
    public [Symbol.iterator](): Iterator<T> {
        if ('undefined' === typeof this._factoryArg) {
            this._factoryArg = (<EnumerableImpl<T>>this._target).ToArray();
            this._factoryArg.sort(this.equal);
        }
        return this._factory(this._factoryArg);
    }

}



