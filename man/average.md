# Average(...) Method
Computes the average of a sequence of values that are obtained by invoking an optional transform function on each element of the input sequence.


## Syntax
```
Average([selector])
```

### Parameters

#### selector
A transform function to apply to each element. ```TElement selector(TSource)```

### Return Value
The average of the sequence of values


## Remarks
If no **selector** function is specified the implementation assumes sequence of **number** values.


## Examples

