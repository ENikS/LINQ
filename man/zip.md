# Zip(...) Method
Applies a specified function to the corresponding elements of two sequences, producing a sequence of the results.

## Syntax
```
Zip(second, resultSelector)
```

### Parameters

#### second
The second input sequence.

#### resultSelector
A function that specifies how to combine the corresponding elements of the two sequences: ```TResult resultSelector(TSource, TSecond)```

### Return Value
An Iterable that contains elements of the two input sequences, combined by resultSelector.

## Remarks
The method steps through the two input sequences, applying function resultSelector to corresponding elements of the two sequences. The method returns a sequence of the values that are returned by resultSelector. If the input sequences do not have the same number of elements, the method combines elements until it reaches the end of one of the sequences. For example, if one sequence has three elements and the other one has four, the result sequence has only three elements.

This method is implemented by using deferred execution. The immediate return value is an object that stores all the information that is required to perform the action. The query that this method represents is not executed until the object is enumerated.

## Examples



