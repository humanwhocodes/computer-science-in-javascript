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


function HashTable() {
	this._length = 0;
	this._items = {}; 
}

HashTable.prototype = {

	//restore constructor
	cunstructor: HashTable,

	set: function (key, value) {
		if(key === null || value === null) {
			return false;
		}
		this._length++;
		return this._items[key] = value;
	},

	get: function (key) {
		if(typeof(this._items[key]) != "undefined") {
			return this._items[key];
		}
		return null;
	},
	
	remove: function (key) {
		if(typeof(this._items[key]) != "undefined") {
			var val = this._items[key];
			delete this._items[key];
			this._length--;
			return val;
		}
		return null;
	},
	
	getKeys: function () {
		var result = [];
		for(var key in this._items) {
			if(this._items[key] != "undefined") {
				result.push(key);
			}
		}
		return result;
	},
	
	getValues: function () {
		var result = [];
		for(var key in this._items) {
			if(this._items[key] != "undefined") {
				result.push(this._items[key]);
			}
		}
		return result;
	},
	
	size: function () {
        return this._length;
    },
};
