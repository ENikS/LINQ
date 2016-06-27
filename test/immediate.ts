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
import * as Linq from "../src/linq";


describe('Immediate Execution Methods -', function () {

    // Aggregate

    it('Aggregate()', function () {
        assert.equal(3628800, Linq.From(simpleArray)
                                  .Aggregate(1, (a, b) => a * b));
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

    it('Count() - No predicate', function () {
        assert.equal(10, Linq.From(simpleArray).Count());
    });

    it('Count()', function () {
        assert.equal(5, Linq.From(simpleArray).Count(b => b % 2 == 1));
    });



    // Max

    it('Max() - No predicate', function () {
        assert.equal(10, Linq.From(simpleArray).Max());
    });

    it('Max()', function () {
        assert.equal(4, Linq.From(jsn).Max(o => o.id));
    });



    // Min

    it('Min() - No predicate', function () {
        assert.equal(1, Linq.From(simpleArray).Min());
    });

    it('Min()', function () {
        assert.equal(1, Linq.From(jsn).Min(o => o.id));
    });



    // ElementAt

    it('ElementAt()', function () {
        assert.equal(1, Linq.From(simpleArray).ElementAt(0));
        assert.equal(6, Linq.From(simpleArray).ElementAt(5));
    });

    it('ElementAt() - Out of Range', function () {
        assert.throw(function () {
            Linq.From(simpleArray).ElementAt(-1);
            Linq.From(simpleArray).ElementAt(50);
        });
    });



    // ElementAtOrDefault

    it('ElementAtOrDefault()', function () {
        assert.equal(6, Linq.From(simpleArray).ElementAtOrDefault(5));
    });

    it('ElementAtOrDefault() - DefaultValue', function () {
        assert.doesNotThrow(function () {
            assert.equal(0, Linq.From(simpleArray).ElementAtOrDefault(500));
        });
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
            Linq.From(simpleArray).Single(a => a > 5);
        });
    });




    // SingleOrDefault

    it('SingleOrDefault() - No predicate', function () {
        assert.equal(4, Linq.From([4]).SingleOrDefault());
        assert.equal(2, Linq.From(simpleArray).SingleOrDefault(a => a == 2));
        assert.doesNotThrow(function () {
            Linq.From(simpleArray).SingleOrDefault(a => a > 50);
        });
    });

    it('SingleOrDefault()', function () {
        assert.equal(4, Linq.From([4]).SingleOrDefault());
        assert.equal(2, Linq.From(simpleArray).SingleOrDefault(a => a == 2));
        assert.doesNotThrow(function () {
            Linq.From(simpleArray).SingleOrDefault(a => a > 50);
        });
    });

    it('SingleOrDefault() - Empty', function () {
        assert.equal(4, Linq.From([4]).SingleOrDefault());
        assert.equal(2, Linq.From(simpleArray).SingleOrDefault(a => a == 2));
        assert.doesNotThrow(function () {
            Linq.From(simpleArray).SingleOrDefault(a => a > 50);
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

});