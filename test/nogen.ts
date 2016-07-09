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

import {jsn, fruits, people, pets} from "./data";
import {assert} from "chai"; 
import {asEnumerable, Range} from "../src/linq";



describe('Custom Iterator based -', function () {



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



    it('OrderBy()', function () {
        var iterable = asEnumerable(jsn).SelectMany(a => a.ids).OrderBy();
        var iterator = iterable[Symbol.iterator]()
        assert.equal(11, iterator.next().value);
        assert.equal(12, iterator.next().value);
        assert.equal(13, iterator.next().value);
        assert.equal(14, iterator.next().value);
        assert.equal(21, iterator.next().value);
        assert.equal(22, iterator.next().value);
        assert.equal(23, iterator.next().value);
        assert.equal(24, iterator.next().value);
        assert.equal(31, iterator.next().value);
        assert.equal(32, iterator.next().value);
        assert.equal(33, iterator.next().value);
        assert.equal(34, iterator.next().value);
        assert.isTrue(iterator.next().done);
        var citerable = asEnumerable(jsn).OrderBy(a=> a.name);
        var citerator = citerable[Symbol.iterator]()
        assert.equal("d", citerator.next().value.name);
        assert.equal("c", citerator.next().value.name);
        assert.equal("b", citerator.next().value.name);
        assert.equal("a", citerator.next().value.name);
        assert.isTrue(iterator.next().done);
        citerable = asEnumerable(jsn).OrderBy(a=> a.name,
            (b, c) => b.charCodeAt(0) - c.charCodeAt(0));
        citerator = citerable[Symbol.iterator]()
        assert.equal("a", citerator.next().value.name);
        assert.equal("b", citerator.next().value.name);
        assert.equal("c", citerator.next().value.name);
        assert.equal("d", citerator.next().value.name);
        assert.isTrue(iterator.next().done);
    });



    it('OrderByDescending()', function () {
        var iterable = asEnumerable(jsn)
            .SelectMany(a => a.ids).OrderByDescending();
        var iterator = iterable[Symbol.iterator]()
        assert.equal(34, iterator.next().value);
        assert.equal(33, iterator.next().value);
        assert.equal(32, iterator.next().value);
        assert.equal(31, iterator.next().value);
        assert.equal(24, iterator.next().value);
        assert.equal(23, iterator.next().value);
        assert.equal(22, iterator.next().value);
        assert.equal(21, iterator.next().value);
        assert.equal(14, iterator.next().value);
        assert.equal(13, iterator.next().value);
        assert.equal(12, iterator.next().value);
        assert.equal(11, iterator.next().value);
        assert.isTrue(iterator.next().done);
        var citerable = asEnumerable(jsn).OrderByDescending(a=> a.name,
            (b, c) => b.charCodeAt(0) - c.charCodeAt(0));
        var citerator = citerable[Symbol.iterator]()
        assert.equal("d", citerator.next().value.name);
        assert.equal("c", citerator.next().value.name);
        assert.equal("b", citerator.next().value.name);
        assert.equal("a", citerator.next().value.name);
        assert.isTrue(iterator.next().done);
        citerable = asEnumerable(jsn).OrderByDescending(a=> a.name);
        citerator = citerable[Symbol.iterator]()
        assert.equal("a", citerator.next().value.name);
        assert.equal("b", citerator.next().value.name);
        assert.equal("c", citerator.next().value.name);
        assert.equal("d", citerator.next().value.name);
        assert.isTrue(iterator.next().done);
    });




    it('ThenBy()', function () {
        var iterable: any = asEnumerable(fruits)
                            .OrderBy(fruit=> fruit.length)
                            .ThenBy(fruit=> fruit.charCodeAt(0))
                            .ThenBy(fruit=> fruit.charCodeAt(4));
        var iterator = iterable[Symbol.iterator]()
        assert.equal("appla", iterator.next().value);
        assert.equal("apple", iterator.next().value);
        assert.equal("grape", iterator.next().value);
        assert.equal("mango", iterator.next().value);
        assert.equal("banana", iterator.next().value);
        assert.equal("orange", iterator.next().value);
        assert.equal("blueberry", iterator.next().value);
        assert.equal("raspberry", iterator.next().value);
        assert.equal("passionfruit", iterator.next().value);
        assert.isTrue(iterator.next().done);
    });

    it('ThenBy() - No order', function () {
        var iterable: any = asEnumerable(fruits)
            .ThenBy(fruit => fruit.charCodeAt(0))
            .ThenBy(fruit => fruit.charCodeAt(4));
        var iterator = iterable[Symbol.iterator]()
        assert.equal("appla", iterator.next().value);
        assert.equal("apple", iterator.next().value);
        assert.equal("blueberry", iterator.next().value);
        assert.equal("banana", iterator.next().value);
        assert.equal("grape", iterator.next().value);
        assert.equal("mango", iterator.next().value);
        assert.equal("orange", iterator.next().value);
        assert.equal("passionfruit", iterator.next().value);
        assert.equal("raspberry", iterator.next().value);
        assert.isTrue(iterator.next().done);
    });




    it('ThenByDescending()', function () {
        var iterable: any = asEnumerable(fruits)
            .OrderByDescending(fruit => fruit.length)
            .ThenByDescending(fruit => fruit.charCodeAt(0))
            .ThenByDescending(fruit => fruit.charCodeAt(4));
        var iterator = iterable[Symbol.iterator]()
        assert.equal("passionfruit", iterator.next().value);
        assert.equal("raspberry", iterator.next().value);
        assert.equal("blueberry", iterator.next().value);
        assert.equal("orange", iterator.next().value);
        assert.equal("banana", iterator.next().value);
        assert.equal("mango", iterator.next().value);
        assert.equal("grape", iterator.next().value);
        assert.equal("apple", iterator.next().value);
        assert.equal("appla", iterator.next().value);
        assert.isTrue(iterator.next().done);
    });

    it('ThenByDescending() - No order', function () {
        var iterable: any = asEnumerable(fruits)
            .ThenByDescending(fruit => fruit.charCodeAt(0))
            .ThenByDescending(fruit => fruit.charCodeAt(4));
        var iterator = iterable[Symbol.iterator]()
        assert.equal("raspberry", iterator.next().value);
        assert.equal("passionfruit", iterator.next().value);
        assert.equal("orange", iterator.next().value);
        assert.equal("mango", iterator.next().value);
        assert.equal("grape", iterator.next().value);
        assert.equal("banana", iterator.next().value);
        assert.equal("blueberry", iterator.next().value);
        assert.equal("apple", iterator.next().value);
        assert.equal("appla", iterator.next().value);
        assert.isTrue(iterator.next().done);
    });




    it('Zip()', function () {
        var numbers = [ 1, 2, 3, 4 ];
        var words = [ "one", "two", "three" ];

        var numbersAndWords = asEnumerable(numbers).Zip(words, (first, second) => first + " " + second);
        var iterator = numbersAndWords[Symbol.iterator]()
        assert.equal("1 one", iterator.next().value);
        assert.equal("2 two", iterator.next().value);
        assert.equal("3 three", iterator.next().value);
        assert.isTrue(iterator.next().done);
    });

});

