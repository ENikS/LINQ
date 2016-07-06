# OfType(...) Method
Filters the elements of an IEnumerable based on a specified type.

## Syntax
```
OfType(type)
```

### Parameters

#### type
The type to filter the elements of the sequence on. 

### Return Value
An Iterable that contains elements from the input sequence of type TResult.

## Remarks
This method is implemented by using deferred execution. The immediate return value is an object that stores all the information that is required to perform the action. The query represented by this method is not executed until the object is enumerated.

The OfType method returns only those elements in source that can be cast to type TResult.

## Examples



