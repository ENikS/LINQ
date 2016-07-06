# SequenceEqual(...) Method
Determines whether two sequences are equal by comparing their elements by using a specified comparer.

## Syntax
```
SequenceEqual(second[, comparer])
```

### Parameters

#### second
An Iterable to compare to the source sequence.

#### comparer
A function to use to compare elements: ```Boolean comparer(first, second)```

### Return Value
**true** if the two source sequences are of equal length and their corresponding elements compare equal according to comparer; otherwise, **false**.

## Remarks
The SequenceEqual method enumerates the two source sequences in parallel and compares corresponding elements by using the specified **comparer**. If comparer is not defined, the default equality comparer is used to compare elements.

## Examples



