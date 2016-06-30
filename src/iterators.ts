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


import * as constant from "./utilities";


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
        let result = { value: this._source[this._current], done: this._done(this._current) };
        this._current += this._increment;
        return result;
    }
}


export class IteratorBase<T> {

    protected _done: any = { value: undefined, done: true };

    constructor(protected _iterator: Iterator<T>) { }
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


export class ZipIteratror<T, V, Z> extends IteratorBase<T> implements Iterator<Z> {

    constructor(iterator: Iterator<T>, private _second: Iterator<V>, protected _method: (T, V) => Z, protected _index = 0) {
        super(iterator);
    }

    public next(value?: any): IteratorResult<Z> {
        let first = this._iterator.next();
        let second = this._second.next();
        if (first.done || second.done) {
            return this._done;
        }
        return { done: false, value: this._method(first.value, second.value) };
    }
}


