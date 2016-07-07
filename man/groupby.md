# GroupBy(...) Method
Groups the elements of a sequence according to a specified key selector function and creates a result value from each group and its key. Key values are compared by using a specified comparer, and the elements of each group are projected by using a specified function.

## Syntax
```
GroupBy(keySelector[, elementSelector[, resultSelector]])
```

### Parameters

#### keySelector
A function to extract the key for each element: ```TKey keySelector(TSource)```

#### elementSelector
A function to map each source element to an element in an grouping: ```TElement elementSelector(TSource)```

#### resultSelector
A function to create a result value from each group: ```TResult resultSelector(TKey, Iterable<TElement>)```

### Return Value
A collection of elements of type TResult where each element represents a projection over a group and its key.


## Remarks
This method is implemented by using deferred execution. The immediate return value is an object that stores all the information that is required to perform the action. The query represented by this method is not executed until the object is enumerated.
The **GroupBy** method returns a collection of grouping of TKey, TElement objects, one for each distinct key that was encountered. A TKey, TElement grouping is an Iterable<T> that also has a key associated with its elements.


## Examples



