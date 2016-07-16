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
// Language-Integrated Query (LINQ)
//-----------------------------------------------------------------------------
interface Enumerable<T> extends Iterable<T>, IEnumerable<T> {

    /**
    * Applies an accumulator function over a sequence.The specified seed value 
    * is used as the initial accumulator value, and the specified function is 
    * used to select the result value. 
    * @param func An accumulator function to be invoked on each element.
    * @param resultSelector A function to transform the final accumulator value into the result value.
    * @example
    * var fruits = [ "apple", "mango", "orange", "passionfruit", "grape" ]; 
    * var longestName = asEnumerable(fruits)
    *                  .Aggregate("banana", (longest, next) => next.Length > longest.Length ? next : longest, fruit => fruit.ToUpper());    
    */
    Aggregate<A, B>(func: (A, T) => A, resultSelector?: (A) => B): B;

    /**
    * Applies an accumulator function over a sequence.The specified seed value 
    * is used as the initial accumulator value, and the specified function is 
    * used to select the result value. 
    * @param seed The initial accumulator value.
    * @param func An accumulator function to be invoked on each element.
    * @param resultSelector A function to transform the final accumulator value into the result value.
    * @example
    * var fruits = [ "apple", "mango", "orange", "passionfruit", "grape" ]; 
    * var longestName = asEnumerable(fruits)
    *                  .Aggregate("banana", (longest, next) => next.Length > longest.Length ? next : longest, fruit => fruit.ToUpper());    
    */
    Aggregate<A, B>(seed: A, func: (A, T) => A, resultSelector?: (A) => B): B;

    /**
    * Determines whether all elements of a sequence satisfy a condition.
    * @returns True is all elements satisfy criteria. 
    * @param predicate A function to test each element for a condition.
    * @example
    *     var e:boolean = asEnumerable([0, 1, 2, 3, 4, 5, 6, 7]).All((a) => a > 0);
    */
    All(predicate: (T) => Boolean): boolean;
    
    /** 
    * Determines whether a sequence contains any elements or if predicate is 
    * present determines whether any element of a sequence satisfies a 
    * condition.
    * @param predicate A function to test each element for a condition.
    * @example
    * var unvaccinated = asEnumerable(pets).Any(p => p.Vaccinated == false);
    */
    Any(predicate?: (T) => Boolean): boolean;
    
    /** 
    * Computes the average of a sequence of Number values that are obtained by 
    * invoking a transform function on each element of the input sequence. 
    * @param func A transform function to apply to each element.
    * @example
    *     var e = asEnumerable(['5', '6', '7']).Average(a=>eval(a));
    */
    Average(func?: (T) => number): number;  	


    /**
    * Casts the elements of an Iterable to the specified type.
    */
    Cast<V>(): Enumerable<V>;

    /** Concatenates two sequences.
    * @param second The sequence to concatenate to the first sequence.
    * @example
    *     var enumerable = asEnumerable([3, 4, 5, 6, 7]).Concat([1,2,8]);
    */
    Concat<V>(second: Iterable<T>): Enumerable<V>;
    
    /**
    * Determines whether a sequence contains a specified element by using a 
    * specified Comparer. 
    * @param value The value to locate in the sequence.
    * @param equal An equality comparer to compare values.    
    * @example
    *     var e: boolean = asEnumerable([0, 1, 2, 3, 4, 5, 6, 7]).Contains(0, (a) => a);
    */
    Contains(value: T, equal?: (a: T, b: T) => boolean): boolean;

    /**
    * Returns the number of elements in a sequence.
    * Returns a number that represents how many elements in the 
    * specified sequence satisfy a condition.
    * @param predicate A function to test each element for a condition.
    * @example
    *     var e:number = asEnumerable([0, 1, 2, 3, 4, 5, 6, 7]).Count((a) => a > 3)
    */
    Count(predicate?: (T) => Boolean): number;
    
    /** 
    * Returns the elements of the specified sequence or the specified value in 
    * a singleton collection if the sequence is empty. 
    * @param defaultValue The value to return if the sequence is empty 
    * @example
    *     var e:number = asEnumerable([0, 1, 2, 3, 4, 5, 6, 7]).DefaultIfEmpty(0);
    */
    DefaultIfEmpty(defaultValue?: T): Enumerable<T>;	
    
    /**
    * Distinct(equal?: (a: T, b: T) => boolean): Enumerable<T> - is not implemented
    * 
    * Implementing this method would require iterating through all prior elements of
    * the sequence and would degrade performance considerably. Instead Map is used to
    * guarantee uniqueness and key selector function to allow more flexiblity.
    */

    /**
    * Returns distinct elements from a sequence by using object itself or key
    * comparer to determine uniqueness.
    * @param keySelector A function to extract the join key from each element of the second sequence
    * @example
    *     enumerable(arrayOfObjects).Distinct(o => o.id);
    */
    Distinct<V>(keySelector?: (T) => V): Enumerable<T>;

    /**
    * Returns the element at a specified index in a sequence. 
    * @param index The zero-based index of the element to retrieve. 
    * @example
    *     var e:number = asEnumerable([0, 1, 2, 3, 4, 5, 6, 7]).ElementAt(3);
    */
    ElementAt(index: number): T;

    /** 
    * Returns the element at a specified index in a sequence or a default 
    * value if the index is out of range. 
    * @param index The zero-based index of the element to retrieve.
    * @example
    *     var e:number = asEnumerable([0, 1, 2, 3, 4, 5, 6, 7]).ElementAtOrDefault(31);
    */
    ElementAtOrDefault(index: number): T;
    
    /** 
    * Produces the set difference of two sequences by using the default equality comparer
    * to compare values.
    * This method returns those elements in first that do not appear in second. 
    * It does not also return those elements in second that do not appear in first.
    * @param other An Iterable<T> whose elements that also occur in the first sequence
    * will cause those elements to be removed from the returned sequence.
    * @example
    *     asEnumerable([0, 1, 2, 3, 4, 5, 6, 7]).Intersect([2,3,5]);
    *   // Will return 0, 1, 4, 6, 7
    */
    Except(other: Iterable<T>): Enumerable<T>;
    
    /**
    * Returns the first element in a sequence that satisfies a specified condition. 
    * Throws an exception if no matching element is found in source.
    * @param predicate A function to test each element for a condition.
    * @example
    *     var e = asEnumerable([0, 1, 2, 3, 4, 5, 6, 7]).First(a => a > 2);
    */
    First(predicate?: (T) => boolean): T;

    /**
    * Returns the first element of the sequence that satisfies a condition or a
    * default value if no such element is found. 
    * @param predicate A function to test each element for a condition.
    * @example
    *     var e = asEnumerable([0, 1, 2, 3, 4, 5, 6, 7]).FirstOrDefault(a => a > 2);
    */
    FirstOrDefault(predicate?: (T) => boolean): T;
    
    /** 
    * Groups the elements of a sequence according to a specified key selector 
    * function and creates a result value from each group and its key. Elements
    * of each group are projected by using a specified function. 
    * @param selKey A function to extract the key for each element.
    * @param selElement A function to map each source element to an element in an Grouping<TKey, TElement>.
    * @param selResult A function to create a result value from each group.    
    * @example
    *   var e = asEnumerable(pets).GroupBy(pet => pet.Age, pet => pet)
    */
    GroupBy<K, E, R>(selKey: (T) => K, selElement?: (T) => E, selResult?: (a: K, b: Iterable<E>) => R): Enumerable<R>;
    
    /** 
    * Correlates the elements of two sequences based on equality of keys and groups the results. The default equality comparer is used to compare keys. 
    * @param inner The sequence to join to the first sequence.
    * @param outerKeySelector A function to extract the join key from each element of the first sequence.
    * @param innerKeySelector A function to extract the join key from each element of the second sequence.
    * @param resultSelector A function to create a result element from an element from the first sequence and a collection of matching elements from the second sequence.
    * @example
    *   var iterable = asEnumerable(people)
    *       .GroupJoin(pets, person => person, pet => pet.Owner,
    *                  (person, petCollection) => { return { 
    *                       Owner: person.Name, 
    *                       Pets: asEnumerable(petCollection) .Select(pet=> pet.Name); 
    *               };
    *       });
    */
    GroupJoin<I, K, R>(inner: Iterable<I>, outerKeySelector: (T) => K, innerKeySelector: (I) => K, resultSelector: (a: T, b: Iterable<I>) => R): Enumerable<R>;
    
    /** 
    * Produces the intersection of two sequences. 
    * @param An Iterable<T> whose distinct elements that also appear in the first sequence will be returned.
    * @example
    *     var e = asEnumerable([0, 1, 2, 3, 4, 5, 6, 7]).Intersect([1, 3, 5, 11, 23, 44]);
    */
    Intersect(other: Iterable<T>): Enumerable<T>;
    
    /** 
    * Correlates the elements of two sequences based on matching keys. A specified IEqualityComparer<T> is used to compare keys. 
    * @param inner The sequence to join to the first sequence.
    * @param oSelector A function to extract the join key from each element of the first sequence.
    * @param iSelector A function to extract the join key from each element of the second sequence.
    * @param transform A function to create a result element from two matching elements.
    * @example
    *   var iterable =
    *       asEnumerable(people).Join(pets,
    *           person => person,
    *           pet => pet.Owner,
    *           (person, pet) => {
    *               return person.Name + " - " + pet.Name;
    *           });
    */
    Join<I, K, R>(inner: Iterable<I>, oSelector: (T) => K, iSelector: (I) => K, transform: (T, I) => R): Enumerable<R>;
    
    /**	
    * Returns the last element of a sequence that satisfies a specified condition. 
    * Throws an exception if no matching element is found in source.
    * @param predicate A function to test each element for a condition.
    * @example
    *     var e = asEnumerable([0, 1, 2, 3, 4, 5, 6, 7]).Last();
    */
    Last(predicate?: (T) => boolean): T;
    
    /** 
    * Returns the last element of a sequence that satisfies a condition or a default value if no such element is found. 
    * @param predicate A function to test each element for a condition.
    * @example
    *     var e = asEnumerable([0, 1, 2, 3, 4, 5, 6, 7]).LastOrDefault();
    */
    LastOrDefault(predicate?: (T) => boolean): T;
    
    /** 
    * Invokes a transform function on each element of a sequence and returns 
    * the maximum value. 
    * @param transform A transform function to apply to each element.
    * @example
    *     var e = asEnumerable([0, 1, 2, 3, 4, 5, 6, 7]).Max();
    */
    Max(transform?: (T) => number): number;
    
    /** 
    * Invokes a transform function on each element of a sequence and returns the minimum Decimal value. 
    * @param transform A transform function to apply to each element.
    * @example
    *     var e = asEnumerable([0, 1, 2, 3, 4, 5, 6, 7]).Min()
    */
    Min(transform?: (T) => number): number;
    
    /** 
    * Sorts the elements of a sequence in ascending order by using a specified  comparer. 
    * @param keySelect A function to extract a key from an element.
    * @param equal An IComparer<T> to compare keys.
    * @example
    *     var e = asEnumerable(jsn).OrderBy(a=> a.name);
    */
    OrderBy<K>(keySelect?: (T) => K, equal?: (a: K, b: K) => number): Enumerable<T>;

    /** 
    * Sorts the elements of a sequence in descending order by using a specified comparer. 
    * @param keySelect A function to extract a key from an element.
    * @param equal An IComparer<T> to compare keys.
    * @example
    *     var e = asEnumerable(jsn).OrderByDescending(a=> a.name);
    */
    OrderByDescending<K>(keySelect?: (T) => K, equal?: (a: K, b: K) => number): Enumerable<T>;

    /** 
    * Performs a subsequent ordering of the elements in a sequence in ascending order by using a specified comparer. 
    * @param keySelect A function to extract a key from an element.
    * @param equal An IComparer<T> to compare keys.
    * @example
    *   var iterable: any = asEnumerable(fruits)
    *                       .OrderBy(fruit=> fruit.length)
    *                       .ThenBy(fruit=> fruit.charCodeAt(0))
    *                       .ThenBy(fruit=> fruit.charCodeAt(4));
    */
    ThenBy<K>(keySelect?: (T) => K, equal?: (a: K, b: K) => number): Enumerable<T>;

    /** 
    * Performs a subsequent ordering of the elements in a sequence in descending order by using a specified comparer. 
    * @param keySelect A function to extract a key from an element.
    * @param equal An IComparer<T> to compare keys.
    * @example
    *   var iterable: any = asEnumerable(fruits)
    *                       .OrderBy(fruit=> fruit.length)
    *                       .ThenByDescending(fruit=> fruit.charCodeAt(0))
    *                       .ThenByDescending(fruit=> fruit.charCodeAt(4));
    */
    ThenByDescending<K>(keySelect?: (T) => K, equal?: (a: K, b: K) => number): Enumerable<T>;	
    
    /** 
    * Returns count of numbers beginning from start  
    * @param start First value in sequence.
    * @param count Number of elements to iteratel.
    * @example
    *     var sum = asEnumerable().Range(0, 7).Sum();
    */
    Range(start: Number, count: Number): Enumerable<Number>;
    
    /** 
    * Generates a sequence that contains one repeated value. 
    * @param start First value in sequence.
    * @param count Number of elements to iteratel.
    * @example
    *     var sum = asEnumerable().Repeat("v", 7);
    */
    Repeat<V>(element: V, count: number): Enumerable<V>;
    
    /** 
    * Inverts the order of the elements in a sequence. 
    * @example
    *     var e = asEnumerable([0, 1, 2, 3, 4, 5, 6, 7]).Reverse();
    */
    Reverse(): Enumerable<T>;	
    
    /**	
    * Projects each element of a sequence into a new form by incorporating the element's index. 
    * @param transform A transform function to apply to each source element
    * @example
        var array = asEnumerable([0, 1, 2, 3, 4, 5, 6, 7]).Select((a, idx) => a * idx);
    */
    Select<V>(transform: (T) => V): Enumerable<V>;

    /**	
    * Projects each element of a sequence into a new form by incorporating the element's index. 
    * @param transform A transform function to apply to each source element; the second parameter of the function represents the index of the source element.
    * @example
        var array = asEnumerable([0, 1, 2, 3, 4, 5, 6, 7]).Select((a, idx) => a * idx);
    */
    Select<V>(transform: (T, number) => V): Enumerable<V>;

    /**
    * Projects each element of a sequence to an Iterable<T>, flattens the resulting sequences into one sequence, and invokes a result selector 
    * function on each element therein. The index of each source element is used in the intermediate projected form of that element. 
    * @param selector A transform function to apply to each source element; the second parameter of the function represents the index of the source element.
    * @param result A transform function to apply to each element of the intermediate sequence.
    * @example
    *     var iterable = asEnumerable(jsn).SelectMany(a => a.ids, b => b);
    */
    SelectMany<S, V>(selector?: (T, number) => Iterable<S>, result?: (T, S) => V): Enumerable<V>;
    
    /**
    * Determines whether two sequences are equal by comparing their elements
    * by using a specified IEqualityComparer<T>. 
    * @param other An IEnumerable<T> to compare to the first sequence.
    * @param equal An IEqualityComparer<T> to use to compare elements.
    * @example
    *     var e:boolean = asEnumerable([0, 1, 2, 3]).SequenceEqual([0, 1, 2, 3]);
    */
    SequenceEqual(other: Iterable<T>, equal?: (a: T, b: T) => boolean): boolean; 
    
    /**
    * Returns the only element of a sequence that satisfies a specified condition, and throws an exception if more than one such element exists. 
    * @param predicate A function to test an element for a condition.
    * @example
    *     var e = asEnumerable([4]).Single();
    */
    Single(predicate?: (T) => boolean): T;
    
    /** 
    * Returns the only element of a sequence that satisfies a specified condition or a default value if no such element exists; this method 
    * Throws an exception if more than one element satisfies the condition. 
    * @param predicate A function to test an element for a condition.
    * @example
    *     var e = asEnumerable([4]).SingleOrDefault();
    */
    SingleOrDefault(predicate?: (T) => boolean): T;	
    
    /** 
    * Bypasses a specified number of elements in a sequence and then returns 
    * the remaining elements. 
    * @param skip The number of elements to skip before returning the remaining elements.
    * @example
    *     var e = asEnumerable([0, 1, 2, 3, 4, 5, 6, 7]).Skip(3);
    */
    Skip(skip: number): Enumerable<T>;
    
    /** 
    * Bypasses elements in a sequence as long as a specified condition is true 
    * and then returns the remaining elements. The element's index is used in 
    * the logic of the predicate function. 
    * @param predicate A function to test each source element for a condition;
    * the second parameter of the function represents the index of the source element.
    * @example
    *     enumerable.SkipWhile((amount, index) => amount > index * 1000);
    */
    SkipWhile(predicate: (T, number) => boolean): Enumerable<T>;
    
    /** 
    * Computes the sum of the sequence of Decimal values that are obtained by 
    * invoking a transform function on each element of the input sequence. 
    * @param transform A transform function to apply to each element.
    * @example
    *     var e = enumerable.Sum();
    */
    Sum(transform?: (T) => number): number;	
    
    /** 
    * Returns a specified number of contiguous elements from the start of a 
    * sequence. 
    * @param take The number of elements to return.
    * @example
    *     enumerable.Take(3);
    */
    Take(take: number): Enumerable<T>;
    
    /**
    * Returns elements from a sequence as long as a specified condition is true.
    * The element's index is used in the logic of the predicate function. 
    * @param predicate A function to test each source element for a condition;
    * the second parameter of the function represents the index of the source element.
    * @example
    *     var e = asEnumerable([0, 1, 2, 3, 4, 5, 6, 7]).TakeWhile(a=> a < 4);
    */
    TakeWhile(predicate: (T, number) => boolean): Enumerable<T>;
    
    /** 
    * Converts Iterable to Array<T> 
    * @example
    *     var e = asEnumerable([0, 1, 2, 3, 4, 5, 6, 7]).ToArray();
    */
    ToArray(): Array<T>;

    /** 
    * Creates a Map< TKey, TValue > from an IEnumerable< T > according
    * to a specified key selector function, a comparer, and an element selector
    * function. 
    * @param keySelector A function to extract a key from each element.
    * @param elementSelector A transform function to produce a result element value from each element.
    */
    ToMap<TKey, TElement>(keySelector: (T) => TKey, elementSelector?: (T) => TElement): Map<TKey, TElement>;

    /** 
    * Creates a Map< TKey, TValue > from an IEnumerable< T > according
    * to a specified key selector function, a comparer, and an element selector
    * function. 
    * @param keySelector A function to extract a key from each element.
    * @param elementSelector A transform function to produce a result element value from each element.
    */
    ToDictionary<TKey, TElement>(keySelector: (T) => TKey, elementSelector?: (T) => TElement): Map<TKey, TElement>;

    /**
    * Creates a Map< TKey, TValue > from an IEnumerable< T > according
    * to a specified key selector function, a comparer, and an element selector
    * function. 
    * @param keySelector A function to extract a key from each element.
    * @param elementSelector A transform function to produce a result element value from each element.
    */
    //ToDictionary<TKey, TElement>(keySelector: (T) => TKey, elementSelector?: (T) => TElement): Map<TKey, TElement>;	

    /** 
    * Produces the set union of two sequences. Union returns only unique values.
    * This method excludes duplicates from the return set.
    * @param second An IEnumerable<T> whose distinct elements form the second set for the union.
    * @param keySelector A function to extract the key which used to check for equality
    * @example
    *     var e = asEnumerable([0, 1, 2, 3, 4, 5, 6, 7]).Union([5,6,7,8,9]);
    */
    Union<K>(second: Iterable<T>, keySelector?: (T) => K): Enumerable<T>;

    /**
    * Filters a sequence of values based on a predicate. 
    * @param predicate A function to test each source element for a condition.
    * @example
    *     enumerable([0, 1, 2, 3, 4, 5, 6, 7]).Where(a => a % 2 == 1)
    */
    Where(predicate: (T) => Boolean): Enumerable<T>;

    /**
    * Filters a sequence of values based on a predicate. 
    * @param predicate A function to test each source element for a condition; 
    * the second parameter of the function represents the index of the source element.
    * @example
    *     enumerable([0, 1, 2, 3, 4, 5, 6, 7]).Where((a,i) => a * i % 2 == 1)
    */
    Where(predicate: (T, number) => Boolean): Enumerable<T>;
        
    /** 
    * Applies a specified function to the corresponding elements of two sequences, producing a sequence of the results. 
    * @param second The second input sequence.
    * @param func A function that specifies how to combine the corresponding elements of the two sequences.
    * @example
    *     var e = asEnumerable(numbers).Zip(words, (first, second) => first + " " + second);
    */
    Zip<V, Z>(second: Iterable<V>, func: (T, V) => Z): Enumerable<Z>;
}



//-----------------------------------------------------------------------------
//  C# compatability interface
//-----------------------------------------------------------------------------


interface IEnumerable<T> {
    GetEnumerator(): IEnumerator<T>;
}


interface IEnumerator<T> {
    Current: T;
    MoveNext(): Boolean;
    Reset(): void;
}


//-----------------------------------------------------------------------------
//  ES2015 Interfaces
//-----------------------------------------------------------------------------


interface Symbol {
    /** Returns a string representation of an object. */
    toString(): string;

    /** Returns the primitive value of the specified object. */
    valueOf(): Object;

    [Symbol.toStringTag]: "Symbol";
}


interface SymbolConstructor {
    /** 
      * A reference to the prototype. 
      */
    prototype: Symbol;

    /**
      * Returns a new unique Symbol value.
      * @param  description Description of the new Symbol object.
      */
    (description?: string | number): symbol;

    /**
      * Returns a Symbol object from the global symbol registry matching the given key if found. 
      * Otherwise, returns a new symbol with this key.
      * @param key key to search for.
      */
    for(key: string): symbol;

    /**
      * Returns a key from the global symbol registry matching the given Symbol if found. 
      * Otherwise, returns a undefined.
      * @param sym Symbol to find the key for.
      */
    keyFor(sym: symbol): string;

    // Well-known Symbols

    /** 
      * A method that determines if a constructor object recognizes an object as one of the 
      * constructor’s instances. Called by the semantics of the instanceof operator. 
      */
    hasInstance: symbol;

    /** 
      * A Boolean value that if true indicates that an object should flatten to its array elements
      * by Array.prototype.concat.
      */
    isConcatSpreadable: symbol;

    /** 
      * A method that returns the default iterator for an object. Called by the semantics of the 
      * for-of statement.
      */
    iterator: symbol;

    /**
      * A regular expression method that matches the regular expression against a string. Called 
      * by the String.prototype.match method. 
      */
    match: symbol;

    /** 
      * A regular expression method that replaces matched substrings of a string. Called by the 
      * String.prototype.replace method.
      */
    replace: symbol;

    /**
      * A regular expression method that returns the index within a string that matches the 
      * regular expression. Called by the String.prototype.search method.
      */
    search: symbol;

    /** 
      * A function valued property that is the constructor function that is used to create 
      * derived objects.
      */
    species: symbol;

    /**
      * A regular expression method that splits a string at the indices that match the regular 
      * expression. Called by the String.prototype.split method.
      */
    split: symbol;

    /** 
      * A method that converts an object to a corresponding primitive value.
      * Called by the ToPrimitive abstract operation.
      */
    toPrimitive: symbol;

    /** 
      * A String value that is used in the creation of the default string description of an object.
      * Called by the built-in method Object.prototype.toString.
      */
    toStringTag: symbol;

    /**
      * An Object whose own property names are property names that are excluded from the 'with'
      * environment bindings of the associated objects.
      */
    unscopables: symbol;
}


declare var Symbol: SymbolConstructor;


interface IteratorResult<T> {
    done: boolean;
    value?: T;
}


interface Iterator<T> {
    next(value?: any): IteratorResult<T>;
    return?(value?: any): IteratorResult<T>;
    throw?(e?: any): IteratorResult<T>;
}


interface Iterable<T> {
    [Symbol.iterator](): Iterator<T>;
}


interface IterableIterator<T> extends Iterator<T> {
    [Symbol.iterator](): IterableIterator<T>;
}


interface Map<K, V> {
    clear(): void;
    delete(key: K): boolean;
    entries(): IterableIterator<[K, V]>;
    forEach(callbackfn: (value: V, index: K, map: Map<K, V>) => void, thisArg?: any): void;
    get(key: K): V;
    has(key: K): boolean;
    keys(): IterableIterator<K>;
    set(key: K, value?: V): Map<K, V>;
    size: number;
    values(): IterableIterator<V>;
    [Symbol.iterator](): IterableIterator<[K, V]>;
    [Symbol.toStringTag]: "Map";
}


interface MapConstructor {
    new (): Map<any, any>;
    new <K, V>(): Map<K, V>;
    new <K, V>(iterable: Iterable<[K, V]>): Map<K, V>;
    prototype: Map<any, any>;
}


declare var Map: MapConstructor;


interface Set<T> {
    add(value: T): Set<T>;
    clear(): void;
    delete(value: T): boolean;
    entries(): IterableIterator<[T, T]>;
    forEach(callbackfn: (value: T, index: T, set: Set<T>) => void, thisArg?: any): void;
    has(value: T): boolean;
    keys(): IterableIterator<T>;
    size: number;
    values(): IterableIterator<T>;
    [Symbol.iterator](): IterableIterator<T>;
    [Symbol.toStringTag]: "Set";
}


interface SetConstructor {
    new (): Set<any>;
    new <T>(): Set<T>;
    new <T>(iterable: Iterable<T>): Set<T>;
    prototype: Set<any>;
}


declare var Set: SetConstructor;


interface Array<T> {
    /** Iterator */
    [Symbol.iterator](): IterableIterator<T>;

    /**
     * Returns an object whose properties have the value 'true'
     * when they will be absent when used in a 'with' statement.
     */
    [Symbol.unscopables](): {
        copyWithin: boolean;
        entries: boolean;
        fill: boolean;
        find: boolean;
        findIndex: boolean;
        keys: boolean;
        values: boolean;
    };

    /** 
      * Returns an array of key, value pairs for every entry in the array
      */
    entries(): IterableIterator<[number, T]>;

    /** 
      * Returns an list of keys in the array
      */
    keys(): IterableIterator<number>;

    /** 
      * Returns an list of values in the array
      */
    values(): IterableIterator<T>;

    /** 
      * Returns the value of the first element in the array where predicate is true, and undefined 
      * otherwise.
      * @param predicate find calls predicate once for each element of the array, in ascending 
      * order, until it finds one where predicate returns true. If such an element is found, find 
      * immediately returns that element value. Otherwise, find returns undefined.
      * @param thisArg If provided, it will be used as the this value for each invocation of 
      * predicate. If it is not provided, undefined is used instead.
      */
    find(predicate: (value: T, index: number, obj: Array<T>) => boolean, thisArg?: any): T;

    /** 
      * Returns the index of the first element in the array where predicate is true, and undefined 
      * otherwise.
      * @param predicate find calls predicate once for each element of the array, in ascending 
      * order, until it finds one where predicate returns true. If such an element is found, find 
      * immediately returns that element value. Otherwise, find returns undefined.
      * @param thisArg If provided, it will be used as the this value for each invocation of 
      * predicate. If it is not provided, undefined is used instead.
      */
    findIndex(predicate: (value: T) => boolean, thisArg?: any): number;

    /**
      * Returns the this object after filling the section identified by start and end with value
      * @param value value to fill array section with
      * @param start index to start filling the array at. If start is negative, it is treated as 
      * length+start where length is the length of the array. 
      * @param end index to stop filling the array at. If end is negative, it is treated as 
      * length+end.
      */
    fill(value: T, start?: number, end?: number): T[];

    /** 
      * Returns the this object after copying a section of the array identified by start and end
      * to the same array starting at position target
      * @param target If target is negative, it is treated as length+target where length is the 
      * length of the array. 
      * @param start If start is negative, it is treated as length+start. If end is negative, it 
      * is treated as length+end.
      * @param end If not specified, length of the this object is used as its default value. 
      */
    copyWithin(target: number, start: number, end?: number): T[];
}











declare module "linq-es5" {
    export function AsEnumerable<T>(iterable: Iterable<T> | IEnumerable<T>): Enumerable<T>;
    export function asEnumerable<T>(iterable: Iterable<T> | IEnumerable<T>): Enumerable<T>;
    export function From<T>(iterable: Iterable<T> | IEnumerable<T>): Enumerable<T>;
    export function from<T>(iterable: Iterable<T> | IEnumerable<T>): Enumerable<T>;
    export function Range(start: number, count: number): Enumerable<number>;
    export function range(start: number, count: number): Enumerable<number>;
    export function Repeat<V>(seed: V, count: number): Enumerable<V>;
    export function repeat<V>(seed: V, count: number): Enumerable<V>;
}
