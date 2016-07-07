# ToMap(...) Method
Creates a Map<TKey, TValue> from an Iterable according to a specified key selector function, and an element selector function.

## Syntax
```
ToMap(keySelector[, elementSelector])
```

### Parameters

#### keySelector
A function to extract a key from each element: ```TKey keySelector(TSource)```

#### elementSelector
A transform function to produce a result element value from each element: ```TValue elementSelector(TSource)```

### Return Value
A Map<TKey, TValue> that contains values of type TElement selected from the input sequence.

## Remarks
The ToMap method forces immediate query evaluation and returns a map that contains the query results.

## Examples



