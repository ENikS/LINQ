# OrderBy(...) Method
Sorts the elements of a sequence in ascending order by using a specified key.

## Syntax
```
OrderBy([keySelector[, comparer]])
```

### Parameters

#### keySelector
A function to extract a key from an element: ```TKey keySelector(TSource)```

#### comparer
A function to compare two key values: ```number comparer(first, second)```

### Return Value
An Ordered Iterable whose elements are sorted according to a key.


## Remarks
This method is implemented by using deferred execution. The immediate return value is an object that stores all the information that is required to perform the action. The query represented by this method is not executed until the object is enumerated.


## Examples



