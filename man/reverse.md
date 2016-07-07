# Reverse(...) Method
Inverts the order of the elements in a sequence.

## Syntax
```
Reverse()
```


### Return Value
A sequence whose elements correspond to those of the input sequence in reverse order.

## Remarks
This method is implemented by using deferred execution. The immediate return value is an object that stores all the information that is required to perform the action. The query represented by this method is not executed until the object is enumerated.

Unlike OrderBy, this sorting method does not consider the actual values themselves in determining the order. Rather, it just returns the elements in the reverse order from which they are produced by the underlying source.


## Examples



