///////////////////////////////////////////////////////////////////////////////
// Copyright (c) ENikS.  All rights reserved.
//
// Licensed under the Apache License, Version 2.0  ( the  "License" );  you may 
// not use this file except in compliance with the License.  You may  obtain  a 
// copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required  by  applicable  law  or  agreed  to  in  writing,  software 
// distributed under the License is distributed on an "AS  IS"  BASIS,  WITHOUT
// WARRANTIES OR CONDITIONS  OF  ANY  KIND, either express or implied.  See the 
// License for the specific  language  governing  permissions  and  limitations 
// under the License.
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
require("es6-shim");
function LINQ(TSource) {
    if (TSource === void 0) { TSource = null; }
    return new Linq(TSource);
}
exports.LINQ = LINQ;
function Range(start, count) {
    return new Linq(null, function () { return new GeneratorIterator(start, count, true); });
}
exports.Range = Range;
function Repeat(start, count) {
    return new Linq(null, function () { return new GeneratorIterator(start, count); });
}
exports.Repeat = Repeat;
var Linq = (function () {
    function Linq(target, factory, arg) {
        this._target = target;
        this._factory = factory;
        this._factoryArg = arg;
    }
    Linq.prototype[Symbol.iterator] = function () {
        return (null != this._factory) ? this._factory(this._factoryArg)
            : (null != this._target) ? this._target[Symbol.iterator]()
                : { next: function () { return { done: true, value: undefined }; } };
    };
    Linq.prototype.GetEnumerator = function () {
        return new Enumerator(this[Symbol.iterator]());
    };
    Linq.prototype.Aggregate = function (seed, func, resultSelector) {
        if (resultSelector === void 0) { resultSelector = selfFn; }
        var result = seed;
        var res, iterator = this[Symbol.iterator]();
        while (!(res = iterator.next()).done) {
            result = func(result, res.value);
        }
        return resultSelector(result);
    };
    Linq.prototype.All = function (predicate) {
        if (predicate === void 0) { predicate = trueFn; }
        var result, iterator = this[Symbol.iterator]();
        while (!(result = iterator.next()).done) {
            if (!predicate(result.value)) {
                return false;
            }
        }
        return true;
    };
    Linq.prototype.Any = function (predicate) {
        var result, iterator = this[Symbol.iterator]();
        if (null == predicate) {
            return !iterator.next().done;
        }
        while (!(result = iterator.next()).done) {
            if (predicate(result.value)) {
                return true;
            }
        }
        return false;
    };
    Linq.prototype.Average = function (func) {
        if (func === void 0) { func = selfFn; }
        var result, sum = 0, count = 0;
        var iterator = this[Symbol.iterator]();
        while (!(result = iterator.next()).done) {
            sum += result.value;
            count++;
        }
        return sum / count;
    };
    Linq.prototype.Contains = function (source, equal) {
        if (equal === void 0) { equal = function (a, b) { return a === b; }; }
        var result, iterator = this[Symbol.iterator]();
        while (!(result = iterator.next()).done) {
            if (equal(source, result.value)) {
                return true;
            }
        }
        return false;
    };
    Linq.prototype.Count = function (predicate) {
        if (predicate === void 0) { predicate = trueFn; }
        var result, count = 0;
        var iterator = this[Symbol.iterator]();
        while (!(result = iterator.next()).done) {
            if (predicate(result.value)) {
                count++;
            }
        }
        return count;
    };
    Linq.prototype.Max = function (transform) {
        if (transform === void 0) { transform = selfFn; }
        var result, value, max, hasValue = false;
        var iterator = this[Symbol.iterator]();
        while (!(result = iterator.next()).done) {
            value = transform(result.value);
            if (hasValue) {
                if (max < value)
                    max = value;
            }
            else {
                max = value;
                hasValue = true;
            }
        }
        if (!hasValue)
            throw noElements;
        return max;
    };
    Linq.prototype.Min = function (transform) {
        if (transform === void 0) { transform = selfFn; }
        var result, value, min, hasValue = false;
        var iterator = this[Symbol.iterator]();
        while (!(result = iterator.next()).done) {
            value = transform(result.value);
            if (hasValue) {
                if (min > value)
                    min = value;
            }
            else {
                min = value;
                hasValue = true;
            }
        }
        if (!hasValue)
            throw noElements;
        return min;
    };
    Linq.prototype.ElementAt = function (index) {
        var result, count = 0;
        var iterator = this[Symbol.iterator]();
        while (!(result = iterator.next()).done) {
            if (index === count++) {
                return result.value;
            }
        }
        throw "Argument Out Of Range";
    };
    Linq.prototype.ElementAtOrDefault = function (index) {
        var result, value, count = 0;
        var iterator = this[Symbol.iterator]();
        while (!(result = iterator.next()).done) {
            if (index === count++) {
                return result.value;
            }
            value = result.value;
        }
        return getDefaultVal(typeof value);
    };
    Linq.prototype.First = function (predicate) {
        if (predicate === void 0) { predicate = trueFn; }
        var result;
        var iterator = this[Symbol.iterator]();
        while (!(result = iterator.next()).done) {
            if (predicate(result.value)) {
                return result.value;
            }
        }
        throw nothingFound;
    };
    Linq.prototype.FirstOrDefault = function (predicate) {
        if (predicate === void 0) { predicate = trueFn; }
        var result, value;
        var iterator = this[Symbol.iterator]();
        while (!(result = iterator.next()).done) {
            value = result.value;
            if (predicate(value)) {
                return result.value;
            }
        }
        return getDefaultVal(typeof value);
    };
    Linq.prototype.Last = function (predicate) {
        if (predicate === void 0) { predicate = trueFn; }
        var result, value, found = false;
        var iterator = this[Symbol.iterator]();
        while (!(result = iterator.next()).done) {
            if (predicate(result.value)) {
                value = result.value;
                found = true;
            }
        }
        if (!found) {
            throw nothingFound;
        }
        return value;
    };
    Linq.prototype.LastOrDefault = function (predicate) {
        if (predicate === void 0) { predicate = trueFn; }
        var result, value, lastKnown, found = false;
        var iterator = this[Symbol.iterator]();
        while (!(result = iterator.next()).done) {
            if (predicate(result.value)) {
                value = result.value;
                found = true;
            }
            lastKnown = result.value;
        }
        return (found) ? value : getDefaultVal(typeof lastKnown);
    };
    Linq.prototype.SequenceEqual = function (other, equal) {
        if (equal === void 0) { equal = function (a, b) { return a === b; }; }
        var res1, res2;
        var it1 = this[Symbol.iterator]();
        var it2 = other[Symbol.iterator]();
        do {
            res1 = it1.next();
            res2 = it2.next();
            if ((res1.done != res2.done) || !equal(res1.value, res2.value)) {
                return false;
            }
        } while (!(res1.done) && !(res2.done));
        return true;
    };
    Linq.prototype.Single = function (predicate) {
        if (predicate === void 0) { predicate = trueFn; }
        var value, hasValue = false;
        var result, iterator = this[Symbol.iterator]();
        while (!(result = iterator.next()).done) {
            if (predicate(result.value)) {
                if (!hasValue) {
                    value = result.value;
                    hasValue = true;
                }
                else {
                    throw tooMany;
                }
            }
        }
        if (hasValue)
            return value;
        throw nothingFound;
    };
    Linq.prototype.SingleOrDefault = function (predicate) {
        if (predicate === void 0) { predicate = trueFn; }
        var value, lastKnown, hasValue = false;
        var result, iterator = this[Symbol.iterator]();
        while (!(result = iterator.next()).done) {
            if (predicate(result.value)) {
                if (!hasValue) {
                    value = result.value;
                    hasValue = true;
                }
                else {
                    throw tooMany;
                }
            }
            lastKnown = result.value;
        }
        return (hasValue) ? value : getDefaultVal(typeof lastKnown);
    };
    Linq.prototype.Sum = function (transform) {
        if (transform === void 0) { transform = selfFn; }
        var result, sum = 0;
        var iterator = this[Symbol.iterator]();
        while (!(result = iterator.next()).done) {
            sum += result.value;
        }
        return sum;
    };
    Linq.prototype.ToArray = function () {
        var result, array = [];
        var iterator = this[Symbol.iterator]();
        while (!(result = iterator.next()).done) {
            array.push(result.value);
        }
        return array;
    };
    Linq.prototype.ToMap = function (keySelector, elementSelector) {
        if (elementSelector === void 0) { elementSelector = selfFn; }
        var dictionary = new Map();
        var result, iterator = this[Symbol.iterator]();
        while (!(result = iterator.next()).done) {
            dictionary.set(keySelector(result.value), elementSelector(result.value));
        }
        return dictionary;
    };
    Linq.prototype.ToDictionary = function (keySelector, elementSelector) {
        if (elementSelector === void 0) { elementSelector = selfFn; }
        var dictionary = new Map();
        var result, iterator = this[Symbol.iterator]();
        while (!(result = iterator.next()).done) {
            dictionary.set(keySelector(result.value), elementSelector(result.value));
        }
        return dictionary;
    };
    Linq.prototype.DefaultIfEmpty = function (defaultValue) {
        var _this = this;
        if (defaultValue === void 0) { defaultValue = undefined; }
        return new Linq(this, function () { return new DefaultIfEmptyIteratror(_this._target[Symbol.iterator](), defaultValue); });
    };
    Linq.prototype.Cast = function () {
        var _this = this;
        return new Linq(this, function () { return new SelectIteratror(_this._target[Symbol.iterator](), function (a) { return a; }); });
    };
    Linq.prototype.Concat = function (second) {
        var aggregate = [this._target, second];
        return new Linq(this, function () { return new SelectManyIteratror(aggregate[Symbol.iterator](), selfFn, selfFn); });
    };
    Linq.prototype.Distinct = function () {
        var _this = this;
        return new Linq(this, function () { return new DistinctIteratror(_this._target[Symbol.iterator]()); });
    };
    Linq.prototype.Except = function (other) {
        var _this = this;
        var _set = new Set();
        var result, otherIterator = other[Symbol.iterator]();
        while (!(result = otherIterator.next()).done) {
            _set.add(result.value);
        }
        return new Linq(this, function () { return new IntersectIteratror(_this._target[Symbol.iterator](), _set, true); });
    };
    Linq.prototype.GroupBy = function (selKey, selElement, selResult) {
        if (selResult === void 0) { selResult = defGrouping; }
        var result;
        var iterator = this[Symbol.iterator]();
        var _map = new Map();
        while (!(result = iterator.next()).done) {
            var key = selKey(result.value);
            var group = _map.get(key);
            if ('undefined' === typeof group) {
                group = [];
                _map.set(key, group);
            }
            group.push(selElement(result.value));
        }
        var factory = function () { return new GroupByIteratror(_map.keys(), selResult, _map); };
        var tst = factory();
        return new Linq(this, function () { return new GroupByIteratror(_map.keys(), selResult, _map); });
    };
    Linq.prototype.GroupJoin = function (inner, oKeySelect, iKeySelect, resultSelector) {
        var _this = this;
        if (resultSelector === void 0) { resultSelector = defGrouping; }
        var _map = new Map();
        var _inner = inner[Symbol.iterator]();
        var result;
        while (!(result = _inner.next()).done) {
            var key = iKeySelect(result.value);
            if ('undefined' === typeof key)
                throw "Inner Key selector returned undefined Key";
            var group = _map.get(key);
            if ('undefined' === typeof group) {
                group = [];
                _map.set(key, group);
            }
            group.push(result.value);
        }
        return new Linq(this, function () { return new GroupJoinIteratror(_this._target[Symbol.iterator](), oKeySelect, resultSelector, _map); });
    };
    Linq.prototype.Intersect = function (other) {
        var _this = this;
        var _set = new Set();
        var result, otherIterator = other[Symbol.iterator]();
        while (!(result = otherIterator.next()).done) {
            _set.add(result.value);
        }
        return new Linq(this, function () { return new IntersectIteratror(_this._target[Symbol.iterator](), _set); });
    };
    Linq.prototype.Join = function (inner, oSelector, iSelector, transform) {
        var _this = this;
        return new Linq(this, function () { return new JoinIteratror(_this._target[Symbol.iterator](), inner[Symbol.iterator](), oSelector, iSelector, transform); });
    };
    Linq.prototype.OrderBy = function (keySelect, equal) {
        if (keySelect === void 0) { keySelect = selfFn; }
        if (equal === void 0) { equal = function (a, b) { return a - b; }; }
        return new OrderedLinq(this, function (array) { return new ArrayIterator(array, 0, function (i) { return i >= array.length; }); }, function (a, b) { return equal(keySelect(a), keySelect(b)); });
    };
    Linq.prototype.OrderByDescending = function (keySelect, equal) {
        if (keySelect === void 0) { keySelect = selfFn; }
        if (equal === void 0) { equal = function (a, b) { return a - b; }; }
        return new OrderedLinq(this, function (array) { return new ArrayIterator(array, array.length - 1, function (i) { return 0 > i; }, -1); }, function (a, b) { return equal(keySelect(a), keySelect(b)); });
    };
    Linq.prototype.ThenBy = function (keySelect, equal) {
        if (keySelect === void 0) { keySelect = selfFn; }
        if (equal === void 0) { equal = function (a, b) { return a - b; }; }
        if (this instanceof OrderedLinq) {
            var superEqual = this.equal;
            this.equal = function (a, b) {
                var result = superEqual(a, b);
                return (0 != result) ? result : equal(keySelect(a), keySelect(b));
            };
            return this;
        }
        else {
            return new OrderedLinq(this, function (array) { return new ArrayIterator(array, 0, function (i) { return i >= array.length; }); }, function (a, b) { return equal(keySelect(a), keySelect(b)); });
        }
    };
    Linq.prototype.ThenByDescending = function (keySelect, equal) {
        if (keySelect === void 0) { keySelect = selfFn; }
        if (equal === void 0) { equal = function (a, b) { return a - b; }; }
        if (this instanceof OrderedLinq) {
            var superEqual = this.equal;
            this.equal = function (a, b) {
                var result = superEqual(a, b);
                return (0 != result) ? result : equal(keySelect(a), keySelect(b));
            };
            return this;
        }
        else {
            return new OrderedLinq(this, function (array) { return new ArrayIterator(array, array.length - 1, function (i) { return 0 > i; }, -1); }, function (a, b) { return equal(keySelect(a), keySelect(b)); });
        }
    };
    Linq.prototype.Range = function (start, count) {
        return new Linq(null, function () { return new GeneratorIterator(start, count, true); });
    };
    Linq.prototype.Repeat = function (element, count) {
        return new Linq(null, function () { return new GeneratorIterator(element, count); });
    };
    Linq.prototype.Reverse = function () {
        var array = Array.isArray(this._target) ? this._target : this.ToArray();
        return new Linq(null, function () { return new ArrayIterator(array, array.length - 1, function (i) { return 0 > i; }, -1); });
    };
    Linq.prototype.Select = function (transform) {
        var _this = this;
        return new Linq(this, function () { return new SelectIteratror(_this._target[Symbol.iterator](), transform); });
    };
    Linq.prototype.SelectMany = function (selector, result) {
        var _this = this;
        if (selector === void 0) { selector = selfFn; }
        if (result === void 0) { result = selfFn; }
        return new Linq(this, function () { return new SelectManyIteratror(_this._target[Symbol.iterator](), selector, result); });
    };
    Linq.prototype.Skip = function (skip) {
        var iterator = this._target[Symbol.iterator]();
        for (var i = 0; i < skip; i++)
            iterator.next();
        return new Linq(this, function () { return new WhereIteratror(iterator, trueFn); });
    };
    Linq.prototype.SkipWhile = function (predicate) {
        var _this = this;
        if (predicate === void 0) { predicate = function (a, n) { return false; }; }
        return new Linq(this, function () { return new SkipIterator(_this._target[Symbol.iterator](), predicate); });
    };
    Linq.prototype.Take = function (take) {
        var _this = this;
        return new Linq(this, function () { return new TakeIterator(_this._target[Symbol.iterator](), function (a, n) { return take > n; }); });
    };
    Linq.prototype.TakeWhile = function (predicate) {
        var _this = this;
        return new Linq(this, function () { return new TakeIterator(_this._target[Symbol.iterator](), predicate); });
    };
    Linq.prototype.Union = function (second) {
        var aggregate = [this._target, second];
        return new Linq(this, function () { return new UnionIteratror(aggregate[Symbol.iterator]()); });
    };
    Linq.prototype.Where = function (predicate) {
        var _this = this;
        if (predicate === void 0) { predicate = trueFn; }
        return new Linq(this, function () { return new WhereIteratror(_this._target[Symbol.iterator](), predicate); });
    };
    Linq.prototype.Zip = function (second, func) {
        var _this = this;
        return new Linq(this, function () { return new ZipIteratror(_this._target[Symbol.iterator](), second[Symbol.iterator](), func); });
    };
    return Linq;
})();
var OrderedLinq = (function (_super) {
    __extends(OrderedLinq, _super);
    function OrderedLinq(target, factory, equal) {
        _super.call(this, target, factory);
        this.equal = equal;
    }
    OrderedLinq.prototype[Symbol.iterator] = function () {
        if ('undefined' === typeof this._factoryArg) {
            this._factoryArg = this._target.ToArray();
            this._factoryArg.sort(this.equal);
        }
        return this._factory(this._factoryArg);
    };
    return OrderedLinq;
})(Linq);
var Enumerator = (function () {
    function Enumerator(sourceIterator) {
        this._iterator = sourceIterator;
    }
    Object.defineProperty(Enumerator.prototype, "Current", {
        get: function () {
            return this._result.value;
        },
        enumerable: true,
        configurable: true
    });
    Enumerator.prototype.MoveNext = function () {
        this._result = this._iterator.next();
        return !this._result.done;
    };
    Enumerator.prototype.Reset = function () {
        throw "JavaScript iterators could not be Reset";
    };
    return Enumerator;
})();
var ArrayIterator = (function () {
    function ArrayIterator(_source, _current, _done, _increment) {
        if (_increment === void 0) { _increment = 1; }
        this._source = _source;
        this._current = _current;
        this._done = _done;
        this._increment = _increment;
    }
    ArrayIterator.prototype.next = function (value) {
        var result = { value: this._source[this._current], done: this._done(this._current) };
        this._current += this._increment;
        return result;
    };
    return ArrayIterator;
})();
var IteratorBase = (function () {
    function IteratorBase(_iterator) {
        this._iterator = _iterator;
        this._done = { value: undefined, done: true };
    }
    return IteratorBase;
})();
var DistinctIteratror = (function (_super) {
    __extends(DistinctIteratror, _super);
    function DistinctIteratror() {
        _super.apply(this, arguments);
        this._set = new Set();
    }
    DistinctIteratror.prototype.next = function (value) {
        var result;
        while (!(result = this._iterator.next()).done && this._set.has(result.value)) { }
        this._set.add(result.value);
        return result;
    };
    return DistinctIteratror;
})(IteratorBase);
var IntersectIteratror = (function (_super) {
    __extends(IntersectIteratror, _super);
    function IntersectIteratror(iterator, _set, _switch) {
        if (_switch === void 0) { _switch = false; }
        _super.call(this, iterator);
        this._set = _set;
        this._switch = _switch;
    }
    IntersectIteratror.prototype.next = function (value) {
        var result;
        while (!(result = this._iterator.next()).done && (this._switch == this._set.has(result.value))) { }
        if (!this._switch)
            this._set.add(result.value);
        return result;
    };
    return IntersectIteratror;
})(IteratorBase);
var GeneratorIterator = (function (_super) {
    __extends(GeneratorIterator, _super);
    function GeneratorIterator(_current, _count, _increment) {
        if (_increment === void 0) { _increment = false; }
        _super.call(this, null);
        this._current = _current;
        this._count = _count;
        this._increment = _increment;
    }
    GeneratorIterator.prototype.next = function (value) {
        var result = (0 < this._count) ? { value: this._current, done: 0 >= this._count-- } : this._done;
        if (this._increment)
            this._current++;
        return result;
    };
    return GeneratorIterator;
})(IteratorBase);
var DefaultIfEmptyIteratror = (function (_super) {
    __extends(DefaultIfEmptyIteratror, _super);
    function DefaultIfEmptyIteratror(sourceIterator, _default) {
        _super.call(this, sourceIterator);
        this._default = _default;
    }
    DefaultIfEmptyIteratror.prototype.next = function (value) {
        return this.check(this._iterator.next());
    };
    DefaultIfEmptyIteratror.prototype.check = function (result) {
        if (result.done) {
            result.value = this._default;
        }
        else {
            this.check = function (a) { return a; };
        }
        return result;
    };
    return DefaultIfEmptyIteratror;
})(IteratorBase);
var MethodIteratror = (function (_super) {
    __extends(MethodIteratror, _super);
    function MethodIteratror(iterator, _method, _index) {
        if (_method === void 0) { _method = null; }
        if (_index === void 0) { _index = 0; }
        _super.call(this, iterator);
        this._method = _method;
        this._index = _index;
    }
    return MethodIteratror;
})(IteratorBase);
var WhereIteratror = (function (_super) {
    __extends(WhereIteratror, _super);
    function WhereIteratror() {
        _super.apply(this, arguments);
    }
    WhereIteratror.prototype.next = function (value) {
        var result;
        do {
            result = this._iterator.next();
        } while (!result.done && !this._method(result.value, this._index++));
        return result;
    };
    return WhereIteratror;
})(MethodIteratror);
var SkipIterator = (function (_super) {
    __extends(SkipIterator, _super);
    function SkipIterator() {
        _super.apply(this, arguments);
        this._hasSkipped = false;
    }
    SkipIterator.prototype.next = function (value) {
        var result;
        if (this._hasSkipped)
            return this._iterator.next();
        while (!(result = this._iterator.next()).done && this._method(result.value, this._index++)) { }
        this._hasSkipped = true;
        return result;
    };
    return SkipIterator;
})(MethodIteratror);
var TakeIterator = (function (_super) {
    __extends(TakeIterator, _super);
    function TakeIterator() {
        _super.apply(this, arguments);
    }
    TakeIterator.prototype.next = function (value) {
        var result = this._iterator.next();
        if (result.done || !this._method(result.value, this._index++)) {
            return this._done;
        }
        return result;
    };
    return TakeIterator;
})(MethodIteratror);
var ZipIteratror = (function (_super) {
    __extends(ZipIteratror, _super);
    function ZipIteratror(first, _second, func) {
        _super.call(this, first, func);
        this._second = _second;
    }
    ZipIteratror.prototype.next = function (value) {
        var first = this._iterator.next();
        var second = this._second.next();
        if (first.done || second.done) {
            return this._done;
        }
        return { done: false, value: this._method(first.value, second.value) };
    };
    return ZipIteratror;
})(MethodIteratror);
var SelectIteratror = (function (_super) {
    __extends(SelectIteratror, _super);
    function SelectIteratror() {
        _super.apply(this, arguments);
    }
    SelectIteratror.prototype.next = function (value) {
        var result = this._iterator.next();
        if (result.done)
            return result;
        result.value = this._method(result.value, this._index++);
        return result;
    };
    return SelectIteratror;
})(MethodIteratror);
var SelectManyIteratror = (function (_super) {
    __extends(SelectManyIteratror, _super);
    function SelectManyIteratror(sourceIterator, selector, transform) {
        if (transform === void 0) { transform = selfFn; }
        _super.call(this, sourceIterator, selector);
        this._collectionState = this._done;
        this._resultState = this._done;
        this._resultSelector = transform;
    }
    SelectManyIteratror.prototype.next = function (value) {
        do {
            if (this._resultState.done) {
                this._collectionState = this._iterator.next();
                if (this._collectionState.done)
                    return this._done;
                this._collection = this._method(this._collectionState.value)[Symbol.iterator]();
            }
            this._resultState = this._collection.next();
            if (!this._resultState.done) {
                this._resultState.value = this._resultSelector(this._resultState.value);
            }
        } while (this._resultState.done);
        return this._resultState;
    };
    return SelectManyIteratror;
})(MethodIteratror);
var JoinIteratror = (function (_super) {
    __extends(JoinIteratror, _super);
    function JoinIteratror(outer, inner, oKeySelect, iKeySelect, transform) {
        _super.call(this, outer, null);
        this._method = oKeySelect;
        var result;
        this._map = new Map();
        while (!(result = inner.next()).done) {
            var key = iKeySelect(result.value);
            var group = this._map.get(key);
            if ('undefined' === typeof group) {
                group = [];
                this._map.set(key, group);
            }
            group.push(result.value);
        }
        this._resultSelector = transform;
    }
    JoinIteratror.prototype.next = function (value) {
        do {
            if (this._resultState.done) {
                this._collectionState = this._iterator.next();
                if (this._collectionState.done)
                    return this._done;
                var key = this._method(this._collectionState.value);
                var innerSet = this._map.get(key);
                if ('undefined' === typeof innerSet)
                    continue;
                this._collection = innerSet[Symbol.iterator]();
            }
            this._resultState = this._collection.next();
            if (!this._resultState.done) {
                this._resultState.value = this._resultSelector(this._collectionState.value, this._resultState.value);
            }
        } while (this._resultState.done);
        return this._resultState;
    };
    return JoinIteratror;
})(SelectManyIteratror);
var UnionIteratror = (function (_super) {
    __extends(UnionIteratror, _super);
    function UnionIteratror(sourceIterator) {
        _super.call(this, sourceIterator, selfFn);
        this._set = new Set();
    }
    UnionIteratror.prototype.next = function (value) {
        var result;
        while (!(result = _super.prototype.next.call(this)).done && this._set.has(result.value)) { }
        this._set.add(result.value);
        return result;
    };
    return UnionIteratror;
})(SelectManyIteratror);
var GroupByIteratror = (function (_super) {
    __extends(GroupByIteratror, _super);
    function GroupByIteratror(iterator, resultSelect, _map) {
        _super.call(this, iterator, resultSelect);
        this._map = _map;
    }
    GroupByIteratror.prototype.next = function (value) {
        var result = this._iterator.next();
        if (result.done)
            return this._done;
        var iterable = this._map.get(result.value);
        return { value: this._method(result.value, iterable), done: false };
    };
    return GroupByIteratror;
})(MethodIteratror);
var GroupJoinIteratror = (function (_super) {
    __extends(GroupJoinIteratror, _super);
    function GroupJoinIteratror(iterator, oKeySelect, _transform, _map) {
        _super.call(this, iterator, oKeySelect);
        this._transform = _transform;
        this._map = _map;
    }
    GroupJoinIteratror.prototype.next = function (value) {
        var innerSet;
        var result;
        do {
            result = this._iterator.next();
            if (result.done)
                return this._done;
            var key = this._method(result.value);
            innerSet = this._map.get(key);
        } while ('undefined' === typeof innerSet);
        return { value: this._transform(result.value, innerSet), done: false };
    };
    return GroupJoinIteratror;
})(MethodIteratror);
var trueFn = function () { return true; };
var selfFn = function (o) { return o; };
var defGrouping = function (a, b) {
    if ('undefined' != typeof b['key'])
        throw "Object already has property [key]";
    b['key'] = a;
    return b;
};
function getDefaultVal(type) {
    if (typeof type !== 'string')
        throw new TypeError('Type must be a string.');
    switch (type) {
        case 'boolean': return false;
        case 'function': return function () { };
        case 'null': return null;
        case 'number': return 0;
        case 'object': return {};
        case 'string': return "";
        case 'symbol': return Symbol();
        case 'undefined': return void 0;
    }
    try {
        var ctor = typeof this[type] === 'function'
            ? this[type]
            : eval(type);
        return new ctor;
    }
    catch (e) {
        return {};
    }
}
var nothingFound = "No element satisfies the condition in predicate";
var noElements = "The source sequence is empty.";
var tooMany = "More than one element satisfies the condition in predicate.";
//# sourceMappingURL=linq.js.map