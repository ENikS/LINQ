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



export function* Select<T, V>(target: Iterable<T>, transform: (T, number) => V) {
    let index = 0;
    for (let value of target) {
        yield transform(value, index++);
    }
}


export function* Distinct<T, V>(target: Iterable<T>, keySelector: (T) => V) {
    let set: Set<V> = new Set<V>();
    for (let value of target) {
        let key: V = keySelector(value);
        if (set.has(key)) continue;
        set.add(key);
        yield value;
    }
}



export function* Where<T>(target: Iterable<T>, predicate: (T, number) => Boolean) {
    let index = 0;
    for (let value of target) {
        if (!predicate(value, index++)) continue;
        yield value;
    }
}



export function* Skip<T, V>(target: Iterable<T>, skip: number) {
    let index = 0;
    for (let value of target) {
        if (skip > index++) continue;
        yield value;
    }
}
