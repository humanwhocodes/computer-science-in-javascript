
/**
 * @fileoverview Hash Map implementation in JavaScript
 */

"use strict";

//-----------------------------------------------------------------------------
// Requirements
//-----------------------------------------------------------------------------

const { DoublyLinkedList } = require("@humanwhocodes/doubly-linked-list");

//-----------------------------------------------------------------------------
// Private
//-----------------------------------------------------------------------------

const ARRAY_SIZE = 16;

/**
 * Adds up all of the code points in a string to create a numeric hash.
 * @param {string} key The text key to hash.
 * @returns {int} A numeric hash of text.
 * @private 
 */
function hashCodePoints(key) {

    let result = 0;

    // Iterate over each character (not each byte) in the string
    for (const character of key) {

        /*
         * The `codePointAt()` method has support for multi-byte characters,
         * so that's better than `charCodeAt()` for this purpose.
         * 
         * `character` is a single-character string, so we only want the code
         * point at position 0.
         */ 
        result += character.codePointAt(0);
    }

    return result;
}

/**
 * Determines the correct array index for the given hash code.
 * @param {int} hashCode The hash code to compute an index for.
 * @returns {int} An index between 0 and `ARRAY_SIZE - 1`. 
 */
function getArrayIndexFromHashCode(hashCode) {
    return hashCode % ARRAY_SIZE;
}

/**
 * Creates an array to use as the basis for a hash map.
 * @returns {void}
 * @private
 */
function createArray() {

    /*
     * FYI: It's not necessary to use an instance of `Array` for the
     * purpose of creating a hash map. You could just as easily use a
     * regular object. This implementation uses an array strictly because
     * it's the most direct equivalent to how other languages implement
     * hash maps.
     */

    // Object.seal() ensures we don't accidentally add more items
    return Object.seal(
    
        /*
         * Creates a new array with a predefined length of 16. This doesn't
         * actually create each of the properties in the array, so the
         * `fill()` method is used to do so. This is necessary because a
         * sealed array cannot have new properties defined, and since the
         * array starts out without any numeric properties defined, it
         * would prevent us from even assigning a value to array[0].
         */
        new Array(ARRAY_SIZE).fill(undefined)
    );
}

/**
 * Checks that a key is a non-empty string.
 * @param {string} key The key to validate.
 * @returns {void}
 * @throws {TypeError} When the key is either not a string or is an empty
 *      string. 
 */
function assertNonEmptyString(key) {
    if (typeof key !== "string" || key.length === 0) {
        throw new TypeError("Key must be a non-empty string.");
    }
}

//-----------------------------------------------------------------------------
// HashMap Class
//-----------------------------------------------------------------------------

/*
 * These symbols are used to represent properties that should not be part of
 * the public interface. You could also use ES2019 private fields, but those
 * are not yet widely available as of the time of my writing.
 */
const array = Symbol("array");

/**
 * A binary heap implementation in JavaScript.
 * @class HashMap
 */
class HashMap {

    /**
     * Creates a new instance of HashMap
     */
    constructor() {

        /**
         * Array used to manage the hash map. The array is sealed to ensure
         * no new items accidentally get added.
         * @property array
         * @type Array
         * @private
         */
        this[array] = createArray();
    }
    
    /**
     * Adds a key-value pair into the hash map.
     * @param {string} key The key to add.
     * @param {*} value The value to add.
     * @returns {void}
     * @throws {TypeError} If the key isn't a non-empty string.
     */
    set(key, value) {

        // first, ensure the key is valid
        assertNonEmptyString(key);

        /*
         * Next, calculate the hash code from the string key. The hash code
         * is then used to determine the index into the array where the data
         * should be stored.
         */
        const hashCode = hashCodePoints(key);
        const index = getArrayIndexFromHashCode(hashCode);

        /*
         * Special case: If the calculated index in the array hasn't yet
         * been initialized, then create a new linked list in that
         * location before continuing.
         * 
         * Note: It's not necessary to use a linked list. Because JavaScript
         * has an excellent `Array` class, you could also just use an array
         * here. This implementation sticks with a linked list because that's
         * the most common implementation in other languages.
         */
        if (this[array][index] === undefined) {
            this[array][index] = new DoublyLinkedList();
        }

        /*
         * Check to see if the exact key is already present
         * in the hash map. If so, then just update the value.
         */
        const result = this[array][index].find((value) => {
            return value.key === key;
        });

        // If the key doesn't already exist, then add it
        if (result === undefined) {
            
            /*
             * Add everything we know about this key-value pair, including the key,
             * the value, and the hash code. We will need all of these later.
             */
            this[array][index].add({
                key,
                value
            });
        } else {

            // The key already exists in the hash map, so just update the value.
            result.value = value;
        }

    }

    /**
     * Retrieves a key-value pair from the hash map.
     * @param {string} key The key whose value should be retrieved.
     * @returns {*} The value associated with the key or `undefined` if the
     *      key doesn't exist in the hash map.
     * @throws {TypeError} If the key isn't a non-empty string.
     */
    get(key) {

        // first, ensure the key is valid
        assertNonEmptyString(key);

        /*
         * Next, calculate the hash code from the string key. The hash code
         * is then used to determine the index into the array where the data
         * should be stored.
         */
        const hashCode = hashCodePoints(key);
        const index = getArrayIndexFromHashCode(hashCode);

        /*
         * Special case: If the calculated index in the array hasn't yet
         * been initialized, then the key doesn't exist. Return
         * `undefined` to indicate the key doesn't exist.
         */
        if (this[array][index] === undefined) {
            return undefined;
        }

        /*
         * If we've made it to here, then there is a linked list in the
         * array at this location, so try to find the key that matches.
         */
        const result = this[array][index].find((value) => {
            return value.key === key;
        });

        /*
         * If an item with the given hash code and key was not found, then
         * there is no value to return. Just return undefined.
         */
        if (result === undefined) {
            return undefined;
        }

        /*
         * If we've made it to here, it means that the hash code and key were
         * found, so return the value.
         */
        return result.value;
    }

    /**
     * Determines if a given key is present in the hash map.
     * @param {string} key The key to check.
     * @returns {boolean} True if the key exists in the hash map, false if not.
     * @throws {TypeError} If the key isn't a non-empty string.
     */
    has(key) {

        // first, ensure the key is valid
        assertNonEmptyString(key);

        /*
         * Next, calculate the hash code from the string key. The hash code
         * is then used to determine the index into the array where the data
         * should be stored.
         */
        const hashCode = hashCodePoints(key);
        const index = getArrayIndexFromHashCode(hashCode);

        /*
         * Special case: If the calculated index in the array hasn't yet
         * been initialized, then the key doesn't exist. Return
         * `false` to indicate the key doesn't exist.
         */
        if (this[array][index] === undefined) {
            return false;
        }

        /*
         * If we've made it to here, then there is a linked list in the
         * array at this location, so try to find the key that matches.
         */
        const resultIndex = this[array][index].findIndex((value) => {
            return value.key === key;
        });

        /*
         * Any value greater than -1 indicates that the key was found in the
         * hash map and therefore this method should return `true`.
         */
        return resultIndex > -1;
    }

    /**
     * Deletes the given key from the hash map.
     * @param {string} key The key to delete.
     * @returns {boolean} True if the key exists and was deleted, false if the
     *      key didn't exist.
     * @throws {TypeError} If the key isn't a non-empty string.
     */
    delete(key) {

        // first, ensure the key is valid
        assertNonEmptyString(key);

        /*
         * Next, calculate the hash code from the string key. The hash code
         * is then used to determine the index into the array where the data
         * should be stored.
         */
        const hashCode = hashCodePoints(key);
        const index = getArrayIndexFromHashCode(hashCode);

        /*
         * Special case: If the calculated index in the array hasn't yet
         * been initialized, then the key doesn't exist. Return
         * `false` to indicate the key doesn't exist.
         */
        if (this[array][index] === undefined) {
            return false;
        }

        /*
         * If we've made it to here, then there is a linked list in the
         * array at this location, so try to find the key that matches.
         */
        const resultIndex = this[array][index].findIndex((value) => {
            return value.key === key;
        });

        /*
         * Special case: If `resultIndex` is -1, meaning the value wasn't
         * found, just return -1.
         */
        if (resultIndex === -1) {
            return -1;
        }

        /*
         * If we've made it to here, then `resultIndex` is greater than -1
         * and we need to remove the given key from the hash map.
         */
        this[array][index].remove(resultIndex);

        /*
         * Because we actually performed the removal, we need to return `true`
         * to give feedback that this happened.
         */
        return true;

    }

    /**
     * Returns the number of key-value pairs in the hash map.
     * @returns {int} The number of key-value pairs in the hash map.
     */
    get size() {

        /*
         * Because the `entries()` generator already implements the correct
         * traversal algorithm, use that here instead of duplicating the
         * algorithm.
         * 
         * The first step is to create a new iterator by calling `entries()`.
         */
        const iterator = this.entries();

        /*
         * The `count` variable stores the number of entries we see and is
         * incremented inside of a loop later on.
         */
        let count = 0;
        
        /*
         * Get the first entry from the iterator. Each entry has two properties:
         * `value`, containing the value from the hash map, and `done`, a
         * a Boolean value that is `true` when there are no more entries.
         */
        let entry = iterator.next();

        // Continue the loop as long as there are more entries
        while (!entry.done) {

            // Increment the count to reflect the last entry
            count++;

            // Get the entry from the iterator and repeat the loop
            entry = iterator.next();
        }

        /*
         * Once the loop exits, the `count` variable contains the number of
         * entries in the iterator so return that value.
         */
        return count;
    }

    /**
     * Removes all values from the heap.
     * @returns {void}
     */
    clear() {

        /*
         * The simplest way to clear all values is just to overwrite the array
         * we started with.
         */
        this[array] = createArray();
    }

    /**
     * The default iterator for the class.
     * @returns {Iterator} An iterator for the class.
     */
    [Symbol.iterator]() {
        return this.entries();
    }

    /**
     * Create an iterator that returns each entry in the hash map.
     * @returns {Iterator} An iterator on the hash map.
     */
    *entries() {

        // For each item in the array
        for (const list of this[array]) {

            // If there is no linked list then no need to go any further
            if (list !== undefined) {

                // If there is a linked list then yield each key-value pair
                for (const item of list) {
                    yield [item.key, item.value];
                }
            } 
        }
    }

    /**
     * Create an iterator that returns each key in the hash map.
     * @returns {Iterator} An iterator on the hash map keys. 
     */
    *keys() {

        /*
         * Because this iterator just returns a subset of the information
         * returned by the `entries()` iterator, we just use `entries()`
         * and take the information we care about.
         */
        for (const [key] of this.entries()) {
            yield key;
        }
    }

    /**
     * Create an iterator that returns each value in the hash map.
     * @returns {Iterator} An iterator on the hash map value. 
     */
    *values() {

        /*
         * Because this iterator just returns a subset of the information
         * returned by the `entries()` iterator, we just use `entries()`
         * and take the information we care about.
         */
        for (const [,value] of this.entries()) {
            yield value;
        }
    }
        
    /**
     * Converts the heap into a string representation.
     * @returns {String} A string representation of the heap.
     */
    toString(){
        // TODO
        return [...this[array]].toString();
    }
}

exports.HashMap = HashMap;