///////////////////////////////////////////////////////////////////////////////
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
function getEnumerable<T>(TSource: Iterable<T> | IEnumerable<T> = null): 
        Enumerable<T> {
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


    constructor(target: Iterable<any> | IEnumerable<any>, 
                factory?: Function, arg?: any) {
        this._target = <Iterable<any>>target;
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


    public Aggregate<B>(func: (aggr: T, x: T) => T, 
                        resultSelector: (aggr: T) => B): B;
    public Aggregate<A, B>(seed: A, 
                           func: (aggr: A, x: T) => A = Constant.selfFn, 
                           resultSelector: (aggr: A) => B = Constant.selfFn): 
        B {
        let zero: A;
        let method: (aggr: A, x: T) => A;
        let selector: (aggr: A) => B;
        if (Constant.CONST_FUNCTION === typeof seed) {
            method = seed as any;
            selector = func as any;
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


    public All(predicate: (x: T) => boolean = Constant.trueFn) {
        for (let value of this) {
            if (!predicate(value)) {
                return false;
            }
        }
        return true;
    }


    public Any(predicate?: (x: T) => boolean) {
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


    public Average(func: (x: T) => number = Constant.selfFn): number {
        let sum = 0, count = 0;
        for (let value of this) {
            sum += func(value);
            count++;
        }
        return sum / count;
    }


    public Contains(value: T, 
                    equal: (a: T, b: T) => boolean = (a, b) => a === b): 
           boolean {
        for (let item of this) {
            if (equal(item, value)) {
                return true;
            }
        }
        return false;
    }


    public Count(predicate: (x: T) => boolean): number {
        let count = 0;
        if (predicate) {
            for (let value of this) {
                if (predicate(value)) {
                    count++;
                }
            }
        } else if (undefined != (this._target as any)[Constant.CONST_LENGTH]) {
            count = (this._target as any)[Constant.CONST_LENGTH];
        } else {
            for (let value of this) {
                count++;
            }
        }
        return count;
    }


    public Max(transform: (x: T) => number = Constant.selfFn): number {
        let value: number, max: number, hasValue = false;
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


    public Min(transform: (x: T) => number = Constant.selfFn): number {
        let value: number, min: number, hasValue = false;
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
            if (0 > index || (this._target as any)[Constant.CONST_LENGTH] <= index) {
                throw Constant.CONST_OUTOFRANGE;
            }
            return (this._target as any)[index];
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
            let length = (this._target as any)[Constant.CONST_LENGTH];
            if (0 > index || length <= index) {
                let value = (this._target as any)[0];
                return 0 < length 
                    ? Constant.getDefaultVal(typeof (value), value)
                    : undefined;
            }
            return (this._target as any)[index];
        }
        let value: T, count = 0;
        for (let item of this) {
            if (index === count++) {
                return item;
            }
            value = item;
        }
        return Constant.getDefaultVal(typeof value, value); // Last good value
    }


    public First(predicate: (x: T) => boolean = Constant.trueFn): T {
        for (let value of this) {
            if (predicate(value)) {
                return value;
            }
        }
        throw Constant.CONST_NOTHING_FOUND;
    }


    public FirstOrDefault(predicate: (x: T) => boolean = Constant.trueFn): T {
        let value: T;
        for (let item of this) {
            value = item;
            if (predicate(item)) {
                return item;
            }
        }
        return Constant.getDefaultVal(typeof value); // Last good value
    }


    public Last(predicate: (x: T) => boolean = Constant.trueFn): T {
        let value: T, found = false;
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


    public LastOrDefault(predicate: (x: T) => boolean = Constant.trueFn): T {
        let value: T, lastKnown: T, found = false;
        for (let item of this) {
            if (predicate(item)) {
                value = item;
                found = true;
            }
            lastKnown = item;
        }
        return (found) ? value : Constant.getDefaultVal(typeof lastKnown);
    }


    public SequenceEqual(other: Iterable<T>, 
                         equal: (a: T, b: T) => boolean = (a, b) => a === b): 
           boolean {
        let res1: IteratorResult<T>, res2: IteratorResult<T>;
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


    public Single(predicate: (x: T) => boolean = Constant.trueFn): T {
        let value: T, hasValue = false;
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


    public SingleOrDefault<TSource>(predicate: (x: T) => boolean = 
        Constant.trueFn): T {
        let value: T, lastKnown: T, hasValue = false;
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


    public Sum(transform: (x: T) => number = Constant.selfFn): number {
        let sum: number = 0;
        for (let value of this) {
            sum += transform(value);
        }
        return sum;
    }


    public ToArray(): Array<T> {
        let array: Array<T> = [];
        for (let value of this) {
            array.push(value);
        }
        return array;
    }


    public ToMap<TKey, TElement>(keySelector: (x: T) => TKey,
                                 elementSelector: (x: T) => 
                                    TElement = Constant.selfFn): 
           Map<TKey, TElement> {
        let dictionary = new Map<TKey, TElement>();
        for (let value of this) {
            dictionary.set(keySelector(value), elementSelector(value));
        }
        return dictionary;
    }


    public ToDictionary<TKey, TElement>(keySelector: (x: T) => TKey,
                                        elementSelector: (x: T) => 
                                            TElement = Constant.selfFn): 
           Map<TKey, TElement> {
        let dictionary = new Map<TKey, TElement>();
        for (let value of this) {
            dictionary.set(keySelector(value), elementSelector(value));
        }
        return dictionary;
    }



    public Cast<V>(): Enumerable<V> {
        // TODO: Remove any once TypeScript 2.0 out
        return this as any as Enumerable<V>;    
    }


    //-------------------------------------------------------------------------
    //  Deferred execution methods
    //-------------------------------------------------------------------------



    public DefaultIfEmpty(defaultValue: T = undefined): Enumerable<T> {
        return new EnumerableImpl<T>(Generator.DefaultIfEmpty(this, 
                                                              defaultValue));
    }


    public Concat(second: Iterable<T>): Enumerable<T> {
        this._target = Generator.SelectManyFast([this._target, second])
        return this;
    }


    public Distinct<V>(keySelector?: (x: T) => V): Enumerable<T> {
        this._target = keySelector ? Generator.Distinct(this._target, 
                                                        keySelector)
            : Generator.DistinctFast(this._target)
        return this;
    }


    public Except<K>(other: Iterable<T>, keySelector?: (x: T) => K): 
           Enumerable<T> {
        this._target = Generator.Intersect(this._target, 
                                           Constant.getKeys(other, keySelector), 
                                           true, keySelector);
        return this;
    }


    public GroupBy<K, E, R>(selKey: (x: T) => K, 
                            selElement: (x: T) => E = Constant.selfFn, 
                            selResult: (a: K, b: Iterable<E>) => 
                                        R = Constant.defGrouping): 
           Enumerable<R> {
        let map: Map<K, Array<E>> = Constant.getKeyedMap(this._target, 
                                                         selKey, selElement);
        return new EnumerableImpl<R>(Generator.GroupBy(map, selResult));
    }


    public GroupJoin<I, K, R>(inner: Iterable<I>, 
                              oKeySelect: (a: T) => K, 
                              iKeySelect: (b: I) => K, 
                              resultSelector: (a: T, b: Iterable<I>) => 
                                               R = Constant.defGrouping): 
           Enumerable<R> {
        return new EnumerableImpl<R>(Generator.GroupJoin(this._target, 
                                        oKeySelect, 
                                        resultSelector, 
                                        Constant.getKeyedMapFast(inner, 
                                                                 iKeySelect)));
    }



    public Intersect<K>(other: Iterable<T>, 
                        keySelector?: (x: T) => K): Enumerable<T> {
        this._target = Generator.Intersect(this._target, 
                                           Constant.getKeys(other, keySelector), 
                                           false, keySelector)
        return this;
    }


    public Join<I, K, R>(inner: Iterable<I>, 
                         oSelector: (o: T) => K, 
                         iSelector: (i: I) => K, 
                         transform: (o: T, i: I) => R): Enumerable<R> {
        this._target = Generator.Join<T, K, R, I>(this._target, 
                                              oSelector, 
                                              transform, 
                                              Constant.getKeyedMapFast(inner, 
                                                                    iSelector));
        return this as any as Enumerable<R>;
    }


    public OrderBy<K>(keySelect: (x: T) => K = Constant.selfFn, 
                     equal: (a: K, b: K) => number = (a, b) => <any>a - <any>b): 
        Enumerable<T> {
        return new OrderedLinq<T>(this, (array: Array<T>) => Generator.Forward(array), 
                                 (a: T, b: T) => equal(keySelect(a), 
                                 keySelect(b)));
    }


    public OrderByDescending<K>(keySelect: (x: T) => K = Constant.selfFn, 
                                equal: (a: K, b: K) => number = (a, b) => 
                                    <any>a - <any>b): 
           Enumerable<T> {
        return new OrderedLinq<T>(this, (array: Array<T>) => Generator.Reverse(array), 
                                  (a: T, b: T) => equal(keySelect(a), 
                                  keySelect(b)));
    }


    public ThenBy<K>(keySelect: (x: T) => K = Constant.selfFn, 
                     equal: (a: K, b: K) => number = (a, b) => <any>a - <any>b): 
           Enumerable<T> {
        if (this instanceof OrderedLinq) {
            let superEqual = (<OrderedLinq<T>><any>this).equal;
            (<OrderedLinq<T>><any>this).equal = (a: T, b: T) => {
                let result: number = superEqual(a, b);
                return (0 != result) ? result : equal(keySelect(a), 
                                                      keySelect(b));
            }
            return this;
        } else {
            return new OrderedLinq<T>(this,
                (array: Array<T>) => Generator.Forward(array), (a: T, b: T) => 
                                             equal(keySelect(a), keySelect(b)));
        }
    }


    public ThenByDescending<K>(keySelect: (x: T) => K = Constant.selfFn, 
                               equal: (a: K, b: K) => number = (a, b) => 
                                    <any>a - <any>b): 
           Enumerable<T> {
        if (this instanceof OrderedLinq) {
            let superEqual = (<OrderedLinq<T>><any>this).equal;
            (<OrderedLinq<T>><any>this).equal = (a: T, b: T) => {
                let result: number = superEqual(a, b);
                return (0 != result) ? result : equal(keySelect(a), 
                                                      keySelect(b));
            }
            return this;
        } else {
            return new OrderedLinq<T>(this,
                (array: Array<T>) => Generator.Reverse(array), (a: T, b: T) => 
                                            equal(keySelect(a), keySelect(b)));
        }
    }


    public Range(start: number, count: number): Enumerable<number> {
        return new EnumerableImpl<number>(Generator.Range(start, count));
    }


    public Repeat<V>(element: V, count: number): Enumerable<V> {
        return new EnumerableImpl<V>(Generator.Repeat(element, count));
    }


    public Reverse(): Enumerable<T> {
        let array: Array<T> = Array.isArray(this._target) 
                            ? <Array<T>>this._target : this.ToArray();
        return new EnumerableImpl<T>(null, () => Generator.Reverse(array));
    }


    public Select<V>(transform: (x: T) => V): Enumerable<V>;
    public Select<V>(transform: (x: T, index: number) => V): Enumerable<V> {
        this._target = Generator.Select(this._target, transform)
        return this as any as Enumerable<V>;
    }


    public SelectMany<S, V>(selector: (x: T, index: number) => 
                                            Iterable<S> = Constant.selfFn, 
                                            result: (x: T, s: S) => 
                                                V = (x, s) => s as any as V): 
           Enumerable<V> {
        this._target = Generator.SelectMany(this._target, selector, result);
        return this as any as Enumerable<V>;
    }


    public Skip(skip: number): Enumerable<T> {
        this._target = Generator.Skip(this._target, skip)
        return this;
    }


    public SkipWhile(predicate: (x: T) => boolean): Enumerable<T>;
    public SkipWhile(predicate: (x: T, i: number) => boolean): Enumerable<T> {
        this._target = Generator.SkipWhile(this._target, predicate);
        return this;
    }


    public Take(take: number): Enumerable<T> {
        this._target = Generator.TakeWhile(this._target, (a, n) => take > n);
        return this;
    }


    public TakeWhile(predicate: (x: T, i: number) => boolean): Enumerable<T> {
        this._target = Generator.TakeWhile(this._target, predicate);
        return this;
    }


    public Union<K>(second: Iterable<T>, keySelector?: (x: T) => K): 
           Enumerable<T> {
        this._target = keySelector 
                     ? Generator.Union(this._target, second, keySelector)
            : Generator.UnionFast(this._target, second)
        return this;
    }


    public Where(predicate: (x: T) => Boolean): Enumerable<T>;
    public Where(predicate: (x: T, i: number) => Boolean = Constant.trueFn): 
           Enumerable<T> {
        this._target = Generator.Where(this._target, predicate);
        return this;
    }


    public Zip<V, Z>(second: Iterable<V>, func: (a: T, b: V) => Z): 
           Enumerable<Z> {
        this._target = Generator.Zip(this._target, second, func);
        return this as any as Enumerable<Z>
    }
}


class OrderedLinq<T> extends EnumerableImpl<T> {

    constructor(target: Iterable<any> | IEnumerable<any>, 
                factory: Function, public equal: (a: T, b: T) => number) {
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

/** Copyright (c) ENikS.  All rights reserved. */



