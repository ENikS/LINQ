# Intersect(...) Method
Produces the set intersection of two sequences.

## Syntax
```
Intersect(second)
```

### Parameters

#### second
An Iterable whose distinct elements that also appear in the first sequence will be returned.

### Return Value
A sequence that contains the elements that form the set intersection of two sequences.


## Remarks
This method is implemented by using deferred execution. The immediate return value is an object that stores all the information that is required to perform the action. The query represented by this method is not executed until the object is enumerated.
The intersection of two sets A and B is defined as the set that contains all the elements of A that also appear in B, but no other elements.

When the object returned by this method is enumerated, Intersect enumerates source, collecting all distinct elements of that sequence. It then enumerates second, marking those elements that occur in both sequences. Finally, the marked elements are yielded in the order in which they were collected.


## Examples



