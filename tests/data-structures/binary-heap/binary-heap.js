/**
 * @fileoverview Doubly Linked List tests
 */
/* global it, describe, beforeEach */
"use strict";

//-----------------------------------------------------------------------------
// Requirements
//-----------------------------------------------------------------------------

const assert = require("chai").assert;
const { BinaryHeap } = require("../../../src/data-structures/binary-heap/binary-heap");

//-----------------------------------------------------------------------------
// Helpers
//-----------------------------------------------------------------------------

/**
 * Check that the contents of the heap match the values of the array.
 * @param {BinaryHeap} heap The list to check 
 * @param {Array} values An array of values that should match.
 * @throws {AssertionError} If the values in the list don't match the
 *      values in the array.
 */
function assertHeapValues(heap, values) {
    const heapValues = [...heap.values()];
    assert.deepStrictEqual(heapValues, values);

}

//-----------------------------------------------------------------------------
// Tests
//-----------------------------------------------------------------------------

describe("BinaryHeap", () => {

    let heap;

    beforeEach(() => {
        heap = new BinaryHeap();
    });

    describe("add()", () => {
        
        it("should store an item when one item is added", () => {
            heap.add(1);
            assertHeapValues(heap, [1]);
        });

        it("should store two items when multiple items are added", () => {
            heap.add(2);
            heap.add(1);

            assertHeapValues(heap, [1,2]);
        });

        it("should store two items when multiple items are added", () => {
            heap.add(2);
            heap.add(3);
            assertHeapValues(heap, [2,3]);
        });

        it("should store three items when multiple items are added", () => {
            heap.add(2);
            heap.add(3);
            heap.add(1);
            assertHeapValues(heap, [1,3,2]);
        });

        it("should store four items when multiple items are added", () => {
            heap.add(2);
            heap.add(3);
            heap.add(1);
            heap.add(0);
            assertHeapValues(heap, [0,1,2,3]);
        });
    });

    describe("size", () => {
        
        it("should return the correct size when the heap has no items", () => {
            assert.strictEqual(heap.size, 0);
        });

        it("should return the correct size when the heap has one item", () => {
            heap.add(1);
            assert.strictEqual(heap.size, 1);
        });

        it("should return the correct size when the heap has two items", () => {
            heap.add(2);
            heap.add(1);
            assert.strictEqual(heap.size, 2);
        });

        it("should return the correct size when the heap has three items", () => {
            heap.add(2);
            heap.add(3);
            heap.add(1);
            assert.strictEqual(heap.size, 3);
        });

        it("should return the correct size when the heap has four items", () => {
            heap.add(2);
            heap.add(3);
            heap.add(1);
            heap.add(0);
            assert.strictEqual(heap.size, 4);
        });
    });

    describe("isEmpty()", () => {
        
        it("should return true when the heap is empty", () => {
            assert.isTrue(heap.isEmpty());
        });

        it("should return false when the heap has one item", () => {
            heap.add(1);
            assert.isFalse(heap.isEmpty());
        });

        it("should return false when the heap has two items", () => {
            heap.add(2);
            heap.add(1);
            assert.isFalse(heap.isEmpty());
        });

    });

    describe("includes()", () => {
        
        it("should return false when the heap is empty", () => {
            assert.isFalse(heap.includes(5));
        });

        it("should return true when the item is found", () => {
            heap.add(1);
            assert.isTrue(heap.includes(1));
        });

        it("should return false when the item is not found", () => {
            heap.add(1);
            assert.isFalse(heap.includes(10));
        });

        it("should return true when the heap has two items and the item is found", () => {
            heap.add(2);
            heap.add(1);
            assert.isTrue(heap.includes(2));
        });

    });

    describe("peek()", () => {
        
        it("should return the only item from a one-item heap", () => {
            heap.add(1);
            assert.strictEqual(heap.peek(), 1);
            assert.strictEqual(heap.size, 1);
        });

        it("should return the lowest value from a two-item heap", () => {
            heap.add(2);
            heap.add(1);
            assert.strictEqual(heap.peek(), 1);
            assert.strictEqual(heap.size, 2);
        });

        it("should return the lowest value from a three-item heap", () => {
            heap.add(2);
            heap.add(3);
            heap.add(1);
            assert.strictEqual(heap.peek(), 1);
            assert.strictEqual(heap.size, 3);
        });

        it("should return the lowest value from a four-item heap", () => {
            heap.add(2);
            heap.add(3);
            heap.add(1);
            heap.add(0);
            assert.strictEqual(heap.peek(), 0);
            assert.strictEqual(heap.size, 4);
        });
    });

    describe("poll()", () => {
        
        it("should return the only item from a one-item heap", () => {
            heap.add(1);
            assert.strictEqual(heap.poll(), 1);
            assert.strictEqual(heap.size, 0);
            assertHeapValues(heap, []);
        });

        it("should return the lowest value from a two-item heap", () => {
            heap.add(2);
            heap.add(1);
            assert.strictEqual(heap.poll(), 1);
            assert.strictEqual(heap.size, 1);
            assertHeapValues(heap, [2]);
        });

        it("should return the lowest value from a three-item heap", () => {
            heap.add(2);
            heap.add(3);
            heap.add(1);
            assert.strictEqual(heap.poll(), 1);
            assert.strictEqual(heap.size, 2);
            assertHeapValues(heap, [2,3]);
        });

        it("should return the lowest value from a four-item heap", () => {
            heap.add(2);
            heap.add(3);
            heap.add(1);
            heap.add(0);
            assert.strictEqual(heap.poll(), 0);
            assert.strictEqual(heap.size, 3);
            assertHeapValues(heap, [1,3,2]);
        });
    });

    describe("Custom Comparator", () => {

        beforeEach(() => {
            heap = new BinaryHeap((a, b) => b - a);
        });

        describe("add()", () => {

            it("should store an item when one item is added", () => {
                heap.add(1);
                assertHeapValues(heap, [1]);
            });

            it("should store two items when multiple items are added", () => {
                heap.add(2);
                heap.add(1);

                assertHeapValues(heap, [2, 1]);
            });

            it("should store two items when multiple items are added", () => {
                heap.add(2);
                heap.add(3);
                assertHeapValues(heap, [3, 2]);
            });

            it("should store three items when multiple items are added", () => {
                heap.add(2);
                heap.add(3);
                heap.add(1);
                assertHeapValues(heap, [3, 2, 1]);
            });

            it("should store four items when multiple items are added", () => {
                heap.add(2);
                heap.add(3);
                heap.add(1);
                heap.add(0);
                assertHeapValues(heap, [3, 2, 1, 0]);
            });
        });
        
        describe("peek()", () => {
            
            it("should return the only item from a one-item heap", () => {
                heap.add(1);
                assert.strictEqual(heap.peek(), 1);
                assert.strictEqual(heap.size, 1);
            });
            
            it("should return the highest value from a two-item heap", () => {
                heap.add(2);
                heap.add(1);
                assert.strictEqual(heap.peek(), 2);
                assert.strictEqual(heap.size, 2);
            });
            
            it("should return the highest value from a three-item heap", () => {
                heap.add(2);
                heap.add(3);
                heap.add(1);
                assert.strictEqual(heap.peek(), 3);
                assert.strictEqual(heap.size, 3);
            });

            it("should return the highest value from a four-item heap", () => {
                heap.add(2);
                heap.add(3);
                heap.add(1);
                heap.add(0);
                assert.strictEqual(heap.peek(), 3);
                assert.strictEqual(heap.size, 4);
            });
        });
        
        describe("poll()", () => {
            
            it("should return the only item from a one-item heap", () => {
                heap.add(1);
                assert.strictEqual(heap.poll(), 1);
                assert.strictEqual(heap.size, 0);
                assertHeapValues(heap, []);
            });
            
            it("should return the highest value from a two-item heap", () => {
                heap.add(2);
                heap.add(1);
                assert.strictEqual(heap.poll(), 2);
                assert.strictEqual(heap.size, 1);
                assertHeapValues(heap, [1]);
            });
            
            it("should return the highest value from a three-item heap", () => {
                heap.add(2);
                heap.add(3);
                heap.add(1);
                assert.strictEqual(heap.poll(), 3);
                assert.strictEqual(heap.size, 2);
                assertHeapValues(heap, [2, 1]);
            });

            it("should return the highest value from a four-item heap", () => {
                heap.add(2);
                heap.add(3);
                heap.add(1);
                heap.add(0);
                assert.strictEqual(heap.poll(), 3);
                assert.strictEqual(heap.size, 3);
                assertHeapValues(heap, [2, 0, 1]);
            });
        });
    });

});
