# Where(...) Method
Filters a sequence of values based on a predicate. Each element's index is used in the logic of the predicate function.

## Syntax
```
Where(predicate)
```

### Parameters

#### predicate
A function to test each source element for a condition; the second parameter of the function represents the index of the source element: ```Boolean predicate(TSource, index)```

### Return Value
An Iterable that contains elements from the input sequence that satisfy the condition.

## Remarks
This method is implemented by using deferred execution. The immediate return value is an object that stores all the information that is required to perform the action. The query represented by this method is not executed until the object is enumerated.

The first argument of predicate represents the element to test. The second argument represents the zero-based index of the element within source.


## Examples



