/*
 * Binary Search Tree implementation in JavaScript
 * Copyright (c) 2011 Mike Swift <theycallmeswift@gmail.com>
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/**
 * A Hash Table implementation in JavaScript.
 * @class HashTable
 * @constructor
 */
function HashTable() {
	/**
     * The number of items in the hashtable.
     * @property _length
     * @type int
     * @private
     */    
	this._length = 0;
	
	/**
     * Object that holds key/value pairs.
     * @property _items
     * @type Object
     * @private
     */
	this._items = {}; 
}

HashTable.prototype = {

	//restore constructor
	cunstructor: HashTable,

	/**
     * Either inserts a new key/value pair into the table
	 * if the key does not exist or updates the value for
	 * an existing key.
     * @param {variant} identifying key
     * @param {variant} data value
     * @return {boolean} returns true on success, false on
	 *				failure.
     * @method set
     */
	set: function (key, value) {
		// Make sure neither key or value is null
		if(key === null || value === null) {
			return false;
		}
		if(typeof(this._items[key]) == "undefined") {
			this._length++;
		}
		
		return this._items[key] = value;
		return true;
	},

	/**
     * Retrieves the value for the corresponding key.
     * @param {variant} identifying key
     * @return {variant} Returns value if key/value pair
	 *				exists or null if it does not.
     * @method get
     */
	get: function (key) {
		// See if the current key is defined
		if(typeof(this._items[key]) != "undefined") {
			return this._items[key];
		}
		return null;
	},
	
	/**
     * Removes the key/value pair for the corresponding key.
     * @param {variant} identifying key
     * @return {variant} The value for the corresponding key or null if
     *      the key doesn't exist.
     * @method remove
     */
	remove: function (key) {
		// If the key exists, we can remove it
		if(typeof(this._items[key]) != "undefined") {
			var val = this._items[key];
			delete this._items[key];
			this._length--;
			return val;
		}
		return null;
	},
	
	/**
     * Converts the keys into an array.
     * @return {Array} An array containing all of the valid keys.
     * @method toArray
     */
	getKeys: function () {
		var result = [];
		// For each key in the object
		for(var key in this._items) {
			// If it is not undefined, add it to the array
			if(this._items[key] != "undefined") {
				result.push(key);
			}
		}
		return result;
	},
	
	/**
     * Converts the values into an array.
     * @return {Array} An array containing all of the values in the table.
     * @method toArray
     */
	getValues: function () {
		var result = [];
		// For each key in the object
		for(var key in this._items) {
			// If it is not undefined, add the corresponding value
			if(this._items[key] != "undefined") {
				result.push(this._items[key]);
			}
		}
		return result;
	},
	
	/**
     * Returns the number of items in the table.
     * @return {int} The number of items in the table.
     * @method size
     */
	size: function () {
        return this._length;
    },
};
