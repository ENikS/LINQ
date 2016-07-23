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


//-----------------------------------------------------------------------------
// Utility Functions
//-----------------------------------------------------------------------------



/** Default predicate, always true */
export var trueFn = () => true;

/** Default transformer, returns self */
export var selfFn = (o: any) => o;

/** Default Grouping */
export var defGrouping = (a: any, b: any) => {
    if (!b[CONST_KEY]) {
        b[CONST_KEY] = a;
    }
    return b;
};


/** Returns default value for the type */
export function getDefaultVal(type: any, value: any = undefined): any {
    if (typeof type !== CONST_STRING) throw new TypeError(CONST_NO_STRING);

    // Handle simple types (primitives and plain function/object)
    switch (type) {
        case CONST_BOOLEAN:     return false;
        case CONST_NUMBER:      return 0;
        case CONST_OBJECT:      return null === value ? null : undefined;
        case CONST_STRING:      return CONST_EMPTY_STRING;
        case CONST_SYMBOL:      return Symbol();
    }
    return undefined;
}

/** Returns a map of element bsed on extracted keys  **/
export function getKeyedMap<T, K, E>(iterable: Iterable<T>, keySelector: (i: T) => K, selElement?: (x: T) => E): Map<K, Array<E>> {
    let map = new Map<K, Array<E>>();
    for (let value of iterable) {
        let key = keySelector(value);
        if (!key) throw CONST_INVALID_KEY;
        let group: Array<E> = map.get(key);
        if (!group) {
            group = [];
            map.set(key, group);
        }
        group.push(selElement(value));
    }
    return map;
}

export function getKeyedMapFast<T, K>(iterable: Iterable<T>, keySelector: (x: T) => K): Map<K, Array<T>> {
    let map = new Map<K, Array<T>>();
    for (let value of iterable) {
        let key = keySelector(value);
        if (!key) throw CONST_INVALID_KEY;
        let group: Array<T> = map.get(key);
        if (!group) {
            group = [];
            map.set(key, group);
        }
        group.push(value);
    }
    return map;
}

export function getKeys<T, K>(iterable: Iterable<T>, keySelector: (x: T) => K): Set<K> {
    var set = new Set<any>();
    var otherIterator = iterable[Symbol.iterator]();
    var result: any;
    if (keySelector) {
        while (!(result = otherIterator.next()).done) {
            set.add(keySelector(result.value));
        }
    } else {
        while (!(result = otherIterator.next()).done) {
            set.add(result.value);
        }
    }
    return set;
}


//-----------------------------------------------------------------------------
//  Constants
//-----------------------------------------------------------------------------

export const CONST_INVALID_KEY  = "Key selector returned undefined Key";
export const CONST_NO_STRING    = "Type must be a string.";
export const CONST_DUPLICATE    = "Object already has property [key]";
export const CONST_NOTHING_FOUND = "No element satisfies the condition in predicate";
export const CONST_NO_ELEMENTS  = "The source sequence is empty.";
export const CONST_TOO_MANY     = "More than one element satisfies the condition in predicate.";
export const CONST_OUTOFRANGE   = "Argument Out Of Range";
export const CONST_KEY          = "key";
export const CONST_UNDEFINED    = "undefined";
export const CONST_LENGTH       = "length";
export const CONST_FUNCTION     = "function";
export const CONST_BOOLEAN      = "boolean";
export const CONST_NUMBER       = "number";
export const CONST_OBJECT       = "object";
export const CONST_STRING       = "string";
export const CONST_SYMBOL       = "symbol";
export const CONST_EMPTY_STRING = "";

