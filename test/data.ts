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

export var jsn = [
    { id: 1, "ids": [11, 21, 31], "name": "d" },
    { id: 2, "ids": [12, 22, 32], "name": "c" },
    { id: 3, "ids": [13, 23, 33], "name": "b" },
    { id: 4, "ids": [14, 24, 34], "name": "a" },
    { id: 0, "ids": [0, 0, 0], "name": "null" }
];

export var un1 = [
    { id: 1, "name": "q" },
    { id: 2, "name": "w" },
    { id: null, "name": "null" },
    { id: 3, "name": "e" },
    { id: 3, "name": "e" },
    { id: 4, "name": "r" }
];

export var un2 = [
    { id: 3, "name": "a" },
    { id: 4, "name": "s" },
    { id: undefined, "name": "undefined" },
    { id: 5, "name": "d" },
    { id: 5, "name": "d" },
    { id: 6, "name": "f" }
];

export var fruits = [
    "grape", "passionfruit",
    "banana", "mango",
    "orange", "raspberry",
    "apple", "blueberry",
    "appla"
];

export var simpleArray = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
export var randomArray = [ 5, 8, 9, 6, 7, 10, 1, 2, 3, 4, 0 ];
export var oddArray = [ 1, 3, 5, 7, 9, 11, 13, 15 ];


var ghost : any = { Name: undefined };
var nullGhost : any = { Name: null };
var julious = { Name: "Hedlund, Julious" };
var magnus = { Name: "Hedlund, Magnus" };
var terry = { Name: "Adams, Terry" };
var charlotte = { Name: "Weiss, Charlotte" };
var barley = { Name: "Barley", Age: 8, Owner: terry };
var boots = { Name: "Boots", Age: 4, Owner: terry };
var whiskers = { Name: "Whiskers", Age: 1, Owner: charlotte };
var daisy = { Name: "Daisy", Age: 4, Owner: magnus };
var stray : any = { Name: "Lost Dog", Age: 4, Owner: null };
var undef : any = { Name: "Puppy", Age: 0, Owner: undefined };

export var people = [magnus, terry, terry, nullGhost, charlotte, ghost];
export var msdn   = [magnus, terry, charlotte];
export var pets   = [barley, stray, boots, whiskers, daisy, undef];

export var mix = [
            0, 
            new Number(1),
            "This is a simple string", 
            new String(), 
            new String("String created with constructor"), 
            new Date(), 
            true,
            Symbol.iterator,
            2,
            false,
            { Name: "asd"}, 
            simpleArray, 
            un1, 
            new Boolean(true),
            pets,
            new Boolean(false),
            3,
            function(){}
            ];

export var phrase = [
    { key: "A", value: "We" },
    { key: "A", value: "think" },
    { key: "A", value: "that" },
    { key: "B", value: "Linq" },
    { key: "C", value: "is" },
    { key: "A", value: "really" },
    { key: "B", value: "cool" },
    { key: "B", value: "!" }
];

export var unorderedMix = [
    Infinity, -Infinity,
    NaN,
    0, -0, 1, -1,
    {},
    [3], [4, 5], [6],
    "1", "-1", "afgh", "axgh",
    "123",
    "132",
    "1234",
    "1314",
    NaN,
    "zjgf"];

export var unorderedStr = [
    "afgh",
    "axgh",
    "1234",
    "1324",
    "1234",
    "1314",
    "zjgf"];

/** Copyright (c) ENikS.  All rights reserved. */
