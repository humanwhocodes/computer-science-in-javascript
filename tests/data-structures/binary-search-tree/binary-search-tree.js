/**
 * @fileoverview BinarySearchTree tests
 */
/* global it, describe, beforeEach */

"use strict";

//-----------------------------------------------------------------------------
// Requirements
//-----------------------------------------------------------------------------

const assert = require("chai").assert;
const BinarySearchTree = require("../../../src/data-structures/binary-search-tree").BinarySearchTree;

//-----------------------------------------------------------------------------
// Helpers
//-----------------------------------------------------------------------------

/**
 * Check that the contents of the tree match the values of the array.
 * @param {BinarySearchTree} tree The tree to check 
 * @param {Array} values An array of values that should match.
 * @throws {AssertionError} If the values in the tree don't match the
 *      values in the array.
 */
function assertTreeValues(tree, values) {
    const treeValues = [...tree.values()];
    assert.deepStrictEqual(treeValues, values);
}

//-----------------------------------------------------------------------------
// Tests
//-----------------------------------------------------------------------------

describe("BinarySearchTree", () => {

    let tree;

    beforeEach(() => {
        tree = new BinarySearchTree();
    });

    describe("add()", () => {
        
        it("should store an node when one node is added", () => {
            tree.add(1);
            assertTreeValues(tree, [1]);
        });

        it("should store two nodes when two nodes are added", () => {
            tree.add(1);
            tree.add(2);
            assertTreeValues(tree, [1, 2]);
        });

        it("should store multiple nodes when multiple nodes are added", () => {
            tree.add(2);
            tree.add(1);
            tree.add(3);
            assertTreeValues(tree, [1, 2, 3]);
        });

        it("should not store duplicate nodes when multiple nodes are added", () => {
            tree.add(2);
            tree.add(1);
            tree.add(3);
            tree.add(1);
            assertTreeValues(tree, [1, 2, 3]);
        });
    });

    describe("has()", () => {
        
        it("should return true when there is one node in the tree and the value exists", () => {
            tree.add(1);
            assert.isTrue(tree.has(1));
        });

        it("should return false when there is one node in the tree and the value doesn't exist", () => {
            tree.add(1);
            assert.isFalse(tree.has(2));
        });

        it("should return false when there is an empty tree and the value doesn't exist", () => {
            assert.isFalse(tree.has(2));
        });

        it("should return true when there are two nodes in the tree and the value exists", () => {
            tree.add(2);
            tree.add(1);
            assert.isTrue(tree.has(1));
        });

        it("should return false when there is one node in the tree and the value doesn't exist", () => {
            tree.add(1);
            tree.add(2);
            assert.isFalse(tree.has(3));
        });

        it("should return true when there are three nodes in the tree and the value exists", () => {
            tree.add(2);
            tree.add(1);
            tree.add(3);
            assert.isTrue(tree.has(1));
        });

        it("should return false when there is one node in the tree and the value doesn't exist", () => {
            tree.add(2);
            tree.add(1);
            tree.add(3);
            assert.isFalse(tree.has(4));
        });
    });

    describe("delete()", () => {
       
        it("should delete node when there is only one node in the tree.", () => {
            tree.add(10);
            tree.delete(10);
            assertTreeValues(tree, []);
        });

        it("should delete node when tree has two nodes.", () => {
            tree.add(10);
            tree.add(5);

            tree.delete(10);
            assertTreeValues(tree, [5]);
        });

        it("should delete node when tree has left subtree nodes only.", () => {
            tree.add(10);
            tree.add(5);
            tree.add(2);

            tree.delete(5);
            assertTreeValues(tree, [2, 10]);
        });

        it("should delete node when tree has left subtree nodes only and root is removed.", () => {
            tree.add(10);
            tree.add(5);
            tree.add(2);

            tree.delete(10);
            assertTreeValues(tree, [2, 5]);
        });

        it("should delete node when tree has right subtree nodes only and root is removed.", () => {
            tree.add(10);
            tree.add(15);
            tree.add(20);

            tree.delete(15);
            assertTreeValues(tree, [10, 20]);
        });

        it("should delete node when tree has right subtree nodes only and root is removed.", () => {
            tree.add(10);
            tree.add(15);
            tree.add(20);

            tree.delete(15);
            assertTreeValues(tree, [10, 20]);
        });

        it("should remove node when there are two children in shallow tree", () => {
            tree.add(7);
            tree.add(11);
            tree.add(8);
            tree.add(13);

            tree.delete(11);
            assertTreeValues(tree, [7, 8, 13]);
        });

        it("should remove node when there are three children in shallow tree", () => {
            tree.add(7);
            tree.add(11);
            tree.add(8);
            tree.add(13);
            tree.add(9);

            tree.delete(11);
            assertTreeValues(tree, [7, 8, 9, 13]);
        });

        it("should remove node when there are two children in deep tree", () => {

            tree.add(8);
            tree.add(3);
            tree.add(1);
            tree.add(10);
            tree.add(6);
            tree.add(4);
            tree.add(7);
            tree.add(14);
            tree.add(13);

            tree.delete(3);
            assertTreeValues(tree, [1, 4, 6, 7, 8, 10, 13, 14]);
        });

        it("should remove an node when there is only one node", () => {
            tree.add(1);
            assertTreeValues(tree, [1]);

            tree.delete(1);
            assertTreeValues(tree, []);
        });

        it("should remove an node when multiple nodes are in the tree and the middle node is removed", () => {
            tree.add(1);
            tree.add(2);
            tree.add(3);
            assertTreeValues(tree, [1, 2, 3]);
            
            // remove middle node
            tree.delete(2);
            assertTreeValues(tree, [1, 3]);
        });
        
    });

    describe("clear()", () => {

        it("should not throw an error when the tree has no nodes", () => {
            assertTreeValues(tree, []);

            tree.clear();
            assertTreeValues(tree, []);
        });

        it("should remove all nodes when the tree has one node", () => {
            tree.add(1);
            assertTreeValues(tree, [1]);

            tree.clear();
            assertTreeValues(tree, []);
        });

        it("should remove all nodes when the tree has multiple nodes", () => {
            tree.add(1);
            tree.add(2);
            assertTreeValues(tree, [1, 2]);

            tree.clear();
            assertTreeValues(tree, []);
        });

    });


    describe("size", () => {
        
        it("should return 0 when the tree is empty", () => {
            assert.strictEqual(tree.size, 0);
        });
        
        it("should return 1 when the tree has one node", () => {
            tree.add(1);
            assert.strictEqual(tree.size, 1);
        });
        
        it("should return 2 when the tree has two nodes", () => {
            tree.add(1);
            tree.add(2);
            assert.strictEqual(tree.size, 2);
        });
     
        it("should return 3 when the tree has three nodes", () => {
            tree.add(2);
            tree.add(1);
            tree.add(4);
            assert.strictEqual(tree.size, 3);
        });

        it("should return 5 when the tree has five nodes", () => {
            tree.add(2);
            tree.add(1);
            tree.add(4);
            tree.add(9);
            tree.add(12);
            assert.strictEqual(tree.size, 5);
        });

    });


    ["values", Symbol.iterator].forEach(method => {

        describe(String(method) + "()", () => {
            
            it("should create empty array when there are no nodes", () => {
                assert.deepStrictEqual([...tree[method]()], []);
            });
    
            it("should iterate over tree when there is one node", () => {
                tree.add(1);
    
                assert.deepStrictEqual([...tree[method]()], [1]);
            });
            
            it("should iterate over tree when there are multiple nodes", () => {
                tree.add(1);
                tree.add(2);
                tree.add(3);
    
                assert.deepStrictEqual([...tree[method]()], [1, 2, 3]);
            });
            
        });

    });



});
