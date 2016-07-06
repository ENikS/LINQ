# Union(...) Method
Produces the set union of two sequences by using a specified key.

## Syntax
```
Union(second[, keySelector])
```

### Parameters

#### second
An Iterable whose distinct elements form the second set for the union.

#### keySelector
A function to extract the key which used to check for equality: ```Boolean keySelector(TSource)```

### Return Value
An Iterable that contains the elements from both input sequences, excluding duplicates.


## Remarks
This method is implemented by using deferred execution. The immediate return value is an object that stores all the information that is required to perform the action. The query represented by this method is not executed until the object is enumerated.

When the object returned by this method is enumerated, Union enumerates first and second in that order and yields each element that has not already been yielded.

## Examples



