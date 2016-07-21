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
    if ('undefined' != typeof b['key']) throw duplicateKey;
    b['key'] = a;
    return b;
};

/** Returns default value for the type */
export function getDefaultVal(type: any, value: any = undefined): any {
    if (typeof type !== 'string') throw new TypeError(noString);

    // Handle simple types (primitives and plain function/object)
    switch (type) {
        case 'boolean': return false;
        case 'number': return 0;
        case 'object': return (null === value) ? null : void 0;
        case 'string': return "";
        case 'function': return ("Symbol" === value['name']) ? Symbol() : void 0;
    }
    return void 0;
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

const invalidKey = "Key selector returned undefined Key";
const noString = "Type must be a string.";
const duplicateKey = "Object already has property [key]";
export const nothingFound = "No element satisfies the condition in predicate";
export const noElements = "The source sequence is empty.";
export const tooMany = "More than one element satisfies the condition in predicate.";
export const outOfRange = "Argument Out Of Range";



