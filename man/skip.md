# Skip(...) Method
Bypasses a specified number of elements in a sequence and then returns the remaining elements.

## Syntax
```
Skip(count)
```

### Parameters

#### count
The number of elements to skip before returning the remaining elements.

### Return Value
An Iterable that contains the elements that occur after the specified index in the input sequence.

## Remarks
This method is implemented by using deferred execution. The immediate return value is an object that stores all the information that is required to perform the action. The query represented by this method is not executed until the object is enumerated.

If source contains fewer than count elements, an empty Iterable is returned. If count is less than or equal to zero, all elements of source are yielded.

## Examples



