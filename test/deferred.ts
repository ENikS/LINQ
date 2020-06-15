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

import {
    simpleArray, oddArray, jsn, un1, un2, people, msdn, pets, mix, phrase
} from "./data";
import {assert} from "chai";
import Linq from "../lib/linq";
import { Enumerable } from "../lib/enumerable";

describe('Deferred Execution -', function () {

    // Cast

    it('Cast()', function () {

        class a { }
        class b extends a { }

        let iterable = Linq<b>([]);
        assert.equal(iterable.Cast<a>(), iterable);
    });



    // ChunkBy

    it('ChunkBy()', function () {

        let iterable = Linq(phrase).ChunkBy(o => o.key, o => o.value);

        var iterator = iterable[Symbol.iterator]()
        var arr = iterator.next().value as Array<string>;
        assert.equal(arr.length, 3);
        assert.equal(arr[0], "We");
        assert.equal(arr[1], "think");
        assert.equal(arr[2], "that");
        arr = iterator.next().value as Array<string>;
        assert.equal(arr.length, 1);
        assert.equal(arr[0], "Linq");
        arr = iterator.next().value as Array<string>;
        assert.equal(arr.length, 1);
        assert.equal(arr[0], "is");
        arr = iterator.next().value as Array<string>;
        assert.equal(arr.length, 1);
        assert.equal(arr[0], "really");
        arr = iterator.next().value as Array<string>;
        assert.equal(arr.length, 2);
        assert.equal(arr[0], "cool");
        assert.equal(arr[1], "!");
        assert.isTrue(iterator.next().done);
    });


    it('ChunkBy() - Index', function () {

        let iterable = Linq(phrase).ChunkBy((o, i) => Math.max(3, i),
            o => o.value);
        var iterator = iterable[Symbol.iterator]()
        var arr = iterator.next().value as Array<string>;
        assert.equal(arr.length, 4);
        arr = iterator.next().value as Array<string>;
        assert.equal(arr.length, 1);
        arr = iterator.next().value as Array<string>;
        assert.equal(arr.length, 1);
        arr = iterator.next().value as Array<string>;
        assert.equal(arr.length, 1);
        arr = iterator.next().value as Array<string>;
        assert.equal(arr.length, 1);
        assert.isTrue(iterator.next().done);
    });


    it('ChunkBy() - Zero', function () {

        let iterable = Linq([{ key: 0, value: "0" },
                             { key: 0, value: "1" },
                             { key: 0, value: "2" },
                             { key: 0, value: "3" },
                             { key: 0, value: "4" },
                             { key: 0, value: "5" },
                             { key: 0, value: "6" },
                             { key: 0, value: "7" },
                             { key: 0, value: "!" }])
            .ChunkBy(k => k.key, o => o.value);

        var iterator = iterable[Symbol.iterator]()
        var arr = iterator.next().value as Array<string>;
        assert.equal(arr.length, 9);
        assert.isTrue(iterator.next().done);
    });


    it('ChunkBy() - Empty', function () {

        let iterable = Linq([]).ChunkBy(e => e);
        var iterator = iterable[Symbol.iterator]()
        assert.isTrue(iterator.next().done);
    });


    // Concat

    it('Concat()', function () {
        var iterable = Linq([0, 1, 2]).Concat([3, 4]);
        var iterator = iterable[Symbol.iterator]()

        assert.equal(0, iterator.next().value);
        assert.equal(1, iterator.next().value);
        assert.equal(2, iterator.next().value);
        assert.equal(3, iterator.next().value);
        assert.equal(4, iterator.next().value);
        assert.isTrue(iterator.next().done);
    });



    // Select

    it('Select()', function () {
        const actual = Linq(jsn).Select((a) => a.name).ToArray();
        const expected = jsn.map(a => a.name);
        assert.sameOrderedMembers(actual, expected);
    });

    it('Select() - With index', function () {
        const actual = Linq(jsn).Select((a: any, b: any) => b).ToArray();
        const expected = jsn.map((a: any, b: any) => b);
        assert.sameOrderedMembers(actual, expected);
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

        const expected = simpleArray.filter(a => a % 2 == 1);
        const actual = [...iterable];
        assert.sameMembers(actual, expected);
    });

    it('Where() - Index', function () {
        let iterable = Linq(simpleArray).Where((a: any, i: any) => i % 2 == 1);

        const expected = simpleArray.filter((a, i)  => i % 2 == 1);
        const actual = [...iterable];
        assert.sameMembers(actual, expected);
    });



    // Skip

    it('Skip()', function () {
        let iterable = Linq(simpleArray).Skip(7);

        const expected = simpleArray.slice(7);
        const actual = [...iterable];
        assert.sameMembers(actual, expected);
    });

    it('SkipWhile()', function () {

        var iterable = Linq(simpleArray).SkipWhile((a) => a < 8);
        var iterator = iterable[Symbol.iterator]()
        assert.equal(8, iterator.next().value);
        assert.equal(9, iterator.next().value);
        assert.equal(10, iterator.next().value);
        assert.isTrue(iterator.next().done);
    });

    it('SkipWhile() - Index', function () {
        var amounts = [
            5000, 2500, 9000, 8000,
            6500, 4000, 1500, 5500];

        var iterable = Linq(amounts).SkipWhile((amount, index) => amount > index * 1000);
        var iterator = iterable[Symbol.iterator]()
        assert.equal(4000, iterator.next().value);
        assert.equal(1500, iterator.next().value);
        assert.equal(5500, iterator.next().value);
        assert.isTrue(iterator.next().done);
    });



    // Take

    it('Take()', function () {
        var iterable = Linq(simpleArray).Take(3);

        const expected = simpleArray.slice(0, 3);
        const actual = [...iterable];
        assert.sameMembers(actual, expected);
    });

    it('TakeWhile()', function () {
        var iterable = Linq(simpleArray).TakeWhile(a => a < 4);

        const expected = [];
        for(const item of simpleArray) {
            if(item < 4) expected.push(item);
            else break;
        }

        const actual = [...iterable];
        assert.sameMembers(actual, expected);
    });



    // Except

    it('Except()', function () {
        var iterable = Linq(simpleArray).Except([0, 2, 4, 6, 11]);
        var iterator = iterable[Symbol.iterator]()
        assert.equal(1, iterator.next().value);
        assert.equal(3, iterator.next().value);
        assert.equal(5, iterator.next().value);
        assert.equal(7, iterator.next().value);
        assert.equal(8, iterator.next().value);
        assert.equal(9, iterator.next().value);
        assert.equal(10, iterator.next().value);
        assert.isTrue(iterator.next().done);
    });

    it('Except() - Key', function () {
        var iterable = Linq(un1).Except(un2, o => o.id );
        var iterator = iterable[Symbol.iterator]()
        assert.equal(1, iterator.next().value.id);
        assert.equal(2, iterator.next().value.id);
        assert.equal(null, iterator.next().value.id);
        assert.isTrue(iterator.next().done);
    });



    // Intersect

    it('Intersect()', function () {
        var iterable = Linq(simpleArray).Intersect([1, 3, 5, 11, 23, 44]);
        var iterator = iterable[Symbol.iterator]()
        assert.equal(1, iterator.next().value);
        assert.equal(3, iterator.next().value);
        assert.equal(5, iterator.next().value);
        assert.isTrue(iterator.next().done);
    });

    it('Intersect() - Key', function () {
        var iterable = Linq(un1).Intersect(un2, o => o.id );
        var iterator = iterable[Symbol.iterator]()
        assert.equal(3, iterator.next().value.id);
        assert.equal(3, iterator.next().value.id);
        assert.equal(4, iterator.next().value.id);
        assert.isTrue(iterator.next().done);
    });



    // OfType
    
    it('OfType() - Number', function () {

        var iterable = Linq(mix).OfType(Number);
        var iterator = iterable[Symbol.iterator]();
        assert.equal(iterator.next().value, 0);
        assert.equal(iterator.next().value, 1);
        assert.equal(iterator.next().value, 2);
        assert.equal(iterator.next().value, 3);
        assert.isTrue(iterator.next().done);
    });

    it('OfType() - Boolean', function () {

        var iterable = Linq(mix).OfType(Boolean);
        var iterator = iterable[Symbol.iterator]();
        assert.equal(iterator.next().value, true);
        assert.equal(iterator.next().value, false);
        assert.equal(iterator.next().value, true);
        assert.equal(iterator.next().value, false);
        assert.isTrue(iterator.next().done);
    });

    it('OfType() - String', function () {

        var iterable = Linq(mix).OfType(String);
        var iterator = iterable[Symbol.iterator]();
        assert.equal(iterator.next().value, mix[2]);
        assert.equal(iterator.next().value, mix[3]);
        assert.equal(iterator.next().value, mix[4]);
        assert.isTrue(iterator.next().done);
    });

    it('OfType() - Date', function () {

        var iterable = Linq(mix).OfType(Date);
        var iterator = iterable[Symbol.iterator]();
        assert.equal(iterator.next().value, mix[5]);
        assert.isTrue(iterator.next().done);
    });

    it('OfType() - Symbol', function () {

        var iterable = Linq(mix).OfType(Symbol);
        var iterator = iterable[Symbol.iterator]();
        assert.equal(iterator.next().value, mix[7]);
        assert.isTrue(iterator.next().done);
    });

    it('OfType() - Function', function () {

        var iterable = Linq(mix).OfType(Function);
        var iterator = iterable[Symbol.iterator]();
        assert.equal(iterator.next().value, mix[17]);
        assert.isTrue(iterator.next().done);
    });

    it('OfType() - Object', function () {

        var iterable = Linq(mix).OfType(Object);
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
    });




    // Union

    it('Union()', function () {
        var iterable = Linq([0, 1, 2, 2, 3, 4, 5, 6, 7]).Union([5, 6, 6, 7, 8, 9]);
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
    });

    it('Union() - Keyed', function () {
        var iterable = Linq(un1).Union(un2, (o) => o.id);
        var iterator = iterable[Symbol.iterator]()
        assert.equal(un1[0], iterator.next().value);
        assert.equal(un1[1], iterator.next().value);
        assert.equal(un1[2], iterator.next().value);
        assert.equal(un1[3], iterator.next().value);
        assert.equal(un1[5], iterator.next().value);
        assert.equal(un2[2], iterator.next().value);
        assert.equal(un2[3], iterator.next().value);
        assert.equal(un2[5], iterator.next().value);
        assert.isTrue(iterator.next().done);
    });




    // Join

    it('Join()', function () {
        var iterable =
            Linq(people).Join(pets,
                person => person,
                pet => pet.Owner,
                (person, pet) => {
                    return person.Name + " - " + pet.Name;
                });

        var iterator = iterable[Symbol.iterator]()
        assert.equal("Hedlund, Magnus - Daisy", iterator.next().value);
        assert.equal("Adams, Terry - Barley", iterator.next().value);
        assert.equal("Adams, Terry - Boots", iterator.next().value);
        assert.equal("Adams, Terry - Barley", iterator.next().value);
        assert.equal("Adams, Terry - Boots", iterator.next().value);
        assert.equal("Weiss, Charlotte - Whiskers", iterator.next().value);
        assert.isTrue(iterator.next().done);
    });


    it('Join() - Redundant', function () {
        var iterable =
            Linq(un1).Join(jsn,  e => e.id, u => u.id,
                (e, u) => {
                    return e.name + " - " + u.name;
                });
        var iterator = iterable[Symbol.iterator]()
        assert.equal("q - d", iterator.next().value);
        assert.equal("w - c", iterator.next().value);
        assert.equal("e - b", iterator.next().value);
        assert.equal("e - b", iterator.next().value);
        assert.equal("r - a", iterator.next().value);
        assert.isTrue(iterator.next().done);
        
    });

    it('Join() - null key', function () {
        const nullPerson: { Name: string; } = null;
        const expectedPeople = people.concat(nullPerson);

        const actual = Linq(expectedPeople).Join(
            pets,
            person => person,
            pet => pet.Owner,
            (person, pet) => person.Name + " - " + pet.Name).ToArray();

        const expected = [].concat(...expectedPeople
            .filter(person => person != null)
            .map(person => pets.filter(pet => pet.Owner === person).map(pet => person.Name + " - " + pet.Name)));

        assert.sameMembers(actual, expected);
    });




    // GroupJoin

    it('GroupJoin()', function () {
        var iterable = Linq(people)
            .GroupJoin(pets,
            person => person,
            pet => pet.Owner,
            (person, petCollection) => {
                return {
                    Owner: person.Name,
                    Pets: !petCollection ? null 
                                         : Linq(petCollection).Select(pet => pet.Name)
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
        assert.equal("Adams, Terry", result.Owner);
        assert.equal(2, result.Pets.length);
        assert.equal("Barley", result.Pets[0]);
        assert.equal("Boots", result.Pets[1]);
        result = iterator.next().value;
        assert.equal(null, result.Owner);
        assert.equal(null, result.Pets);
        result = iterator.next().value;
        assert.equal("Weiss, Charlotte", result.Owner);
        assert.equal(1, result.Pets.length);
        assert.equal("Whiskers", result.Pets[0]);
        result = iterator.next().value;
        assert.equal(undefined, result.Owner);
        assert.equal(null, result.Pets);
        assert.isTrue(iterator.next().done);
    });

    it('GroupJoin() - MSDN', function () {
        var iterable = Linq(msdn)
            .GroupJoin(pets,
            person => person,
            pet => pet.Owner,
            (person, petCollection) => {
                return {
                    Owner: person.Name,
                    Pets: Linq(petCollection).Select(pet => pet.Name)
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
    });

    it('GroupJoin() - QJesus', function () {
        const yx = [
            { id: '1', batchNumber: 'ZKFM1' },
            { id: '2', batchNumber: 'ZKFM' },
            { id: '3', batchNumber: 'ZKFM1' }
        ];
        const zx = [
            { id: '1', value: 'zzz' },
            { id: '2', value: 'xxx' },
        ];

        var join = Linq(yx).GroupJoin(zx, a => a.id, b => b.id, (a, temp) => ({ a, temp }))
                           .ToArray();

        assert.equal(3, join.length);
    });




    // GroupBy

    it('GroupBy()', function () {
        const iterable: any = Linq(pets).GroupBy(pet => pet.Age);

        const expected = new Map<number, number>(pets.map(pet => [pet.Age, pets.filter(p => p.Age === pet.Age).length]));
        const actual = [...iterable[Symbol.iterator]()];

        for(const [expectedAge, expectedLength] of expected) {
            const actualGroup = actual.find(group => group.key === expectedAge);
            assert.isDefined(actualGroup, `Missing expected group for pet.Age with key ${expectedAge}`);
            assert.equal(actualGroup.length, expectedLength, `Expected pet.Age ${expectedAge} with group of ${expectedLength} items but instead got ${actualGroup.length} items`);
        }
    });



    it('GroupBy() - Element selector', function () {
        var iterable: any = Linq(pets).GroupBy(pet => pet.Age,
            pet => pet);

        const expected = new Map<number, number>(pets.map(pet => [pet.Age, pets.filter(p => p.Age === pet.Age).length]));
        const actual = [...iterable[Symbol.iterator]()];

        for(const [expectedAge, expectedLength] of expected) {
            const actualGroup = actual.find(group => group.key === expectedAge);
            assert.isDefined(actualGroup, `Missing expected group for pet.Age with key ${expectedAge}`);
            assert.equal(actualGroup.length, expectedLength, `Expected pet.Age ${expectedAge} with group of ${expectedLength} items but instead got ${actualGroup.length} items`);
        }
    });



    it('GroupBy() - Result selector', function () {
        var iterable: Enumerable<number> = Linq(pets).GroupBy(
            pet => pet.Age,
            pet => pet,
            (age, group) => age);

        const expected = new Set<number>(pets.map(pet => pet.Age));
        const actual = [...iterable];

        assert.equal(actual.length, expected.size, `Expected ${expected.size} groups by pet.Age but got ${actual.length}`);
        for(const expectedAge of expected) {
            const actualExists = actual.findIndex(age => age === expectedAge) > -1;
            assert.isTrue(actualExists, `Missing expected pet.Age ${expectedAge}`);
        }
    });



    // SelectMany

    it('SelectMany()', function () {

        const iterable = Linq(jsn).SelectMany(a => a.ids);
        const actual = [...iterable];
        const expected = [].concat(...jsn.map(a => a.ids));
        assert.sameOrderedMembers(actual, expected);
    });

    it('SelectMany() - Selector', function () {

        const iterable = Linq(jsn).SelectMany(a => a.ids, (t, s) => s);
        const actual = [...iterable];
        const expected = [].concat(...jsn.map(a => a.ids.map(s => s)));
        assert.sameOrderedMembers(actual, expected);
    });

});

/** Copyright (c) ENikS.  All rights reserved. */
