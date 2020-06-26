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
import {Enumerable, OrderedEnumerable, IEnumerable, IEnumerator, IGrouping} from "./enumerable";


//-----------------------------------------------------------------------------
//  Implementation of EnumerableConstructor interface
//-----------------------------------------------------------------------------


/**
* Converts any Iterable<T> object into LINQ-able object
* @param TSource An Array, Map, Set, String or other Iterable object.
*/
function getEnumerable<T>(TSource: Iterable<T> | IEnumerable<T>): 
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
    return new EnumerableImpl<number>(undefined, Generator.Range, [start, count]);
}


/**
* Repeat element <start> of type T <count> of times.
* @param start First value in sequence.
* @param count Number of elements to iteratel.
* @example
*     var sum = Repeat("v", 7);
*/
function getRepeat<T>(value: T, count: number): Enumerable<T> {
    return new EnumerableImpl<T>(undefined, Generator.Repeat, [value, count]);
}


//-----------------------------------------------------------------------------
//  Exports
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
                factory?: Function,
                arg?: any) {

        this._target = <Iterable<any>>target;
        this._factory = factory;
        this._factoryArg = arg;

        // JavaScript naming convention
        (this as any)['aggregate'] = this.Aggregate;
        (this as any)['all'] = this.All;
        (this as any)['any'] = this.Any;
        (this as any)['average'] = this.Average;
        (this as any)['chunkBy'] = this.ChunkBy;
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
        (this as any)['ofType'] = this.OfType;
        (this as any)['orderBy'] = this.OrderBy;
        (this as any)['orderByDescend'] = this.OrderByDescending;
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
        return (null != this._factory) ? this._factory.apply(this, this._factoryArg)
            : this._target[Symbol.iterator]();
    }

    /** Returns C# style enumerator */
    public GetEnumerator(): IEnumerator<T> {
        return new Iterator.CSharpEnumerator<T>(this[Symbol.iterator]());
    }



    //-------------------------------------------------------------------------
    //  Immediate execution methods                                                                                            
    //-------------------------------------------------------------------------


    public Aggregate<B>(func: (x: T, y: T) => T, resultSelector?: (x: T) => B): B;
    public Aggregate<A, B>(seed: A, func: (x: A, y: T) => A, resultSelector?: (x: A) => B): B;
    public Aggregate<A, B>(alpha: (x: T|A, y: T) => T|A, 
                           beta:  (x: T|A, y?: T) => A | B = Constant.selfFn, 
                           gamma: (x: A) => B = Constant.selfFn): B {
        let zero: A;
        let method: (x: A, y: T) => A;
        let selector: (x: A) => B;
        if (Constant.CONST_FUNCTION === typeof alpha) {
            method = <(x: A, y: T) => A>alpha;
            selector = <(x: A) => B>beta;
        } else {
            zero = alpha as any;
            method = <(x: A, y: T) => A>beta;
            selector = gamma;
        }
        let result: A = zero;
        for (let value of this) {
            if ([null, undefined].indexOf(result) > -1 || (isNaN(result as any) && !result)) 
                result = Constant.getDefaultVal(typeof (value));
                
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
        if (!predicate && (iterator = this[Symbol.iterator]())) {
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


    public Contains(value: T, equal: (a: T, b: T) =>
                                     boolean = (a, b) => a === b): 
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
        } else if (this._target && (this._target as any)[Constant.CONST_LENGTH]) {
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
            if (0 > index ||
                (this._target as any)[Constant.CONST_LENGTH] <= index) {
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
        while (true) {
            res1 = it1.next(); res2 = it2.next();
            if (res1.done && res2.done) return true;
            if ((res1.done != res2.done) || !equal(res1.value, res2.value)) {
                return false;
            }
        };
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
        return new EnumerableImpl<T>(undefined, Generator.DefaultIfEmpty, [this, defaultValue]);
    }


    public Concat<V>(second: Iterable<V>): Enumerable<T|V> {
        return new EnumerableImpl<T|V>(undefined, Generator.Concat, [this, second]);
    }


    public ChunkBy<K, E, V>(keySelect: (x: T, i: number) => K,
                            elementSelector: (x: T) => E = Constant.selfFn,
                            resultSelector: (a: K, b: Iterable<E>) => V = (a, b) => b as any):
                Enumerable<V> {
        return new EnumerableImpl<V>(undefined, Generator.ChunkBy,
            [this, keySelect, elementSelector, resultSelector]);
    }



    public Distinct<V>(keySelector?: (x: T) => V): Enumerable<T> {
        if (keySelector) 
            return new EnumerableImpl<T>(undefined, Generator.Distinct, [this, keySelector]);
        return new EnumerableImpl<T>(undefined, Generator.DistinctFast, [this]);
    }


    public Except<K,V>(other: Iterable<V>, keySelector?: (x: V|T) => K): Enumerable<T> {
        return new EnumerableImpl<T>(undefined, Generator.Intersect, 
                                     [ this, Constant.getKeys(other, keySelector), true, keySelector ]);
    }


    public GroupBy<K>(selKey: (x: T) => K): Enumerable<IGrouping<K, T>>;
    public GroupBy<K, E>(selKey: (x: T) => K, selElement: (x: T) => E): Enumerable<IGrouping<K, E>>;
    public GroupBy<K, E, R>(selKey: (x: T) => K, selElement: (x: T) => E = Constant.selfFn, 
                            selResult: (a: K, b: Iterable<E>) => R = Constant.defGrouping): Enumerable<R> {
        let map: Map<K, Array<E>> = Constant.getKeyedMap(this, selKey, selElement);
        return new EnumerableImpl<R>(undefined, Generator.GroupBy, [map, selResult]) as any;
    }


    public GroupJoin<I, K, R>(inner: Iterable<I>, 
                              oKeySelect: (a: T) => K, 
                              iKeySelect: (b: I) => K, 
                              resultSelector: (a: T, b: Iterable<I>) => 
                                               R = Constant.defGrouping): Enumerable<R> {
        return new EnumerableImpl<R>(undefined, Generator.GroupJoin, 
                                     [this, oKeySelect, resultSelector, 
                                     Constant.getKeyedMapFast(inner, iKeySelect)]);
    }



    public Intersect<K>(other: Iterable<T>, 
                        keySelector?: (x: T) => K): Enumerable<T> {
        return new EnumerableImpl<T>(undefined, Generator.Intersect, [this, 
                                           Constant.getKeys(other, keySelector), 
                                           false, keySelector]);
    }


    public Join<I, K, R>(inner: Iterable<I>, 
                         oSelector: (o: T) => K, 
                         iSelector: (i: I) => K, 
                         transform: (o: T, i: I) => R): Enumerable<R> {
        return new EnumerableImpl<R>(undefined, Generator.Join,
            [this, oSelector, transform, Constant.getKeyedMapFast(inner, iSelector)]);
    }

    
    public OfType(obj: any): Enumerable<T> {
        let typeName: string;
        switch (obj) {
            case Number:
                typeName = Constant.CONST_NUMBER;
                break;
                
            case Boolean:
                typeName = Constant.CONST_BOOLEAN;
                break;
                
            case String:
                typeName = Constant.CONST_STRING;
                break;
                
            case Symbol:
                typeName = Constant.CONST_SYMBOL;
                break;
                
            default:
                typeName = undefined;
        }
            
        return new EnumerableImpl<T>(undefined, Generator.OfType, [this, obj, typeName]);
    }


    public OrderBy<K>(keySelect: (x: T) => K, equal: (a: K, b: K) => number): OrderedEnumerable<T> {
        return new OrderedLinq<T, K>(this, (array: Array<T>) => Generator.Forward(array), keySelect, equal);
    }


    public OrderByDescending<K>(keySelect: (x: T) => K, equal: (a: K, b: K) => number): OrderedEnumerable<T> {
        return new OrderedLinq<T, K>(this, (array: Array<T>) => Generator.Reverse(array), keySelect, equal, true);
    }

    public Range(start: number, count: number): Enumerable<number> {
        return new EnumerableImpl<number>(undefined, Generator.Range, [start, count]);
    }


    public Repeat<V>(element: V, count: number): Enumerable<V> {
        return new EnumerableImpl<V>(undefined, Generator.Repeat, [element, count]);
    }


    public Reverse(): Enumerable<T> {
        let array: Array<T> = Array.isArray(this._target) 
                            ? <Array<T>>this._target : this.ToArray();
        return new EnumerableImpl<T>(undefined, Generator.Reverse, [array]);
    }


    public Select<V>(transform: (x: T, index?: number) => V): Enumerable<V> {
        return new EnumerableImpl<V>(undefined, Generator.Select, [this, transform]);
    }


    public SelectMany<S, V>(selector: (x: T, index: number) => 
                                            Iterable<S> = Constant.selfFn, 
                                            result: (x: T, s: S) => 
                                                V = (x, s) => s as any as V): 
           Enumerable<V> {
        return new EnumerableImpl<V>(undefined, Generator.SelectMany,
                                    [this, selector, result]);
    }


    public Skip(skip: number): Enumerable<T> {
        return new EnumerableImpl<T>(undefined, Generator.Skip, [this, skip]);
    }


    public SkipWhile(predicate: (x: T, i?: number) => boolean): Enumerable<T> {
        return new EnumerableImpl<T>(undefined, Generator.SkipWhile, [this, predicate]);
    }


    public Take(take: number): Enumerable<T> {
        return new EnumerableImpl<T>(undefined, Generator.TakeWhile,
                                    [this, (a: T, n: number) => take > n]);
    }


    public TakeWhile(predicate: (x: T, i: number) => boolean): Enumerable<T> {
        return new EnumerableImpl<T>(undefined, Generator.TakeWhile, [this, predicate]);
    }


    public Union<K>(second: Iterable<T>, keySelector?: (x: T) => K): Enumerable<T> {
        if (keySelector)
            return new EnumerableImpl<T>(undefined, Generator.Union, [this, second, keySelector]);
        return new EnumerableImpl<T>(undefined, Generator.UnionFast, [this, second]);
    }


    public Where(predicate: (x: T, i?: number) => Boolean = Constant.trueFn): 
           Enumerable<T> {
        return new EnumerableImpl<T>(undefined, Generator.Where, [this, predicate]);
    }


    public Zip<V, Z>(second: Iterable<V>, func: (a: T, b: V) => Z): 
        Enumerable<Z> {
        return new EnumerableImpl<Z>(undefined, Generator.Zip, [this, second, func]);
    }
}


class OrderedLinq<T, K> extends EnumerableImpl<T> implements OrderedEnumerable<T> {

    private comparer: (a: any, b: any) => number;

    constructor(target: Iterable<any> | IEnumerable<any>, 
                factory: Function,
                keySelect: (x: T) => K,  
                equal: (a: K, b: K) => number,
                private reversed: boolean = false) {
        super(target, factory);

        if (keySelect) {
            this.comparer = equal ? (a: any, b: any) => equal(keySelect(a), keySelect(b)) 
                                  : (a: any, b: any) => Constant.defCompare(keySelect(a), keySelect(b));
        } else {
            this.comparer = equal;
        }

        (this as any)['thenBy'] = this.ThenBy;
        (this as any)['thenByDescending'] = this.ThenByDescending;
    }

    public [Symbol.iterator](): Iterator<T> {
        if (!this._factoryArg) {
            this._factoryArg = (<EnumerableImpl<T>>this._target).ToArray();
            if (this.comparer) {
                this._factoryArg.sort(this.comparer);
            } else {
                this._factoryArg.sort();
            }
        }
        return this._factory(this._factoryArg);
    }

    public ThenBy<K>(keySelect: (x: T) => K, equal?: (a: K, b: K) => number): OrderedEnumerable<T> {
        if (!keySelect && !equal) return this;

        const compare = keySelect ? equal ? (a: any, b: any) => equal(keySelect(a), keySelect(b))
                                          : (a: any, b: any) => Constant.defCompare(keySelect(a), keySelect(b))
                                  : equal;

        const superEqual = this.comparer;
        const comparer = (!superEqual) ? compare
                                       : (a: any, b: any) => superEqual(a, b) || (this.reversed ? -compare(a, b) : compare(a, b));

        return new OrderedLinq<T, K>(this._target, this._factory, undefined, comparer, this.reversed);
    }

    public ThenByDescending<K>(keySelect: (x: T) => K, equal?: (a: K, b: K) => number): OrderedEnumerable<T> {
        if (!keySelect && !equal) return this;

        const compare = keySelect ? equal ? (a: any, b: any) => equal(keySelect(a), keySelect(b))
                                          : (a: any, b: any) => Constant.defCompare(keySelect(a), keySelect(b))
                                  : equal;

        const superEqual = this.comparer;
        const comparer = (!superEqual) ? compare
                                       : (a: any, b: any) => superEqual(a, b) || (this.reversed ? compare(a, b) : -compare(a, b));

        return new OrderedLinq<T, K>(this._target, this._factory, undefined, comparer, this.reversed);
    }
}

/** Copyright (c) ENikS.  All rights reserved. */



