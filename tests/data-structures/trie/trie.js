/**
 * @fileoverview Trie tests
 */
/* global it, describe, beforeEach */
"use strict";

//-----------------------------------------------------------------------------
// Requirements
//-----------------------------------------------------------------------------

const assert = require("chai").assert;
const { Trie } = require("../../../src/data-structures/trie/trie");

//-----------------------------------------------------------------------------
// Helpers
//-----------------------------------------------------------------------------

/**
 * Check that the contents of the heap match the values of the array.
 * @param {Trie} heap The list to check 
 * @param {Array} values An array of values that should match.
 * @throws {AssertionError} If the values in the list don't match the
 *      values in the array.
 */
function assertTrieValues(heap, values) {
    const heapValues = [...heap.values()];
    assert.deepStrictEqual(heapValues, values);

}

//-----------------------------------------------------------------------------
// Tests
//-----------------------------------------------------------------------------

describe("Trie", () => {

    let trie;

    beforeEach(() => {
        trie = new Trie();
    });

    describe("add()", () => {
        
        it("should store a word when one word is added", () => {
            trie.add("apple");
            assertTrieValues(trie, ["a", "p", "p", "l", "e"]);
        });

        it("should store two words when multiple words are added", () => {
            trie.add("apple");
            trie.add("ape");

            assertTrieValues(trie, ["a", "p", "p", "l", "e", "e"]);
        });

        it("should store two items when multiple items are added", () => {
            trie.add(2);
            trie.add(3);
            assertTrieValues(trie, [2,3]);
        });

        it("should store three items when multiple items are added", () => {
            trie.add(2);
            trie.add(3);
            trie.add(1);
            assertTrieValues(trie, [1,3,2]);
        });

        it("should store four items when multiple items are added", () => {
            trie.add(2);
            trie.add(3);
            trie.add(1);
            trie.add(0);
            assertTrieValues(trie, [0,1,2,3]);
        });
    });

    describe("size", () => {
        
        it("should return the correct size when the heap has no items", () => {
            assert.strictEqual(trie.size, 0);
        });

        it("should return the correct size when the heap has one item", () => {
            trie.add(1);
            assert.strictEqual(trie.size, 1);
        });

        it("should return the correct size when the heap has two items", () => {
            trie.add(2);
            trie.add(1);
            assert.strictEqual(trie.size, 2);
        });

        it("should return the correct size when the heap has three items", () => {
            trie.add(2);
            trie.add(3);
            trie.add(1);
            assert.strictEqual(trie.size, 3);
        });

        it("should return the correct size when the heap has four items", () => {
            trie.add(2);
            trie.add(3);
            trie.add(1);
            trie.add(0);
            assert.strictEqual(trie.size, 4);
        });
    });

    describe("isEmpty()", () => {
        
        it("should return true when the heap is empty", () => {
            assert.isTrue(trie.isEmpty());
        });

        it("should return false when the heap has one item", () => {
            trie.add(1);
            assert.isFalse(trie.isEmpty());
        });

        it("should return false when the heap has two items", () => {
            trie.add(2);
            trie.add(1);
            assert.isFalse(trie.isEmpty());
        });

    });

    describe("includes()", () => {
        
        it("should return false when the heap is empty", () => {
            assert.isFalse(trie.includes(5));
        });

        it("should return true when the item is found", () => {
            trie.add(1);
            assert.isTrue(trie.includes(1));
        });

        it("should return false when the item is not found", () => {
            trie.add(1);
            assert.isFalse(trie.includes(10));
        });

        it("should return true when the heap has two items and the item is found", () => {
            trie.add(2);
            trie.add(1);
            assert.isTrue(trie.includes(2));
        });

    });

    describe("peek()", () => {
        
        it("should return the only item from a one-item heap", () => {
            trie.add(1);
            assert.strictEqual(trie.peek(), 1);
            assert.strictEqual(trie.size, 1);
        });

        it("should return the lowest value from a two-item heap", () => {
            trie.add(2);
            trie.add(1);
            assert.strictEqual(trie.peek(), 1);
            assert.strictEqual(trie.size, 2);
        });

        it("should return the lowest value from a three-item heap", () => {
            trie.add(2);
            trie.add(3);
            trie.add(1);
            assert.strictEqual(trie.peek(), 1);
            assert.strictEqual(trie.size, 3);
        });

        it("should return the lowest value from a four-item heap", () => {
            trie.add(2);
            trie.add(3);
            trie.add(1);
            trie.add(0);
            assert.strictEqual(trie.peek(), 0);
            assert.strictEqual(trie.size, 4);
        });
    });

    describe("poll()", () => {
        
        it("should return the only item from a one-item heap", () => {
            trie.add(1);
            assert.strictEqual(trie.poll(), 1);
            assert.strictEqual(trie.size, 0);
            assertTrieValues(trie, []);
        });

        it("should return the lowest value from a two-item heap", () => {
            trie.add(2);
            trie.add(1);
            assert.strictEqual(trie.poll(), 1);
            assert.strictEqual(trie.size, 1);
            assertTrieValues(trie, [2]);
        });

        it("should return the lowest value from a three-item heap", () => {
            trie.add(2);
            trie.add(3);
            trie.add(1);
            assert.strictEqual(trie.poll(), 1);
            assert.strictEqual(trie.size, 2);
            assertTrieValues(trie, [2,3]);
        });

        it("should return the lowest value from a four-item heap", () => {
            trie.add(2);
            trie.add(3);
            trie.add(1);
            trie.add(0);
            assert.strictEqual(trie.poll(), 0);
            assert.strictEqual(trie.size, 3);
            assertTrieValues(trie, [1,3,2]);
        });
    });

    describe("Custom Comparator", () => {

        beforeEach(() => {
            trie = new Trie((a, b) => b - a);
        });

        describe("add()", () => {

            it("should store an item when one item is added", () => {
                trie.add(1);
                assertTrieValues(trie, [1]);
            });

            it("should store two items when multiple items are added", () => {
                trie.add(2);
                trie.add(1);

                assertTrieValues(trie, [2, 1]);
            });

            it("should store two items when multiple items are added", () => {
                trie.add(2);
                trie.add(3);
                assertTrieValues(trie, [3, 2]);
            });

            it("should store three items when multiple items are added", () => {
                trie.add(2);
                trie.add(3);
                trie.add(1);
                assertTrieValues(trie, [3, 2, 1]);
            });

            it("should store four items when multiple items are added", () => {
                trie.add(2);
                trie.add(3);
                trie.add(1);
                trie.add(0);
                assertTrieValues(trie, [3, 2, 1, 0]);
            });
        });
        
        describe("peek()", () => {
            
            it("should return the only item from a one-item heap", () => {
                trie.add(1);
                assert.strictEqual(trie.peek(), 1);
                assert.strictEqual(trie.size, 1);
            });
            
            it("should return the highest value from a two-item heap", () => {
                trie.add(2);
                trie.add(1);
                assert.strictEqual(trie.peek(), 2);
                assert.strictEqual(trie.size, 2);
            });
            
            it("should return the highest value from a three-item heap", () => {
                trie.add(2);
                trie.add(3);
                trie.add(1);
                assert.strictEqual(trie.peek(), 3);
                assert.strictEqual(trie.size, 3);
            });

            it("should return the highest value from a four-item heap", () => {
                trie.add(2);
                trie.add(3);
                trie.add(1);
                trie.add(0);
                assert.strictEqual(trie.peek(), 3);
                assert.strictEqual(trie.size, 4);
            });
        });
        
        describe("poll()", () => {
            
            it("should return the only item from a one-item heap", () => {
                trie.add(1);
                assert.strictEqual(trie.poll(), 1);
                assert.strictEqual(trie.size, 0);
                assertTrieValues(trie, []);
            });
            
            it("should return the highest value from a two-item heap", () => {
                trie.add(2);
                trie.add(1);
                assert.strictEqual(trie.poll(), 2);
                assert.strictEqual(trie.size, 1);
                assertTrieValues(trie, [1]);
            });
            
            it("should return the highest value from a three-item heap", () => {
                trie.add(2);
                trie.add(3);
                trie.add(1);
                assert.strictEqual(trie.poll(), 3);
                assert.strictEqual(trie.size, 2);
                assertTrieValues(trie, [2, 1]);
            });

            it("should return the highest value from a four-item heap", () => {
                trie.add(2);
                trie.add(3);
                trie.add(1);
                trie.add(0);
                assert.strictEqual(trie.poll(), 3);
                assert.strictEqual(trie.size, 3);
                assertTrieValues(trie, [2, 0, 1]);
            });
        });
    });

});
