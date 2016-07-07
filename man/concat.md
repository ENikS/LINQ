# Concat(...) Method
Concatenates two sequences.


## Syntax
```
Concat(second)
```

### Parameters

#### second
The sequence to concatenate to the first sequence.

### Return Value
An Enumerable that contains the concatenated elements of the two input sequences.


## Remarks
This method is implemented by using deferred execution. The immediate return value is an object that stores all the information that is required to perform the action. The query represented by this method is not executed until the object is enumerated.
The **Concat** method differs from the **Union** method because the **Concat** method returns all the original elements in the input sequences. The **Union** method returns only unique elements.


## Examples

