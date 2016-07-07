# SelectMany(...) Method
Projects each element of a sequence to an Iterable, flattens the resulting sequences into one sequence, and invokes a result selector function on each element therein. The index of each source element is used in the intermediate projected form of that element.

## Syntax
```
SelectMany(collectionSelector, resultSelector)
```

### Parameters

#### collectionSelector
A transform function to apply to each source element; the second parameter of the function represents the index of the source element: ```Iterable<TCollection> collectionSelector(TSource, index)```

#### resultSelector
A transform function to apply to each element of the intermediate sequence: ```TResult resultSelector(TSource, TCollection)```

### Return Value
An Iterable whose elements are the result of invoking the one-to-many transform function collectionSelector on each element of source and then mapping each of those sequence elements and their corresponding source element to a result element.

## Remarks
This method is implemented by using deferred execution. The immediate return value is an object that stores all the information that is required to perform the action. The query represented by this method is not executed until the object is enumerated.

## Examples



