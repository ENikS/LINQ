# Last(...) Method
Returns the last element of a sequence that satisfies a specified condition.

## Syntax
```
Last([predicate])
```

### Parameters

#### predicate
A function to test each element for a condition: ```Boolean predicate(TSource)```

### Return Value
The last element in the sequence that passes the test in the specified predicate function.


## Remarks
The **Last** method throws an exception if no matching element is found in source. To instead return a default value when no matching element is found, use the **LastOrDefault** method.


## Examples



