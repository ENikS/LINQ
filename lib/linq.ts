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


import * as Generator from "./generators";
import * as Constant from "./utilities";
import * as Iterator from "./iterators";
import {Enumerable, IEnumerable, IEnumerator} from "./enumerable";


//-----------------------------------------------------------------------------
//  Implementation of EnumerableConstructor interface
//-----------------------------------------------------------------------------


/**
* Converts any Iterable<T> object into LINQ-able object
* @param TSource An Array, Map, Set, String or other Iterable object.
*/
function getEnumerable<T>(TSource: Iterable<T> | IEnumerable<T> = null): Enumerable<T> {
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
function getRange(start: number, count: number): Enumerable<number> {
    return new EnumerableImpl<number>(Generator.Range(start, count));
}


/**
* Repeat element <start> of type T <count> of times.
* @param start First value in sequence.
* @param count Number of elements to iteratel.
* @example
*     var sum = Repeat("v", 7);
*/
function getRepeat<T>(value: T, count: number): Enumerable<T> {
    return new EnumerableImpl<T>(Generator.Repeat(value, count));
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
    getRange as range,
    getRange as Range,
    getRepeat as repeat,
    getRepeat as Repeat,
    Enumerable,
    IEnumerable,
    IEnumerator
};



//-----------------------------------------------------------------------------
//  Enumerable Implementation
//-----------------------------------------------------------------------------


class EnumerableImpl<T> implements Enumerable<T>, Iterable<T>, IEnumerable<T> {

    //-------------------------------------------------------------------------
    //  Fields
    //-------------------------------------------------------------------------

    protected _target: Iterable<any>;
    protected _factory: Function;
    protected _factoryArg: any;


    constructor(target: Iterable<any> | IEnumerable<any>, factory?: Function, arg?: any) {
        this._target = <Iterable<any>>target;
        this._factory = factory;
        this._factoryArg = arg;

        // JavaScript naming convention
        this['aggregate'] = this.Aggregate;
        this['all'] = this.All;
        this['any'] = this.Any;
        this['average'] = this.Average;
        this['contains'] = this.Contains;
        this['count'] = this.Count;
        this['max'] = this.Max;
        this['min'] = this.Min;
        this['elementAt'] = this.ElementAt;
        this['elementAtOrDefault'] = this.ElementAtOrDefault;
        this['first'] = this.First;
        this['firstOrDefault'] = this.FirstOrDefault;
        this['last'] = this.Last;
        this['lastOrDefault'] = this.LastOrDefault;
        this['sequenceEqual'] = this.SequenceEqual;
        this['single'] = this.Single;
        this['singleOrDefault'] = this.SingleOrDefault;
        this['sum'] = this.Sum;
        this['toArray'] = this.ToArray;
        this['toMap'] = this.ToMap;
        this['toDictionary'] = this.ToDictionary;
        this['defaultIfEmpty'] = this.DefaultIfEmpty;
        this['concat'] = this.Concat;
        this['distinct'] = this.Distinct;
        this['except'] = this.Except;
        this['groupBy'] = this.GroupBy;
        this['groupJoin'] = this.GroupJoin;
        this['intersect'] = this.Intersect;
        this['join'] = this.Join;
        this['orderBy'] = this.OrderBy;
        this['orderByDescend'] = this.OrderByDescending;
        this['thenBy'] = this.ThenBy;
        this['thenByDescendi'] = this.ThenByDescending;
        this['range'] = this.Range;
        this['repeat'] = this.Repeat;
        this['reverse'] = this.Reverse;
        this['select'] = this.Select;
        this['selectMany'] = this.SelectMany;
        this['skip'] = this.Skip;
        this['skipWhile'] = this.SkipWhile;
        this['take'] = this.Take;
        this['takeWhile'] = this.TakeWhile;
        this['union'] = this.Union;
        this['where'] = this.Where;
        this['zip'] = this.Zip;
    }

    ///////////////////////////////////////////////////////////////////////////

    /** Returns JavaScript iterator */
    public [Symbol.iterator](): Iterator<T> {
        return (null != this._factory) ? this._factory(this._factoryArg)
            : this._target[Symbol.iterator]();
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
        if (Constant.CONST_FUNCTION === typeof seed) {
            method = seed;
            selector = func;
        } else {
            zero = seed;
            method = func;
            selector = resultSelector;
        }
        let result: A = zero;
        for (let value of this) {
            if (!result) result = Constant.getDefaultVal(typeof (value));
            result = method(result, value);
        }
        return selector(result);
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


    public Average(func: (T) => number = Constant.selfFn): number {
        let result, sum = 0, count = 0;
        for (let value of this) {
            sum += func(value);
            count++;
        }
        return sum / count;
    }


    public Contains(value: T, equal: (a: T, b: T) => boolean = (a, b) => a === b): boolean {
        for (let item of this) {
            if (equal(item, value)) {
                return true;
            }
        }
        return false;
    }


    public Count(predicate: (T) => boolean): number {
        let count = 0;
        if (predicate) {
            for (let value of this) {
                if (predicate(value)) {
                    count++;
                }
            }
        } else if (undefined != this._target[Constant.CONST_LENGTH]) {
            count = this._target[Constant.CONST_LENGTH];
        } else {
            for (let value of this) {
                count++;
            }
        }
        return count;
    }


    public Max(transform: (T) => number = Constant.selfFn): number {
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
        if (!hasValue) throw Constant.CONST_NO_ELEMENTS;
        return max;
    }


    public Min(transform: (T) => number = Constant.selfFn): number {
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
        if (!hasValue) throw Constant.CONST_NO_ELEMENTS;
        return min;
    }


    public ElementAt(index: number): T {
        if (Array.isArray(this._target)) {
            if (0 > index || this._target[Constant.CONST_LENGTH] <= index) {
                throw Constant.CONST_OUTOFRANGE;
            }
            return this._target[index];
        }
        let count = 0;
        for (let value of this) {
            if (index > count++) {
                continue;
            }
            return value;
        }
        throw Constant.CONST_OUTOFRANGE;
    }


    public ElementAtOrDefault(index: number): T {
        if (Array.isArray(this._target)) {
            let length = this._target[Constant.CONST_LENGTH];
            if (0 > index || length <= index) {
                let value = this._target[0];
                return 0 < length ? Constant.getDefaultVal(typeof (value), value)
                    : undefined;
            }
            return this._target[index];
        }
        let value, count = 0;
        for (let item of this) {
            if (index === count++) {
                return item;
            }
            value = item;
        }
        return Constant.getDefaultVal(typeof value, value); // Last good value
    }


    public First(predicate: (T) => boolean = Constant.trueFn): T {
        for (let value of this) {
            if (predicate(value)) {
                return value;
            }
        }
        throw Constant.CONST_NOTHING_FOUND;
    }


    public FirstOrDefault(predicate: (T) => boolean = Constant.trueFn): T {
        let value;
        for (let item of this) {
            value = item;
            if (predicate(item)) {
                return item;
            }
        }
        return Constant.getDefaultVal(typeof value); // Last good value
    }


    public Last(predicate: (T) => boolean = Constant.trueFn): T {
        let value, found = false;
        for (let item of this) {
            if (predicate(item)) {
                value = item;
                found = true;
            }
        }
        if (!found) {
            throw Constant.CONST_NOTHING_FOUND;
        }
        return value;
    }


    public LastOrDefault(predicate: (T) => boolean = Constant.trueFn): T {
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


    public SequenceEqual(other: Iterable<T>, equal: (a: T, b: T) => boolean = (a, b) => a === b): boolean {
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


    public Single(predicate: (T) => boolean = Constant.trueFn): T {
        let value, hasValue = false;
        for (let item of this) {
            if (predicate(item)) {
                if (!hasValue) {
                    value = item;
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


    public SingleOrDefault<TSource>(predicate: (T) => boolean = Constant.trueFn): T {
        let value, lastKnown, hasValue = false;
        for (let item of this) {
            if (predicate(item)) {
                if (!hasValue) {
                    value = item;
                    hasValue = true;
                }
                else {
                    throw Constant.CONST_TOO_MANY;
                }
            }
            lastKnown = item;
        }
        return (hasValue) ? value : Constant.getDefaultVal(typeof lastKnown);
    }


    public Sum(transform: (T) => number = Constant.selfFn): number {
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


    public ToMap<TKey, TElement>(keySelector: (T) => TKey,
        elementSelector: (T) => TElement = Constant.selfFn): Map<TKey, TElement> {
        let dictionary = new Map<TKey, TElement>();
        for (let value of this) {
            dictionary.set(keySelector(value), elementSelector(value));
        }
        return dictionary;
    }


    public ToDictionary<TKey, TElement>(keySelector: (T) => TKey,
        elementSelector: (T) => TElement = Constant.selfFn): Map<TKey, TElement> {
        let dictionary = new Map<TKey, TElement>();
        for (let value of this) {
            dictionary.set(keySelector(value), elementSelector(value));
        }
        return dictionary;
    }



    public Cast<V>(): Enumerable<V> {
        return this as any as Enumerable<V>;    // TODO: Remove any once TypeScript 2.0 out
    }


    //-------------------------------------------------------------------------
    //  Deferred execution methods
    //-------------------------------------------------------------------------



    public DefaultIfEmpty(defaultValue: T = undefined): Enumerable<T> {
        return new EnumerableImpl<T>(Generator.DefaultIfEmpty(this, defaultValue));
    }


    public Concat(second: Iterable<T>): Enumerable<T> {
        this._target = Generator.SelectManyFast([this._target, second])
        return this;
    }


    public Distinct<V>(keySelector?: (T) => V): Enumerable<T> {
        this._target = keySelector ? Generator.Distinct(this._target, keySelector)
            : Generator.DistinctFast(this._target)
        return this;
    }


    public Except<K>(other: Iterable<T>, keySelector?: (T) => K): Enumerable<T> {
        this._target = Generator.Intersect(this._target, Constant.getKeys(other, keySelector), true, keySelector);
        return this;
    }


    public GroupBy<K, E, R>(selKey: (T) => K, selElement: (T) => E = Constant.selfFn, selResult: (a: K, b: Iterable<E>) => R = Constant.defGrouping): Enumerable<R> {
        let map: Map<K, Array<E>> = Constant.getKeyedMap(this._target, selKey, selElement);
        return new EnumerableImpl<R>(Generator.GroupBy(map, selResult));
    }


    public GroupJoin<I, K, R>(inner: Iterable<I>, oKeySelect: (T) => K, iKeySelect: (I) => K, resultSelector: (a: T, b: Iterable<I>) => R = Constant.defGrouping): Enumerable<R> {
        return new EnumerableImpl<R>(Generator.GroupJoin(this._target, oKeySelect, resultSelector, Constant.getKeyedMapFast(inner, iKeySelect)));
    }



    public Intersect<K>(other: Iterable<T>, keySelector?: (T) => K): Enumerable<T> {
        this._target = Generator.Intersect(this._target, Constant.getKeys(other, keySelector), false, keySelector)
        return this;
    }


    public Join<I, K, R>(inner: Iterable<I>, oSelector: (T) => K, iSelector: (I) => K, transform: (T, I) => R): Enumerable<R> {
        this._target = Generator.Join<T, K, R, I>(this._target, oSelector, transform, Constant.getKeyedMapFast(inner, iSelector));
        return this as any as Enumerable<R>;
    }


    public OrderBy<K>(keySelect: (T) => K = Constant.selfFn, equal: (a: K, b: K) => number = (a, b) => <any>a - <any>b): Enumerable<T> {
        return new OrderedLinq<T>(this, (array) => Generator.Forward(array), (a: T, b: T) => equal(keySelect(a), keySelect(b)));
    }


    public OrderByDescending<K>(keySelect: (T) => K = Constant.selfFn, equal: (a: K, b: K) => number = (a, b) => <any>a - <any>b): Enumerable<T> {
        return new OrderedLinq<T>(this, (array) => Generator.Reverse(array), (a: T, b: T) => equal(keySelect(a), keySelect(b)));
    }


    public ThenBy<K>(keySelect: (T) => K = Constant.selfFn, equal: (a: K, b: K) => number = (a, b) => <any>a - <any>b): Enumerable<T> {
        if (this instanceof OrderedLinq) {
            let superEqual = (<OrderedLinq<T>><any>this).equal;
            (<OrderedLinq<T>><any>this).equal = (a: T, b: T) => {
                let result: number = superEqual(a, b);
                return (0 != result) ? result : equal(keySelect(a), keySelect(b));
            }
            return this;
        } else {
            return new OrderedLinq<T>(this,
                (array) => Generator.Forward(array), (a: T, b: T) => equal(keySelect(a), keySelect(b)));
        }
    }


    public ThenByDescending<K>(keySelect: (T) => K = Constant.selfFn, equal: (a: K, b: K) => number = (a, b) => <any>a - <any>b): Enumerable<T> {
        if (this instanceof OrderedLinq) {
            let superEqual = (<OrderedLinq<T>><any>this).equal;
            (<OrderedLinq<T>><any>this).equal = (a: T, b: T) => {
                let result: number = superEqual(a, b);
                return (0 != result) ? result : equal(keySelect(a), keySelect(b));
            }
            return this;
        } else {
            return new OrderedLinq<T>(this,
                (array) => Generator.Reverse(array), (a: T, b: T) => equal(keySelect(a), keySelect(b)));
        }
    }


    public Range(start: number, count: number): Enumerable<number> {
        return new EnumerableImpl<number>(Generator.Range(start, count));
    }


    public Repeat<V>(element: V, count: number): Enumerable<V> {
        return new EnumerableImpl<V>(Generator.Repeat(element, count));
    }


    public Reverse(): Enumerable<T> {
        let array: Array<T> = Array.isArray(this._target) ? <Array<T>>this._target : this.ToArray();
        return new EnumerableImpl<T>(null, () => Generator.Reverse(array));
    }


    public Select<V>(transform: (T) => V): Enumerable<V>;
    public Select<V>(transform: (T, number) => V): Enumerable<V> {
        this._target = Generator.Select(this._target, transform)
        return this as any as Enumerable<V>;
    }


    public SelectMany<S, V>(selector: (T, number) => Iterable<S> = Constant.selfFn, result: (T, S) => V = (t, s) => s): Enumerable<V> {
        this._target = Generator.SelectMany(this._target, selector, result);
        return this as any as Enumerable<V>;
    }


    public Skip(skip: number): Enumerable<T> {
        this._target = Generator.Skip(this._target, skip)
        return this;
    }


    public SkipWhile(predicate: (T) => boolean): Enumerable<T>;
    public SkipWhile(predicate: (T, number) => boolean): Enumerable<T> {
        this._target = Generator.SkipWhile(this._target, predicate);
        return this;
    }


    public Take(take: number): Enumerable<T> {
        this._target = Generator.TakeWhile(this._target, (a, n) => take > n);
        return this;
    }


    public TakeWhile(predicate: (T, number) => boolean): Enumerable<T> {
        this._target = Generator.TakeWhile(this._target, predicate);
        return this;
    }


    public Union<K>(second: Iterable<T>, keySelector?: (T) => K): Enumerable<T> {
        this._target = keySelector ? Generator.Union(this._target, second, keySelector)
            : Generator.UnionFast(this._target, second)
        return this;
    }


    public Where(predicate: (T) => Boolean): Enumerable<T>;
    public Where(predicate: (T, number) => Boolean = Constant.trueFn): Enumerable<T> {
        this._target = Generator.Where(this._target, predicate);
        return this;
    }


    public Zip<V, Z>(second: Iterable<V>, func: (T, V) => Z): Enumerable<Z> {
        this._target = Generator.Zip(this._target, second, func);
        return this as any as Enumerable<Z>
    }
}


class OrderedLinq<T> extends EnumerableImpl<T> {

    constructor(target: Iterable<any> | IEnumerable<any>, factory: Function, public equal: (a: T, b: T) => number) {
        super(target, factory);
    }

    public [Symbol.iterator](): Iterator<T> {
        if (Constant.CONST_UNDEFINED === typeof this._factoryArg) {
            this._factoryArg = (<EnumerableImpl<T>>this._target).ToArray();
            this._factoryArg.sort(this.equal);
        }
        return this._factory(this._factoryArg);
    }
}




