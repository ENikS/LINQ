# AsEnumerable Method
Returns the input typed as Enumerable<T>

## Syntax
```
AsEnumerable(source)
```

### Parameters

#### source
The input sequence typed as Iterable<T>.

### Return Value
Enumerable interface 

## Remarks
The AsEnumerable method has no effect other than to change the Iterable type of source from a type that implements Iterable<T> to Enumerable<T>. Once converted it could be used to query date using LINQ methods.

## Examples

