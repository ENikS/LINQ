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
//  LINQ
//-----------------------------------------------------------------------------
interface Enumerable<T> extends Iterable<T>, IEnumerable<T> {

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
    Aggregate<A, B>(seed: A, func?: (A, T) => A, resultSelector?: (A) => B): B;

    /** 
    * Determines whether all elements of a sequence satisfy a condition.
    * @returns True is all elements satisfy criteria. 
    * @param predicate A function to test each element for a condition.
    * @example
    *     var e:boolean = asEnumerable([0, 1, 2, 3, 4, 5, 6, 7]).All((a) => a > 0);
    */
    All(predicate?: (T) => Boolean): boolean;
    
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
    * Returns distinct elements from a sequence by using the default equality
    * comparer to compare values.
    * @example
    *     var enumerable = asEnumerable([1, 1, 2, 2, 4, 5, 6, 7]).Distinct();
    */
    Distinct(): Enumerable<T>;	
    
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
    * Produces the set difference of two sequences by using the default equality comparer to compare values. 
    * This method returns those elements in first that do not appear in second. 
    * It does not also return those elements in second that do not appear in first.
    * @param other An Iterable<T> whose elements that also occur in the first sequence will cause those elements to be removed from the returned sequence.
    * @example
    *     var enumerable = asEnumerable([0, 1, 2, 3, 4, 5, 6, 7]).Except([2,3,5]);
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
    Join<I, TKey, R>(inner: Iterable<I>, oSelector: (T) => TKey, iSelector: (I) => TKey, transform: (T, I) => R): Enumerable<R>;
    
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
    Range(start: T, count: number): Enumerable<T>;
    
    /** 
    * Generates a sequence that contains one repeated value. 
    * @param start First value in sequence.
    * @param count Number of elements to iteratel.
    * @example
    *     var sum = asEnumerable().Repeat("v", 7);
    */
    Repeat(element: T, count: number): Enumerable<T>;
    
    /** 
    * Inverts the order of the elements in a sequence. 
    * @example
    *     var e = asEnumerable([0, 1, 2, 3, 4, 5, 6, 7]).Reverse();
    */
    Reverse(): Enumerable<T>;	
    
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
    SelectMany<S, V>(selector: (T, number) => Iterable<S>, result?: (T, S) => any): Enumerable<V>;
    
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
    SingleOrDefault<TSource>(predicate?: (T) => boolean): T;	
    
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
    * @param predicate A function to test each source element for a condition; the second parameter of the function represents the index of the source element.
    * @example
    *     var e = asEnumerable([0, 1, 2, 3, 4, 5, 6, 7]).SkipWhile((amount, index) => amount > index * 1000);
    */
    SkipWhile(predicate: (T, number) => boolean): Enumerable<T>;
    
    /** 
    * Computes the sum of the sequence of Decimal values that are obtained by 
    * invoking a transform function on each element of the input sequence. 
    * @param transform A transform function to apply to each element.
    * @example
    *     var e = asEnumerable([0, 1, 2, 3, 4, 5, 6, 7]).Sum();
    */
    Sum(transform?: (T) => number): number;	
    
    /** 
    * Returns a specified number of contiguous elements from the start of a 
    * sequence. 
    * @param take The number of elements to return.
    * @example
    *     var e = asEnumerable([0, 1, 2, 3, 4, 5, 6, 7]).Take(3);
    */
    Take(take: number): Enumerable<T>;
    
    /**
    * Returns elements from a sequence as long as a specified condition is true.
    * The element's index is used in the logic of the predicate function. 
    * @param predicate A function to test each source element for a condition; the second parameter of the function represents the index of the source element.
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
    //ToDictionary<TKey, TElement>(keySelector: (T) => TKey, elementSelector?: (T) => TElement): Map<TKey, TElement>;	

    /** 
    * Produces the set union of two sequences. Union returns only unique values. 
    * @param second An IEnumerable<T> whose distinct elements form the second set for the union.
    * @example
    *     var e = asEnumerable([0, 1, 2, 3, 4, 5, 6, 7]).Union([5,6,7,8,9]);
    */
    Union(second: Iterable<T>): Enumerable<T>;	

    /**
    * Filters a sequence of values based on a predicate. 
    * @param predicate A function to test each source element for a condition; 
    * the second parameter of the function represents the index of the source element.
    * @example
    *     var e = asEnumerable([0, 1, 2, 3, 4, 5, 6, 7]).Where(a => a % 2 == 1)
    *     var j = asEnumerable([0, 1, 2, 3, 4, 5, 6, 7]).Where((a,i) => a * i % 2 == 1)
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

interface IEnumerable<T> {
    GetEnumerator(): IEnumerator<T>;
}

interface IEnumerator<T> {
    Current: T;
    MoveNext(): Boolean;
    Reset(): void;
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



declare module LINQ {
    /**
    * Converts any Iterable<T> object into LINQ-able object
    *
    * @param TSource An Array, Map, Set, String or other Iterable object.
    * @example
    *     import {asEnumerable} from "linq-ts";
    *
    *     var enumerable = asEnumerable([0, 1, 2, 3, 4, 5, 6, 7]).Take(3);
    *     var sum = enumerable.Sum(); */
    export function asEnumerable<T>(TSource?: Iterable<T> | IEnumerable<T>): Enumerable<T>;


    /**
    * Generates <count> of <T> elements starting with <start>. T is any 
    * type which could be cast to number: number, enum, etc.
    *
    * @param start First value in sequence.
    * @param count Number of elements to iteratel.
    * @example
    *     var sum = Range(0, 7).Sum(); */
    export function Range<T>(start: T, count: number): Enumerable<T>;


    /**
    * Repeat element <start> of type T <count> of times.
    *
    * @param start First value in sequence.
    * @param count Number of elements to iteratel.
    * @example
    *     var sum = Repeat("v", 7); */
    export function Repeat<T>(start: T, count: number): Enumerable<T>;
}


declare module "linq-ts" {
    export = LINQ;
}



