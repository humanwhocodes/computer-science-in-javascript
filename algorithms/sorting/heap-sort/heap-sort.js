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
 * Swaps two values in an array.
 * @param {Array} items The array containing the items.
 * @param {int} firstIndex Index of first item to swap.
 * @param {int} secondIndex Index of second item to swap.
 * @return {void}
 */
function swap(items, i1, i2) {
	var temp = items[i1];
	items[i1] = items[i2];
	items[i2] = temp;
}

/**
 * Move an element into the correct location within the heap.
 * @param {Array} items An array of items to sort.
 * @param {Int} The index of parent node
 * @param {Int} Limit index in heap
 * @return {Void}
 */
function siftDown(items, start, end) {
	var root = start,
		child;
	// While the current node still has children
	while(root * 2 + 1 <= end) {
		//Left Child
		child = root * 2 + 1;
		
		// Check if a right child exists and if it's bigger than the current node
		if(child <= (end - 1) && items[child] < items[child + 1]) {
			child++;
		}
		// If the node is bigger than the root, move it up.
		if (items[root] < items[child]) {
			swap(items, root, child);
			root = child;
		} else {
			return;
		}
	}
}

/**
 * A heap sort implementation in JavaScript. The array
 * is sorted in-place.
 * @param {Array} items An array of items to sort.
 * @return {Array} The sorted array.
 */
function heapSort(items) {
	// If the array is <= 1 items, it is sorted already
	if(items.length <= 1) {
		return items;
	}

	var start = ((items.length/2)-1)>>0,
		end = items.length-1;
	
	// Heapify the array
	while (start >= 0) {
		siftDown(items, start, end);
		start--;
	}
		
	while (end > 0) {
		// Put the largest item into position
		swap(items, 0, end);
		// Rebuild the smaller heap
		siftDown(items, 0, end-1);
		end--;
	}
	
	return items;
}
