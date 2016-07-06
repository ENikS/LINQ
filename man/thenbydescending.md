# ThenByDescending(...) Method
Performs a subsequent ordering of the elements in a sequence in descending order by using a specified comparer.

## Syntax
```
ThenByDescending([keySelector[, comparer]])
```

### Parameters

#### keySelector
A function to extract a key from each element: ```TKey keySelector(TSource)```

#### comparer
A function to compare keys: ```Boolean comparer(first, second)```

### Return Value
An ordered Iterable whose elements are sorted in descending order according to a key.

## Remarks
This method is implemented by using deferred execution. The immediate return value is an object that stores all the information that is required to perform the action. The query represented by this method is not executed until the object is enumerated.

ThenBy and ThenByDescending are design so you can specify multiple sort criteria by applying any number of ThenBy or ThenByDescending methods.


## Examples



