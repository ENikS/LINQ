# Single(...) Method
Returns the only element of a sequence that satisfies a specified condition, and throws an exception if more than one such element exists.

## Syntax
```
Single<TSource>([predicate])
```

### Parameters

#### predicate
A function to test an element for a condition: ```Boolean predicate(TSource)```

### Return Value
The single element of the input sequence that satisfies a condition.

## Remarks
The Single method throws an exception if the input sequence contains no matching element. To instead return null when no matching element is found, use SingleOrDefault.


## Examples



