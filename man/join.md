# Join(...) Method
Correlates the elements of two sequences based on matching keys. 

## Syntax
```
Join(inner, sourceKeySelector, innerKeySelector, resultSelector)
```

### Parameters

#### inner
The sequence to join to the source sequence.


#### sourceKeySelector
A function to extract the join key from each element of the source sequence: ```TSourceKey sourceKeySelector(TSource)```

#### innerKeySelector
A function to extract the join key from each element of the inner sequence: ```TInnerKey innerKeySelector(TInner)```

#### resultSelector
A function to create a result element from two matching elements: ```TResult resultSelector(TSource, TInner)```


### Return Value
An Iterable that has elements of type TResult that are obtained by performing an inner join on two sequences.


## Remarks
This method is implemented by using deferred execution. The immediate return value is an object that stores all the information that is required to perform the action. The query represented by this method is not executed until the object is enumerated.

A join refers to the operation of correlating the elements of two sources of information based on a common key. Join brings the two information sources and the keys by which they are matched together in one method call. This differs from the use of SelectMany, which requires more than one method call to perform the same operation.

Join preserves the order of the elements of outer, and for each of these elements, the order of the matching elements of inner. In relational database terms, the Join method implements an inner equijoin. 'Inner' means that only elements that have a match in the other sequence are included in the results. An 'equijoin' is a join in which the keys are compared for equality. A left outer join operation has no dedicated standard query operator, but can be performed by using the GroupJoin method. See Join Operations.

## Examples



