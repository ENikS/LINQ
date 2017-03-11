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

import {jsn, fruits, people, pets, simpleArray, mix, phrase} from "./data";
import {assert} from "chai";
import {asEnumerable, Range, Repeat} from "../lib/linq";



describe('Reentrancy -', function () {

    it('ChunkBy()', function () {

        let iterable = asEnumerable(phrase).ChunkBy(o => o.key, o => o.value);

        var iterator = iterable[Symbol.iterator]()
        var arr = iterator.next().value as Array<string>;
        assert.equal(arr.length, 3);
        arr = iterator.next().value as Array<string>;
        assert.equal(arr.length, 1);
        arr = iterator.next().value as Array<string>;
        assert.equal(arr.length, 1);
        arr = iterator.next().value as Array<string>;
        assert.equal(arr.length, 1);
        arr = iterator.next().value as Array<string>;
        assert.equal(arr.length, 2);
        assert.isTrue(iterator.next().done);

        iterator = iterable[Symbol.iterator]()
        arr = iterator.next().value as Array<string>;
        assert.equal(arr.length, 3);
        arr = iterator.next().value as Array<string>;
        assert.equal(arr.length, 1);
        arr = iterator.next().value as Array<string>;
        assert.equal(arr.length, 1);
        arr = iterator.next().value as Array<string>;
        assert.equal(arr.length, 1);
        arr = iterator.next().value as Array<string>;
        assert.equal(arr.length, 2);
        assert.isTrue(iterator.next().done);
    });

    it('Range', function () {
        var iterable = Range(0, 2);
        var iterator = iterable[Symbol.iterator]()
        assert.equal(0, iterator.next().value);
        assert.equal(1, iterator.next().value);
        assert.isTrue(iterator.next().done);

        iterator = iterable[Symbol.iterator]()
        assert.equal(0, iterator.next().value);
        assert.equal(1, iterator.next().value);
        assert.isTrue(iterator.next().done);
    });

    it('Repeat', function () {
        var iterable = Repeat(0, 3);
        var iterator = iterable[Symbol.iterator]()
        assert.equal(0, iterator.next().value);
        assert.equal(0, iterator.next().value);
        assert.equal(0, iterator.next().value);
        assert.isTrue(iterator.next().done);

        iterator = iterable[Symbol.iterator]()
        assert.equal(0, iterator.next().value);
        assert.equal(0, iterator.next().value);
        assert.equal(0, iterator.next().value);
        assert.isTrue(iterator.next().done);
    });

    it('DefaultIfEmpty() - Not empty', function () {
        var iterable = Range(0, 2).DefaultIfEmpty();
        var iterator = iterable[Symbol.iterator]()
        assert.equal(iterator.next().value, 0);
        assert.equal(iterator.next().value, 1);
        assert.isTrue(iterator.next().done);

        iterator = iterable[Symbol.iterator]()
        assert.equal(iterator.next().value, 0);
        assert.equal(iterator.next().value, 1);
        assert.isTrue(iterator.next().done);
    });


    it('Select()', function () {
        var iterable = asEnumerable(jsn).Select((a) => a.name);
        var iterator = iterable[Symbol.iterator]()
        assert.equal(iterator.next().value, 'd');
        assert.equal(iterator.next().value, 'c');
        assert.equal(iterator.next().value, 'b');
        assert.equal(iterator.next().value, 'a');
        assert.isTrue(iterator.next().done);

        iterator = iterable[Symbol.iterator]()
        assert.equal(iterator.next().value, 'd');
        assert.equal(iterator.next().value, 'c');
        assert.equal(iterator.next().value, 'b');
        assert.equal(iterator.next().value, 'a');
        assert.isTrue(iterator.next().done);
    });


    it('Distinct()', function () {
        let test = [
            { id: 1, "name": "d" },
            { id: 1, "name": "c" },
            { id: 3, "name": "b" },
            { id: 4, "name": "a" }
        ];
        let iterable = asEnumerable(test).Distinct(o => o.id);
        let iterator = iterable[Symbol.iterator]()
        assert.equal("d", (<any>iterator.next().value).name);
        assert.equal("b", (<any>iterator.next().value).name);
        assert.equal("a", (<any>iterator.next().value).name);
        assert.isTrue(iterator.next().done);

        iterator = iterable[Symbol.iterator]()
        assert.equal("d", (<any>iterator.next().value).name);
        assert.equal("b", (<any>iterator.next().value).name);
        assert.equal("a", (<any>iterator.next().value).name);
        assert.isTrue(iterator.next().done);
    });


    it('Where()', function () {
        let iterable = asEnumerable(simpleArray).Where(a => a % 2 == 1);
        let iterator = iterable[Symbol.iterator]()
        assert.equal(1, iterator.next().value);
        assert.equal(3, iterator.next().value);
        assert.equal(5, iterator.next().value);
        assert.equal(7, iterator.next().value);
        assert.equal(9, iterator.next().value);
        assert.isTrue(iterator.next().done);

        iterator = iterable[Symbol.iterator]()
        assert.equal(1, iterator.next().value);
        assert.equal(3, iterator.next().value);
        assert.equal(5, iterator.next().value);
        assert.equal(7, iterator.next().value);
        assert.equal(9, iterator.next().value);
        assert.isTrue(iterator.next().done);
    });


    it('Skip()', function () {
        let iterable = asEnumerable(simpleArray).Skip(7);
        let iterator = iterable[Symbol.iterator]()
        assert.equal(8, iterator.next().value);
        assert.equal(9, iterator.next().value);
        assert.equal(10, iterator.next().value);
        assert.isTrue(iterator.next().done);

        iterator = iterable[Symbol.iterator]()
        assert.equal(8, iterator.next().value);
        assert.equal(9, iterator.next().value);
        assert.equal(10, iterator.next().value);
        assert.isTrue(iterator.next().done);
    });


    it('Take()', function () {
        var iterable = asEnumerable(simpleArray).Take(3);
        var iterator = iterable[Symbol.iterator]()
        assert.equal(1, iterator.next().value);
        assert.equal(2, iterator.next().value);
        assert.equal(3, iterator.next().value);
        assert.isTrue(iterator.next().done);

        iterator = iterable[Symbol.iterator]()
        assert.equal(1, iterator.next().value);
        assert.equal(2, iterator.next().value);
        assert.equal(3, iterator.next().value);
        assert.isTrue(iterator.next().done);
    });


    it('Except()', function () {
        var iterable = asEnumerable(simpleArray).Except([0, 2, 4, 6, 11]);
        var iterator = iterable[Symbol.iterator]()
        assert.equal(1, iterator.next().value);
        assert.equal(3, iterator.next().value);
        assert.equal(5, iterator.next().value);
        assert.equal(7, iterator.next().value);
        assert.equal(8, iterator.next().value);
        assert.equal(9, iterator.next().value);
        assert.equal(10, iterator.next().value);
        assert.isTrue(iterator.next().done);

        iterator = iterable[Symbol.iterator]()
        assert.equal(1, iterator.next().value);
        assert.equal(3, iterator.next().value);
        assert.equal(5, iterator.next().value);
        assert.equal(7, iterator.next().value);
        assert.equal(8, iterator.next().value);
        assert.equal(9, iterator.next().value);
        assert.equal(10, iterator.next().value);
        assert.isTrue(iterator.next().done);
    });


    it('Intersect()', function () {
        var iterable = asEnumerable(simpleArray).Intersect([1, 3, 5, 11, 23, 44]);
        var iterator = iterable[Symbol.iterator]()
        assert.equal(1, iterator.next().value);
        assert.equal(3, iterator.next().value);
        assert.equal(5, iterator.next().value);
        assert.isTrue(iterator.next().done);

        iterator = iterable[Symbol.iterator]()
        assert.equal(1, iterator.next().value);
        assert.equal(3, iterator.next().value);
        assert.equal(5, iterator.next().value);
        assert.isTrue(iterator.next().done);
    });


    it('OfType()', function () {

        var iterable = asEnumerable(mix).OfType(Object);
        var iterator = iterable[Symbol.iterator]();
        assert.equal(iterator.next().value, 1);
        assert.equal(iterator.next().value, mix[3]);
        assert.equal(iterator.next().value, mix[4]);
        assert.equal(iterator.next().value, mix[5]);
        assert.equal(iterator.next().value, mix[10]);
        assert.equal(iterator.next().value, mix[11]);
        assert.equal(iterator.next().value, mix[12]);
        assert.equal(iterator.next().value, mix[13]);
        assert.equal(iterator.next().value, mix[14]);
        assert.equal(iterator.next().value, mix[15]);
        assert.equal(iterator.next().value, mix[17]);
        assert.isTrue(iterator.next().done);

        iterator = iterable[Symbol.iterator]();
        assert.equal(iterator.next().value, 1);
        assert.equal(iterator.next().value, mix[3]);
        assert.equal(iterator.next().value, mix[4]);
        assert.equal(iterator.next().value, mix[5]);
        assert.equal(iterator.next().value, mix[10]);
        assert.equal(iterator.next().value, mix[11]);
        assert.equal(iterator.next().value, mix[12]);
        assert.equal(iterator.next().value, mix[13]);
        assert.equal(iterator.next().value, mix[14]);
        assert.equal(iterator.next().value, mix[15]);
        assert.equal(iterator.next().value, mix[17]);
        assert.isTrue(iterator.next().done);
    });


    it('Union()', function () {
        var iterable = asEnumerable([0, 1, 2, 3, 4, 5, 6, 7]).Union([5, 6, 7, 8, 9]);
        var iterator = iterable[Symbol.iterator]()
        assert.equal(0, iterator.next().value);
        assert.equal(1, iterator.next().value);
        assert.equal(2, iterator.next().value);
        assert.equal(3, iterator.next().value);
        assert.equal(4, iterator.next().value);
        assert.equal(5, iterator.next().value);
        assert.equal(6, iterator.next().value);
        assert.equal(7, iterator.next().value);
        assert.equal(8, iterator.next().value);
        assert.equal(9, iterator.next().value);
        assert.isTrue(iterator.next().done);

        iterator = iterable[Symbol.iterator]()
        assert.equal(0, iterator.next().value);
        assert.equal(1, iterator.next().value);
        assert.equal(2, iterator.next().value);
        assert.equal(3, iterator.next().value);
        assert.equal(4, iterator.next().value);
        assert.equal(5, iterator.next().value);
        assert.equal(6, iterator.next().value);
        assert.equal(7, iterator.next().value);
        assert.equal(8, iterator.next().value);
        assert.equal(9, iterator.next().value);
        assert.isTrue(iterator.next().done);
    });


    it('Join()', function () {
        var iterable =
            asEnumerable(people).Join(pets,
                person => person,
                pet => pet.Owner,
                (person, pet) => {
                    return person.Name + " - " + pet.Name;
                });
        var iterator = iterable[Symbol.iterator]()
        assert.equal("Hedlund, Magnus - Daisy", iterator.next().value);
        assert.equal("Adams, Terry - Barley", iterator.next().value);
        assert.equal("Adams, Terry - Boots", iterator.next().value);
        assert.equal("Weiss, Charlotte - Whiskers", iterator.next().value);
        assert.isTrue(iterator.next().done);

        iterator = iterable[Symbol.iterator]()
        assert.equal("Hedlund, Magnus - Daisy", iterator.next().value);
        assert.equal("Adams, Terry - Barley", iterator.next().value);
        assert.equal("Adams, Terry - Boots", iterator.next().value);
        assert.equal("Weiss, Charlotte - Whiskers", iterator.next().value);
        assert.isTrue(iterator.next().done);
    });


    it('GroupJoin()', function () {
        var iterable = asEnumerable(people)
            .GroupJoin(pets,
            person => person,
            pet => pet.Owner,
            (person, petCollection) => {
                return {
                    Owner: person.Name,
                    Pets: asEnumerable(petCollection)
                        .Select(pet => pet.Name)
                        .ToArray()
                };
            });
        var iterator = iterable[Symbol.iterator]();
        var result = iterator.next().value;
        assert.isTrue(Array.isArray(result.Pets))
        assert.equal("Hedlund, Magnus", result.Owner);
        assert.equal(1, result.Pets.length);
        assert.equal("Daisy", result.Pets[0]);
        result = iterator.next().value;
        assert.equal("Adams, Terry", result.Owner);
        assert.equal(2, result.Pets.length);
        assert.equal("Barley", result.Pets[0]);
        assert.equal("Boots", result.Pets[1]);
        result = iterator.next().value;
        assert.equal("Weiss, Charlotte", result.Owner);
        assert.equal(1, result.Pets.length);
        assert.equal("Whiskers", result.Pets[0]);
        assert.isTrue(iterator.next().done);

        iterator = iterable[Symbol.iterator]();
        result = iterator.next().value;
        assert.isTrue(Array.isArray(result.Pets))
        assert.equal("Hedlund, Magnus", result.Owner);
        assert.equal(1, result.Pets.length);
        assert.equal("Daisy", result.Pets[0]);
        result = iterator.next().value;
        assert.equal("Adams, Terry", result.Owner);
        assert.equal(2, result.Pets.length);
        assert.equal("Barley", result.Pets[0]);
        assert.equal("Boots", result.Pets[1]);
        result = iterator.next().value;
        assert.equal("Weiss, Charlotte", result.Owner);
        assert.equal(1, result.Pets.length);
        assert.equal("Whiskers", result.Pets[0]);
        assert.isTrue(iterator.next().done);
    });


    it('GroupBy()', function () {
        var iterable: any = asEnumerable(pets).GroupBy(pet => pet.Age);

        var iterator = iterable[Symbol.iterator]();
        var result = iterator.next().value;
        assert.equal(8, result.key);
        assert.equal(1, result.length);
        result = iterator.next().value;
        assert.equal(4, result.key);
        assert.equal(3, result.length);
        result = iterator.next().value;
        assert.equal(1, result.key);
        assert.equal(1, result.length);
        assert.isTrue(iterator.next().done);

        iterator = iterable[Symbol.iterator]();
        result = iterator.next().value;
        assert.equal(8, result.key);
        assert.equal(1, result.length);
        result = iterator.next().value;
        assert.equal(4, result.key);
        assert.equal(3, result.length);
        result = iterator.next().value;
        assert.equal(1, result.key);
        assert.equal(1, result.length);
        assert.isTrue(iterator.next().done);
    });


    it('SelectMany()', function () {

        var iterable = asEnumerable(jsn).SelectMany(a => a.ids);
        var iterator = iterable[Symbol.iterator]()
        assert.equal(11, iterator.next().value);
        assert.equal(21, iterator.next().value);
        assert.equal(31, iterator.next().value);
        assert.equal(12, iterator.next().value);
        assert.equal(22, iterator.next().value);
        assert.equal(32, iterator.next().value);
        assert.equal(13, iterator.next().value);
        assert.equal(23, iterator.next().value);
        assert.equal(33, iterator.next().value);
        assert.equal(14, iterator.next().value);
        assert.equal(24, iterator.next().value);
        assert.equal(34, iterator.next().value);
        assert.isTrue(iterator.next().done);

        iterator = iterable[Symbol.iterator]()
        assert.equal(11, iterator.next().value);
        assert.equal(21, iterator.next().value);
        assert.equal(31, iterator.next().value);
        assert.equal(12, iterator.next().value);
        assert.equal(22, iterator.next().value);
        assert.equal(32, iterator.next().value);
        assert.equal(13, iterator.next().value);
        assert.equal(23, iterator.next().value);
        assert.equal(33, iterator.next().value);
        assert.equal(14, iterator.next().value);
        assert.equal(24, iterator.next().value);
        assert.equal(34, iterator.next().value);
        assert.isTrue(iterator.next().done);
    });


    it('Concat()', function () {
        var iterable = asEnumerable([0, 1, 2]).Concat([3, 4]);
        var iterator = iterable[Symbol.iterator]()
        assert.equal(0, iterator.next().value);
        assert.equal(1, iterator.next().value);
        assert.equal(2, iterator.next().value);
        assert.equal(3, iterator.next().value);
        assert.equal(4, iterator.next().value);
        assert.isTrue(iterator.next().done);

        iterator = iterable[Symbol.iterator]()
        assert.equal(0, iterator.next().value);
        assert.equal(1, iterator.next().value);
        assert.equal(2, iterator.next().value);
        assert.equal(3, iterator.next().value);
        assert.equal(4, iterator.next().value);
        assert.isTrue(iterator.next().done);
    });
    
});

/** Copyright (c) ENikS.  All rights reserved. */
