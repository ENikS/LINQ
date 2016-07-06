# Aggregate(...) Method
Applies an accumulator function over a sequence. The specified seed value is used as the initial accumulator value, and the specified function is used to select the result value.



## Syntax
```
Aggregate([seed,] func[, resultSelector])
```

### Parameters

#### seed
The initial accumulator value.

#### func
An accumulator function to be invoked on each element. ```TAccumulate func(TAccumulate, TSource)```

#### resultSelector
A function to transform the final accumulator value into the result value. ```TResult resultSelector(TAccumulate)```


### Return Value
The transformed final accumulator value.



## Remarks
The *Aggregate* method makes it simple to perform a calculation over a sequence of values. This method works by calling ```func``` one time for each element in source. Each time ```func``` is called, *Aggregate* passes both the element from the sequence and an aggregated value (as the first argument to ```func```). The value of the ```seed``` parameter is used as the initial aggregate value. The result of ```func``` replaces the previous aggregated value. The final result of func is passed to ```resultSelector``` to obtain the final result of Aggregate.



## Examples
