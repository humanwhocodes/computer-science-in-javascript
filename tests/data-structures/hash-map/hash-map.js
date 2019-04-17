/**
 * @fileoverview Hash Map tests
 */
/* global it, describe, beforeEach */
"use strict";

//-----------------------------------------------------------------------------
// Requirements
//-----------------------------------------------------------------------------

const assert = require("chai").assert;
const { HashMap } = require("../../../src/data-structures/hash-map/hash-map");

//-----------------------------------------------------------------------------
// Helpers
//-----------------------------------------------------------------------------

/**
 * Check that the contents of the hash map match the values of the array.
 * @param {HashMap} map The list to check 
 * @param {Array} values An array of values that should match.
 * @throws {AssertionError} If the values in the list don't match the
 *      values in the array.
 */
function assertHashMapValues(map, values) {
    const hashMapValues = [...map];
    assert.deepStrictEqual(hashMapValues, values);

}

//-----------------------------------------------------------------------------
// Tests
//-----------------------------------------------------------------------------

describe("HashMap", () => {

    let map;

    beforeEach(() => {
        map = new HashMap();
    });

    describe("set()", () => {

        it("should store a key in the hash map", () => {
            map.set("foo", 1);
            assertHashMapValues(map, [["foo", 1]]);
        });

        it("should store two keys in the hash map", () => {
            map.set("foo", 1);
            map.set("bar", 2);
            assertHashMapValues(map, [["foo", 1], ["bar", 2]]);
        });

        it("should store two keys with the same hash codes in the hash map", () => {
            map.set("foo", 1);
            map.set("oof", 2);
            assertHashMapValues(map, [["foo", 1], ["oof", 2]]);
        });

        it("should overwrite a key in the hash map when called twice with the same key", () => {
            map.set("foo", 1);
            map.set("bar", 2);
            map.set("foo", 3);
            assertHashMapValues(map, [["foo", 3], ["bar", 2]]);
        });

    });

    describe("get()", () => {

        it("should retrieve a key from the hash map", () => {
            map.set("foo", 1);
            assert.strictEqual(map.get("foo"), 1);
        });

        it("should retrieve two keys from the hash map", () => {
            map.set("foo", 1);
            map.set("bar", 2);
            assert.strictEqual(map.get("foo"), 1);
            assert.strictEqual(map.get("bar"), 2);
        });

        it("should retrieve two keys from the hash map when one key is overwritten", () => {
            map.set("foo", 1);
            map.set("bar", 2);
            map.set("foo", 3);
            assert.strictEqual(map.get("foo"), 3);
            assert.strictEqual(map.get("bar"), 2);
        });

    });

    describe("has()", () => {

        it("should return true when a key exists in the hash map", () => {
            map.set("foo", 1);
            assert.isTrue(map.has("foo"));
        });

        it("should false when a key doesn't exist in the hash map", () => {
            map.set("foo", 1);
            assert.isFalse(map.has("foox"));
        });

        it("should return true when multiple keys exist in the hash map", () => {
            map.set("foo", 1);
            map.set("bar", 2);
            assert.isTrue(map.has("foo"));
            assert.isTrue(map.has("bar"));
        });

        it("should return true when one key is overwritten", () => {
            map.set("foo", 1);
            map.set("bar", 2);
            map.set("foo", 3);
            assert.isTrue(map.has("foo"));
            assert.isTrue(map.has("bar"));
        });

    });

    describe("delete()", () => {

        it("should delete a key in the hash map", () => {
            map.set("foo", 1);
            map.delete("foo");
            assertHashMapValues(map, []);
        });

        it("should return true when a key is deleted from the hash map", () => {
            map.set("foo", 1);
            assert.isTrue(map.delete("foo"));
        });

        it("should return false when a key is not deleted from the hash map", () => {
            map.set("foo", 1);
            assert.isFalse(map.delete("f"));
        });

        it("should return false when the hash map is empty", () => {
            assert.isFalse(map.delete("f"));
        });

        it("should delete two keys in the hash map", () => {
            map.set("foo", 1);
            map.set("bar", 2);
            map.delete("foo");
            map.delete("bar");
            assertHashMapValues(map, []);
        });

        it("should delete one key when the hash map has two keys", () => {
            map.set("foo", 1);
            map.set("oof", 2);
            map.delete("foo");
            assertHashMapValues(map, [["oof", 2]]);
        });

    });

    describe("size", () => {
        
        it("should return the correct size when the hash map has no items", () => {
            assert.strictEqual(map.size, 0);
        });

        it("should return the correct size when the hash map has one item", () => {
            map.set("foo", 1);
            assert.strictEqual(map.size, 1);
        });

        it("should return the correct size when the hash map has two items", () => {
            map.set("bar", 2);
            map.set("foo", 1);
            assert.strictEqual(map.size, 2);
        });

        it("should return the correct size when the hash map has three items", () => {
            map.set("bar", 2);
            map.set("baz", 3);
            map.set("foo", 1);
            assert.strictEqual(map.size, 3);
        });

        it("should return the correct size when the hash map has four items", () => {
            map.set("bar", 2);
            map.set("baz", 3);
            map.set("foo", 1);
            map.set("bazoo", 0);
            assert.strictEqual(map.size, 4);
        });
    });

    ["entries", Symbol.iterator].forEach(method => {

        describe(String(method) + "()", () => {

            it("should create empty array when there are no items", () => {
                assert.deepStrictEqual([...map[method]()], []);
            });

            it("should iterate over list when there is one item", () => {
                map.set("foo", 1);

                assert.deepStrictEqual([...map[method]()], [["foo", 1]]);
            });

            it("should iterate over list when there are multiple items", () => {
                map.set("foo", 1);
                map.set("bar", 2);
                assert.deepStrictEqual([...map[method]()], [["foo", 1], ["bar", 2]]);
            });

        });

    });

    describe("keys()", () => {

        it("should create empty array when there are no items", () => {
            assert.deepStrictEqual([...map.keys()], []);
        });

        it("should iterate over list when there is one item", () => {
            map.set("foo", 1);

            assert.deepStrictEqual([...map.keys()], ["foo"]);
        });

        it("should iterate over list when there are multiple items", () => {
            map.set("foo", 1);
            map.set("bar", 2);
            assert.deepStrictEqual([...map.keys()], ["foo", "bar"]);
        });

    });

    describe("values()", () => {

        it("should create empty array when there are no items", () => {
            assert.deepStrictEqual([...map.values()], []);
        });

        it("should iterate over list when there is one item", () => {
            map.set("foo", 1);

            assert.deepStrictEqual([...map.values()], [1]);
        });

        it("should iterate over list when there are multiple items", () => {
            map.set("foo", 1);
            map.set("bar", 2);
            assert.deepStrictEqual([...map.values()], [1, 2]);
        });

    });


});
