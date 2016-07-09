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


export function* DefaultIfEmpty<T>(target: Iterable<T>, defaultValue: T) {
    let iterator = target[Symbol.iterator]();
    let result = iterator.next();
    if (result.done) {
        yield defaultValue;
    } else {
        yield result.value;
        yield* target;
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


export function* DistinctFast<T>(target: Iterable<T>) {
    let set: Set<T> = new Set<T>();
    for (let value of target) {
        if (set.has(value)) continue;
        set.add(value);
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


export function* SkipWhile<T>(target: Iterable<T>, predicate: (T, number) => Boolean) {
    let index = 0, skipped = false;
    for (let value of target) {
        if (!skipped && !(skipped = !predicate(value, index++))) continue;
        yield value;
    }
}


export function* TakeWhile<T>(target: Iterable<T>, predicate: (T, number) => Boolean) {
    let index = 0;
    for (let value of target) {
        if (!predicate(value, index++)) return;
        yield value;
    }
}


export function* Intersect<T>(target: Iterable<T>, exceptions: Set<T>, condition: boolean) {
    for (let value of target) {
        if (condition == exceptions.has(value)) continue;
        yield value;
    }
}


export function* Repeat<T>(value: T, count: number) {
    for (let i = 0; i < count; i++) {
        yield value;
    }
}


export function* Range<T>(value: any, count: number) {
    let current = value;
    for (let i = 0; i < count; i++) {
        yield <T>current;
        current++;
    }
}


export function* Union<T, K>(first: Iterable<T>, second: Iterable<T>, keySelector: (T) => K) {
    let set = new Set<K>();
    for (let value of first) {
        let key = keySelector(value)
        if (set.has(key)) continue;
        set.add(key);
        yield value;
    }
    for (let value of second) {
        let key = keySelector(value)
        if (set.has(key)) continue;
        set.add(key);
        yield value;
    }
}


export function* UnionFast<T>(first: Iterable<T>, second: Iterable<T>) {
    let set = new Set<T>();
    for (let value of first) {
        if (set.has(value)) continue;
        set.add(value);
        yield value;
    }
    for (let value of second) {
        if (set.has(value)) continue;
        set.add(value);
        yield value;
    }
}


export function* Join<T, K, R, I>(target: Iterable<T>, oKeySelect: (T) => K, transform: (T, any) => R, map: Map<K, Array<I>>) {
    for (let value of target) {
        let key = oKeySelect(value);
        let innerSet = map.get(key);
        if ('undefined' === typeof innerSet) continue;
        for (let inner of innerSet) {
            yield transform(value, inner);
        }
    }
}


export function* GroupJoin<T, K, R, I>(target: Iterable<T>, oKeySelect: (T) => K, transform: (a: T, b: Iterable<I>) => R, map: Map<K, Array<I>>) {
    for (let value of target) {
        let key = oKeySelect(value);
        let innerSet = map.get(key);
        if ('undefined' === typeof innerSet) continue;
        yield transform(value, innerSet);
    }
}


export function* GroupBy<T, K, V>(map: Map<K, Array<T>>, resultSelect: (a: K, b: Iterable<T>) => V) {
    for (let key of map.keys()) {
        yield resultSelect(key, map.get(key));
    }
}


export function* SelectMany<T, C, R>(target: Iterable<T>, selector: (T, number) => Iterable<C>, transform: (T, V) => R) {
    let index = 0;
    for (let item of target) {
        for (let collectionItem of selector(item, index++)) {
            yield transform(item, collectionItem);
        }
    }
}


export function* SelectManyFast<T, C>(target: Iterable<Iterable<C>>) {
    for (let subIterable of target) {
        yield* subIterable;
    }
}


export function* Zip<T, V, Z>(first: Iterable<T>, second: Iterable<V>, transform: (T, V) => Z, _index = 0) {
    let iteratorOne = first[Symbol.iterator]();
    let iteratorTwo = second[Symbol.iterator]();
    let retOne, retTwo;

    while (!(retOne = iteratorOne.next()).done && !(retTwo = iteratorTwo.next()).done) {
        yield transform(retOne.value, retTwo.value)
    }
}

