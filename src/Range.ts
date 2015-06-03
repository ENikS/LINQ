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


export class RangeGenerator<T> implements Iterable<T> {

    _start: T;
    _count: number;

    constructor(start: T, count: number) {
        this._start = start;
        this._count = count;
    }
    
    /** Returns JavaScript iterator */
    public [Symbol.iterator](): Iterator<T> {
        return new RangeIteratror(this._start, this._count);
    }
}


class RangeIteratror<T> implements Iterator<T> {

    _result = { value: undefined, done: true};
    _current: any;
    _count: number;

    constructor(start: T, count: number) {
        this._current = start;
        this._count = count;
    }

    /** Gets the next element in the collection. */
    public next<T>(value?: any): IteratorResult<T> {
        this._result = { value: this._current++, done: 0 >= this._count-- };
        return this._result;
    }
    
    /** Gets the current element in the collection. */
    public get Current(): T {
        return this._result.value;
    }

    /** Advances the enumerator to the next element of the collection.*/
    public MoveNext<T>(): Boolean {
        this._result = <any>this.next<T>();
        return !this._result.done;
    }

    /** Sets the enumerator to its initial position, which is before the first 
    * element in the collection. */
    public Reset(): void {
        throw "JavaScript iterators could not be Reset";
    }
}


