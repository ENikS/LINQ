# All(...) Method
Determines whether all elements of a sequence satisfy a condition.


## Syntax
```
All([predicate])
```

### Parameters

#### predicate
A function to test each element for a condition. ```Boolean predicate(TSource)```

### Return Value
**true** if every element of the source sequence passes the test in the specified predicate, or if the sequence is empty; otherwise, **false**.


## Remarks
The enumeration of source is stopped as soon as the result can be determined.


## Examples
