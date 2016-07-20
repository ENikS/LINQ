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

import {assert} from "chai";
import * as Enumerable from "../lib/linq";
import defaultmethod from "../lib/linq";

var simpleArray = [0, 1, 2];

describe('Module Interface -', function () {

    it('All methods are supported', function () {
        assert.isNotNull(Enumerable.from(simpleArray));
        assert.isNotNull(Enumerable.From(simpleArray));
        assert.isNotNull(Enumerable.asEnumerable(simpleArray));
        assert.isNotNull(Enumerable.Range(0, 1));
        assert.isNotNull(Enumerable.Repeat(0, 1));
    });

    it('Module\'s default', function () {
        assert.isNotNull(defaultmethod(simpleArray));
    });


    it('Range()', function () {
        var array = Enumerable.Range(1, 100).ToArray();
        assert.equal(array.length, 100);
        for (var i = 0; i < array.length; i++)
            assert.equal(array[i], i + 1);
    });

    it('Range() - Source', function () {
        var array = Enumerable.Range(1, 100)
            .Where(o => o % 2 == 1)
            .ToArray();
        assert.equal(array.length, 50);
        assert.equal(Enumerable.Range(0, 15).Where(o => o % 2 == 1).Count(), 7);
    });

    it('Range() - Input', function () {
        var iterable = Enumerable.Range(1, 10).Except(Enumerable.Range(2, 7));
        var iterator = iterable[Symbol.iterator]()

        assert.equal(1, iterator.next().value);
        assert.equal(9, iterator.next().value);
        assert.equal(10, iterator.next().value);
        assert.isTrue(iterator.next().done);
    });

    it('Range() - on Enumerable', function () {
        var enumerable = Enumerable.Range(1, 10);
        var iterable = enumerable.Range(1, 10).Except(Enumerable.Range(2, 7));
        var iterator = iterable[Symbol.iterator]()

        assert.equal(1, iterator.next().value);
        assert.equal(9, iterator.next().value);
        assert.equal(10, iterator.next().value);
        assert.isTrue(iterator.next().done);
    });

    it('Repeat()', function () {
        var iterable = Enumerable.Repeat("Test", 5);
        var iterator = iterable[Symbol.iterator]()

        assert.equal("Test", iterator.next().value);
        assert.equal("Test", iterator.next().value);
        assert.equal("Test", iterator.next().value);
        assert.equal("Test", iterator.next().value);
        assert.equal("Test", iterator.next().value);
        assert.isTrue(iterator.next().done);
    });

    it('Repeat() - on Enumerable', function () {
        var enumerable = Enumerable.Repeat("Test", 5);
        var iterable = enumerable.Repeat("Test", 5);
        var iterator = iterable[Symbol.iterator]()

        assert.equal("Test", iterator.next().value);
        assert.equal("Test", iterator.next().value);
        assert.equal("Test", iterator.next().value);
        assert.equal("Test", iterator.next().value);
        assert.equal("Test", iterator.next().value);
        assert.isTrue(iterator.next().done);
    });

});

/** Copyright (c) ENikS.  All rights reserved. */
