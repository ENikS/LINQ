# Take(...) Method
Returns a specified number of contiguous elements from the start of a sequence.

## Syntax
```
Take(count)
```

### Parameters

#### count
The number of elements to return.

### Return Value
An Iterable that contains the specified number of elements from the start of the input sequence.

## Remarks
This method is implemented by using deferred execution. The immediate return value is an object that stores all the information that is required to perform the action. The query represented by this method is not executed until the object is enumerated.

Take enumerates source and yields elements until count elements have been yielded or source contains no more elements.

If count is less than or equal to zero, source is not enumerated and an empty Iterable is returned.


## Examples



