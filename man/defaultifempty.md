# DefaultIfEmpty(...) Method
Returns the elements of the specified sequence or the specified value in a singleton collection if the sequence is empty.

## Syntax
```
DefaultIfEmpty([defaultValue])
```

### Parameters

#### defaultValue
The value to return if the sequence is empty.

### Return Value
An Enumerable that contains defaultValue if source is empty; otherwise, source.


## Remarks
This method is implemented by using deferred execution. The immediate return value is an object that stores all the information that is required to perform the action. The query represented by this method is not executed until the object is enumerated.
This method can be used to produce a left outer join when it is combined with the **GroupJoin** method.


## Examples



