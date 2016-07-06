# Sum(...) Method
Computes the sum of the sequence of number values that are obtained by invoking a transform function on each element of the input sequence.

## Syntax
```
Sum([selector])
```

### Parameters

#### selector
A transform function to apply to each element: ```number selector(TSource)```

### Return Value
The sum of the projected values.

## Remarks
The Sum method returns zero if source contains no elements.
You can apply this method to a sequence of arbitrary values if you provide a function, selector, that projects the members of source into a numeric type.

## Examples



