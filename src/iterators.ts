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
//  CSharp Enumerator implementation
//-----------------------------------------------------------------------------



//  Gets Iterator and turns it into CSharpEnumerator 
export class CSharpEnumerator<T> implements IEnumerator<T> {

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



export class ArrayIterator<T> implements Iterator<T> {

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


export class IntersectIteratror<T> extends IteratorBase<T> {

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


export class GeneratorIterator<T> extends IteratorBase<T> implements Iterator<T> {

    constructor(private _current: any, private _count: number, private _increment: boolean = false) {
        super(null);
    }

    public next<T>(value?: any): IteratorResult<T> {
        var result = (0 < this._count) ? { value: this._current, done: 0 >= this._count-- } : this._done;
        if (this._increment) this._current++;
        return result;
    }
}


export class DefaultIfEmptyIteratror<T> extends IteratorBase<T> {

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


export class DistinctIteratror<T> extends MethodIteratror<T> implements Iterator<T> {

    private _set: Set<T> = new Set<T>();

    public next(value?: any): IteratorResult<T> {
        var result, key;
        while (!(result = this._iterator.next()).done) {
            key = this._method(result.value);
            if (!this._set.has(key)) break;
        }
        this._set.add(key);
        return result;
    }
}


export class WhereIteratror<T> extends MethodIteratror<T> implements Iterator<T> {

    public next(value?: any): IteratorResult<T> {
        var result;
        do {
            result = this._iterator.next();
        } while (!result.done && !this._method(result.value, this._index++));
        return result;
    }
}


export class SkipIterator<T> extends MethodIteratror<T> implements Iterator<T> {

    private _hasSkipped = false;

    public next(value?: any): IteratorResult<T> {
        var result;
        if (this._hasSkipped) return this._iterator.next();
        while (!(result = this._iterator.next()).done && this._method(result.value, this._index++)) { }
        this._hasSkipped = true;
        return result;
    }
}


export class TakeIterator<T> extends MethodIteratror<T> implements Iterator<T> {

    public next(value?: any): IteratorResult<T> {
        var result = this._iterator.next();
        if (result.done || !this._method(result.value, this._index++)) {
            return this._done;
        }
        return result;
    }
}


export class ZipIteratror<T, V, Z> extends MethodIteratror<T> implements Iterator<Z> {

    constructor(first: Iterator<T>, private _second: Iterator<V>, func: (T, V) => Z) {
        super(first, func);
    }

    public next(value?: any): IteratorResult<Z> {
        var first = this._iterator.next();
        var second = this._second.next();
        if (first.done || second.done) {
            return this._done;
        }
        return { done: false, value: this._method(first.value, second.value) };
    }
}


export class SelectIteratror<T, V> extends MethodIteratror<T> implements Iterator<V> {

    public next(value?: any): IteratorResult<V> {
        var result: any = this._iterator.next();
        if (result.done) return result;
        result.value = this._method(result.value, this._index++);
        return result;
    }
}


export class SelectManyIteratror<T, V, Z> extends MethodIteratror<T> implements Iterator<Z> {

    protected _resultSelector;
    protected _collection: Iterator<V>;
    protected _collectionState: IteratorResult<T> = this._done;
    protected _resultState: IteratorResult<any> = this._done;

    constructor(sourceIterator: Iterator<T>, selector: (T, number) => Iterable<V>, transform: (T, V) => Z = (t, s) => s) {
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
                this._resultState.value = this._resultSelector(this._collectionState.value, this._resultState.value);
            }
        } while (this._resultState.done);
        return this._resultState;
    }
}


export class JoinIteratror<T, I, K, R> extends SelectManyIteratror<T, I, R> {

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


export class UnionIteratror<T, K> extends SelectManyIteratror<T, T, T> implements Iterator<T> {

    private _set = new Set<T>();

    constructor(sourceIterator: Iterator<T>, private _keySelector: (T) => K) {
        super(sourceIterator, o => o);
    }

    public next(value?: any): IteratorResult<T> {
        var result, key;
        while (!(result = super.next()).done) {
            key = this._keySelector(result.value);
            if (!this._set.has(key)) break;
        }
        this._set.add(key);
        return result;
    }
}


export class GroupByIteratror<K, E, R> extends MethodIteratror<K> implements Iterator<R> {

    constructor(iterator: Iterator<K>, resultSelect: (a: K, b: Iterable<E>) => R,
        private _map: Map<K, Array<E>>) {
        super(iterator, resultSelect);
    }

    public next(value?: any): IteratorResult<R> {
        var result: IteratorResult<K> = this._iterator.next();
        if (result.done) return this._done;
        var iterable = this._map.get(result.value);
        return { value: this._method(result.value, iterable), done: false };
    }
}


export class GroupJoinIteratror<T, I, K, R> extends MethodIteratror<T> implements Iterator<R> {

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


