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

    //-------------------------------------------------------------------------
    //  Fields
    //-------------------------------------------------------------------------

    protected _target: Iterable<T>;
    protected _factory: Function;
    protected _factoryArg: any;
    protected _initialize: Function;


    //-------------------------------------------------------------------------
    //  Constructor
    //-------------------------------------------------------------------------

    constructor(target: Iterable<any> | IEnumerable<any>, factory?: Function, arg?: any) {
        this._target = <Iterable<any>>target;
        this._factory = factory;
        this._factoryArg = arg;
    }

    ///////////////////////////////////////////////////////////////////////////

    /** Returns JavaScript iterator */
    public [Symbol.iterator](): Iterator<T> {
        return (null != this._factory) ? this._factory(this._factoryArg)
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



    Aggregate<A, B>(seed: A, func: (A, T) => A, resultSelector: (A) => B = Constant.selfFn): B {
        let result: A = seed;
        for (let value of this) {
            result = func(result, value);
        }
        return resultSelector(result);
    }


    public All(predicate: (T) => boolean = Constant.trueFn) {
        for (let value of this) {
            if (!predicate(value)) {
                return false;
            }
        }
        return true;
    }


    public Any(predicate?: (T) => boolean) {
        let iterator: Iterator<T>;
        // Check if at least one exist
        if (!predicate && (iterator = this._target[Symbol.iterator]())) {
            return !iterator.next().done;
        }
        // Check if any satisfy the criteria
        for (let value of this) {
            if (predicate(value)) {
                return true;
            }
        }
        return false;
    }


    Average(func: (T) => number = Constant.selfFn): number {
        let result, sum = 0, count = 0;
        for (let value of this) {
            sum += func(value);
            count++;
        }
        return sum / count;
    }


    Contains(value: T, equal: (a: T, b: T) => boolean = (a, b) => a === b): boolean {
        for (let item of this) {
            if (equal(item, value)) {
                return true;
            }
        }
        return false;
    }


    public Count(predicate: (T) => boolean = Constant.trueFn): number {
        let count = 0;
        for (let value of this) {
            if (predicate(value)) {
                count++;
            }
        }
        return count;
    }


    Max(transform: (T) => number = Constant.selfFn): number {
        let value, max, hasValue = false;
        for (let item of this) {
            value = transform(item);
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


    Min(transform: (T) => number = Constant.selfFn): number {
        let value, min, hasValue = false;
        for (let item of this) {
            value = transform(item);
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


    ElementAt(index: number): T {
        let count = 0;
        for (let value of this) {
            if (index > count++) {
                continue;
            }
            return value;
        }
        throw Constant.outOfRange;
    }


    ElementAtOrDefault(index: number): T {
        let value, count = 0;
        for (let item of this) {
            if (index === count++) {
                return item;
            }
            value = item;
        }
        return Constant.getDefaultVal(typeof value); // Last good value
    }


    First(predicate: (T) => boolean = Constant.trueFn): T {
        for (let value of this) {
            if (predicate(value)) {
                return value;
            }
        }
        throw Constant.nothingFound;
    }


    FirstOrDefault(predicate: (T) => boolean = Constant.trueFn): T {
        let value;
        for (let item of this) {
            value = item;
            if (predicate(item)) {
                return item;
            }
        }
        return Constant.getDefaultVal(typeof value); // Last good value
    }


    Last(predicate: (T) => boolean = Constant.trueFn): T {
        let value, found = false;
        for (let item of this) {
            if (predicate(item)) {
                value = item;
                found = true;
            }
        }
        if (!found) {
            throw Constant.nothingFound;
        }
        return value;
    }


    LastOrDefault(predicate: (T) => boolean = Constant.trueFn): T {
        let value, lastKnown, found = false;
        for (let item of this) {
            if (predicate(item)) {
                value = item;
                found = true;
            }
            lastKnown = item;
        }
        return (found) ? value : Constant.getDefaultVal(typeof lastKnown);
    }


    SequenceEqual(other: Iterable<T>, equal: (a: T, b: T) => boolean = (a, b) => a === b): boolean {
        let res1, res2;
        let it1 = this[Symbol.iterator]();
        let it2 = other[Symbol.iterator]();
        do {
            res1 = it1.next(); res2 = it2.next();
            if ((res1.done != res2.done) || !equal(res1.value, res2.value)) {
                return false;
            }
        } while (!(res1.done) && !(res2.done));
        return true;
    }


    Single(predicate: (T) => boolean = Constant.trueFn): T {
        let value, hasValue = false;
        for (let item of this) {
            if (predicate(item)) {
                if (!hasValue) {
                    value = item;
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


    SingleOrDefault<TSource>(predicate: (T) => boolean = Constant.trueFn): T {
        let value, lastKnown, hasValue = false;
        for (let item of this) {
            if (predicate(item)) {
                if (!hasValue) {
                    value = item;
                    hasValue = true;
                }
                else {
                    throw Constant.tooMany;
                }
            }
            lastKnown = item;
        }
        return (hasValue) ? value : Constant.getDefaultVal(typeof lastKnown);
    }


    Sum(transform: (T) => number = Constant.selfFn): number {
        let sum: number = 0;
        for (let value of this) {
            sum += transform(value);
        }
        return sum;
    }


    public ToArray(): Array<T> {
        let array = [];
        for (let value of this) {
            array.push(value);
        }
        return array;
    }


    ToMap<TKey, TElement>(keySelector: (T) => TKey,
        elementSelector: (T) => TElement = Constant.selfFn): Map<TKey, TElement> {
        let dictionary = new Map<TKey, TElement>();
        for (let value of this) {
            dictionary.set(keySelector(value), elementSelector(value));
        }
        return dictionary;
    }


    ToDictionary<TKey, TElement>(keySelector: (T) => TKey,
        elementSelector: (T) => TElement = Constant.selfFn): Map<TKey, TElement> {
        let dictionary = new Map<TKey, TElement>();
        for (let value of this) {
            dictionary.set(keySelector(value), elementSelector(value));
        }
        return dictionary;
    }



    //-------------------------------------------------------------------------
    //  Deferred execution methods
    //-------------------------------------------------------------------------



    DefaultIfEmpty(defaultValue: T = undefined): Enumerable<T> {
        return new EnumerableImpl<T>(this, () => new Iterator.DefaultIfEmptyIteratror(this._target[Symbol.iterator](), defaultValue));
    }


    Cast<V>(): Enumerable<V> {
        return new EnumerableImpl<V>(this, () => new Iterator.SelectIteratror(this._target[Symbol.iterator](), (a) => <V>a));
    }


    Concat(second: Iterable<T>): Enumerable<T> {
        let aggregate = [this._target, second];
        return new EnumerableImpl<T>(this, () => new Iterator.SelectManyIteratror(aggregate[Symbol.iterator](), Constant.selfFn, Constant.selfFn));
    }


    Distinct(): Enumerable<T> {
        return new EnumerableImpl<T>(this, () => new Iterator.DistinctIteratror(this._target[Symbol.iterator]()));
    }

    Except(other: Iterable<T>): Enumerable<T> {
        let _set: Set<T> = new Set<T>();
        let result, otherIterator = other[Symbol.iterator]();
        while (!(result = otherIterator.next()).done) {
            _set.add(result.value);
        }
        return new EnumerableImpl<T>(this, () => new Iterator.IntersectIteratror(this._target[Symbol.iterator](), _set, true));
    }


    GroupBy<K, E, R>(selKey: (T) => K, selElement: (T) => E,
        selResult: (a: K, b: Iterable<E>) => R
            = Constant.defGrouping): Enumerable<R> {
        let result: IteratorResult<T>;
        let iterator: Iterator<T> = this[Symbol.iterator]();
        let _map = new Map<K, Array<E>>();
        while (!(result = iterator.next()).done) {
            let key = selKey(result.value);
            let group: Array<E> = _map.get(key);
            if ('undefined' === typeof group) {
                group = [];
                _map.set(key, group);
            }
            group.push(selElement(result.value));
        }
        let factory = () => new Iterator.GroupByIteratror(_map.keys(), selResult, _map);
        let tst = factory();

        return new EnumerableImpl<R>(this, () => new Iterator.GroupByIteratror(_map.keys(), selResult, _map));
    }


    GroupJoin<I, K, R>(inner: Iterable<I>, oKeySelect: (T) => K,
        iKeySelect: (I) => K,
        resultSelector: (a: T, b: Iterable<I>) => R
            = Constant.defGrouping): Enumerable<R> {
        let _map = new Map<K, Array<I>>();
        let _inner = inner[Symbol.iterator]();
        let result: IteratorResult<I>;
        while (!(result = _inner.next()).done) {
            let key = iKeySelect(result.value);
            if ('undefined' === typeof key) throw "Inner Key selector returned undefined Key";
            let group: Array<I> = _map.get(key);
            if ('undefined' === typeof group) {
                group = [];
                _map.set(key, group);
            }
            group.push(result.value);
        }
        return new EnumerableImpl<R>(this, () => new Iterator.GroupJoinIteratror(this._target[Symbol.iterator](),
            oKeySelect, resultSelector, _map));
    }


    Intersect(other: Iterable<T>): Enumerable<T> {
        let _set: Set<T> = new Set<T>();
        let result, otherIterator = other[Symbol.iterator]();
        while (!(result = otherIterator.next()).done) {
            _set.add(result.value);
        }
        return new EnumerableImpl<T>(this, () => new Iterator.IntersectIteratror(this._target[Symbol.iterator](), _set));
    }


    Join<I, TKey, R>(inner: Iterable<I>, oSelector: (T) => TKey,
        iSelector: (I) => TKey, transform: (T, I) => R): Enumerable<R> {
        return new EnumerableImpl<R>(this, () => new Iterator.JoinIteratror<T, I, TKey, R>(
            this._target[Symbol.iterator](), inner[Symbol.iterator](),
            oSelector, iSelector, transform));
    }


    OrderBy<K>(keySelect: (T) => K = Constant.selfFn, equal: (a: K, b: K) => number = (a, b) => <any>a - <any>b): Enumerable<T> {
        return new OrderedLinq<T>(this,
            (array) => new Iterator.ArrayIterator(array, 0, (i) => i >= array.length),
            (a: T, b: T) => equal(keySelect(a), keySelect(b)));
    }

    OrderByDescending<K>(keySelect: (T) => K = Constant.selfFn, equal: (a: K, b: K) => number = (a, b) => <any>a - <any>b): Enumerable<T> {
        return new OrderedLinq<T>(this,
            (array) => new Iterator.ArrayIterator(array, array.length - 1, (i) => 0 > i, -1),
            (a: T, b: T) => equal(keySelect(a), keySelect(b)));
    }


    ThenBy<K>(keySelect: (T) => K = Constant.selfFn, equal: (a: K, b: K) => number = (a, b) => <any>a - <any>b): Enumerable<T> {
        if (this instanceof OrderedLinq) {
            let superEqual = (<OrderedLinq<T>><any>this).equal;
            (<OrderedLinq<T>><any>this).equal = (a: T, b: T) => {
                let result: number = superEqual(a, b);
                return (0 != result) ? result : equal(keySelect(a), keySelect(b));
            }
            return this;
        } else {
            return new OrderedLinq<T>(this,
                (array) => new Iterator.ArrayIterator(array, 0, (i) => i >= array.length),
                (a: T, b: T) => equal(keySelect(a), keySelect(b)));
        }
    }


    ThenByDescending<K>(keySelect: (T) => K = Constant.selfFn, equal: (a: K, b: K) => number = (a, b) => <any>a - <any>b): Enumerable<T> {
        if (this instanceof OrderedLinq) {
            let superEqual = (<OrderedLinq<T>><any>this).equal;
            (<OrderedLinq<T>><any>this).equal = (a: T, b: T) => {
                let result: number = superEqual(a, b);
                return (0 != result) ? result : equal(keySelect(a), keySelect(b));
            }
            return this;
        } else {
            return new OrderedLinq<T>(this,
                (array) => new Iterator.ArrayIterator(array, array.length - 1, (i) => 0 > i, -1),
                (a: T, b: T) => equal(keySelect(a), keySelect(b)));
        }
    }


    Range<T>(start: T, count: number): Enumerable<T> {
        return new EnumerableImpl<T>(null, () => new Iterator.GeneratorIterator(start, count, true));
    }


    Repeat(element: T, count: number): Enumerable<T> {
        return new EnumerableImpl<T>(null, () => new Iterator.GeneratorIterator(element, count));
    }


    Reverse(): Enumerable<T> {
        let array: Array<T> = Array.isArray(this._target) ? <Array<T>>this._target : this.ToArray();
        return new EnumerableImpl<T>(null, () => new Iterator.ArrayIterator(array, array.length - 1, (i) => 0 > i, -1));
    }


    Select<V>(transform: (T, number?) => V): Enumerable<V> {
        return new EnumerableImpl<V>(this, () => new Iterator.SelectIteratror(this._target[Symbol.iterator](), transform));
    }


    SelectMany<S, V>(selector: (T, number) => Iterable<S> = Constant.selfFn, result: (T, S) => V = Constant.selfFn): Enumerable<V> {
        return new EnumerableImpl<V>(this, () => new Iterator.SelectManyIteratror(this._target[Symbol.iterator](), selector, result));
    }


    Skip(skip: number): Enumerable<T> {
        let iterator = this._target[Symbol.iterator]();
        for (let i = 0; i < skip; i++) iterator.next();
        return new EnumerableImpl<T>(this, () => new Iterator.WhereIteratror(iterator, Constant.trueFn));
    }


    SkipWhile(predicate: (T, number) => boolean = (a, n) => false): Enumerable<T> {
        return new EnumerableImpl<T>(this, () => new Iterator.SkipIterator(this._target[Symbol.iterator](), predicate));
    }


    Take(take: number): Enumerable<T> {
        return new EnumerableImpl<T>(this, () => new Iterator.TakeIterator(this._target[Symbol.iterator](), (a, n) => take > n));
    }


    TakeWhile(predicate: (T, number) => boolean): Enumerable<T> {
        return new EnumerableImpl<T>(this, () => new Iterator.TakeIterator(this._target[Symbol.iterator](), predicate));
    }


    Union(second: Iterable<T>): Enumerable<T> {
        let aggregate = [this._target, second];
        return new EnumerableImpl<T>(this, () => new Iterator.UnionIteratror(aggregate[Symbol.iterator]()));
    }


    public Where(predicate: (T, number?) => Boolean = Constant.trueFn): Enumerable<T> {
        return new EnumerableImpl<T>(this, () => new Iterator.WhereIteratror(this._target[Symbol.iterator](), predicate));
    }


    Zip<V, Z>(second: Iterable<V>, func: (T, V) => Z): Enumerable<Z> {
        return new EnumerableImpl<Z>(this, () => new Iterator.ZipIteratror(this._target[Symbol.iterator](), second[Symbol.iterator](), func));
    }
}


export class OrderedLinq<T> extends EnumerableImpl<T> {

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
