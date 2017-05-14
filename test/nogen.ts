///////////////////////////////////////////////////////////////////////////////
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

import {jsn, fruits, people, pets, unorderedMix, unorderedStr} from "./data";
import {assert} from "chai";
import {asEnumerable, Range} from "../lib/linq";



describe('Custom Iterator based -', function () {

    var comparator = (a : string, b : string) => {
        var a1 = a.charCodeAt(3);
        var b1 = b.charCodeAt(3);
        var a2 = a.charCodeAt(2);
        var b2 = b.charCodeAt(2);
        return a1 > b1 ? 1 
                        : a1 < b1 ? -1 
                                    : a2 > b2 ? 1
                                            : a2 < b2 ? -1 : 0;
    }


    it('Reverse()', function () {
        var array = Range(1, 100).ToArray();
        var iterator = asEnumerable(array).Reverse()[Symbol.iterator]()
        for (var i = 100; i > 0; i--) {
            assert.equal(i, iterator.next().value);
        }
        assert.isTrue(iterator.next().done);

        iterator = Range(1, 100).Reverse()[Symbol.iterator]()
        for (i = 100; i > 0; i--) {
            assert.equal(i, iterator.next().value);
        }
        assert.isTrue(iterator.next().done);
    });


    it('DefaultIfEmpty() - Not empty', function () {
        var iterable = Range(0, 5).DefaultIfEmpty(0);
        var iterator = iterable[Symbol.iterator]()
        assert.equal(iterator.next().value, 0);
        assert.equal(iterator.next().value, 1);
        assert.equal(iterator.next().value, 2);
        assert.equal(iterator.next().value, 3);
        assert.equal(iterator.next().value, 4);
        assert.isTrue(iterator.next().done);
    });

    it('DefaultIfEmpty() - Default', function () {
        var iterable = asEnumerable([]).DefaultIfEmpty(0);
        var iterator = iterable[Symbol.iterator]()
        assert.equal(iterator.next().value, 0);
        assert.isTrue(iterator.next().done);
    });

    it('DefaultIfEmpty() - No Default', function () {
        var iterable = asEnumerable([]).DefaultIfEmpty();
        var iterator = iterable[Symbol.iterator]()
        assert.isUndefined(iterator.next().value);
        assert.isTrue(iterator.next().done);
    });



    it('OrderBy() - Default', function () {
        var enumerable = asEnumerable(unorderedMix);
        var etalon = enumerable.ToArray().sort();
        var iterable = enumerable.OrderBy();
        var iterator = iterable[Symbol.iterator]()

        for (let exp of etalon) {
            var actual = iterator.next().value;
            if (isNaN(<any>exp) && isNaN(<any>actual)) continue;
            assert.equal(actual, exp);
        }
    });

    it('OrderBy() - Selector', function () {
        var citerable = asEnumerable(jsn).OrderBy(a => a.name);
        var citerator = citerable[Symbol.iterator]()
        assert.equal("a", citerator.next().value.name);
        assert.equal("b", citerator.next().value.name);
        assert.equal("c", citerator.next().value.name);
        assert.equal("d", citerator.next().value.name);
        assert.isTrue(citerator.next().done);
    });

    it('OrderBy() - Comparator', function () {
        var etalon = asEnumerable(jsn).ToArray().sort((a, b) => a.name.charCodeAt(0) - b.name.charCodeAt(0));
        var iterable = asEnumerable(jsn).OrderBy(undefined, (b : any, c : any) => b.name.charCodeAt(0) - c.name.charCodeAt(0));
        var iterator = iterable[Symbol.iterator]()

        for (let exp of etalon) {
            assert.equal(iterator.next().value, exp);
        }
    });

    it('OrderBy() - Comparator and Selector', function () {
        var etalon = asEnumerable(jsn).ToArray().sort((a, b) => a.name.charCodeAt(0) - b.name.charCodeAt(0));
        var iterable = asEnumerable(jsn).OrderBy(a => a.name, (b, c) => b.charCodeAt(0) - c.charCodeAt(0));
        var iterator = iterable[Symbol.iterator]()

        for (let exp of etalon) {
            assert.equal(iterator.next().value, exp);
        }
    });



    it('OrderByDescending() - Default', function () {
        var enumerable = asEnumerable(unorderedMix);
        var etalon = enumerable.ToArray().sort();
        var iterable = enumerable.OrderByDescending();
        var iterator = iterable[Symbol.iterator]()

        for (let i = etalon.length - 1; i >= 0; i--) {
            var exp = etalon[i];
            var actual = iterator.next().value;
            if (isNaN(<any>exp) && isNaN(<any>actual)) continue;
            assert.equal(actual, exp);
        }
    });

    it('OrderByDescending() - Selector', function () {
        var citerable = asEnumerable(jsn).OrderByDescending(a => a.name);
        var citerator = citerable[Symbol.iterator]()
        assert.equal("d", citerator.next().value.name);
        assert.equal("c", citerator.next().value.name);
        assert.equal("b", citerator.next().value.name);
        assert.equal("a", citerator.next().value.name);
        assert.isTrue(citerator.next().done);
    });

    it('OrderByDescending() - Comparator', function () {
        var etalon = asEnumerable(jsn).ToArray().sort((a, b) => b.name.charCodeAt(0) - a.name.charCodeAt(0));
        var iterable = asEnumerable(jsn).OrderByDescending(a => a.name, (b, c) => b.charCodeAt(0) - c.charCodeAt(0));
        var iterator = iterable[Symbol.iterator]()

        for (let exp of etalon) {
            assert.equal(iterator.next().value, exp);
        }
    });




    it('ThenBy() - Default', function () {
        var enumerable = asEnumerable(unorderedMix);
        var iterable = enumerable.OrderBy().ThenBy();
        var iterator = iterable[Symbol.iterator]()

        for (let exp of enumerable.ToArray().sort()) {
            var actual = iterator.next().value;
            if (isNaN(<any>exp) && isNaN(<any>actual)) continue;
            assert.equal(actual, exp);
        }
    });

    it('ThenBy() - Selector', function () {
        var enumerable = asEnumerable(unorderedStr);
        var iterable = enumerable.OrderBy(s => s.charCodeAt(3)).ThenBy(s => s.charCodeAt(2));
        var iterator = iterable[Symbol.iterator]()

        for (let exp of enumerable.ToArray().sort(comparator)) {
            assert.equal(iterator.next().value, exp);
        }
    });

    it('ThenBy() - Default Key', function () {
        var enumerable = asEnumerable(unorderedStr);

        var iterable = enumerable.OrderBy().ThenBy(undefined, comparator);
        var iterator = iterable[Symbol.iterator]()

        for (let exp of enumerable.ToArray().sort(comparator)) {
            assert.equal(iterator.next().value, exp);
        }
    });

    it('ThenBy() - Function', function () {
        var enumerable = asEnumerable(unorderedStr);

        var iterable = enumerable.OrderBy().ThenBy(s => s, comparator);
        var iterator = iterable[Symbol.iterator]()

        for (let exp of enumerable.ToArray().sort(comparator)) {
            assert.equal(iterator.next().value, exp);
        }
    });



    it('ThenByDescending() - Default', function () {
        var enumerable = asEnumerable(unorderedMix);
        var etalon = enumerable.ToArray().sort();
        var iterable = enumerable.OrderByDescending().ThenByDescending();
        var iterator = iterable[Symbol.iterator]()

        for (let i = etalon.length - 1; i >= 0; i--) {
            var exp = etalon[i];
            var actual = iterator.next().value;
            if (isNaN(<any>exp) && isNaN(<any>actual)) continue;
            assert.equal(actual, exp);
        }
    });


    it('ThenByDescending() - Selector', function () {
        var enumerable = asEnumerable(unorderedStr);
        var etalon = enumerable.ToArray().sort(comparator);
        var iterable = enumerable.OrderByDescending(s => s.charCodeAt(3)).ThenByDescending(s => s.charCodeAt(2));
        var iterator = iterable[Symbol.iterator]()

        for (let i = etalon.length - 1; i >= 0; i--) {
            var exp = etalon[i];
            var actual = iterator.next().value;
            if (isNaN(<any>exp) && isNaN(<any>actual)) continue;
            assert.equal(actual, exp);
        }
    });

    it('ThenByDescending() - Default Function', function () {
        var enumerable = asEnumerable(unorderedStr);
        var etalon = enumerable.ToArray().sort(comparator);
        var iterable = enumerable.OrderByDescending().ThenByDescending(s => s, comparator);
        var iterator = iterable[Symbol.iterator]()

        for (let i = etalon.length - 1; i >= 0; i--) {
            var exp = etalon[i];
            var actual = iterator.next().value;
            if (isNaN(<any>exp) && isNaN(<any>actual)) continue;
            assert.equal(actual, exp);
        }
    });



    it('Zip()', function () {
        var numbers = [1, 2, 3, 4];
        var words = ["one", "two", "three"];

        var numbersAndWords = asEnumerable(numbers).Zip(words, (first, second) => first + " " + second);
        var iterator = numbersAndWords[Symbol.iterator]()
        assert.equal("1 one", iterator.next().value);
        assert.equal("2 two", iterator.next().value);
        assert.equal("3 three", iterator.next().value);
        assert.isTrue(iterator.next().done);
    });

});

/** Copyright (c) ENikS.  All rights reserved. */
