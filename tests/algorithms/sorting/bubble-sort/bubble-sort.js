/**
 * @fileoverview Bubble Sort tests
 */
/* global it, describe */

"use strict";

//-----------------------------------------------------------------------------
// Requirements
//-----------------------------------------------------------------------------

const assert = require("chai").assert;
const { bubbleSort } = require("../../../../src/algorithms/sorting/bubble-sort");

//-----------------------------------------------------------------------------
// Tests
//-----------------------------------------------------------------------------

describe("bubbleSort()", () => {

    [
        [],
        [1],
        [2, 1],
        [2, 1, 3],
        [32,4,5,7,9,4,1],
        [3,1,1,5,9,4,2, 5, 12, 45]
    ].forEach(items => {

        it("should sort an array when the array has " + items.length + " item(s)", () => {
            const result = [...items].sort((a, b) => a - b);

            bubbleSort(items);
            assert.deepStrictEqual(items, result);
        });

    });

});