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

    const comparator = (a : string, b : string) => {
        var a1 = a.charCodeAt(3);
        var b1 = b.charCodeAt(3);
        var a2 = a.charCodeAt(2);
        var b2 = b.charCodeAt(2);
        return a1 > b1 ? 1 
                        : a1 < b1 ? -1 
                                    : a2 > b2 ? 1
                                            : a2 < b2 ? -1 : 0;
    }

    const test = [
        { isControlled: true,  no: 'C01',  id: 1 },
        { isControlled: false, no: 'C01',  id: 3 },
        { isControlled: true,  no: 'C02',  id: 2 },
        { isControlled: false, no: 'C02',  id: 4 },
    ];

    
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
        var enumerable = asEnumerable(unorderedStr);
        var iterable = enumerable.OrderBy();
        var iterator = iterable[Symbol.iterator]()

        for (let exp of enumerable.ToArray().sort()) {
            var actual = iterator.next().value;
            if (isNaN(<any>exp) && isNaN(<any>actual)) continue;
            assert.equal(actual, exp);
        }
    });

    it('OrderBy() - Default (String)', function () {
        var enumerable = asEnumerable(unorderedStr);
        var iterable = enumerable.OrderBy();
        var iterator = iterable[Symbol.iterator]()

        for (let exp of enumerable.ToArray().sort()) {
            var actual = iterator.next().value;
            if (isNaN(<any>exp) && isNaN(<any>actual)) continue;
            assert.equal(actual, exp);
        }
    });

    it('OrderBy() - Selector', function () {
        const iterable = asEnumerable(jsn).OrderBy(a => a.name);
        const actual = [...iterable];
        const expected = jsn.sort((a,b) => a.name.localeCompare(b.name));
        assert.sameOrderedMembers(actual, expected);
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
        var enumerable = asEnumerable(unorderedStr);
        var iterable = enumerable.OrderByDescending();
        var etalon = enumerable.ToArray().sort();
        var iterator = iterable[Symbol.iterator]()
        for (let i = etalon.length - 1; i >= 0; i--) {
            var exp = etalon[i];
            var actual = iterator.next().value;
            if (isNaN(<any>exp) && isNaN(<any>actual)) continue;
            assert.equal(actual, exp);
        }
    });

    it('OrderByDescending() - Selector', function () {
        const iterable = asEnumerable(jsn).OrderByDescending(a => a.name);
        const actual = [...iterable];
        const expected = jsn.sort((a,b) => a.name.localeCompare(b.name)).reverse();
        assert.sameOrderedMembers(actual, expected);
    });

    it('OrderByDescending() - Key', function () {
        var iterable = asEnumerable(unorderedStr).OrderByDescending(a => a);
        var iterator = iterable[Symbol.iterator]()

        assert.equal(iterator.next().value, "zjgf");
        assert.equal(iterator.next().value, "axgh");
        assert.equal(iterator.next().value, "afgh");
        assert.equal(iterator.next().value, "1324");
        assert.equal(iterator.next().value, "1314");
        assert.equal(iterator.next().value, "1234");
        assert.equal(iterator.next().value, "1234");
        assert.isTrue(iterator.next().done);
    });
    
    it('OrderByDescending() - Comparator', function () {
        var etalon = asEnumerable(unorderedStr).ToArray().sort(comparator);
        var iterable = asEnumerable(unorderedStr).OrderByDescending(a => a, comparator);
        var iterator = iterable[Symbol.iterator]()
        for (let i = etalon.length - 1; i >= 0; i--) {
            var exp = etalon[i];
            var actual = iterator.next().value;
            assert.equal(actual, exp);
        }
    });




    it('ThenBy() - Default', function () {
        var enumerable = asEnumerable(unorderedStr);
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
        assert.equal(iterator.next().value, "1314");
        assert.equal(iterator.next().value, "1324");
        assert.equal(iterator.next().value, "1234");
        assert.equal(iterator.next().value, "1234");
        assert.equal(iterator.next().value, "zjgf");
        assert.equal(iterator.next().value, "afgh");
        assert.equal(iterator.next().value, "axgh");
        assert.isTrue(iterator.next().done);
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

    it('ThenBy() - QJesus', function () {

        var iterable = asEnumerable(test).OrderByDescending(x => x.isControlled)
                                         .ThenBy(x => x.no);
        var iterator = iterable[Symbol.iterator]()
        assert.equal(iterator.next().value.id, 1);
        assert.equal(iterator.next().value.id, 2);
        assert.equal(iterator.next().value.id, 3);
        assert.equal(iterator.next().value.id, 4);
        assert.isTrue(iterator.next().done);
    });

    it('ThenByDescending() - Default', function () {
        var enumerable = asEnumerable(unorderedStr);
        var iterable = enumerable.OrderByDescending().ThenByDescending();
        var iterator = iterable[Symbol.iterator]()
        assert.equal(iterator.next().value, "zjgf");
        assert.equal(iterator.next().value, "axgh");
        assert.equal(iterator.next().value, "afgh");
        assert.equal(iterator.next().value, "1324");
        assert.equal(iterator.next().value, "1314");
        assert.equal(iterator.next().value, "1234");
        assert.equal(iterator.next().value, "1234");
        assert.isTrue(iterator.next().done);
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

    it('ThenByDescending() - QJesus', function () {

        var iterable = asEnumerable(test).OrderBy(x => x.isControlled)
                                         .ThenByDescending(x => x.no);
        var iterator = iterable[Symbol.iterator]()
        assert.equal(iterator.next().value.id, 4);
        assert.equal(iterator.next().value.id, 3);
        assert.equal(iterator.next().value.id, 2);
        assert.equal(iterator.next().value.id, 1);
        assert.isTrue(iterator.next().done);
    });

    it('ThenByDescending() - Function', function () {
        var enumerable = asEnumerable(unorderedStr);
        var etalon = enumerable.ToArray().sort(comparator);
        var iterable = enumerable.OrderBy(s => 0).ThenByDescending(s => s, comparator);
        var iterator = iterable[Symbol.iterator]()

        for (let i = etalon.length - 1; i >= 0; i--) {
            var exp = etalon[i];
            var actual = iterator.next().value;
            assert.equal(actual.charCodeAt(2), exp.charCodeAt(2));
            assert.equal(actual.charCodeAt(3), exp.charCodeAt(3));
        }
    });



    it('Ordering chain', function () {
        function toObjects(items: { a: string[]; b: number[]; c: string[]; d: number[]; }): { a: string; b: number; c: string; d: number }[] {
            return items.a.map((a, i) => ({a, b: items.b[i], c: items.c[i], d: items.d[i]}));
        }

        const unorderedItems = toObjects({
            a: ["C", "C", "C", "C", "C", "C", "C", "C",  "A", "A", "A", "A", "A", "A", "A", "A",  "B", "B", "B", "B", "B", "B", "B", "B" ],
            b: [ 0,   0 ,  1,   1,   0,   0,   1,   1,    0,   0,   1,   1,   1,   0,   0,   1,    0,   1,   1,   0,   0,   0,   1,   1  ],
            c: ["A", "B", "A", "B", "A", "B", "A", "B",  "A", "B", "A", "B", "B", "A", "B", "A",  "B", "A", "B", "A", "A", "B", "A", "B" ],
            d: [ 0,   0 ,  0,   0,   1,   1,   1,   1,    0,   0,   0,   1,   0,   1,   1,   1,    0,   0,   1,   1,   0,   1,   1,   0  ]
        });

        const expectedByAscDescAscDesc = toObjects({
            a: ["A", "A", "A", "A", "A", "A", "A", "A", "B", "B", "B", "B", "B", "B", "B", "B", "C", "C", "C", "C", "C", "C", "C", "C"],
            b: [ 1,   1,   1,   1,   0,   0,   0,   0,   1,   1,   1,   1,   0,   0,   0,   0,   1,   1,   1,   1,   0,   0,   0,   0 ],
            c: ["A", "A", "B", "B", "A", "A", "B", "B", "A", "A", "B", "B", "A", "A", "B", "B", "A", "A", "B", "B", "A", "A", "B", "B"],
            d: [ 1,   0,   1,   0,   1,   0,   1,   0,   1,   0,   1,   0,   1,   0,   1,   0,   1,   0,   1,   0,   1,   0,   1,   0 ]
        });
        const actualByAscDescAscDesc = asEnumerable(unorderedItems).OrderBy(x => x.a).ThenByDescending(x => x.b).ThenBy(x => x.c).ThenByDescending(x => x.d).ToArray();
        assert.sameDeepOrderedMembers(actualByAscDescAscDesc, expectedByAscDescAscDesc);

        // Change order of chain
        const expectedByDescAscDescAsc = toObjects({
            a: ["C", "C", "C", "C", "C", "C", "C", "C", "B", "B", "B", "B", "B", "B", "B", "B", "A", "A", "A", "A", "A", "A", "A", "A"],
            b: [ 0,   0,   0,   0,   1,   1,   1,   1,   0,   0,   0,   0,   1,   1,   1,   1,   0,   0,   0,   0,   1,   1,   1,   1 ],
            c: ["B", "B", "A", "A", "B", "B", "A", "A", "B", "B", "A", "A", "B", "B", "A", "A", "B", "B", "A", "A", "B", "B", "A", "A"],
            d: [ 0,   1,   0,   1,   0,   1,   0,   1,   0,   1,   0,   1,   0,   1,   0,   1,   0,   1,   0,   1,   0,   1,   0,   1 ]
        });
        const actualByDescAscDescAsc = asEnumerable(unorderedItems).OrderByDescending(x => x.a).ThenBy(x => x.b).ThenByDescending(x => x.c).ThenBy(x => x.d).ToArray();
        assert.sameDeepOrderedMembers(actualByDescAscDescAsc, expectedByDescAscDescAsc);
    });

    it('Ordering chain - immutability', function () {
        const unorderedItems = [
            {name:"C" , age:30, grade:50},
            {name:"C" , age:10, grade:0},
            {name:"C" , age:20, grade:100},
            {name:"A" , age:30, grade:50},
            {name:"A" , age:10, grade:0},
            {name:"A" , age:20, grade:100},
            {name:"B" , age:30, grade:50},
            {name:"B" , age:10, grade:0},
            {name:"B" , age:20, grade:100},
        ];

        const expectedByNameThenByAge = unorderedItems.slice().sort((a,b)=> a.name.localeCompare(b.name) || (a.age - b.age));
        const expectedByNameThenByGradeDescending = unorderedItems.slice().sort((a,b)=> a.name.localeCompare(b.name) || (b.grade - a.grade));


        const immutableOrderedByName = asEnumerable(unorderedItems).OrderBy(x => x.name);
        const actualByNameThenByAge = immutableOrderedByName.ThenBy(x => x.age).ToArray();
        const actualByNameThenByGradeDescending = immutableOrderedByName.ThenByDescending(x => x.grade).ToArray();

        assert.sameDeepOrderedMembers(actualByNameThenByAge, expectedByNameThenByAge);
        assert.sameDeepOrderedMembers(actualByNameThenByGradeDescending, expectedByNameThenByGradeDescending);

        // Change order of execution
        const immutableOrderedByName2 = asEnumerable(unorderedItems).OrderBy(x => x.name);
        const actualByNameThenByGradeDescending2 = immutableOrderedByName2.ThenByDescending(x => x.grade).ToArray();
        const actualByNameThenByAge2 = immutableOrderedByName2.ThenBy(x => x.age).ToArray();

        assert.sameOrderedMembers(actualByNameThenByGradeDescending2, expectedByNameThenByGradeDescending);
        assert.sameOrderedMembers(actualByNameThenByAge2, expectedByNameThenByAge);
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
