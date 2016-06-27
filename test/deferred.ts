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

import {simpleArray, oddArray, jsn} from "./data";
import {assert} from "chai";
import Linq from "../src/linq";


describe('Deferred Execution Methods -', function () {

    // Cast
    // TODO: Implement Cast as typecast with no overhead

    //it('Cast()', function () {
    //    let ss = Linq(simpleArray);
    //});



    // Select

    it('Select()', function () {
        let array = Linq(jsn).Select((a) => a.name).ToArray();
        assert.equal(array.length, 4);
        assert.equal('d', array[0]);
        assert.equal('c', array[1]);
        assert.equal('b', array[2]);
        assert.equal('a', array[3]);
    });

    it('Select() - With index', function () {
        let array = Linq(jsn).Select((a, b) => b).ToArray();
        assert.equal(array.length, 4);
        assert.equal(0, array[0]);
        assert.equal(1, array[1]);
        assert.equal(2, array[2]);
        assert.equal(3, array[3]);
    });



    // Distinct

    it('Distinct() - Number', function () {

        let iterable = Linq([0, 0, 1, 3, 5, 6, 5, 7, 8, 8]).Distinct();
        let iterator = iterable[Symbol.iterator]()

        assert.equal(0, iterator.next().value);
        assert.equal(1, iterator.next().value);
        assert.equal(3, iterator.next().value);
        assert.equal(5, iterator.next().value);
        assert.equal(6, iterator.next().value);
        assert.equal(7, iterator.next().value);
        assert.equal(8, iterator.next().value);
        assert.isTrue(iterator.next().done);
    });

    it('Distinct() - String', function () {
        let test = [
            "add", "add",
            "subtract",
            "multiply",
            "hello",
            "class",
            "namespace",
            "namespace",
            "namespace"];
        let iterable = Linq(test).Distinct();
        let iterator = iterable[Symbol.iterator]()
        assert.equal("add", iterator.next().value);
        assert.equal("subtract", iterator.next().value);
        assert.equal("multiply", iterator.next().value);
        assert.equal("hello", iterator.next().value);
        assert.equal("class", iterator.next().value);
        assert.equal("namespace", iterator.next().value);
        assert.isTrue(iterator.next().done);
    });

    it('Distinct() - Key', function () {
        let test = [
            { id: 1, "name": "d" },
            { id: 1, "name": "c" },
            { id: 3, "name": "b" },
            { id: 4, "name": "a" }
        ];
        let iterable = Linq(test).Distinct(o => o.id);
        let iterator = iterable[Symbol.iterator]()
        assert.equal("d", (<any>iterator.next().value).name);
        assert.equal("b", (<any>iterator.next().value).name);
        assert.equal("a", (<any>iterator.next().value).name);
        assert.isTrue(iterator.next().done);
    });



    // Where

    it('Where()', function () {
        let iterable = Linq(simpleArray).Where(a => a % 2 == 1);
        let iterator = iterable[Symbol.iterator]()
        assert.equal(1, iterator.next().value);
        assert.equal(3, iterator.next().value);
        assert.equal(5, iterator.next().value);
        assert.equal(7, iterator.next().value);
        assert.equal(9, iterator.next().value);
        assert.isTrue(iterator.next().done);
    });

    it('Where() - Index', function () {
        let iterable = Linq(simpleArray).Where((a, i) => i % 2 == 1);
        let iterator = iterable[Symbol.iterator]()
        assert.equal(2, iterator.next().value);
        assert.equal(4, iterator.next().value);
        assert.equal(6, iterator.next().value);
        assert.equal(8, iterator.next().value);
        assert.equal(10, iterator.next().value);
        assert.isTrue(iterator.next().done);
    });



    // Skip

    it('Skip()', function () {
        let iterable = Linq(simpleArray).Skip(7);
        let iterator = iterable[Symbol.iterator]()
        assert.equal(8, iterator.next().value);
        assert.equal(9, iterator.next().value);
        assert.equal(10, iterator.next().value);
        assert.isTrue(iterator.next().done);
    });


});