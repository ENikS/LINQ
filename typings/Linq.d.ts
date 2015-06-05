export declare function asEnumerable<T>(TSource?: Iterable<T> | IEnumerable<T>): ILinq<T>;
export declare function Range<T>(start: T, count: number): ILinq<T>;
export declare function Repeat<T>(start: T, count: number): ILinq<T>;
export interface ILinq<T> extends Iterable<T>, IEnumerable<T> {
    Aggregate<A, B>(seed: A, func?: (A, T) => A, resultSelector?: (A) => B): B;
    All(predicate?: (T) => Boolean): boolean;
    Any(predicate?: (T) => Boolean): boolean;
    Average(func?: (T) => number): number;
    Concat<V>(second: Iterable<T>): ILinq<V>;
    Contains(source: T, equal?: (a: T, b: T) => boolean): boolean;
    Count(predicate?: (T) => Boolean): number;
    DefaultIfEmpty(defaultValue?: T): ILinq<T>;
    Distinct(): ILinq<T>;
    ElementAt(index: number): T;
    ElementAtOrDefault(index: number): T;
    Except(other: Iterable<T>): ILinq<T>;
    First(predicate?: (T) => boolean): T;
    FirstOrDefault(predicate?: (T) => boolean): T;
    GroupBy<K, E, R>(selKey: (T) => K, selElement?: (T) => E, selResult?: (a: K, b: Iterable<E>) => R): ILinq<R>;
    GroupJoin<I, K, R>(inner: Iterable<I>, outerKeySelector: (T) => K, innerKeySelector: (I) => K, resultSelector: (a: T, b: Iterable<I>) => R): ILinq<R>;
    Intersect(other: Iterable<T>): ILinq<T>;
    Join<I, TKey, R>(inner: Iterable<I>, oSelector: (T) => TKey, iSelector: (I) => TKey, transform: (T, I) => R): ILinq<R>;
    Last(predicate?: (T) => boolean): T;
    LastOrDefault(predicate?: (T) => boolean): T;
    Max(transform?: (T) => number): number;
    Min(transform?: (T) => number): number;
    OrderBy<K>(keySelect?: (T) => K, equal?: (a: K, b: K) => number): ILinq<T>;
    OrderByDescending<K>(keySelect?: (T) => K, equal?: (a: K, b: K) => number): ILinq<T>;
    ThenBy<K>(keySelect?: (T) => K, equal?: (a: K, b: K) => number): ILinq<T>;
    ThenByDescending<K>(keySelect?: (T) => K, equal?: (a: K, b: K) => number): ILinq<T>;
    Range(start: T, count: number): ILinq<T>;
    Repeat(element: T, count: number): ILinq<T>;
    Reverse(): ILinq<T>;
    Select<V>(transform: (T, number) => V): ILinq<V>;
    SelectMany<S, V>(selector: (T, number) => Iterable<S>, result?: (T, S) => any): ILinq<V>;
    SequenceEqual(other: Iterable<T>, equal?: (a: T, b: T) => boolean): boolean;
    Single(predicate?: (T) => boolean): T;
    SingleOrDefault<TSource>(predicate?: (T) => boolean): T;
    Skip(skip: number): ILinq<T>;
    SkipWhile(predicate: (T, number) => boolean): ILinq<T>;
    Sum(transform?: (T) => number): number;
    Take(take: number): ILinq<T>;
    TakeWhile(predicate: (T, number) => boolean): ILinq<T>;
    ToArray(): Array<T>;
    ToMap<TKey, TElement>(keySelector: (T) => TKey, elementSelector?: (T) => TElement): Map<TKey, TElement>;
    Union(second: Iterable<T>): ILinq<T>;
    Where(predicate: (T, number) => Boolean): ILinq<T>;
    Zip<V, Z>(second: Iterable<V>, func: (T, V) => Z): ILinq<Z>;
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
export interface Enumerable<T> extends Iterable<T> {
    asEnumerable: () => ILinq<T>;
}
