# Distinct(...) Method
Returns distinct elements from a sequence by using a specified key selector to compare values. 

## Syntax
```
Distinct<TSource>([keySelector])
```

### Parameters

#### keySelector
A function to extract the key from each element of the sequence. This key is being used to determine uniqueness of the element: ```TKey keySelector(TSource)```

### Return Value
An Enumerable that contains distinct elements from the source sequence.


## Remarks
This method is implemented by using deferred execution. The immediate return value is an object that stores all the information that is required to perform the action. The query represented by this method is not executed until the object is enumerated.
The **Distinct** method returns an unordered sequence that contains no duplicate values. If keySelector is omitted, the sequence elements themselves are used as keys.


## Examples



