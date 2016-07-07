# GroupJoin(...) Method
Correlates the elements of two sequences based on key equality and groups the results.


## Syntax
```
GroupJoin(inner, outerKeySelector, innerKeySelector, resultSelector])
```

### inner
The sequence to join to the first sequence.

#### outerKeySelector
A function to extract the join key from each element of the first sequence: ```TKey outerKeySelector(TSource)```

#### innerKeySelector
A function to extract the join key from each element of the second sequence: ```TKey innerKeySelector(TInner)```

#### resultSelector
A function to create a result element from an element from the first sequence and a collection of matching elements from the second sequence: ```TResult resultSelector(TSource, Iterable<TInner>)```


### Return Value
An Iterable that contains elements of type TResult that are obtained by performing a grouped join on two sequences.


## Remarks
This method is implemented by using deferred execution. The immediate return value is an object that stores all the information that is required to perform the action. The query represented by this method is not executed until the object is enumerated.

GroupJoin produces hierarchical results, which means that elements from outer are paired with collections of matching elements from inner. GroupJoin enables you to base your results on a whole set of matches for each element of outer.
If there are no correlated elements in inner for a given element of outer, the sequence of matches for that element will be empty but will still appear in the results.

The resultSelector function is called only one time for each outer element together with a collection of all the inner elements that match the outer element. This differs from the Join method in which the result selector function is invoked on pairs that contain one element from outer and one element from inner.

GroupJoin preserves the order of the elements of outer, and for each element of outer, the order of the matching elements from inner.
GroupJoin has no direct equivalent in traditional relational database terms. However, this method does implement a superset of inner joins and left outer joins. Both of these operations can be written in terms of a grouped join.


## Examples



