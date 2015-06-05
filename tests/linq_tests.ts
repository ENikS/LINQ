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

import {assert} from "chai";
import {asEnumerable, Range} from "../src/linq-ts";


var jsn = [
    { "ids": [11, 21, 31], "name": "d" },
    { "ids": [12, 22, 32], "name": "c" },
    { "ids": [13, 23, 33], "name": "b" },
    { "ids": [14, 24, 34], "name": "a" }
];

describe('Testing LINQ -', function () {

    var fruits = ["grape",  "passionfruit",
                  "banana", "mango",
                  "orange", "raspberry", 
                  "apple",  "blueberry",
                  "appla",];

    var julious =   { Name: "Hedlund, Julious" };
    var magnus =    { Name: "Hedlund, Magnus" };
    var terry =     { Name: "Adams, Terry" };
    var charlotte = { Name: "Weiss, Charlotte" };
    var barley =    { Name: "Barley",   Age: 8, Owner: terry };
    var boots =     { Name: "Boots",    Age: 4, Owner: terry };
    var whiskers =  { Name: "Whiskers", Age: 1, Owner: charlotte };
    var daisy =     { Name: "Daisy",    Age: 4, Owner: magnus };

    var people = [magnus, terry, charlotte];
    var pets =   [ barley, boots, whiskers, daisy ];

    it('Average()', function () {
        var one = [0, 1, 2];
        var two = [0, 1, 2, 3, 4];
        var fourByThree = [-2, 1, 5];
        var oneByThree = [-2, 1, 2];
        assert.equal(1, asEnumerable(one).Average());
        assert.equal(2, asEnumerable(two).Average());
        assert.equal(4.0 / 3, asEnumerable(fourByThree).Average());
        assert.equal(1.0 / 3, asEnumerable(oneByThree).Average());
    });

    it('Aggregate()', function () {
        assert.equal(6819160329805824, asEnumerable(jsn).SelectMany(a => a.ids, b => b).Aggregate(1, (a, b) => a * b));
    });

    it('All()', function () {
        var iterable = asEnumerable([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        assert.isTrue(iterable.All(i => i > 0));
        for (var j = 1; j <= 10; j++)
            assert.isFalse(iterable.All(i => i > j));
    });

    it('Any()', function () {
        var iterable = asEnumerable([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        assert.isTrue(iterable.Any());
        for (var j = 0; j <= 9; j++)
            assert.isTrue(iterable.Any(i => i > j));
        assert.isFalse(iterable.Any(i => i > 10));
    });

    it('Contains', function () {
        assert.isTrue(asEnumerable([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).Contains(4));
        assert.isFalse(asEnumerable([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).Contains(43));
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
    });


    it('Count()', function () {
        assert.equal(10, asEnumerable([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).Count());
        assert.equal(5, asEnumerable([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).Where(a => a % 2 == 1).Count());
    });

    it('Distinct()', function () {

        var iterable = asEnumerable([0, 0, 1, 3, 5, 6, 5, 7, 8, 8]).Distinct();
        var iterator = iterable[Symbol.iterator]()

        assert.equal(0, iterator.next().value);
        assert.equal(1, iterator.next().value);
        assert.equal(3, iterator.next().value);
        assert.equal(5, iterator.next().value);
        assert.equal(6, iterator.next().value);
        assert.equal(7, iterator.next().value);
        assert.equal(8, iterator.next().value);
        assert.isTrue(iterator.next().done);

        var test = [
            "add", "add",
            "subtract",
            "multiply",
            "hello",
            "class",
            "namespace",
            "namespace",
            "namespace"];
        var siterable = asEnumerable(test).Distinct();
        var siterator = siterable[Symbol.iterator]()
        assert.equal("add", siterator.next().value);
        assert.equal("subtract", siterator.next().value);
        assert.equal("multiply", siterator.next().value);
        assert.equal("hello", siterator.next().value);
        assert.equal("class", siterator.next().value);
        assert.equal("namespace", siterator.next().value);
        assert.isTrue(siterator.next().done);
    });

    it('Except()', function () {
        var iterator = asEnumerable([1, 2, 3, 4, 5, 6, 7, 8, 9]).Except([2, 4, 6])[Symbol.iterator]();
        assert.equal(1, iterator.next().value);
        assert.equal(3, iterator.next().value);
        assert.equal(5, iterator.next().value);
        assert.equal(7, iterator.next().value);
        assert.equal(8, iterator.next().value);
        assert.equal(9, iterator.next().value);
        assert.isTrue(iterator.next().done);
    });


    it('GroupBy()', function () {
        var iterable: any = asEnumerable(pets).GroupBy(pet => pet.Age,
            pet => pet);

        var iterator = iterable[Symbol.iterator]();
        var result = iterator.next().value;
        assert.equal(8, result.key);
        assert.equal(1, result.length);
        result = iterator.next().value;
        assert.equal(4, result.key);
        assert.equal(2, result.length);
        result = iterator.next().value;
        assert.equal(1, result.key);
        assert.equal(1, result.length);
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
                                    .Select(pet=> pet.Name)
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

    it('Min()', function () {
        var one = Range(1, 10).ToArray();
        var minusTen = [-1, -10, 10, 200, 1000];
        var hundred = [3000, 100, 200, 1000];
        assert.equal(1, asEnumerable(one).Min());
        assert.equal(-10, asEnumerable(minusTen).Min());
        assert.equal(100, asEnumerable(hundred).Min());
    });

    it('Max()', function () {
        var ten = Range(1, 10).ToArray();
        var minusTen = [-100, -15, -50, -10];
        var thousand = [-16, 0, 50, 100, 1000];
        assert.equal(10, asEnumerable(ten).Max());
        assert.equal(-10, asEnumerable(minusTen).Max());
        assert.equal(1000, asEnumerable(thousand).Max());
    });

    it('Range()', function () {
        var array = Range(1, 100).ToArray();
        assert.equal(array.length, 100);
        for (var i = 0; i < array.length; i++)
            assert.equal(array[i], i + 1);
    });

    it('Repeat()', function () {
        var iterable = asEnumerable().Repeat("Test", 5);
        var iterator = iterable[Symbol.iterator]()

        assert.equal("Test", iterator.next().value);
        assert.equal("Test", iterator.next().value);
        assert.equal("Test", iterator.next().value);
        assert.equal("Test", iterator.next().value);
        assert.equal("Test", iterator.next().value);
        assert.isTrue(iterator.next().done);
    });

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

    it('DefaultIfEmpty()', function () {
        assert.equal(0, asEnumerable([]).DefaultIfEmpty(0)[Symbol.iterator]().next().value);
        assert.equal(1, asEnumerable([1]).DefaultIfEmpty(0)[Symbol.iterator]().next().value);
        assert.equal('a', asEnumerable(<Array<string>>[]).DefaultIfEmpty('a')[Symbol.iterator]().next().value);
        assert.equal(undefined, asEnumerable([]).DefaultIfEmpty()[Symbol.iterator]().next().value);
    });


    it('ElementAt()', function () {
        var iterable = asEnumerable([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        assert.equal(1, iterable.ElementAt(0));
        assert.equal(6, iterable.ElementAt(5));
        assert.throw(function () {
            iterable.ElementAt(50);
        });
    });

    it('ElementAtOrDefault()', function () {
        var iterable = asEnumerable([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        assert.equal(10, iterable.ElementAtOrDefault(9));
        assert.equal(4, iterable.ElementAtOrDefault(3));
        assert.doesNotThrow(function () {
            iterable.ElementAtOrDefault(50);
        });
        assert.equal(0, iterable.ElementAtOrDefault(50));
    });


    it('First()', function () {
        var iterable = asEnumerable([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        assert.equal(1, iterable.First());
        assert.equal(6, iterable.First(a=> a > 5));
        assert.throw(function () {
            iterable.First(a=> a > 50);
        });
    });

    it('FirstOrDefault()', function () {
        var iterable = asEnumerable([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        assert.equal(1, iterable.FirstOrDefault());
        assert.equal(6, iterable.FirstOrDefault(a=> a > 5));
        assert.doesNotThrow(function () {
            iterable.FirstOrDefault(a=> a > 50);
        });
        assert.equal(0, iterable.FirstOrDefault(a=> a > 50));
    });

    it('Intersect()', function () {
        var iterable = asEnumerable([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]).Intersect([1, 3, 5, 11, 23, 44]);
        var iterator = iterable[Symbol.iterator]()

        assert.equal(1, iterator.next().value);
        assert.equal(3, iterator.next().value);
        assert.equal(5, iterator.next().value);
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
    });

    it('OrderBy()', function () {
        var iterable = asEnumerable(jsn)
            .SelectMany(a => a.ids, b => b).OrderBy();
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
            .SelectMany(a => a.ids, b => b).OrderByDescending();
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


    it('ThenByDescending()', function () {
        var iterable: any = asEnumerable(fruits)
            .OrderByDescending(fruit=> fruit.length)
            .ThenByDescending(fruit=> fruit.charCodeAt(0))
            .ThenByDescending(fruit=> fruit.charCodeAt(4));
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

    it('Last()', function () {
        var iterable = asEnumerable([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        assert.equal(10, iterable.Last());
        assert.equal(10, iterable.Last(a=> a > 5));
        assert.throw(function () {
            iterable.Last(a=> a > 50);
        });
    });

    it('LastOrDefault()', function () {
        var iterable = asEnumerable([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        assert.equal(10, iterable.LastOrDefault());
        assert.equal(10, iterable.LastOrDefault(a=> a > 5));
        assert.doesNotThrow(function () {
            iterable.LastOrDefault(a=> a > 50);
        });
        assert.equal(0, iterable.LastOrDefault(a=> a > 50));
    });


    it('Select()', function () {
        var array = asEnumerable(jsn).Select((a, b) => a.name).ToArray();
        assert.equal(array.length, 4);
        assert.equal('d', array[0]);
        assert.equal('c', array[1]);
        assert.equal('b', array[2]);
        assert.equal('a', array[3]);
    });

    it('SelectMany()', function () {

        var iterable = asEnumerable(jsn).SelectMany(a => a.ids, b => b);
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
    });

    it('SequenceEqual()', function () {
        assert.isTrue(asEnumerable([0, 1, 2, 3]).SequenceEqual([0, 1, 2, 3]))
        assert.isFalse(asEnumerable([0, 1, 2, 3]).SequenceEqual([0, 1, 2, 3, 4]))
        assert.isFalse(asEnumerable([0, 1, 2, 3]).SequenceEqual([0, 1, 4, 3]))
    });

    it('Single()', function () {
        assert.equal(4, asEnumerable([4]).Single());
        assert.equal(2, asEnumerable([1, 2, 3]).Single(a=> a == 2));
        assert.throw(function () {
            asEnumerable([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).Single(a=> a > 5);
        });
    });

    it('SingleOrDefault()', function () {
        assert.equal(4, asEnumerable([4]).SingleOrDefault());
        assert.equal(2, asEnumerable([1, 2, 3]).SingleOrDefault(a=> a == 2));
        assert.doesNotThrow(function () {
            asEnumerable([1, 2, 3]).SingleOrDefault(a=> a > 50);
        });
        assert.equal(0, asEnumerable([1, 2, 3]).SingleOrDefault(a=> a > 50));
    });

    it('Skip()', function () {
        assert.equal(3, asEnumerable([0, 1, 2, 3, 4, 5, 6, 7]).Skip(3).First());
    });

    it('SkipWhile()', function () {
        assert.equal(4, asEnumerable([0, 1, 2, 3, 4, 5, 6, 7]).SkipWhile(a=> a < 4).FirstOrDefault());

        var amounts = [
            5000, 2500, 9000, 8000, 
            6500, 4000, 1500, 5500 ];

        var iterable = asEnumerable(amounts).SkipWhile((amount, index) => amount > index * 1000);
        var iterator = iterable[Symbol.iterator]()
        assert.equal(4000, iterator.next().value);
        assert.equal(1500, iterator.next().value);
        assert.equal(5500, iterator.next().value);
        assert.isTrue(iterator.next().done);
    });

    it('Sum()', function () {
        assert.equal(270, asEnumerable(jsn).SelectMany(a => a.ids).Sum());
    });

    it('Take()', function () {
        var iterable = asEnumerable([0, 1, 2, 3, 4, 5, 6, 7]).Take(3);
        var iterator = iterable[Symbol.iterator]()
        assert.equal(0, iterator.next().value);
        assert.equal(1, iterator.next().value);
        assert.equal(2, iterator.next().value);
        assert.isTrue(iterator.next().done);
    });

    it('TakeWhile()', function () {
        var iterable = asEnumerable([0, 1, 2, 3, 4, 5, 6, 7]).TakeWhile(a=> a < 4);
        var iterator = iterable[Symbol.iterator]()
        assert.equal(0, iterator.next().value);
        assert.equal(1, iterator.next().value);
        assert.equal(2, iterator.next().value);
        assert.equal(3, iterator.next().value);
        assert.isTrue(iterator.next().done);
    });

    it('Union()', function () {
        var iterable = asEnumerable([0, 1, 2, 3, 4, 5, 6, 7]).Union([5,6,7,8,9]);
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


    it('Where()', function () {
        assert.isTrue(asEnumerable([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).Where(a => a % 2 == 1).All(b => b % 2 == 1))
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

describe('Enumerable - ', function () {

    it('GetEnumerator()', function () {

        var enumerable = asEnumerable(jsn).SelectMany(a => a.ids, b => b);
        var enumerator = enumerable.GetEnumerator();

        assert.isTrue(enumerator.MoveNext());
        assert.equal(11, enumerator.Current);
        assert.isTrue(enumerator.MoveNext());
        assert.equal(21, enumerator.Current);
        assert.isTrue(enumerator.MoveNext());
        assert.equal(31, enumerator.Current);
        assert.isTrue(enumerator.MoveNext());
        assert.equal(12, enumerator.Current);
        assert.isTrue(enumerator.MoveNext());
        assert.equal(22, enumerator.Current);
        assert.isTrue(enumerator.MoveNext());
        assert.equal(32, enumerator.Current);
        assert.isTrue(enumerator.MoveNext());
        assert.equal(13, enumerator.Current);
        assert.isTrue(enumerator.MoveNext());
        assert.equal(23, enumerator.Current);
        assert.isTrue(enumerator.MoveNext());
        assert.equal(33, enumerator.Current);
        assert.isTrue(enumerator.MoveNext());
        assert.equal(14, enumerator.Current);
        assert.isTrue(enumerator.MoveNext());
        assert.equal(24, enumerator.Current);
        assert.isTrue(enumerator.MoveNext());
        assert.equal(34, enumerator.Current);
        assert.isFalse(enumerator.MoveNext());
    });

    it('Enumerate()', function () {

        var enumerable = Range(0, 100);
        var enumerator = enumerable.GetEnumerator();
        var index = 0
        while (enumerator.MoveNext()) {
            assert.equal(index++, enumerator.Current);
        }
    });

});

