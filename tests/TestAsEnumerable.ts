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
import {asEnumerable, Range} from "../src/Linq";


describe('EnumerableTests', function () {

        it('Average()', function () {
            //var one = new[] {0, 1, 2};
            //var two = new[] {0, 1, 2, 3, 4};
            //var fourByThree = new[] {-2, 1, 5};
            //var oneByThree = new[] {-2, 1, 2};

            //var oneWithNulls = new int?[] {0, 1, 2, null, null, null, null};
            //var twoWithNulls = new int?[] {0, 1, 2, 3, 4, null, null, null};
            //var fourByThreeWithNulls = new int?[] {-2, 1, 5, null};
            //var oneByThreeWithNulls = new int?[] {-2, 1, 2, null, null};

            //assert.equal(1, one.Average());
            //assert.equal(2, two.Average());
            //assert.equal(4.0/3, fourByThree.Average());
            //assert.equal(1.0/3, oneByThree.Average());

            //// Repeat the tests with some null values and ensure they don't affect the result.
            //assert.equal(1, oneWithNulls.Average());
            //assert.equal(2, twoWithNulls.Average());
            //assert.equal(4.0/3, fourByThreeWithNulls.Average());
            //assert.equal(1.0/3, oneByThreeWithNulls.Average());

            //// Cast the arrays' elements types to different data types and repeat the tests.
            //// 1. long and long?
            //assert.equal(1, one.Select<int, long>(i => i).Average());
            //assert.equal(2, two.Select<int, long>(i => i).Average());
            //assert.equal(4.0/3, fourByThree.Select<int, long>(i => i).Average());
            //assert.equal(1.0/3, oneByThree.Select<int, long>(i => i).Average());
            //assert.equal(1, oneWithNulls.Select<int?, long?>(i => i).Average());
            //assert.equal(2, twoWithNulls.Select<int?, long?>(i => i).Average());
            //assert.equal(4.0/3, fourByThreeWithNulls.Select<int?, long?>(i => i).Average());
            //assert.equal(1.0/3, oneByThreeWithNulls.Select<int?, long?>(i => i).Average());
            //// 2. float and float?
            //assert.equal(1, one.Select<int, float>(i => i).Average());
            //assert.equal(2, two.Select<int, float>(i => i).Average());
            //assert.equal(4.0f/3, fourByThree.Select<int, float>(i => i).Average());
            //assert.equal(1.0f/3, oneByThree.Select<int, float>(i => i).Average());
            //assert.equal(1, oneWithNulls.Select<int?, float?>(i => i).Average());
            //assert.equal(2, twoWithNulls.Select<int?, float?>(i => i).Average());
            //assert.equal(4.0f/3, fourByThreeWithNulls.Select<int?, float?>(i => i).Average());
            //assert.equal(1.0f/3, oneByThreeWithNulls.Select<int?, float?>(i => i).Average());
            //// 3. double and double?
            //assert.equal(1, one.Select<int, double>(i => i).Average());
            //assert.equal(2, two.Select<int, double>(i => i).Average());
            //assert.equal(4.0/3, fourByThree.Select<int, double>(i => i).Average());
            //assert.equal(1.0/3, oneByThree.Select<int, double>(i => i).Average());
            //assert.equal(1, oneWithNulls.Select<int?, double?>(i => i).Average());
            //assert.equal(2, twoWithNulls.Select<int?, double?>(i => i).Average());
            //assert.equal(4.0/3, fourByThreeWithNulls.Select<int?, double?>(i => i).Average());
            //assert.equal(1.0/3, oneByThreeWithNulls.Select<int?, double?>(i => i).Average());
            //// 4. decimal and decimal?
            //assert.equal(1, one.Select<int, decimal>(i => i).Average());
            //assert.equal(2, two.Select<int, decimal>(i => i).Average());
            //assert.equal(4.0m/3, fourByThree.Select<int, decimal>(i => i).Average());
            //assert.equal(1.0m/3, oneByThree.Select<int, decimal>(i => i).Average());
            //assert.equal(1, oneWithNulls.Select<int?, decimal?>(i => i).Average());
            //assert.equal(2, twoWithNulls.Select<int?, decimal?>(i => i).Average());
            //assert.equal(4.0m/3, fourByThreeWithNulls.Select<int?, decimal?>(i => i).Average());
            //assert.equal(1.0m/3, oneByThreeWithNulls.Select<int?, decimal?>(i => i).Average());

            //// Convert the array to different data structures and repeat the tests to
            //// ensure that the method works with other data structures as well.
            //// 1. List
            //assert.equal(1, one.ToList().Average());
            //assert.equal(2, two.ToList().Average());
            //assert.equal(4.0/3, fourByThree.ToList().Average());
            //assert.equal(1.0/3, oneByThree.ToList().Average());
            //// 2. Stack
            //assert.equal(1, new Stack<int>(one).Average());
            //assert.equal(2, new Stack<int>(two).Average());
            //assert.equal(4.0/3, new Stack<int>(fourByThree).Average());
            //assert.equal(1.0/3, new Stack<int>(oneByThree).Average());
        });

        it('All()', function () {
            var enumerable = asEnumerable([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
            assert.isTrue(enumerable.All(i => i > 0));
            for (var j = 1; j <= 10; j++)
                assert.isFalse(enumerable.All(i => i > j));
        });

        it('Any()', function () {
            var enumerable = asEnumerable([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
            assert.isTrue(enumerable.Any());
            for (var j = 0; j <= 9; j++)
                assert.isTrue(enumerable.Any(i => i > j));
            assert.isFalse(enumerable.Any(i => i > 10));
        });

        it('Count()', function () {
            assert.equal(10, asEnumerable([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).Count());
            assert.equal(5, asEnumerable([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).Where(a => a % 2 == 1).Count());
        });

        it('Distinct()', function () {
            //// Validate an array of different numeric data types.
            //FindDistinctAndValidate(new int[] {1, 1, 1, 2, 3, 5, 5, 6, 6, 10});
            //FindDistinctAndValidate(new long[] {1, 1, 1, 2, 3, 5, 5, 6, 6, 10});
            //FindDistinctAndValidate(new float[] {1, 1, 1, 2, 3, 5, 5, 6, 6, 10});
            //FindDistinctAndValidate(new double[] {1, 1, 1, 2, 3, 5, 5, 6, 6, 10});
            //FindDistinctAndValidate(new decimal[] {1, 1, 1, 2, 3, 5, 5, 6, 6, 10});
            //// Try strings
            //FindDistinctAndValidate(new []
            //    {
            //        "add",
            //        "add",
            //        "subtract",
            //        "multiply",
            //        "divide",
            //        "divide2",
            //        "subtract",
            //        "add",
            //        "power",
            //        "exponent",
            //        "hello",
            //        "class",
            //        "namespace",
            //        "namespace",
            //        "namespace",
            //    });
        });

        it('Min()', function () {
            //var one = Enumerable.Range(1, 10).ToArray();
            //var minusTen = new [] {-1, -10, 10, 200, 1000
            //};
            //var hundred = new [] {3000, 100, 200, 1000};
            //assert.equal(1, one.Min());
            //assert.equal(-10, minusTen.Min());
            //assert.equal(100, hundred.Min());
        });

        it('Max()', function () {
            //var ten = Enumerable.Range(1, 10).ToArray();
            //var minusTen = new [] {-100, -15, -50, -10
            //    };
            //    var thousand = new [] {-16, 0, 50, 100, 1000
            //};
            //assert.equal(10, ten.Max());
            //assert.equal(-10, minusTen.Max());
            //assert.equal(1000, thousand.Max());
        });

        it('Range()', function () {
            var array = Range(1, 100).ToArray();
            assert.equal(array.length, 100);
            for (var i = 0; i < array.length; i++)
                assert.equal(array[i], i + 1);
        });

        it('Select()', function () {
            var jsn = [
                { "id": 100, "name": "d" }, { "id": 130, "name": "c" },
                { "id": 155, "name": "b" }, { "id": 301, "name": "a" }
            ];
            var array = asEnumerable(jsn).Select((a, b) => a.id * b).ToArray();
            assert.equal(array.length, 4);
            assert.equal(0, array[0]);
            assert.equal(130, array[1]);
            assert.equal(310, array[2]);
            assert.equal(903, array[3]);
        });

        it('SelectMany()', function () {
            var jsn = [
                { "ids": [11, 21, 31], "name": "d" },
                { "ids": [12, 22, 32], "name": "c" },
                { "ids": [13, 23, 33], "name": "b" },
                { "ids": [14, 24, 34], "name": "a" }
            ];

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

        it('Where()', function () {
            assert.isTrue(asEnumerable([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).Where(a => a % 2 == 1).All(b => b % 2 == 1))
        });

    });
