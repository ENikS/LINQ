# SkipWhile(...) Method
Bypasses elements in a sequence as long as a specified condition is true and then returns the remaining elements. The element's index is used in the logic of the predicate function.

## Syntax
```
SkipWhile(predicate)
```

### Parameters

#### predicate
A function to test each source element for a condition; the second parameter of the function represents the index of the source element: ```Boolean predicate(TSource, index)```

### Return Value
An Iterable that contains the elements from the input sequence starting at the first element in the linear series that does not pass the test specified by predicate.

## Remarks
This method is implemented by using deferred execution. The immediate return value is an object that stores all the information that is required to perform the action. The query represented by this method is not executed until the object is enumerated.

The SkipWhile method tests each element of source by using predicate and skips the element if the result is true. After the predicate function returns false for an element, that element and the remaining elements in source are yielded and there are no more invocations of predicate.

If predicate returns true for all elements in the sequence, an empty Iterable is returned.

The first argument of predicate represents the element to test. The second argument represents the zero-based index of the element within source.


## Examples



