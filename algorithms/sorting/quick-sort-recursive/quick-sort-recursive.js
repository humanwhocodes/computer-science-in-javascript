/*
 * Recursive merge sort implementation in JavaScript
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
 * Sorts an array by picking a pivot and placing all items
 * less than the pivot on the left of it and all items greater
 * on the right and then recursing over the subarrays on either
 * side.
 * @param {Array} Array being sorted
 * @param {Int} Start location 
 * @return {Int} End Location
 */
function quick_sort_internal(items, start, end) {
	var l = start,
	    r = end,
	    pivot,
	    temp;
	
	// If the subarray is at least 2 values
	if(end - start >= 1) {
		// Make the first element the pivot
		pivot = items[start];
		while(r > l) {
			// Look for the first element greater than the pivot
			while(items[l] <= pivot && l <= end && r > l) {
				l++;
			}
			// Look for the first element less than the pivot
			while(items[r] > pivot && r >= start && r >= l) {
				r--;
			}
			// If the right pointer is still > left pointer, swap the items
			if(r > l) {
				temp = items[l];
				items[l] = items[r];
				items[r] = temp;
			}
		}
		//Swap the pivot with the current location
		temp = items[start];
		items[start] = items[r];
		items[r] = temp;

		//Recurse on the remaining items
		quick_sort_internal(items, start, r - 1);
		quick_sort_internal(items, r + 1, end);
	} else {
		return;
	}
}
/**
 * Sorts an array in ascending natural order using
 * quick sort.
 * @param {Array} items The array to sort.
 * @return {Void} 
 */
function quick_sort(items) {
	// As long as the array has > 1 element, it can be sorted
	if(items.length <= 1) {
		return items;
	}
	quick_sort_internal(items, 0, items.length - 1);
}
