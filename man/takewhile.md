# TakeWhile(...) Method
Returns elements from a sequence as long as a specified condition is true. The element's index is used in the logic of the predicate function.

## Syntax
```
TakeWhile(predicate)
```

### Parameters

#### predicate
A function to test each source element for a condition; the second parameter of the function represents the index of the source element: ```Boolean predicate(TSource, index)```

### Return Value
An Iterable that contains elements from the input sequence that occur before the element at which the test no longer passes.

## Remarks
This method is implemented by using deferred execution. The immediate return value is an object that stores all the information that is required to perform the action. The query represented by this method is not executed until the object is enumerated.

The TakeWhile method tests each element of source by using predicate and yields the element if the result is true. Iteration stops when the predicate function returns false for an element or when source contains no more elements.

The first argument of predicate represents the element to test. The second argument represents the zero-based index of the element within source.


## Examples


