# Except(...) Method
Produces the set difference of two sequences by using the specified key selector to compare values.

## Syntax
```
Except(second[, keySelector])
```

### Parameters

#### second
An Iterable whose elements that also occur in the first sequence will cause those elements to be removed from the returned sequence.

#### keySelector
A function to extract the key from each element of the sequence. This key is being used to determine equality of the elements: ```TKey keySelector(TSource)```

### Return Value
A sequence that contains the set difference of the elements of two sequences.


## Remarks
Gets all the elements from the sequence except for the elements from the second sequence. 



## Examples



