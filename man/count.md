# Count(...) Method
Returns a number that represents how many elements in the specified sequence satisfy a condition.

## Syntax
```
Count([predicate])
```

### Parameters

#### predicate
A function to test each element for a condition: ```Boolean predicate(TSource)```

### Return Value
A number that represents how many elements in the sequence satisfy the condition in the predicate function. It returns number of elements in sequence if no predicate is specified.


## Remarks
If no predicate is specified and the type of source implements **Count** or **Length**, that implementation is used to obtain the count of elements. Otherwise, this method determines the count.


## Examples



