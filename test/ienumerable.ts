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

import {jsn} from "./data";
import {assert} from "chai";
import { asEnumerable, Range} from "../lib/linq";


describe('Enumerable - ', function () {

    it('GetEnumerator()', function () {

        var enumerable = asEnumerable(jsn).SelectMany(a => a.ids);
        var enumerator = enumerable.GetEnumerator();
        const expected = [].concat(...jsn.map(a => a.ids));
        for(const exp of expected) {
            assert.isTrue(enumerator.MoveNext());
            assert.equal(exp, enumerator.Current);
        }

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


    it('Reset()', function () {

        var enumerable = Range(0, 100);
        var enumerator = enumerable.GetEnumerator();
        var index = 0
        while (enumerator.MoveNext()) {
            assert.equal(index++, enumerator.Current);
        }
        assert.throw(function () {
            enumerator.Reset();
        });

    });
});

/** Copyright (c) ENikS.  All rights reserved. */
