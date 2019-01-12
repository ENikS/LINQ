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

import {simpleArray, randomArray, oddArray, jsn} from "./data";
import {assert} from "chai";
import * as Linq from "../lib/linq";


describe('Immediate Execution -', function () {

    // Aggregate


    it('Aggregate() - No seed', function () {
        assert.equal(55, Linq.From(simpleArray).Aggregate((a, b) => a + b));
    });

    it('Aggregate()', function () {
        assert.equal(3628800, Linq.From(simpleArray).Aggregate(1, (a, b) => a * b));
    });

    it('Aggregate() - Transform', function () {
        assert.equal(1814400, Linq.From(simpleArray).Aggregate(1, (a, b) => a * b, o => o / 2));
    });
    
    it('Aggregate() - Default Value [String]', function () {
        assert.equal("123", Linq.From([1, 2, 3]).Aggregate("", (c, n) => c.toString() + n.toString()));
    });
    
    it('Aggregate() - Default Value [Number]', function () {
        assert.equal("123", Linq.From(["1", "2", "3"]).Aggregate("", (c, n) => c.toString() + n.toString()));
    });

    it('Aggregate() - Default Value [Mix]', function () {
        assert.equal("123", Linq.From([1, "2", "3"]).Aggregate("", (c, n) => c.toString() + n.toString()));
    });


    // All

    it('All() - True', function () {
        assert.isTrue(Linq.From(oddArray).All(b => b % 2 == 1))
    });


    it('All() - False', function () {
        assert.isFalse(Linq.From(simpleArray).All(b => b % 2 == 1))
    });



    // Any

    it('Any() - No predicate', function () {
        assert.isTrue(Linq.From(simpleArray).Any());
    });

    it('Any() - True', function () {
        assert.isTrue(Linq.From(simpleArray).Any(i => i > 3));
    });

    it('Any() - False', function () {
        assert.isFalse(Linq.From(simpleArray).Any(i => i > simpleArray.length));
    });



    // Average

    it('Average() - No predicate', function () {
        assert.equal(4.0 / 3, Linq.From([-2, 1, 5]).Average());
    });

    it('Average()', function () {
        assert.equal((1+2+3+4)/4, Linq.From(jsn).Average(o => o.id));
    });



    // Contains

    it('Contains - True', function () {
        assert.isTrue(Linq.From(simpleArray).Contains(4));
    });

    it('Contains - False', function () {
        assert.isFalse(Linq.From(simpleArray).Contains(43));
    });



    // Count

    it('Count() - Array', function () {
        assert.equal(10, Linq.From(simpleArray).Count());
    });

    it('Count() - String', function () {
        assert.equal(10, Linq.From("1234567890").Count());
    });

    it('Count() - No predicate', function () {
        assert.equal(10, Linq.Range(0, 10).Count());
    });

    it('Count()', function () {
        assert.equal(5, Linq.From(simpleArray).Count(b => b % 2 == 1));
    });



    // Max

    it('Max() - No predicate', function () {
        assert.equal(10, Linq.From(randomArray).Max());
    });

    it('Max()', function () {
        assert.equal(4, Linq.From(jsn).Max(o => o.id));
    });

    it('Max() - Empty', function () {
        assert.throws(function () {
            Linq.From([]).Max();
        });
    });



    // Min

    it('Min() - No predicate', function () {
        assert.equal(1, Linq.From(randomArray).Min());
    });

    it('Min()', function () {
        assert.equal(1, Linq.From(jsn).Min(o => o.id));
    });

    it('Min() - Empty', function () {
        assert.throws(function () {
            Linq.From([]).Min();
        });
    });



    // ElementAt

    it('ElementAt() - Iterable', function () {
        assert.equal(3, Linq.Range(0, 10).ElementAt(3));
    });

    it('ElementAt() - Array', function () {
        assert.equal(6, Linq.From(simpleArray).ElementAt(5));
    });

    it('ElementAt() - Out of Range', function () {
        assert.throw(function () {
            Linq.From(simpleArray).ElementAt(-1);
        });
        assert.throw(function () {
            Linq.Range(0, 10).ElementAt(50);
        });
    });



    // ElementAtOrDefault

    it('ElementAtOrDefault() - Array', function () {
        assert.equal(Linq.From(simpleArray).ElementAtOrDefault(5), 6);
    });

    it('ElementAtOrDefault() - Iterable', function () {
        assert.equal(Linq.Range(1, 10).ElementAtOrDefault(5), 6);
    });

    it('ElementAtOrDefault() - Default of Array', function () {
        assert.equal(Linq.From(simpleArray).ElementAtOrDefault(-500), 0);
    });

    it('ElementAtOrDefault() - Default of empty Array', function () {
        assert.equal(Linq.From([]).ElementAtOrDefault(-500), undefined);
    });

    it('ElementAtOrDefault() - Default of Iterable', function () {
        assert.equal(Linq.Range(1, 10).ElementAtOrDefault(500), 0);
    });

    it('ElementAtOrDefault() - Default Boolean', function () {
        assert.isFalse(Linq.From([true, false, false]).ElementAtOrDefault(5));
    });

    it('ElementAtOrDefault() - Default Null', function () {
        assert.isNull(Linq.Repeat(null, 1).ElementAtOrDefault(5));
    });

    it('ElementAtOrDefault() - Default Undefined', function () {
        assert.isUndefined(Linq.Repeat(undefined, 1).ElementAtOrDefault(5));
    });

    it('ElementAtOrDefault() - Default Object', function () {
        assert.isUndefined(Linq.From([this, this, {}]).ElementAtOrDefault(5));
    });

    it('ElementAtOrDefault() - Default String', function () {
        assert.isString(Linq.Repeat("String", 3).ElementAtOrDefault(5));
    });

    it('ElementAtOrDefault() - Default Symbol', function () {
        assert.isDefined(Linq.From([Symbol(), Symbol]).ElementAtOrDefault(5));
    });

    it('ElementAtOrDefault() - Default Function', function () {
        assert.isUndefined(Linq.Repeat(() => { }, 3).ElementAtOrDefault(5));
    });

    it('ElementAtOrDefault() - Default Class', function () {
        class Polygon {
            constructor(public height = 0, public width = 1) {
                this.height = height;
                this.width = width;
            }
        }

        assert.isUndefined(Linq.Repeat(Polygon, 3).ElementAtOrDefault(5));
    });



    // First

    it('First() - No predicate', function () {
        assert.equal(1, Linq.From(simpleArray).First());
    });

    it('First()', function () {
        assert.equal(6, Linq.From(simpleArray).First(a => a > 5));
    });

    it('First() - Empty', function () {
        assert.throw(function () {
            assert.equal(6, Linq.From(simpleArray).First(a => a > 50));
        });
    });



    // FirstOrDefault

    it('FirstOrDefault() - No predicate', function () {
        assert.equal(1, Linq.From(simpleArray).FirstOrDefault());
    });

    it('FirstOrDefault()', function () {
        assert.equal(6, Linq.From(simpleArray).FirstOrDefault(a => a > 5));
    });

    it('FirstOrDefault() - Empty', function () {
        assert.doesNotThrow(function () {
            assert.equal(0, Linq.From(simpleArray).FirstOrDefault(a => a > 50));
        });
    });



    // Last

    it('Last() - No predicate', function () {
        assert.equal(10, Linq.From(simpleArray).Last());
    });

    it('Last()', function () {
        assert.equal(4, Linq.From(simpleArray).Last(a => a < 5));
    });

    it('Last() - Empty', function () {
        assert.throw(function () {
            Linq.From(simpleArray).Last(a => a > 50);
        });
    });



    // LastOrDefault

    it('LastOrDefault() - No predicate', function () {
        assert.equal(10, Linq.From(simpleArray).LastOrDefault());
    });

    it('LastOrDefault()', function () {
        assert.equal(4, Linq.From(simpleArray).LastOrDefault(a => a < 5));
    });

    it('LastOrDefault() - Empty', function () {
        assert.doesNotThrow(function () {
            assert.equal(0, Linq.From(simpleArray).LastOrDefault(a => a > 50));
        });
    });



    // SequenceEqual

    it('SequenceEqual() - Array', function () {
        assert.isTrue(Linq.From(simpleArray).SequenceEqual(simpleArray))
    });

    it('SequenceEqual() - Linq', function () {
        assert.isTrue(Linq.From(simpleArray).SequenceEqual(Linq.From(simpleArray)))
    });

    it('SequenceEqual() - Shorter', function () {
        assert.isFalse(Linq.From([1, 2, 3, 4, 5, 6]).SequenceEqual(simpleArray))
    });

    it('SequenceEqual() - Longer', function () {
        assert.isFalse(Linq.From(simpleArray).SequenceEqual([1, 2, 3, 4, 5, 6]))
    });

    it('SequenceEqual() - Not Equal', function () {
        assert.isFalse(Linq.From(simpleArray).SequenceEqual([1, 2, 3, 4, 50, 6, 7, 8, 9, 10]))
    });



    // Singel

    it('Single() - No predicate', function () {
        assert.equal(4, Linq.From([4]).Single());
    });

    it('Single()', function () {
        assert.equal(2, Linq.From(simpleArray).Single(a => a == 2));
    });

    it('Single() - Empty', function () {
        assert.throw(function () {
            Linq.From(simpleArray).Single(a => a > 15);
        });
    });

    it('Single() - More than one', function () {
        assert.throw(function () {
            Linq.From(simpleArray).Single(a => a > 5);
        });
    });




    // SingleOrDefault

    it('SingleOrDefault() - No predicate', function () {
        assert.equal(4, Linq.From([4]).SingleOrDefault());
    });

    it('SingleOrDefault()', function () {
        assert.equal(2, Linq.From(simpleArray).SingleOrDefault(a => a == 2));
    });

    it('SingleOrDefault() - Empty', function () {
        assert.equal(0, Linq.From(simpleArray).SingleOrDefault(a => a == 20));
    });

    it('SingleOrDefault() - More than one', function () {
        assert.Throw(function () {
            Linq.From(simpleArray).SingleOrDefault(a => a > 5);
        });
    });




    // Sum
    it('Sum() - No predicate', function () {
        assert.equal(55, Linq.From(simpleArray).Sum());
    });

    it('Sum()', function () {
        assert.equal(10, Linq.From(jsn).Sum(o => o.id));
    });



    // ToArray
    it('ToArray()', function () {
        assert.isArray(Linq.From(simpleArray).ToArray());
    });




    // ToMap

    it('ToMap() - No Selector', function () {
        assert.equal(jsn[0], Linq.From(jsn).ToMap(o => o.id).get(1));
    });

    it('ToMap()', function () {
        assert.equal(jsn[0].name, Linq.From(jsn).ToMap(k => k.id, o => o.name).get(1));
    });

    it('ToDictionary() - No Selector', function () {
        assert.equal(jsn[0], Linq.From(jsn).ToDictionary(o => o.id).get(1));
    });

    it('ToDictionary()', function () {
        assert.equal(jsn[0].name, Linq.From(jsn).ToDictionary(k => k.id, o => o.name).get(1));
    });

});

/** Copyright (c) ENikS.  All rights reserved. */
