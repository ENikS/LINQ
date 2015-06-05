export declare function LINQ<T>(TSource?: Iterable<T> | IEnumerable<T>): Linqable<T>;
export declare function Range<T>(start: T, count: number): Linqable<T>;
export declare function Repeat<T>(start: T, count: number): Linqable<T>;
export interface Linqable<T> extends Iterable<T>, IEnumerable<T> {
    Aggregate<A, B>(seed: A, func?: (A, T) => A, resultSelector?: (A) => B): B;
    All(predicate?: (T) => Boolean): boolean;
    Any(predicate?: (T) => Boolean): boolean;
    Average(func?: (T) => number): number;
    Concat<V>(second: Iterable<T>): Linqable<V>;
    Contains(source: T, equal?: (a: T, b: T) => boolean): boolean;
    Count(predicate?: (T) => Boolean): number;
    DefaultIfEmpty(defaultValue?: T): Linqable<T>;
    Distinct(): Linqable<T>;
    ElementAt(index: number): T;
    ElementAtOrDefault(index: number): T;
    Except(other: Iterable<T>): Linqable<T>;
    First(predicate?: (T) => boolean): T;
    FirstOrDefault(predicate?: (T) => boolean): T;
    GroupBy<K, E, R>(selKey: (T) => K, selElement?: (T) => E, selResult?: (a: K, b: Iterable<E>) => R): Linqable<R>;
    GroupJoin<I, K, R>(inner: Iterable<I>, outerKeySelector: (T) => K, innerKeySelector: (I) => K, resultSelector: (a: T, b: Iterable<I>) => R): Linqable<R>;
    Intersect(other: Iterable<T>): Linqable<T>;
    Join<I, TKey, R>(inner: Iterable<I>, oSelector: (T) => TKey, iSelector: (I) => TKey, transform: (T, I) => R): Linqable<R>;
    Last(predicate?: (T) => boolean): T;
    LastOrDefault(predicate?: (T) => boolean): T;
    Max(transform?: (T) => number): number;
    Min(transform?: (T) => number): number;
    OrderBy<K>(keySelect?: (T) => K, equal?: (a: K, b: K) => number): Linqable<T>;
    OrderByDescending<K>(keySelect?: (T) => K, equal?: (a: K, b: K) => number): Linqable<T>;
    ThenBy<K>(keySelect?: (T) => K, equal?: (a: K, b: K) => number): Linqable<T>;
    ThenByDescending<K>(keySelect?: (T) => K, equal?: (a: K, b: K) => number): Linqable<T>;
    Range(start: T, count: number): Linqable<T>;
    Repeat(element: T, count: number): Linqable<T>;
    Reverse(): Linqable<T>;
    Select<V>(transform: (T, number) => V): Linqable<V>;
    SelectMany<S, V>(selector: (T, number) => Iterable<S>, result?: (T, S) => any): Linqable<V>;
    SequenceEqual(other: Iterable<T>, equal?: (a: T, b: T) => boolean): boolean;
    Single(predicate?: (T) => boolean): T;
    SingleOrDefault<TSource>(predicate?: (T) => boolean): T;
    Skip(skip: number): Linqable<T>;
    SkipWhile(predicate: (T, number) => boolean): Linqable<T>;
    Sum(transform?: (T) => number): number;
    Take(take: number): Linqable<T>;
    TakeWhile(predicate: (T, number) => boolean): Linqable<T>;
    ToArray(): Array<T>;
    ToMap<TKey, TElement>(keySelector: (T) => TKey, elementSelector?: (T) => TElement): Map<TKey, TElement>;
    Union(second: Iterable<T>): Linqable<T>;
    Where(predicate: (T, number) => Boolean): Linqable<T>;
    Zip<V, Z>(second: Iterable<V>, func: (T, V) => Z): Linqable<Z>;
}
export interface IEnumerable<T> {
    GetEnumerator(): IEnumerator<T>;
}
export interface IEnumerator<T> {
    Current: T;
    MoveNext(): Boolean;
    Reset(): void;
}
export interface IteratorResult<T> {
    done: boolean;
    value?: T;
}
export interface Iterator<T> {
    next(value?: any): IteratorResult<T>;
    return?(value?: any): IteratorResult<T>;
    throw?(e?: any): IteratorResult<T>;
}
export interface Iterable<T> {
    [Symbol.iterator](): Iterator<T>;
}
export interface IterableIterator<T> extends Iterator<T> {
    [Symbol.iterator](): IterableIterator<T>;
}
