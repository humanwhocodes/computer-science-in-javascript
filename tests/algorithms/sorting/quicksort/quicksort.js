/**
 * @fileoverview Quick Sort tests
 */
/* global it, describe */

"use strict";

//-----------------------------------------------------------------------------
// Requirements
//-----------------------------------------------------------------------------

const assert = require("chai").assert;
const fs = require("fs");
const path = require("path");

// Load and evaluate the quickSort code in global scope
const quickSortPath = path.join(__dirname, "../../../../algorithms/sorting/quicksort/quicksort.js");
const quickSortCode = fs.readFileSync(quickSortPath, "utf8");

// Use Function constructor to create functions in the parent scope
const createFunctions = new Function(quickSortCode + "\nreturn { swap: swap, partition: partition, quickSort: quickSort };");
const { quickSort } = createFunctions();

//-----------------------------------------------------------------------------
// Tests
//-----------------------------------------------------------------------------

describe("quickSort()", () => {

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

            quickSort(items);
            assert.deepStrictEqual(items, result);
        });

    });

    // Test cases specifically for pivot edge cases
    it("should sort when pivot is minimum value", () => {
        const items = [5, 5, 5, 1, 5];
        const expected = [1, 5, 5, 5, 5];
        
        quickSort(items);
        assert.deepStrictEqual(items, expected);
    });

    it("should sort when pivot is maximum value", () => {
        const items = [1, 1, 1, 9, 1];
        const expected = [1, 1, 1, 1, 9];
        
        quickSort(items);
        assert.deepStrictEqual(items, expected);
    });

    it("should sort an array with all same values", () => {
        const items = [3, 3, 3, 3, 3];
        const expected = [3, 3, 3, 3, 3];
        
        quickSort(items);
        assert.deepStrictEqual(items, expected);
    });

    it("should sort an already sorted array", () => {
        const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const expected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        
        quickSort(items);
        assert.deepStrictEqual(items, expected);
    });

    it("should sort a reverse sorted array", () => {
        const items = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
        const expected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        
        quickSort(items);
        assert.deepStrictEqual(items, expected);
    });

    it("should sort an array with negative numbers", () => {
        const items = [-5, 3, -1, 7, -10, 15];
        const expected = [-10, -5, -1, 3, 7, 15];
        
        quickSort(items);
        assert.deepStrictEqual(items, expected);
    });

    it("should sort an array with duplicates", () => {
        const items = [5, 2, 8, 2, 9, 1, 5, 5];
        const expected = [1, 2, 2, 5, 5, 5, 8, 9];
        
        quickSort(items);
        assert.deepStrictEqual(items, expected);
    });

    // Edge case: array where subarray partitions could access out-of-bounds elements
    it("should handle edge case with specific value distribution", () => {
        const items = [100, 1, 2, 3, 4, 5];
        const expected = [1, 2, 3, 4, 5, 100];
        
        quickSort(items);
        assert.deepStrictEqual(items, expected);
    });

});
