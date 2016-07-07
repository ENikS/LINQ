# Select(...) Method
Projects each element of a sequence into a new form by incorporating the element's index.

## Syntax
```
Select(selector)
```

### Parameters

#### selector
A transform function to apply to each source element; the second parameter of the function represents the index of the source element: ```TResult selector(TSource, index)```

### Return Value
An Iterable whose elements are the result of invoking the transform function on each element of source.

## Remarks
This method is implemented by using deferred execution. The immediate return value is an object that stores all the information that is required to perform the action. The query represented by this method is not executed until the object is enumerated.

The first argument to selector represents the element to process. The second argument to selector represents the zero-based index of that element in the source sequence. This can be useful if the elements are in a known order and you want to do something with an element at a particular index, for example. It can also be useful if you want to retrieve the index of one or more elements.

This projection method requires the transform function, selector, to produce one value for each value in the source sequence, source. If selector returns a value that is itself a collection, it is up to the consumer to traverse the subsequences manually. In such a situation, it might be better for your query to return a single coalesced sequence of values. To achieve this, use the SelectMany method instead of Select. Although SelectMany works similarly to Select, it differs in that the transform function returns a collection that is then expanded by SelectMany before it is returned.


## Examples



