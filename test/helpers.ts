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

import { assert } from "chai";
import * as Helper from "../lib/utilities";
import { pets, un1 } from "./data";


describe("Helpers - ", () => {

    var data = [
        { id: 1,         "name": "q" },
        { id: undefined, "name": "w" },
        { id: 3,         "name": "e" },
        { id: undefined, "name": "r" }
    ];

    it('getKeys()', function () {
        var keys = Helper.getKeys([ 1, 11, 13, 15 ], undefined);
        
    });

    it('getKeys() - Selector', function () {
        var keys = Helper.getKeys(data, e => e.id);
        
    });

    it('getDefaultVal()', function () {
        assert.equal(Helper.getDefaultVal(typeof false), false);
        assert.equal(Helper.getDefaultVal(typeof 0), 0);
        assert.equal(Helper.getDefaultVal(typeof null, null), null);
        assert.equal(Helper.getDefaultVal(typeof {}), undefined);
        assert.equal(Helper.getDefaultVal(typeof ""), Helper.CONST_EMPTY_STRING);
        assert.throws(function () {
            Helper.getDefaultVal(undefined);
        });
    });

    it('getKeyedMap', function () {

        var result = Helper.getKeyedMap(pets, e => e.Owner, e => e.Name );
        assert.equal(result.size, 3);

        var resultFast = Helper.getKeyedMapFast(pets, e => e.Owner );
        assert.equal(resultFast.size, 3);
    });

});
